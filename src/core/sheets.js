/* ==========================================================================
   core/sheets.js — fichas de tópico.

   A ficha é o conteúdo profundo de um tópico da base curricular. Ela segue
   sempre a mesma sequência, porque a sequência é o método:

     o que é → por que existe → explicação simples → explicação acadêmica
     → exemplos (básico, intermediário, avançado) → aplicação real
     → fórmulas → erros comuns → dica → exercícios (3 níveis + desafio)
     → revisão → laboratório

   Nem toda ficha preenche tudo. A interface só mostra o que existe, e o
   tópico sem ficha continua navegável pela estrutura — objetivo,
   subtópicos e pré-requisitos já vêm do currículo.

   Os exercícios da ficha moram dentro dela, e não num banco separado: é
   assim que se escreve um tópico novo sem abrir dois arquivos. Este
   registro é que os empurra para `CZ.exercises`, para que o componente
   Exercise continue funcionando sem saber que fichas existem.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const SHEETS = [];
  const byTopic = {};

  /** Ordem em que a interface apresenta os níveis de exercício. */
  const DRILL_LEVELS = [
    { id: 'basico',        name: 'Básico',        blurb: 'Aplicação direta do conceito.' },
    { id: 'intermediario', name: 'Intermediário', blurb: 'Dois passos ou um detalhe que costuma escapar.' },
    { id: 'avancado',      name: 'Avançado',      blurb: 'Combina este tópico com outro que você já viu.' },
    { id: 'desafio',       name: 'Desafio',       blurb: 'Nível de prova difícil. Errar aqui é normal.' }
  ];

  const EXAMPLE_LEVELS = [
    { id: 'basico',        name: 'Exemplo básico' },
    { id: 'intermediario', name: 'Exemplo intermediário' },
    { id: 'avancado',      name: 'Exemplo avançado' }
  ];

  /**
   * Registra as fichas de um arquivo de conteúdo e publica os exercícios
   * delas no banco geral. O `topic` e o `level` de cada exercício são
   * preenchidos aqui para que a ficha não precise repeti-los item a item.
   */
  function register(list) {
    const exercises = [];

    list.forEach((sheet) => {
      if (byTopic[sheet.topic]) {
        console.warn('ficha duplicada para', sheet.topic);
        return;
      }
      SHEETS.push(sheet);
      byTopic[sheet.topic] = sheet;

      const drills = sheet.drills || {};
      DRILL_LEVELS.forEach((lv) => {
        const items = drills[lv.id];
        if (!items) return;
        (Array.isArray(items) ? items : [items]).forEach((ex) => {
          ex.topic = sheet.topic;
          ex.level = lv.id;
          exercises.push(ex);
        });
      });
    });

    if (exercises.length) CZ.exercises.register(exercises);
    return list.length;
  }

  const get = (topicId) => byTopic[topicId] || null;
  const has = (topicId) => !!byTopic[topicId];

  /** Todos os exercícios da ficha, achatados e na ordem dos níveis. */
  function drillsOf(topicId) {
    const sheet = byTopic[topicId];
    if (!sheet || !sheet.drills) return [];
    const out = [];
    DRILL_LEVELS.forEach((lv) => {
      const items = sheet.drills[lv.id];
      if (!items) return;
      (Array.isArray(items) ? items : [items]).forEach((ex) => out.push(ex));
    });
    return out;
  }

  function drillsByLevel(topicId, levelId) {
    const sheet = byTopic[topicId];
    if (!sheet || !sheet.drills || !sheet.drills[levelId]) return [];
    const items = sheet.drills[levelId];
    return Array.isArray(items) ? items : [items];
  }

  /** Quantos exercícios a ficha tem, por nível. Usado no cabeçalho. */
  function drillCount(topicId) {
    const out = {};
    let total = 0;
    DRILL_LEVELS.forEach((lv) => {
      const n = drillsByLevel(topicId, lv.id).length;
      out[lv.id] = n;
      total += n;
    });
    out.total = total;
    return out;
  }

  /**
   * Cobertura da base curricular: quantos tópicos já têm ficha. Aparece no
   * catálogo para que ninguém precise adivinhar o que está pronto.
   */
  function coverage() {
    const all = CZ.syllabus.allTopics();
    const comFicha = all.filter((t) => byTopic[t.id]);
    const porDisciplina = {};
    CZ.syllabus.DISCIPLINES.forEach((d) => {
      const list = CZ.syllabus.topicsOfDiscipline(d.id);
      porDisciplina[d.id] = {
        total: list.length,
        comFicha: list.filter((t) => byTopic[t.id]).length
      };
    });
    return {
      total: all.length,
      comFicha: comFicha.length,
      pct: all.length ? Math.round((comFicha.length / all.length) * 100) : 0,
      porDisciplina
    };
  }

  CZ.sheets = {
    SHEETS, byTopic, register, get, has,
    drillsOf, drillsByLevel, drillCount, coverage,
    DRILL_LEVELS, EXAMPLE_LEVELS
  };
})(window.CZ);
