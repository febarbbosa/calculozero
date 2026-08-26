/* ==========================================================================
   core/exams.js — montagem e correção de simulados.

   O simulado declara escopo e plano de prova; aqui ele vira uma lista de
   questões concretas. A montagem é aleatória a cada tentativa, então
   refazer o simulado não devolve a mesma prova — o que importa quando o
   objetivo é medir domínio, não memória da ordem das alternativas.

   Quando não há exercícios suficientes para o plano, o simulado é montado
   com o que existe e a interface avisa. Prova curta é melhor que prova
   inventada.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const EXAMS = (CZ.examBank && CZ.examBank.EXAMS) || [];
  const byId = Object.fromEntries(EXAMS.map((e) => [e.id, e]));

  /** Tópicos cobertos por um escopo de simulado. */
  function topicsInScope(scope) {
    const out = [];
    const push = (list) => list.forEach((t) => { if (!out.includes(t.id)) out.push(t.id); });

    if (scope.discipline) push(CZ.syllabus.topicsOfDiscipline(scope.discipline));
    (scope.disciplines || []).forEach((d) => push(CZ.syllabus.topicsOfDiscipline(d)));
    if (scope.module) push(CZ.syllabus.topicsOfModule(scope.module));
    (scope.modules || []).forEach((m) => push(CZ.syllabus.topicsOfModule(m)));
    (scope.topics || []).forEach((id) => { if (!out.includes(id)) out.push(id); });

    return out.filter((id) => CZ.sheets.has(id));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Banco disponível para um simulado, separado por nível. */
  function pool(exam) {
    const topics = topicsInScope(exam.scope);
    const out = { basico: [], intermediario: [], avancado: [], desafio: [] };
    topics.forEach((id) => {
      CZ.sheets.DRILL_LEVELS.forEach((lv) => {
        CZ.sheets.drillsByLevel(id, lv.id).forEach((ex) => out[lv.id].push(ex));
      });
    });
    return out;
  }

  /**
   * Monta a prova. Espalha as questões entre tópicos diferentes antes de
   * repetir tópico, para que o simulado não vire três perguntas seguidas
   * do mesmo assunto.
   */
  function assemble(examId) {
    const exam = byId[examId];
    if (!exam) return null;

    const banco = pool(exam);
    const escolhidas = [];
    const faltou = {};

    CZ.sheets.DRILL_LEVELS.forEach((lv) => {
      const querem = (exam.blueprint && exam.blueprint[lv.id]) || 0;
      if (!querem) return;

      // agrupa por tópico e vai pegando um de cada, em rodadas
      const porTopico = {};
      shuffle(banco[lv.id]).forEach((ex) => {
        (porTopico[ex.topic] = porTopico[ex.topic] || []).push(ex);
      });
      const filas = shuffle(Object.values(porTopico));

      const pegas = [];
      let rodada = 0;
      while (pegas.length < querem) {
        let achouAlgum = false;
        for (const fila of filas) {
          if (pegas.length >= querem) break;
          if (fila[rodada]) { pegas.push(fila[rodada]); achouAlgum = true; }
        }
        if (!achouAlgum) break;
        rodada++;
      }

      if (pegas.length < querem) faltou[lv.id] = querem - pegas.length;
      escolhidas.push(...pegas);
    });

    return {
      exam,
      questions: escolhidas,
      total: escolhidas.length,
      planejado: Object.values(exam.blueprint || {}).reduce((a, b) => a + b, 0),
      faltou,
      topicos: topicsInScope(exam.scope)
    };
  }

  /** O simulado tem questão suficiente para valer a pena? */
  function available(examId) {
    const exam = byId[examId];
    if (!exam) return false;
    const banco = pool(exam);
    const total = Object.values(banco).reduce((a, l) => a + l.length, 0);
    return total >= 5;
  }

  /** Peso de cada nível na nota — o mesmo do cálculo de domínio. */
  function score(questions, acertos) {
    let ganho = 0, possivel = 0;
    questions.forEach((q, i) => {
      const w = CZ.engine.LEVEL_WEIGHT[q.level] || 1;
      possivel += w;
      if (acertos[i]) ganho += w;
    });
    return possivel ? Math.round((ganho / possivel) * 100) : 0;
  }

  /**
   * Guarda o resultado e devolve o diagnóstico: quais tópicos erraram, na
   * ordem em que devem ser revisados.
   */
  function record(examId, questions, acertos) {
    const nota = score(questions, acertos);
    const errosPorTopico = {};

    questions.forEach((q, i) => {
      if (acertos[i]) return;
      errosPorTopico[q.topic] = (errosPorTopico[q.topic] || 0) + 1;
    });

    CZ.store.update((s) => {
      s.exams = s.exams || {};
      const anterior = s.exams[examId];
      s.exams[examId] = {
        melhor: Math.max(nota, (anterior && anterior.melhor) || 0),
        ultima: nota,
        tentativas: ((anterior && anterior.tentativas) || 0) + 1,
        ultimoAt: Date.now()
      };
      CZ.engine.touchStreak(s);
    });

    const revisar = Object.keys(errosPorTopico)
      .map((id) => ({ topic: CZ.syllabus.topic(id), erros: errosPorTopico[id] }))
      .filter((r) => r.topic)
      .sort((a, b) => b.erros - a.erros);

    return { nota, revisar };
  }

  const get = (id) => byId[id] || null;
  const list = () => EXAMS.slice();

  function forDiscipline(disciplineId) {
    return EXAMS.filter((e) => {
      const s = e.scope || {};
      if (s.discipline === disciplineId) return true;
      if ((s.disciplines || []).includes(disciplineId)) return true;
      const mods = (s.modules || []).concat(s.module ? [s.module] : []);
      return mods.some((m) => {
        const mod = CZ.syllabus.module(m);
        return mod && mod.discipline === disciplineId;
      });
    });
  }

  /** Resultado salvo, se houver. */
  function resultOf(examId) {
    const s = CZ.store.get();
    return (s.exams && s.exams[examId]) || null;
  }

  CZ.exams = { EXAMS, get, list, forDiscipline, assemble, available, score, record, resultOf, topicsInScope };
})(window.CZ);
