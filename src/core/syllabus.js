/* ==========================================================================
   core/syllabus.js — registro e consulta da base curricular.

   A base curricular é a camada mais profunda da plataforma. Enquanto
   `data/curriculum.js` descreve as duas trilhas que o aluno percorre hoje,
   aqui mora o mapa completo do conhecimento: 12 disciplinas divididas em
   módulos, unidades, tópicos e subtópicos.

   Hierarquia:
     disciplina → módulo → unidade → tópico → subtópico

   Cada tópico declara `requires` com ids de outros tópicos — de qualquer
   disciplina. É esse grafo que permite responder a pergunta que dá nome ao
   projeto: "você está travando em X porque ainda não domina Y".

   Este arquivo é só estrutura e consulta. Quem decide domínio, desbloqueio
   e ordem de estudo continua sendo `core/engine.js`.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const DISCIPLINES = [];

  /* Índices reconstruídos a cada registro: o custo é irrelevante (12 chamadas
     no carregamento) e evita que uma disciplina precise conhecer as outras. */
  let topicIndex = {};
  let unitIndex = {};
  let moduleIndex = {};
  let disciplineIndex = {};
  let topicList = [];

  function reindex() {
    topicIndex = {};
    unitIndex = {};
    moduleIndex = {};
    disciplineIndex = {};
    topicList = [];

    DISCIPLINES.forEach((d) => {
      disciplineIndex[d.id] = d;
      (d.modules || []).forEach((m) => {
        m.discipline = d.id;
        moduleIndex[m.id] = m;
        (m.units || []).forEach((u) => {
          u.discipline = d.id;
          u.module = m.id;
          unitIndex[u.id] = u;
          (u.topics || []).forEach((t) => {
            t.discipline = d.id;
            t.module = m.id;
            t.unit = u.id;
            t.requires = t.requires || [];
            t.sub = t.sub || [];
            topicIndex[t.id] = t;
            topicList.push(t);
          });
        });
      });
    });
  }

  /**
   * Uma disciplina se registra sozinha. Nenhum arquivo de disciplina conhece
   * outro — a ligação entre elas é feita só por id em `requires`, o que
   * deixa a ordem de carregamento livre.
   */
  function register(discipline) {
    DISCIPLINES.push(discipline);
    DISCIPLINES.sort((a, b) => (a.n || 0) - (b.n || 0));
    reindex();
    return discipline;
  }

  /* ---------------- Consultas de estrutura ---------------- */

  const topic = (id) => topicIndex[id] || null;
  const unit = (id) => unitIndex[id] || null;
  const moduleOf = (id) => moduleIndex[id] || null;
  const discipline = (id) => disciplineIndex[id] || null;
  const allTopics = () => topicList.slice();

  const topicsOfUnit = (unitId) => (unitIndex[unitId] ? unitIndex[unitId].topics : []);
  const unitsOfModule = (moduleId) => (moduleIndex[moduleId] ? moduleIndex[moduleId].units : []);
  const modulesOf = (disciplineId) => (disciplineIndex[disciplineId] ? disciplineIndex[disciplineId].modules : []);

  function topicsOfDiscipline(disciplineId) {
    return topicList.filter((t) => t.discipline === disciplineId);
  }

  function topicsOfModule(moduleId) {
    return topicList.filter((t) => t.module === moduleId);
  }

  /** Caminho legível até o tópico: usado em migalha de pão e no tutor. */
  function pathOf(topicId) {
    const t = topic(topicId);
    if (!t) return null;
    return {
      discipline: discipline(t.discipline),
      module: moduleOf(t.module),
      unit: unit(t.unit),
      topic: t
    };
  }

  /* ---------------- Grafo de pré-requisitos ---------------- */

  /**
   * Cadeia completa de pré-requisitos, em ordem de estudo (o mais básico
   * primeiro). Percorre em profundidade e ignora ciclos — um currículo mal
   * declarado não pode travar a aplicação inteira.
   */
  function prereqChain(topicId, seen, guard) {
    seen = seen || [];
    guard = guard || new Set();
    if (guard.has(topicId)) return seen;
    guard.add(topicId);

    const t = topic(topicId);
    if (!t) return seen;

    for (const dep of t.requires) {
      if (!seen.includes(dep) && topicIndex[dep]) {
        prereqChain(dep, seen, guard);
        seen.push(dep);
      }
    }
    return seen;
  }

  /** Quem depende deste tópico — o outro sentido da seta. */
  function dependents(topicId) {
    return topicList.filter((t) => t.requires.includes(topicId));
  }

  /**
   * Tudo que destrava ao dominar este tópico, incluindo o efeito em cascata.
   * Serve para mostrar ao aluno o que ele ganha ao fechar um assunto.
   */
  function unlockedBy(topicId, seen, guard) {
    seen = seen || [];
    guard = guard || new Set();
    if (guard.has(topicId)) return seen;
    guard.add(topicId);

    dependents(topicId).forEach((t) => {
      if (!seen.includes(t.id)) {
        seen.push(t.id);
        unlockedBy(t.id, seen, guard);
      }
    });
    return seen;
  }

  /**
   * Ordem topológica de todos os tópicos: a sequência em que o currículo
   * inteiro pode ser estudado sem nunca chegar a algo sem base.
   * Tópicos envolvidos em ciclo vão para o fim, em vez de sumirem.
   */
  function studyOrder() {
    const pending = topicList.slice();
    const done = new Set();
    const out = [];

    let moved = true;
    while (pending.length && moved) {
      moved = false;
      for (let i = 0; i < pending.length; i++) {
        const t = pending[i];
        const ready = t.requires.every((d) => !topicIndex[d] || done.has(d));
        if (ready) {
          out.push(t);
          done.add(t.id);
          pending.splice(i, 1);
          i--;
          moved = true;
        }
      }
    }
    return out.concat(pending);
  }

  /* ---------------- Busca ---------------- */

  function norm(s) {
    return String(s || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /**
   * Busca por nome de tópico e por subtópico. O subtópico entra porque é
   * assim que o aluno pesquisa: ele digita "assíntota", não "funções
   * racionais".
   */
  function search(query, limit) {
    const q = norm(query).trim();
    if (q.length < 2) return [];
    const hits = [];

    topicList.forEach((t) => {
      const name = norm(t.name);
      let score = 0;
      if (name === q) score = 100;
      else if (name.startsWith(q)) score = 80;
      else if (name.includes(q)) score = 60;
      else {
        const subHit = t.sub.find((s) => norm(s).includes(q));
        if (subHit) score = 40;
        else if (norm(t.goal || '').includes(q)) score = 20;
      }
      if (score) hits.push({ topic: t, score });
    });

    hits.sort((a, b) => b.score - a.score || a.topic.name.localeCompare(b.topic.name));
    return hits.slice(0, limit || 20).map((hi) => hi.topic);
  }

  /* ---------------- Contagens ---------------- */

  function stats() {
    let modules = 0, units = 0, sub = 0;
    DISCIPLINES.forEach((d) => {
      modules += (d.modules || []).length;
      (d.modules || []).forEach((m) => { units += (m.units || []).length; });
    });
    topicList.forEach((t) => { sub += t.sub.length; });
    return {
      disciplines: DISCIPLINES.length,
      modules, units,
      topics: topicList.length,
      sub
    };
  }

  CZ.syllabus = {
    DISCIPLINES, register,
    topic, unit, module: moduleOf, discipline,
    allTopics, topicsOfUnit, unitsOfModule, modulesOf,
    topicsOfDiscipline, topicsOfModule, pathOf,
    prereqChain, dependents, unlockedBy, studyOrder,
    search, stats
  };
})(window.CZ);
