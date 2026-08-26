/* ==========================================================================
   core/store.js — estado único da aplicação.

   Fonte de verdade para progresso, XP, sequência e revisões.
   Qualquer tela lê daqui e grava por aqui — nunca guarda estado próprio.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const KEY = 'cz:progress:v1';
  const SCHEMA = 3;

  function blankTopic() {
    return { lessonsDone: [], attempts: 0, correct: 0, mastery: 0, seen: false };
  }

  /**
   * Progresso de um tópico da base curricular. Criado sob demanda: são 355
   * tópicos, e guardar um objeto vazio para cada um só engorda o que vai
   * para o disco.
   *
   * `byLevel` separa acertos por nível de exercício porque o domínio é
   * calculado por desempenho ponderado — acertar o desafio vale mais que
   * acertar o básico. `recent` guarda os últimos resultados para que um
   * tópico esquecido perca domínio em vez de ficar verde para sempre.
   */
  function blankSyllabusTopic() {
    return {
      attempts: 0, correct: 0,
      byLevel: {},                 // { basico: { a, c }, ... }
      done: [],                    // ids de exercício já acertados
      seen: false,                 // a ficha foi aberta
      lastAt: null,
      recent: []                   // últimos resultados, mais novo no fim
    };
  }

  /** Devolve (criando se preciso) o progresso de um tópico do currículo. */
  function ensureSyllabus(state, topicId) {
    state.syllabus = state.syllabus || {};
    if (!state.syllabus[topicId]) state.syllabus[topicId] = blankSyllabusTopic();
    return state.syllabus[topicId];
  }

  function blankState() {
    const topics = {};
    CZ.curriculum.TOPICS.forEach((t) => { topics[t.id] = blankTopic(); });
    return {
      schema: SCHEMA,
      name: '',
      area: 'geral',
      theme: null,
      onboarded: false,
      diagnostic: null,          // { scores: {nivel: 0..100}, ceiling: 'funcoes', at: ts }
      topics,
      xp: 0,
      streak: { count: 0, lastDay: null, days: [] },
      achievements: [],
      reviewQueue: [],           // [{ topicId, due, misses }]
      last: null,                // { topicId, lessonId, stepIndex }
      syllabus: {},              // progresso por tópico da base curricular
      exams: {},                 // { simuladoId: { melhor, tentativas, ultimoAt } }
      profile: null,             // modelo do aluno; criado no primeiro uso
      tutor: null                // { endpoint, ligado } do provedor remoto
    };
  }

  let state = blankState();
  const listeners = new Set();

  /**
   * Migrações encadeadas. Um progresso salvo nunca é descartado por ser
   * antigo: quem já estudou não pode perder o histórico porque a base
   * curricular ganhou uma camada nova.
   */
  const MIGRATIONS = {
    // v1 → v2: entram o progresso por tópico do currículo e os simulados.
    1: (st) => {
      st.syllabus = st.syllabus || {};
      st.exams = st.exams || {};
      st.schema = 2;
      return st;
    },
    // v2 → v3: entra o modelo do aluno (core/profile.js).
    2: (st) => {
      st.profile = st.profile || null;
      st.tutor = st.tutor || null;
      st.schema = 3;
      return st;
    }
  };

  function migrate(loaded) {
    if (!loaded || typeof loaded !== 'object') return null;

    let st = loaded;
    let guard = 0;
    while (st.schema !== SCHEMA && MIGRATIONS[st.schema] && guard++ < 20) {
      st = MIGRATIONS[st.schema](st);
    }
    // versão desconhecida (progresso salvo por uma build mais nova): melhor
    // começar limpo do que ler campos que não existem mais
    if (st.schema !== SCHEMA) return null;

    const fresh = blankState();
    const merged = { ...fresh, ...st };
    merged.topics = { ...fresh.topics, ...(st.topics || {}) };
    // garante que tópicos novos apareçam para quem já tinha progresso salvo
    CZ.curriculum.TOPICS.forEach((t) => {
      if (!merged.topics[t.id]) merged.topics[t.id] = blankTopic();
    });
    merged.streak = { ...fresh.streak, ...(st.streak || {}) };
    merged.syllabus = { ...(st.syllabus || {}) };
    merged.exams = { ...(st.exams || {}) };
    merged.profile = st.profile || null;
    merged.tutor = st.tutor || null;
    return merged;
  }

  async function load() {
    const saved = await CZ.storage.get(KEY);
    const migrated = migrate(saved);
    if (migrated) state = migrated;
    return state;
  }

  async function persist() {
    await CZ.storage.set(KEY, state);
  }

  function get() { return state; }

  /** Aplica uma mutação, salva e avisa quem estiver ouvindo. */
  function update(fn) {
    fn(state);
    persist();
    listeners.forEach((l) => l(state));
    return state;
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  async function reset() {
    state = blankState();
    await CZ.storage.remove(KEY);
    listeners.forEach((l) => l(state));
  }

  CZ.store = { load, get, update, subscribe, reset, blankState, ensureSyllabus };
})(window.CZ);
