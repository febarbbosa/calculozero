/* ==========================================================================
   core/engine.js — as regras de aprendizagem.

   Concentra tudo que é decisão pedagógica: quando um tópico está dominado,
   quando desbloqueia o próximo, quando algo volta para revisão e onde está
   a lacuna que trava o aluno. As telas só perguntam; quem decide é aqui.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { TOPICS, byId, prereqChain } = CZ.curriculum;

  /* ---------------- XP e níveis ---------------- */
  const XP_LESSON = 20;
  const XP_RIGHT = 10;
  const XP_RIGHT_NO_HINT = 5;   // bônus por acertar sem pedir dica

  /** Níveis com custo crescente: 100, 250, 450, 700... */
  function levelInfo(xp) {
    let level = 1, need = 100, acc = 0;
    while (xp >= acc + need) { acc += need; level++; need += 50 * level; }
    return { level, into: xp - acc, need, pct: Math.round(((xp - acc) / need) * 100) };
  }

  /* ---------------- Domínio de um tópico ---------------- */

  /** 0 a 100. Combina aulas concluídas com acerto nos exercícios. */
  function mastery(state, topicId) {
    const t = state.topics[topicId];
    if (!t) return 0;
    const total = CZ.lessons.byTopic(topicId).length || 1;
    const lessonPart = Math.min(1, t.lessonsDone.length / total) * 70;
    const accuracy = t.attempts ? t.correct / t.attempts : 0;
    const exPart = (t.attempts >= 2 ? accuracy : 0) * 30;
    return Math.round(lessonPart + exPart);
  }

  const DONE_AT = 80;
  const REVIEW_BELOW = 55;

  /** Um tópico só abre quando todos os pré-requisitos diretos estão dominados. */
  function isUnlocked(state, topicId) {
    const topic = byId[topicId];
    if (!topic) return false;
    if (topic.requires.length === 0) return true;
    return topic.requires.every((dep) => mastery(state, dep) >= DONE_AT || wasDiagnosedStrong(state, dep));
  }

  /** O diagnóstico pode liberar tópicos que o aluno já domina, para não obrigá-lo a repetir. */
  function wasDiagnosedStrong(state, topicId) {
    const diag = state.diagnostic;
    if (!diag) return false;
    const level = byId[topicId] && byId[topicId].level;
    return diag.scores && diag.scores[level] >= 80;
  }

  function status(state, topicId) {
    const t = state.topics[topicId];
    const m = mastery(state, topicId);
    if (!isUnlocked(state, topicId)) return 'bloqueado';
    if (needsReview(state, topicId)) return 'revisar';
    if (m >= DONE_AT) return 'concluido';
    if (t && (t.lessonsDone.length > 0 || t.attempts > 0)) return 'andamento';
    return 'disponivel';
  }

  const STATUS_LABEL = {
    concluido:  { txt: 'Concluído',  cls: 'ok',   mark: '✓' },
    andamento:  { txt: 'Em andamento', cls: 'pri', mark: '▸' },
    revisar:    { txt: 'Precisa revisar', cls: 'warn', mark: '!' },
    bloqueado:  { txt: 'Bloqueado',  cls: '',     mark: '🔒' },
    disponivel: { txt: 'Disponível', cls: 'pri',  mark: '·' }
  };

  /* ---------------- Repetição espaçada ---------------- */
  const DAY = 86400000;
  const INTERVALS = [1, 3, 7, 16];   // dias, em função de quantas vezes já revisou

  function needsReview(state, topicId) {
    const entry = state.reviewQueue.find((r) => r.topicId === topicId);
    return !!entry && entry.due <= Date.now();
  }

  function dueReviews(state) {
    return state.reviewQueue
      .filter((r) => r.due <= Date.now())
      .map((r) => byId[r.topicId])
      .filter(Boolean);
  }

  function scheduleReview(state, topicId, correct) {
    const i = state.reviewQueue.findIndex((r) => r.topicId === topicId);
    if (!correct) {
      const misses = i > -1 ? state.reviewQueue[i].misses + 1 : 1;
      const entry = { topicId, due: Date.now() + DAY, misses, reps: 0 };
      if (i > -1) state.reviewQueue[i] = entry; else state.reviewQueue.push(entry);
      return;
    }
    if (i > -1) {
      const entry = state.reviewQueue[i];
      const reps = (entry.reps || 0) + 1;
      if (reps >= INTERVALS.length) state.reviewQueue.splice(i, 1);
      else state.reviewQueue[i] = { ...entry, reps, due: Date.now() + INTERVALS[reps] * DAY };
    }
  }

  /* ---------------- Sequência diária ---------------- */
  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  function touchStreak(state) {
    const today = todayKey();
    if (state.streak.lastDay === today) return;
    const yesterday = new Date(Date.now() - DAY);
    const yKey = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;
    state.streak.count = state.streak.lastDay === yKey ? state.streak.count + 1 : 1;
    state.streak.lastDay = today;
    state.streak.days = [...(state.streak.days || []), today].slice(-7);
  }

  /* ---------------- Conquistas ---------------- */
  const ACHIEVEMENTS = [
    { id: 'primeiro-passo', em: '🌱', name: 'Primeiro passo',      test: (s) => totalLessons(s) >= 1 },
    { id: 'sem-medo',       em: '🧭', name: 'Diagnóstico feito',   test: (s) => !!s.diagnostic },
    { id: 'cinco-aulas',    em: '📚', name: '5 aulas concluídas',  test: (s) => totalLessons(s) >= 5 },
    { id: 'chama-3',        em: '🔥', name: '3 dias seguidos',     test: (s) => s.streak.count >= 3 },
    { id: 'chama-7',        em: '⚡', name: '7 dias seguidos',     test: (s) => s.streak.count >= 7 },
    { id: 'mestre-eq',      em: '🏆', name: 'Mestre das equações', test: (s) => mastery(s, 'algebra') >= DONE_AT },
    { id: 'funcoes-ok',     em: '📈', name: 'Funções desbloqueadas', test: (s) => mastery(s, 'funcoes') >= DONE_AT },
    { id: 'primeiro-limite',em: '∞',  name: 'Primeiro limite',     test: (s) => s.topics.limites.lessonsDone.length >= 1 },
    { id: 'derivou',        em: '∂',  name: 'Você derivou',        test: (s) => s.topics.derivadas.lessonsDone.length >= 1 },
    { id: 'integrou',       em: '∫',  name: 'Você integrou',       test: (s) => s.topics.integrais.lessonsDone.length >= 1 },
    { id: 'sem-dica',       em: '🎯', name: '10 acertos diretos',  test: (s) => (s.stats && s.stats.noHint) >= 10 }
  ];

  function totalLessons(state) {
    return Object.values(state.topics).reduce((n, t) => n + t.lessonsDone.length, 0);
  }

  /** Roda os testes e devolve as conquistas recém-desbloqueadas. */
  function checkAchievements(state) {
    const fresh = [];
    ACHIEVEMENTS.forEach((a) => {
      if (!state.achievements.includes(a.id) && a.test(state)) {
        state.achievements.push(a.id);
        fresh.push(a);
      }
    });
    return fresh;
  }

  /* ---------------- Registro de atividade ---------------- */

  function recordAnswer(topicId, correct, usedHint) {
    let fresh = [];
    CZ.store.update((s) => {
      const t = s.topics[topicId];
      if (!t) return;
      t.attempts++;
      if (correct) t.correct++;
      t.mastery = mastery(s, topicId);
      s.stats = s.stats || { noHint: 0 };
      if (correct) {
        s.xp += XP_RIGHT + (usedHint ? 0 : XP_RIGHT_NO_HINT);
        if (!usedHint) s.stats.noHint++;
      }
      scheduleReview(s, topicId, correct);
      touchStreak(s);
      fresh = checkAchievements(s);
    });
    return fresh;
  }

  function completeLesson(topicId, lessonId) {
    let fresh = [];
    CZ.store.update((s) => {
      const t = s.topics[topicId];
      if (!t.lessonsDone.includes(lessonId)) {
        t.lessonsDone.push(lessonId);
        s.xp += XP_LESSON;
      }
      t.mastery = mastery(s, topicId);
      touchStreak(s);
      fresh = checkAchievements(s);
    });
    return fresh;
  }

  /* ---------------- Progresso geral ---------------- */
  function overallProgress(state) {
    const sum = TOPICS.reduce((acc, t) => acc + mastery(state, t.id), 0);
    return Math.round(sum / TOPICS.length);
  }

  function nextUp(state) {
    const review = dueReviews(state)[0];
    if (review) return { topic: review, reason: 'revisar' };
    for (const t of TOPICS) {
      const st = status(state, t.id);
      if (st === 'andamento' || st === 'disponivel') return { topic: t, reason: st };
    }
    return null;
  }

  /** Próxima aula não concluída dentro de um tópico. */
  function nextLesson(state, topicId) {
    const list = CZ.lessons.byTopic(topicId);
    const done = state.topics[topicId].lessonsDone;
    return list.find((l) => !done.includes(l.id)) || list[0] || null;
  }

  function firstLockedTopic(state) {
    return TOPICS.find((t) => status(state, t.id) === 'bloqueado') || null;
  }

  /* ---------------- "Estou completamente perdido" ---------------- */

  /**
   * Dado o tópico em que o aluno travou, devolve o pré-requisito mais fraco.
   * É o GPS: em vez de repetir a mesma explicação, volta ao ponto que falta.
   */
  function weakestPrereq(state, topicId) {
    const chain = prereqChain(topicId);
    if (!chain.length) return null;
    let worst = null, worstScore = 101;
    for (const dep of chain) {
      const m = mastery(state, dep);
      const diagOk = wasDiagnosedStrong(state, dep);
      const score = diagOk ? Math.max(m, 80) : m;
      if (score < worstScore) { worstScore = score; worst = dep; }
    }
    return worstScore >= DONE_AT ? null : byId[worst];
  }

  /** Questões de sondagem: uma por pré-requisito, para achar o buraco rápido. */
  function probeQuestions(topicId) {
    const chain = [...CZ.curriculum.prereqChain(topicId), topicId];
    const out = [];
    chain.forEach((dep) => {
      const t = byId[dep];
      if (!t) return;
      const q = CZ.diagnosticBank.QUESTIONS.filter((x) => x.level === t.level).sort((a, b) => a.d - b.d)[0];
      if (q && !out.some((o) => o.q.id === q.id)) out.push({ topicId: dep, q });
    });
    return out;
  }

  /* ==================================================================
     Base curricular — domínio por desempenho
     ==================================================================

     A regra da trilha ("70% aulas + 30% acerto") não serve aqui: com 355
     tópicos, a maioria ainda não tem aula, e concluir uma aula não prova
     nada. Nos tópicos do currículo o domínio vem do desempenho.

     Como é calculado:
       · cada exercício da ficha vale um peso conforme o nível — acertar o
         desafio vale quase três vezes um básico;
       · o domínio é o que foi conquistado dividido pelo que a ficha
         oferece, então 100% exige acertar tudo, inclusive o desafio;
       · erros recentes puxam o valor para baixo, para que um tópico
         esquecido não fique verde para sempre;
       · abrir a ficha e concluir a aula ligada dão crédito, mas limitado:
         sozinhos nunca passam de "Familiar".
     ================================================================== */

  const MASTERY_LEVELS = [
    { id: 'nao-iniciado', name: 'Não iniciado', min: 0,  cls: '',     mark: '·',
      blurb: 'Você ainda não abriu este tópico.' },
    { id: 'tentativa',    name: 'Tentativa',    min: 1,  cls: 'warn', mark: '◔',
      blurb: 'Você começou. Ainda é cedo para dizer que assentou.' },
    { id: 'familiar',     name: 'Familiar',     min: 25, cls: 'warn', mark: '◑',
      blurb: 'Você reconhece o assunto, mas escorrega nos detalhes.' },
    { id: 'proficiente',  name: 'Proficiente',  min: 60, cls: 'pri',  mark: '◕',
      blurb: 'Você resolve sozinho. Já dá para seguir para o que vem depois.' },
    { id: 'dominado',     name: 'Dominado',     min: 85, cls: 'ok',   mark: '●',
      blurb: 'Firme, inclusive no difícil. Este tópico não vai te derrubar.' }
  ];

  const UNLOCK_AT = 60;          // "Proficiente" libera o que vem depois
  const LEVEL_WEIGHT = { basico: 1, intermediario: 1.6, avancado: 2.2, desafio: 2.8 };
  const CREDIT_CAP = 40;         // teto de quem só leu e não resolveu nada

  function levelFor(pct) {
    let out = MASTERY_LEVELS[0];
    MASTERY_LEVELS.forEach((l) => { if (pct >= l.min) out = l; });
    return out;
  }

  /** Progresso salvo do tópico, ou null se o aluno nunca tocou nele. */
  function topicProgress(state, topicId) {
    return (state.syllabus && state.syllabus[topicId]) || null;
  }

  /**
   * Crédito por consumo de conteúdo: abrir a ficha e concluir a aula ligada
   * ao tópico. Existe para que um tópico já estudado na trilha não apareça
   * zerado, mas é limitado de propósito — ler não é dominar.
   */
  function readingCredit(state, topicId) {
    const t = CZ.syllabus.topic(topicId);
    const p = topicProgress(state, topicId);
    let credit = 0;
    if (p && p.seen) credit += 10;
    if (t && t.lesson) {
      const trilha = t.track && state.topics[t.track];
      if (trilha && trilha.lessonsDone.includes(t.lesson)) credit += 30;
    }
    return Math.min(CREDIT_CAP, credit);
  }

  /** Peso total que a ficha oferece — o denominador do domínio. */
  function offeredWeight(topicId) {
    if (!CZ.sheets || !CZ.sheets.has(topicId)) return 0;
    const count = CZ.sheets.drillCount(topicId);
    let total = 0;
    for (const lv in LEVEL_WEIGHT) total += (count[lv] || 0) * LEVEL_WEIGHT[lv];
    return total;
  }

  /** 0 a 100. Esta é a medida oficial de domínio na base curricular. */
  function topicMastery(state, topicId) {
    const p = topicProgress(state, topicId);
    const credit = readingCredit(state, topicId);
    if (!p || !p.attempts) return credit;

    const offered = offeredWeight(topicId);

    let earned = 0;
    for (const lv in LEVEL_WEIGHT) {
      const b = p.byLevel[lv];
      if (b) earned += b.c * LEVEL_WEIGHT[lv];
    }

    // Sem ficha registrada não há denominador fixo: cai para a taxa de
    // acerto pura, que é o melhor que dá para afirmar com honestidade.
    let base = offered > 0
      ? Math.min(1, earned / offered)
      : p.correct / p.attempts;

    // Consistência recente: dois erros seguidos derrubam mesmo quem já
    // tinha acertado tudo antes. É o gatilho da revisão espaçada.
    const recent = p.recent.slice(-6);
    if (recent.length >= 3) {
      const acc = recent.filter(Boolean).length / recent.length;
      base *= 0.65 + 0.35 * acc;
    }

    return Math.max(credit, Math.round(base * 100));
  }

  const topicLevel = (state, topicId) => levelFor(topicMastery(state, topicId));

  /**
   * Um tópico abre quando os pré-requisitos diretos chegam a Proficiente.
   *
   * Exceção necessária: pré-requisito que ainda não tem ficha não tranca
   * nada. A base curricular tem muito mais tópicos mapeados do que
   * escritos, e travar o aluno atrás de um tópico sem conteúdo seria
   * transformar o mapa em muro.
   */
  function isTopicUnlocked(state, topicId) {
    const t = CZ.syllabus.topic(topicId);
    if (!t) return false;
    return t.requires.every((dep) => {
      if (!CZ.sheets || !CZ.sheets.has(dep)) return true;
      return topicMastery(state, dep) >= UNLOCK_AT;
    });
  }

  function topicStatus(state, topicId) {
    if (!isTopicUnlocked(state, topicId)) return 'bloqueado';
    const m = topicMastery(state, topicId);
    if (m >= UNLOCK_AT) return 'concluido';
    if (m > 0) return 'andamento';
    return 'disponivel';
  }

  /* ---------------- Rolagem de progresso ---------------- */

  function rollup(state, topics) {
    if (!topics.length) return { pct: 0, dominados: 0, total: 0, comFicha: 0 };
    let soma = 0, dominados = 0, comFicha = 0;
    topics.forEach((t) => {
      const m = topicMastery(state, t.id);
      soma += m;
      if (m >= 85) dominados++;
      if (CZ.sheets && CZ.sheets.has(t.id)) comFicha++;
    });
    return {
      pct: Math.round(soma / topics.length),
      dominados, comFicha, total: topics.length
    };
  }

  const disciplineProgress = (state, id) => rollup(state, CZ.syllabus.topicsOfDiscipline(id));
  const moduleProgress = (state, id) => rollup(state, CZ.syllabus.topicsOfModule(id));
  const unitProgress = (state, id) => rollup(state, CZ.syllabus.topicsOfUnit(id));

  /* ---------------- "Você trava em X porque não domina Y" ---------------- */

  /**
   * O diagnóstico que dá nome ao projeto. Percorre a cadeia inteira de
   * pré-requisitos do tópico e devolve o elo mais fraco que já tem
   * conteúdo — porque mandar o aluno para um tópico vazio não ajuda.
   */
  function topicGap(state, topicId) {
    const chain = CZ.syllabus.prereqChain(topicId);
    let pior = null, piorScore = 101;

    chain.forEach((dep) => {
      if (CZ.sheets && !CZ.sheets.has(dep)) return;
      const m = topicMastery(state, dep);
      if (m < piorScore) { piorScore = m; pior = dep; }
    });

    if (!pior || piorScore >= UNLOCK_AT) return null;

    /* Só é lacuna quando existe evidência: ou o aluno já tentou o
       pré-requisito e vai mal, ou já tentou este tópico e está errando.
       Num progresso zerado tudo vale 0%, e apontar isso como diagnóstico
       seria acusar sem dado — além de aparecer no primeiro tópico que a
       pessoa abre na vida. */
    const noPreReq = topicProgress(state, pior);
    const noAlvo = topicProgress(state, topicId);
    const tentouPreReq = !!(noPreReq && noPreReq.attempts);
    const errandoAqui = !!(noAlvo && noAlvo.attempts >= 2 &&
      noAlvo.correct / noAlvo.attempts < 0.6);
    if (!tentouPreReq && !errandoAqui) return null;

    return {
      topic: CZ.syllabus.topic(pior),
      mastery: piorScore,
      level: levelFor(piorScore),
      alvo: CZ.syllabus.topic(topicId),
      motivo: errandoAqui ? 'errando-aqui' : 'prereq-fraco'
    };
  }

  /**
   * O que estudar agora dentro da base curricular: primeiro o que já foi
   * começado e ainda não fechou, depois o primeiro tópico liberado na
   * ordem topológica. Só considera tópicos com conteúdo escrito.
   */
  function nextTopic(state, disciplineId) {
    const ordem = CZ.syllabus.studyOrder().filter((t) => {
      if (disciplineId && t.discipline !== disciplineId) return false;
      return !CZ.sheets || CZ.sheets.has(t.id);
    });

    const comecados = ordem.filter((t) => {
      const m = topicMastery(state, t.id);
      return m > 0 && m < UNLOCK_AT && isTopicUnlocked(state, t.id);
    });
    if (comecados.length) return { topic: comecados[0], reason: 'andamento' };

    const livres = ordem.filter((t) =>
      topicMastery(state, t.id) === 0 && isTopicUnlocked(state, t.id));
    if (livres.length) return { topic: livres[0], reason: 'novo' };

    const fracos = ordem
      .filter((t) => topicMastery(state, t.id) < 85)
      .sort((a, b) => topicMastery(state, a.id) - topicMastery(state, b.id));
    if (fracos.length) return { topic: fracos[0], reason: 'reforcar' };

    return null;
  }

  /* ---------------- Registro de resposta na base curricular ---------------- */

  const XP_BY_LEVEL = { basico: 8, intermediario: 12, avancado: 18, desafio: 26 };

  /** XP que um exercício vale, para a interface mostrar antes de gravar. */
  const xpFor = (level) => XP_BY_LEVEL[level] || XP_RIGHT;

  /**
   * Grava a resposta de um exercício de ficha. Espelha `recordAnswer`, mas
   * escreve no progresso do currículo e pontua conforme a dificuldade.
   */
  function recordTopicAnswer(topicId, exerciseId, level, correct, usedHint) {
    let fresh = [];
    CZ.store.update((s) => {
      const p = CZ.store.ensureSyllabus(s, topicId);
      const lv = level || 'basico';

      p.attempts++;
      if (correct) p.correct++;
      p.byLevel[lv] = p.byLevel[lv] || { a: 0, c: 0 };
      p.byLevel[lv].a++;
      if (correct) {
        p.byLevel[lv].c++;
        if (exerciseId && !p.done.includes(exerciseId)) p.done.push(exerciseId);
      }
      p.recent = p.recent.concat(!!correct).slice(-10);
      p.lastAt = Date.now();

      s.stats = s.stats || { noHint: 0 };
      if (correct) {
        s.xp += (XP_BY_LEVEL[lv] || 8) + (usedHint ? 0 : XP_RIGHT_NO_HINT);
        if (!usedHint) s.stats.noHint++;
      }

      touchStreak(s);
      fresh = checkAchievements(s);
    });
    return fresh;
  }

  /** Marca que a ficha foi aberta — vale crédito pequeno de leitura. */
  function markTopicSeen(topicId) {
    CZ.store.update((s) => {
      const p = CZ.store.ensureSyllabus(s, topicId);
      if (!p.seen) { p.seen = true; p.lastAt = Date.now(); }
    });
  }

  CZ.engine = {
    XP_LESSON, XP_RIGHT, DONE_AT, REVIEW_BELOW, ACHIEVEMENTS, STATUS_LABEL,
    levelInfo, mastery, isUnlocked, status, needsReview, dueReviews,
    recordAnswer, completeLesson, overallProgress, nextUp, nextLesson,
    firstLockedTopic, weakestPrereq, probeQuestions, totalLessons, touchStreak,
    checkAchievements,

    /* base curricular */
    MASTERY_LEVELS, UNLOCK_AT, LEVEL_WEIGHT,
    levelFor, topicMastery, topicLevel, topicProgress, topicStatus,
    isTopicUnlocked, disciplineProgress, moduleProgress, unitProgress, rollup,
    topicGap, nextTopic, recordTopicAnswer, markTopicSeen, XP_BY_LEVEL, xpFor
  };
})(window.CZ);
