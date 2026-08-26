/* ==========================================================================
   core/profile.js — o modelo do aluno.

   Esta é a "IA passiva" da plataforma: ela não conversa e não gera texto.
   Ela observa o que a pessoa faz, infere como ela aprende, e muda o
   comportamento do produto com base nisso.

   O que ela observa:
     · qual lente de explicação foi aberta, e se o exercício seguinte foi
       acertado (é assim que se descobre o que funciona para essa pessoa);
     · quantas dicas são pedidas antes de tentar;
     · quanto tempo cada passo leva;
     · erros seguidos, e em que assunto;
     · a que horas a pessoa estuda, e quando ela desiste no meio.

   O que ela infere: ritmo, quanto apoio a pessoa quer, qual lente explica
   melhor para ela, risco de frustração agora, e quais assuntos voltam a
   falhar.

   Três compromissos de projeto:

   1. TUDO LOCAL. Nenhum evento sai do aparelho. É o mesmo `CZ.storage` do
      resto do progresso.
   2. EXPLICÁVEL. Toda inferência tem `porque` em texto, e a tela de perfil
      mostra isso. Nada de "o algoritmo decidiu".
   3. REVERSÍVEL. Dá para zerar o modelo sem perder o progresso de estudo.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const MAX_EVENTOS = 240;      // teto do histórico; o resto é agregado
  const HORA = 3600000;

  /* ---------------- leitura e escrita do modelo ---------------- */

  function blank() {
    return {
      eventos: [],                 // [{ t, tipo, ...campos }]
      lentes: {},                  // { id: { usos, seguidoAcerto, seguidoErro } }
      dicas: { pedidas: 0, exercicios: 0 },
      tempos: [],                  // segundos por passo, últimos 40
      porHora: new Array(24).fill(0),
      erros: { seguidos: 0, maiorSeguidos: 0, porTopico: {} },
      acertos: 0,
      abandonos: 0,
      sessoes: 0,
      ultimaAt: null,
      desde: Date.now()
    };
  }

  function get() {
    const s = CZ.store.get();
    if (!s.profile) s.profile = blank();
    return s.profile;
  }

  function grava(fn) {
    CZ.store.update((s) => {
      if (!s.profile) s.profile = blank();
      fn(s.profile, s);
      s.profile.ultimaAt = Date.now();
    });
  }

  /** Empilha um evento no histórico, respeitando o teto. */
  function push(p, ev) {
    p.eventos.push({ t: Date.now(), ...ev });
    if (p.eventos.length > MAX_EVENTOS) p.eventos.splice(0, p.eventos.length - MAX_EVENTOS);
  }

  /* ==================================================================
     Registro — chamado pelas telas
     ================================================================== */

  /** Uma lente de explicação foi aberta. */
  function registrarLente(lenteId, ctx) {
    grava((p) => {
      p.lentes[lenteId] = p.lentes[lenteId] || { usos: 0, seguidoAcerto: 0, seguidoErro: 0 };
      p.lentes[lenteId].usos++;
      push(p, { tipo: 'lente', lente: lenteId, topico: (ctx && ctx.topicId) || null });
    });
  }

  /**
   * Uma resposta foi dada. Se houve lente aberta pouco antes, o resultado
   * é creditado a ela — é esse par que permite dizer "analogia funciona
   * para você e formalismo não".
   */
  function registrarResposta(info) {
    grava((p) => {
      const agora = Date.now();
      if (info.correto) {
        p.acertos++;
        p.erros.seguidos = 0;
      } else {
        p.erros.seguidos++;
        p.erros.maiorSeguidos = Math.max(p.erros.maiorSeguidos, p.erros.seguidos);
        if (info.topico) {
          p.erros.porTopico[info.topico] = (p.erros.porTopico[info.topico] || 0) + 1;
        }
      }

      p.dicas.exercicios++;
      p.dicas.pedidas += info.dicas || 0;

      // crédito à última lente aberta nos 6 minutos anteriores
      const recente = [...p.eventos].reverse()
        .find((e) => e.tipo === 'lente' && agora - e.t < 6 * 60000);
      if (recente && p.lentes[recente.lente]) {
        p.lentes[recente.lente][info.correto ? 'seguidoAcerto' : 'seguidoErro']++;
      }

      p.porHora[new Date().getHours()]++;
      push(p, {
        tipo: 'resposta', ok: !!info.correto, dicas: info.dicas || 0,
        topico: info.topico || null, nivel: info.nivel || null
      });
    });
  }

  /** Tempo gasto num passo de aula ou numa ficha, em segundos. */
  function registrarTempo(segundos, ctx) {
    if (!isFinite(segundos) || segundos <= 0 || segundos > 3600) return;
    grava((p) => {
      p.tempos.push(Math.round(segundos));
      if (p.tempos.length > 40) p.tempos.shift();
      push(p, { tipo: 'tempo', s: Math.round(segundos), topico: (ctx && ctx.topicId) || null });
    });
  }

  /** A pessoa abriu algo e saiu sem terminar. */
  function registrarAbandono(ctx) {
    grava((p) => {
      p.abandonos++;
      push(p, { tipo: 'abandono', topico: (ctx && ctx.topicId) || null });
    });
  }

  /** Chamado no boot. Conta sessão nova se passou tempo suficiente. */
  function abrirSessao() {
    grava((p) => {
      const agora = Date.now();
      if (!p.ultimaAt || agora - p.ultimaAt > 30 * 60000) p.sessoes++;
      p.porHora[new Date().getHours()]++;
    });
  }

  /* ==================================================================
     Inferência — cada uma devolve valor + o porquê em texto
     ================================================================== */

  /**
   * Eficácia de uma lente: acertos que vieram depois dela, com correção
   * para pouca amostra. Sem isso, uma lente usada uma vez com acerto
   * dispararia para o topo do ranking.
   */
  function eficaciaDaLente(reg) {
    const n = reg.seguidoAcerto + reg.seguidoErro;
    if (!n) return 0.5;
    return (reg.seguidoAcerto + 1.5) / (n + 3);   // suavização
  }

  /** Ordem em que as lentes devem ser oferecidas a esta pessoa. */
  function ordemDeLentes() {
    const p = get();
    const ids = Object.keys(p.lentes);
    if (ids.length < 2) return null;

    const nota = (id) => {
      const reg = p.lentes[id];
      const n = reg.seguidoAcerto + reg.seguidoErro;
      // usos contam pouco: o que decide é ter funcionado
      return eficaciaDaLente(reg) * 100 + Math.min(10, reg.usos) + (n ? 5 : 0);
    };
    return ids.slice().sort((a, b) => nota(b) - nota(a));
  }

  function lentePreferida() {
    const p = get();
    const ordem = ordemDeLentes();
    if (!ordem) return null;
    const id = ordem[0];
    const reg = p.lentes[id];
    const lente = CZ.explain.porId[id];
    if (!lente || reg.usos < 2) return null;
    const n = reg.seguidoAcerto + reg.seguidoErro;
    return {
      id, nome: lente.nome, icone: lente.icone,
      usos: reg.usos,
      porque: n
        ? `Você abriu "${lente.nome}" ${reg.usos} vezes e acertou o exercício seguinte em ${reg.seguidoAcerto} de ${n}.`
        : `É a lente que você mais abre (${reg.usos} vezes).`
    };
  }

  function ritmo() {
    const p = get();
    if (p.tempos.length < 6) return null;
    const ord = p.tempos.slice().sort((a, b) => a - b);
    const mediana = ord[Math.floor(ord.length / 2)];
    const nome = mediana < 25 ? 'rápido' : mediana > 90 ? 'sem pressa' : 'medido';
    return {
      mediana, nome,
      porque: `Sua mediana é ${mediana}s por passo, medida nas últimas ${p.tempos.length} vezes.`,
      cuidado: nome === 'rápido' && p.acertos && (p.erros.maiorSeguidos >= 3)
        ? 'Rápido demais costuma virar erro de sinal. Vale ler o enunciado duas vezes.'
        : null
    };
  }

  function apoio() {
    const p = get();
    if (p.dicas.exercicios < 5) return null;
    const media = p.dicas.pedidas / p.dicas.exercicios;
    const nome = media >= 1.2 ? 'gosta de andaime' : media <= 0.25 ? 'prefere tentar sozinho' : 'equilibrado';
    return {
      media: Math.round(media * 100) / 100, nome,
      porque: `Você pede ${media.toFixed(2)} dica por exercício, em média.`,
      acao: nome === 'gosta de andaime'
        ? 'Nos exercícios guiados, a primeira dica já vem aberta para você.'
        : nome === 'prefere tentar sozinho'
          ? 'A plataforma para de abrir a primeira dica sozinha nos exercícios guiados.'
          : null
    };
  }

  function melhorHorario() {
    const p = get();
    const total = p.porHora.reduce((a, b) => a + b, 0);
    if (total < 15) return null;
    let melhor = 0;
    p.porHora.forEach((v, i) => { if (v > p.porHora[melhor]) melhor = i; });
    const faixa = melhor < 6 ? 'madrugada' : melhor < 12 ? 'manhã' : melhor < 18 ? 'tarde' : 'noite';
    return {
      hora: melhor, faixa,
      porque: `A maior parte da sua atividade acontece por volta das ${melhor}h.`
    };
  }

  /** Risco de frustração agora — o gatilho da pausa sugerida. */
  function risco() {
    const p = get();
    const seguidos = p.erros.seguidos;
    const ultimos = p.eventos.filter((e) => e.tipo === 'resposta').slice(-8);
    const taxa = ultimos.length >= 5
      ? ultimos.filter((e) => !e.ok).length / ultimos.length
      : 0;

    /* Erros seguidos valem sozinhos. A taxa exige histórico para ser
       confiável, e esperar por ela deixaria passar justamente o começo de
       uma sequência ruim — que é quando avisar ainda ajuda. */
    let nivel = 'ok', porque = 'Nada fora do normal por aqui.';
    if (seguidos >= 4) {
      nivel = 'alto';
      porque = `${seguidos} erros seguidos. Isso quase nunca é falta de capacidade — costuma ser um pré-requisito solto ou cansaço.`;
    } else if (seguidos >= 3) {
      nivel = 'medio';
      porque = 'Três erros seguidos. Antes de insistir, vale trocar o jeito da explicação.';
    } else if (seguidos >= 2 && taxa >= 0.6) {
      nivel = 'medio';
      porque = 'Você errou a maioria das últimas questões. Vale trocar a lente de explicação antes de insistir.';
    } else if (taxa >= 0.7) {
      nivel = 'medio';
      porque = 'A taxa de acerto das últimas questões caiu bastante.';
    }
    return { nivel, seguidos, taxa: Math.round(taxa * 100), porque };
  }

  /** Assuntos que voltam a falhar, do pior para o menos ruim. */
  function fragilidades(limite) {
    const p = get();
    return Object.keys(p.erros.porTopico)
      .map((id) => ({
        id, erros: p.erros.porTopico[id],
        topico: CZ.syllabus.topic(id) || CZ.curriculum.byId[id] || null
      }))
      .filter((f) => f.topico && f.erros >= 2)
      .sort((a, b) => b.erros - a.erros)
      .slice(0, limite || 5);
  }

  /**
   * A recomendação do momento. É o que o painel e o Zero usam para decidir
   * o que dizer sem que a tela precise raciocínar sozinha.
   */
  function sugestao() {
    const r = risco();
    if (r.nivel === 'alto') {
      const frag = fragilidades(1)[0];
      return {
        tom: 'apoio', titulo: 'Pausa vale mais que insistir agora',
        texto: r.porque,
        acao: frag
          ? { rotulo: 'Voltar para ' + frag.topico.name, ir: '/topico/' + frag.id }
          : { rotulo: 'Achar o que falta antes', sos: true }
      };
    }
    if (r.nivel === 'medio') {
      return {
        tom: 'pensando', titulo: 'Talvez seja o jeito da explicação',
        texto: r.porque,
        acao: { rotulo: 'Abrir outras lentes', lente: true }
      };
    }

    const revs = CZ.engine.dueReviews(CZ.store.get());
    if (revs.length) {
      return {
        tom: 'apoio', titulo: 'Tem revisão vencida',
        texto: `${revs.length} ${revs.length === 1 ? 'assunto está' : 'assuntos estão'} no ponto em que a memória começa a apagar. Agora é a hora que rende mais.`,
        acao: { rotulo: 'Revisar ' + revs[0].name, ir: '/praticar/' + revs[0].id }
      };
    }

    const prox = CZ.engine.nextTopic(CZ.store.get());
    if (prox) {
      return {
        tom: 'feliz', titulo: 'Próximo passo',
        texto: `${prox.topic.name} — ${prox.topic.goal}`,
        acao: { rotulo: 'Abrir ' + prox.topic.name, ir: '/topico/' + prox.topic.id }
      };
    }
    return null;
  }

  /**
   * Retrato completo: o que a plataforma acha que sabe sobre esta pessoa.
   * É o que a tela de perfil mostra, para que nada disso seja invisível.
   */
  function retrato() {
    const p = get();
    const respostas = p.eventos.filter((e) => e.tipo === 'resposta').length;
    return {
      maduro: respostas >= 8,
      amostra: { respostas, acertos: p.acertos, sessoes: p.sessoes, desde: p.desde },
      lente: lentePreferida(),
      ritmo: ritmo(),
      apoio: apoio(),
      horario: melhorHorario(),
      risco: risco(),
      fragilidades: fragilidades(5),
      ordemLentes: ordemDeLentes()
    };
  }

  /** Contexto compacto para o tutor — o que o modelo remoto recebe. */
  function paraTutor() {
    const r = retrato();
    return {
      lente_que_funciona: r.lente ? r.lente.nome : null,
      ritmo: r.ritmo ? r.ritmo.nome : null,
      apoio: r.apoio ? r.apoio.nome : null,
      risco_de_frustracao: r.risco.nivel,
      erros_seguidos_agora: r.risco.seguidos,
      assuntos_que_voltam_a_falhar: r.fragilidades.map((f) => f.topico.name)
    };
  }

  /** Zera o modelo sem tocar no progresso de estudo. */
  function esquecer() {
    CZ.store.update((s) => { s.profile = blank(); });
  }

  CZ.profile = {
    blank, get, retrato, paraTutor, sugestao, esquecer,
    registrarLente, registrarResposta, registrarTempo, registrarAbandono, abrirSessao,
    ordemDeLentes, lentePreferida, ritmo, apoio, melhorHorario, risco, fragilidades
  };
})(window.CZ);
