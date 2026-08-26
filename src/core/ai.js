/* ==========================================================================
   core/ai.js — o tutor.

   Adaptador com dois provedores por trás da mesma interface:

     local     motor de recuperação sobre o conteúdo que já existe na
               plataforma — aulas, fichas, dicas, armadilhas de erro, grafo
               de pré-requisitos — cruzado com o modelo do aluno. Não é IA
               generativa e não finge ser. Funciona offline e é o padrão.

     remoto    chama um modelo através de um proxy próprio, para pergunta
               aberta que o local não cobre. Opcional.

   CHAVE DE API NÃO ENTRA AQUI
   Este arquivo roda no navegador de qualquer visitante. Colocar uma chave
   nele é publicá-la. Por isso `configurar()` recusa explicitamente qualquer
   coisa com cara de chave, e o provedor remoto só aceita um ENDEREÇO — o do
   seu proxy, que guarda a chave do lado do servidor. O proxy está em
   `api/tutor.js`, com instruções em `api/README.md`.

   POLÍTICA PEDAGÓGICA
   O tutor não entrega resposta de exercício de primeira. Dá dica, pergunta o
   que já foi tentado, e só abre a solução depois. Vale para os dois
   provedores — no remoto, a regra vive no prompt de sistema do servidor,
   fora do alcance do navegador.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  /* ==================================================================
     Glossário — respostas curtas para "o que é X"
     ================================================================== */
  const GLOSSARY = [
    { k: ['função', 'funcao', 'f(x)'], t: 'Função',
      d: 'Uma máquina de número: entra x, sai f(x), sempre pela mesma regra. A exigência é uma só — a mesma entrada nunca pode dar duas saídas.' },
    { k: ['limite', 'lim'], t: 'Limite',
      d: 'Para onde f(x) aponta quando x chega perto de um valor, mesmo que a função não exista exatamente ali. Precisa concordar pelos dois lados.' },
    { k: ['derivada', 'derivar'], t: 'Derivada',
      d: 'A inclinação da curva num ponto exato — a taxa de variação instantânea. Nasce de subida ÷ avanço com o avanço indo a zero.' },
    { k: ['integral', 'integrar', 'antiderivada'], t: 'Integral',
      d: 'Soma de infinitas fatias finas, usada para achar área. E é o inverso da derivada: integrar é perguntar "de quem isso é derivada?".' },
    { k: ['vetor'], t: 'Vetor',
      d: 'Um número que precisa de direção para significar algo. Carrega três coisas: módulo (tamanho), direção (a reta) e sentido (para que lado).' },
    { k: ['módulo', 'modulo', 'norma'], t: 'Módulo',
      d: 'O comprimento do vetor. Sai de Pitágoras: |v| = √(a² + b² + c²). O sinal das componentes some ao elevar ao quadrado.' },
    { k: ['versor', 'unitário', 'unitario'], t: 'Versor',
      d: 'O vetor dividido pelo próprio módulo. Mantém o rumo e passa a medir exatamente 1. Serve quando você quer só a direção.' },
    { k: ['produto escalar', 'escalar', 'produto interno'], t: 'Produto escalar',
      d: 'Multiplica dois vetores e devolve um NÚMERO. Na prática: multiplique componente a componente e some. Zero significa perpendiculares.' },
    { k: ['produto vetorial', 'vetorial', 'cross'], t: 'Produto vetorial',
      d: 'Multiplica dois vetores e devolve um VETOR perpendicular aos dois. Sai de um determinante, e o módulo dele é a área do paralelogramo.' },
    { k: ['produto misto', 'misto'], t: 'Produto misto',
      d: 'Determinante 3×3 com três vetores nas linhas. O módulo é o volume do paralelepípedo. Zero significa que os três são coplanares.' },
    { k: ['combinação linear', 'combinacao linear'], t: 'Combinação linear',
      d: 'Esticar, encolher ou inverter vetores e somar: w = a·u + b·v. Achar os coeficientes é resolver um sistema.' },
    { k: ['li', 'ld', 'linearmente'], t: 'LI e LD',
      d: 'LD: pelo menos um vetor é combinação dos outros, então sobra gente. LI: todos são necessários. Com a quantidade igual à dimensão, o determinante decide — zero é LD.' },
    { k: ['base', 'gerador', 'gera'], t: 'Base e gerador',
      d: 'Gerador alcança qualquer vetor do espaço. Base é gerador E linearmente independente ao mesmo tempo: o conjunto mínimo que ainda alcança tudo.' },
    { k: ['fração', 'fracao'], t: 'Fração',
      d: 'Uma divisão que ainda não foi feita. Denominador maior significa pedaço menor. Para somar, iguale os denominadores primeiro.' },
    { k: ['fatoração', 'fatoracao', 'fatorar'], t: 'Fatoração',
      d: 'Reescrever uma soma como produto. A mais útil em Cálculo é a diferença de quadrados: a² − b² = (a−b)(a+b). É ela que resolve limite 0/0.' },
    { k: ['logaritmo', 'log', 'ln'], t: 'Logaritmo',
      d: 'O expoente que faltava. log₂ 8 = 3 porque 2³ = 8. E ln é o log de base e — o que mais aparece em Cálculo.' },
    { k: ['vértice', 'vertice'], t: 'Vértice',
      d: 'O ponto de virada da parábola, em x = −b/(2a). É exatamente onde a inclinação é zero — ou seja, onde a derivada zera.' },
    { k: ['determinante', 'det'], t: 'Determinante',
      d: 'Um número extraído de uma matriz quadrada. Em vetores ele decide quase tudo: diferente de zero significa LI, gerador e base.' }
  ];

  /* ==================================================================
     Intenções — cada uma sabe se aceita a pergunta e como responder
     ================================================================== */

  function norm(s) {
    return String(s || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .trim();
  }

  /** Pronomes e muletas que aparecem no meio da frase e quebram o casamento. */
  const FILLER = /\b(eu|voce|vc|tu|agora|entao|ai|ne|por favor|pfv|pf)\b/g;

  function has(q, ...words) {
    const enxuto = q.replace(FILLER, ' ').replace(/\s+/g, ' ').trim();
    return words.some((w) => {
      const k = norm(w);
      return q.includes(k) || enxuto.includes(k);
    });
  }

  /** Estado do aluno resumido para o tutor — usado pelos dois provedores. */
  function studentContext(ctx) {
    const state = CZ.store.get();
    const E = CZ.engine;
    const fracos = CZ.curriculum.TOPICS
      .filter((t) => {
        const st = E.status(state, t.id);
        return st === 'revisar' || (st === 'andamento' && E.mastery(state, t.id) < E.REVIEW_BELOW);
      })
      .map((t) => t.name);
    const next = E.nextUp(state);
    const topicoBase = ctx.syllabusTopic ? CZ.syllabus.topic(ctx.syllabusTopic) : null;
    return {
      topicoBase,
      ficha: topicoBase ? CZ.sheets.get(topicoBase.id) : null,
      perfil: CZ.profile ? CZ.profile.paraTutor() : null,
      nome: state.name || null,
      area: state.area,
      xp: state.xp,
      topicoAtual: ctx.topic ? CZ.curriculum.byId[ctx.topic] : null,
      aulaAtual: ctx.lesson ? CZ.lessons.byId[ctx.lesson] : null,
      passoAtual: ctx.step,
      exercicioAtual: ctx.exercise ? CZ.exercises.byId[ctx.exercise] : null,
      fracos,
      proximo: next ? next.topic.name : null,
      dominio: Object.fromEntries(CZ.curriculum.TOPICS.map((t) => [t.name, E.mastery(state, t.id)]))
    };
  }

  const INTENTS = [
    /* ---- não entendi: puxa a reescrita alternativa do passo atual ---- */
    {
      id: 'nao-entendi',
      test: (q) => has(q, 'nao entendi', 'não entendi', 'nao entendo', 'confuso', 'perdido nisso', 'explica de novo', 'outro jeito', 'mais simples'),
      run: (q, c) => {
        const lesson = c.aulaAtual;
        const step = lesson && typeof c.passoAtual === 'number' ? lesson.steps[c.passoAtual] : null;
        const alt = step && step.alt;
        if (alt) {
          const pick = has(q, 'exemplo', 'dia a dia', 'cotidiano') ? 'cotidiano'
            : has(q, 'visual', 'desenho', 'imagem') ? 'visual'
            : has(q, 'passo') ? 'passos'
            : alt.simples ? 'simples' : Object.keys(alt)[0];
          const txt = alt[pick] || alt[Object.keys(alt)[0]];
          if (txt) {
            return {
              text: txt,
              note: 'Se ainda não fechou, o botão "Não entendi" na aula tem mais versões desta mesma explicação.',
              actions: c.topic ? [{ label: 'Achar o que falta antes', act: 'sos' }] : []
            };
          }
        }
        return {
          text: 'Me diga qual parte travou e eu tento por outro caminho. Se a sensação for de que o problema começou antes deste assunto, dá para sondar seus pré-requisitos e achar o degrau que ficou solto.',
          actions: [{ label: 'Sondar meus pré-requisitos', act: 'sos' }]
        };
      }
    },

    /* ---- por que errei: cruza armadilhas com o histórico ---- */
    {
      id: 'por-que-errei',
      test: (q) => has(q, 'por que errei', 'porque errei', 'errei', 'meu erro', 'onde errei', 'to errando', 'estou errando'),
      run: (q, c) => {
        const ex = c.exercicioAtual;
        if (ex && ex.traps && Object.keys(ex.traps).length) {
          const lista = Object.values(ex.traps).map((t) => `• ${t}`).join('\n');
          return {
            text: `Neste exercício os tropeços mais comuns são:\n\n${lista}\n\nAlgum desses parece o que aconteceu? Se sim, refaça só a partir daquele passo.`
          };
        }
        if (c.fracos.length) {
          return {
            text: `Olhando seu histórico, o assunto que mais está te derrubando é ${c.fracos[0]}. Erro que se repete raramente é distração — costuma ser um conceito anterior que ficou pela metade.`,
            actions: [{ label: `Praticar ${c.fracos[0]}`, act: 'praticar', topic: c.fracos[0] }]
          };
        }
        return { text: 'Me conta o que você respondeu e em que exercício. Com isso eu consigo apontar em qual passo o raciocínio saiu do trilho.' };
      }
    },

    /* ---- como resolvo: devolve as dicas em sequência, nunca a resposta ---- */
    {
      id: 'como-resolvo',
      test: (q) => has(q, 'como resolvo', 'como faço', 'como faco', 'me ajuda', 'nao sei fazer', 'não sei fazer', 'dica', 'travei'),
      run: (q, c) => {
        const ex = c.exercicioAtual;
        if (ex) {
          return {
            text: `Primeira dica: ${ex.hints[0]}\n\nTenta a partir daí antes de olhar mais. Se ainda travar, o botão de dica no próprio exercício abre as seguintes, uma por vez.`,
            note: 'Não vou dar a resposta pronta — a dica só funciona se você tentar entre uma e outra.'
          };
        }
        if (c.topicoAtual) {
          const lesson = CZ.lessons.byTopic(c.topicoAtual.id)[0];
          return {
            text: `Para ${c.topicoAtual.name}, o caminho costuma ser o da aula: entender o gráfico primeiro, decorar a regra depois. Quem inverte isso trava na primeira questão fora do padrão da lista.`,
            actions: lesson ? [{ label: 'Abrir a aula', act: 'aula', id: lesson.id }] : []
          };
        }
        return { text: 'Me diz qual exercício ou assunto e eu te dou o primeiro empurrão.' };
      }
    },

    /* ---- exemplo ---- */
    {
      id: 'exemplo',
      test: (q) => has(q, 'exemplo', 'me mostra', 'como assim', 'na pratica', 'na prática'),
      run: (q, c) => {
        const alvo = c.aulaAtual || (c.topicoAtual && CZ.lessons.byTopic(c.topicoAtual.id)[0]);
        if (alvo) {
          const ex = alvo.steps.find((s) => s.kind === 'exemplo');
          if (ex && ex.html) {
            return { html: ex.html, note: `Exemplo da aula "${alvo.title}".` };
          }
        }
        return { text: 'De qual assunto? Diga o nome (limite, derivada, produto escalar...) e eu puxo o exemplo da aula.' };
      }
    },

    /* ---- o que estudo agora ---- */
    {
      id: 'o-que-estudar',
      test: (q) => has(q, 'o que estudo', 'o que estudar', 'que estudo', 'que estudar', 'devo estudar', 'por onde', 'proximo', 'próxima aula', 'o que faco', 'comeco por onde', 'continuo de onde'),
      run: (q, c) => {
        const state = CZ.store.get();
        const next = CZ.engine.nextUp(state);
        if (!next) return { text: 'Você já percorreu a trilha inteira. Nesse ponto o melhor uso do tempo é prática livre nos assuntos que mais caem na sua prova.' };
        const lesson = CZ.engine.nextLesson(state, next.topic.id);
        const motivo = next.reason === 'revisar'
          ? 'Ele venceu na revisão — você errou por lá e a memória já está começando a apagar.'
          : `Os pré-requisitos dele já estão firmes, então é o próximo degrau natural.`;
        return {
          text: `${next.topic.name}. ${motivo}`,
          actions: lesson ? [
            { label: `Abrir: ${lesson.title}`, act: 'aula', id: lesson.id },
            { label: 'Só praticar', act: 'praticar-id', id: next.topic.id }
          ] : []
        };
      }
    },

    /* ---- como estou indo ---- */
    {
      id: 'progresso',
      test: (q) => has(q, 'como estou', 'meu progresso', 'como vou', 'estou indo', 'meu nivel', 'meu nível'),
      run: (q, c) => {
        const state = CZ.store.get();
        const pct = CZ.engine.overallProgress(state);
        const fortes = CZ.curriculum.TOPICS.filter((t) => CZ.engine.mastery(state, t.id) >= CZ.engine.DONE_AT).map((t) => t.name);
        let txt = `Progresso geral: ${pct}%. `;
        txt += fortes.length ? `Firme em: ${fortes.join(', ')}. ` : 'Ainda sem nenhum tópico fechado. ';
        txt += c.fracos.length ? `Precisa de atenção: ${c.fracos.join(', ')}.` : 'Nada pendente de revisão.';
        return { text: txt };
      }
    },

    /* ---- o que é X ---- */
    {
      id: 'glossario',
      test: (q) => has(q, 'o que e', 'o que é', 'que significa', 'define', 'oq e', 'pra que serve', 'para que serve') ||
                   GLOSSARY.some((g) => g.k.some((k) => q.includes(norm(k)))),
      run: (q) => {
        const hit = GLOSSARY.find((g) => g.k.some((k) => q.includes(norm(k))));
        if (!hit) {
          return { text: 'Ainda não tenho verbete para isso. Tente com o nome do conceito — limite, derivada, produto escalar, base, versor...' };
        }
        const topico = CZ.curriculum.TOPICS.find((t) =>
          CZ.lessons.byTopic(t.id).some((l) => norm(l.title).includes(norm(hit.t))));
        const lesson = topico ? CZ.lessons.byTopic(topico.id)[0] : null;
        return {
          text: `**${hit.t}** — ${hit.d}`,
          actions: lesson ? [{ label: `Ver a aula de ${topico.name}`, act: 'aula', id: lesson.id }] : []
        };
      }
    }
  ];

  /* ==================================================================
     Provedor local
     ================================================================== */
  function askLocal(question, ctx) {
    const q = norm(question);
    const c = studentContext(ctx);

    for (const intent of INTENTS) {
      if (intent.test(q)) {
        const res = intent.run(q, c);
        return Promise.resolve({ ...res, provider: 'local', intent: intent.id });
      }
    }

    // sem intenção reconhecida: diz o que sabe fazer, sem inventar resposta
    return Promise.resolve({
      provider: 'local',
      intent: 'fallback',
      text: 'Não peguei essa. Eu funciono melhor com perguntas assim:',
      suggestions: [
        'O que é produto escalar?',
        'O que eu estudo agora?',
        'Não entendi essa parte',
        'Por que eu errei isso?',
        'Como estou indo?'
      ]
    });
  }

  /* ==================================================================
     Configuração do provedor remoto

     O que fica guardado é um ENDEREÇO, não um segredo. O endereço do seu
     proxy pode ser público sem problema — quem guarda a chave é ele.
     ================================================================== */

  const PADRAO = { endpoint: '', ligado: false };

  function config() {
    const s = CZ.store.get();
    return { ...PADRAO, ...(s.tutor || {}) };
  }

  /** Reconhece o formato de chave da Anthropic antes que ela seja salva. */
  const PARECE_CHAVE = /^sk-ant-|^sk-[A-Za-z0-9_-]{20,}/;

  /**
   * Guarda o endereço do proxy. Recusa qualquer coisa que pareça chave: se
   * alguém colar a chave aqui por engano, ela iria para o localStorage e
   * para dentro de requisições feitas pelo navegador.
   */
  function configurar(valor) {
    const v = String(valor || '').trim();

    if (PARECE_CHAVE.test(v)) {
      return {
        ok: false,
        erro: 'Isso é uma chave de API, e ela não pode ficar no navegador — qualquer visitante leria. ' +
              'Cole aqui o ENDEREÇO do seu proxy (algo como https://seu-proxy.vercel.app/api/tutor). ' +
              'A chave vai no servidor, como variável de ambiente. Veja api/README.md.'
      };
    }

    if (!v) {
      CZ.store.update((s) => { s.tutor = { ...PADRAO }; });
      return { ok: true, ligado: false };
    }

    let url;
    try { url = new URL(v); } catch (_) {
      return { ok: false, erro: 'Endereço inválido. Precisa começar com https://' };
    }
    if (url.protocol !== 'https:' && url.hostname !== 'localhost') {
      return { ok: false, erro: 'Use https:// — o único endereço sem TLS aceito é localhost, para teste.' };
    }

    CZ.store.update((s) => { s.tutor = { endpoint: url.toString(), ligado: true }; });
    estadoRemoto = 'desconhecido';
    return { ok: true, ligado: true, endpoint: url.toString() };
  }

  /* ==================================================================
     Provedor remoto
     ================================================================== */

  let estadoRemoto = 'desconhecido';   // desconhecido | ok | fora
  let ultimoErro = null;

  /** O que o proxy recebe. Só dado de estudo — nada de identificação. */
  function contextoParaProxy(c) {
    const perfil = c.perfil || {};
    return {
      topico: c.topicoBase ? c.topicoBase.name : (c.topicoAtual ? c.topicoAtual.name : null),
      aula: c.aulaAtual ? c.aulaAtual.title : null,
      passo: c.aulaAtual && typeof c.passoAtual === 'number'
        ? (c.aulaAtual.steps[c.passoAtual] || {}).kind : null,
      exercicio: c.exercicioAtual ? c.exercicioAtual.prompt : null,
      area_do_curso: c.area,
      dominio_geral: CZ.engine.overallProgress(CZ.store.get()),
      assuntos_fracos: c.fracos,
      proximo_sugerido: c.proximo,
      lente_que_funciona: perfil.lente_que_funciona || null,
      ritmo: perfil.ritmo || null,
      apoio: perfil.apoio || null,
      risco_de_frustracao: perfil.risco_de_frustracao || null,
      erros_seguidos_agora: perfil.erros_seguidos_agora || 0,
      assuntos_que_voltam_a_falhar: perfil.assuntos_que_voltam_a_falhar || []
    };
  }

  /**
   * Consome o SSE do proxy. `onDelta` recebe cada pedaço conforme chega —
   * é isso que faz o tutor parecer conversa em vez de formulário.
   */
  async function askRemote(question, ctx, onDelta) {
    const cfg = config();
    if (!cfg.ligado || !cfg.endpoint) throw new Error('remoto não configurado');

    const c = studentContext(ctx);
    const resp = await fetch(cfg.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pergunta: question,
        contexto: contextoParaProxy(c),
        historico: (ctx.historico || []).slice(-6)
      })
    });

    if (!resp.ok) {
      let detalhe = 'HTTP ' + resp.status;
      try { const j = await resp.json(); if (j && j.erro) detalhe = j.erro; } catch (_) {}
      throw new Error(detalhe);
    }
    if (!resp.body) throw new Error('sem corpo na resposta');

    const leitor = resp.body.getReader();
    const dec = new TextDecoder();
    let buffer = '';
    let texto = '';
    let meta = null;
    let erroDoServidor = null;

    while (true) {
      const { value, done } = await leitor.read();
      if (done) break;
      buffer += dec.decode(value, { stream: true });

      // SSE separa eventos por linha em branco
      let corte;
      while ((corte = buffer.indexOf('\n\n')) >= 0) {
        const bruto = buffer.slice(0, corte);
        buffer = buffer.slice(corte + 2);

        let evento = 'message', dados = '';
        bruto.split('\n').forEach((linha) => {
          if (linha.startsWith('event:')) evento = linha.slice(6).trim();
          else if (linha.startsWith('data:')) dados += linha.slice(5).trim();
        });
        if (!dados) continue;

        let obj;
        try { obj = JSON.parse(dados); } catch (_) { continue; }

        if (evento === 'texto' && obj.t) {
          texto += obj.t;
          if (onDelta) onDelta(obj.t, texto);
        } else if (evento === 'erro') {
          erroDoServidor = obj;
        } else if (evento === 'fim') {
          meta = obj;
        }
      }
    }

    if (erroDoServidor && !texto) throw new Error(erroDoServidor.mensagem || erroDoServidor.erro);
    if (!texto) throw new Error('resposta vazia');

    return {
      provider: 'remoto',
      text: texto,
      note: erroDoServidor ? erroDoServidor.mensagem : null,
      meta
    };
  }

  /* ==================================================================
     Adaptador
     ================================================================== */

  /**
   * Pergunta ao tutor.
   *
   * Ordem: se o remoto está configurado e funcionando, ele responde; em
   * qualquer falha — rede, proxy fora, CORS — cai no local sem avisar o
   * aluno duas vezes. Ninguém fica sem resposta por causa de infra.
   *
   * @param {string} question
   * @param {object} ctx      { topic, lesson, step, exercise, syllabusTopic, historico }
   * @param {function} onDelta  recebe cada pedaço do texto remoto
   */
  async function ask(question, ctx, onDelta) {
    ctx = ctx || {};
    const cfg = config();

    if (cfg.ligado && estadoRemoto !== 'fora') {
      try {
        const out = await askRemote(question, ctx, onDelta);
        estadoRemoto = 'ok';
        ultimoErro = null;
        return out;
      } catch (err) {
        ultimoErro = err && err.message;
        // Só desiste de vez em erro que não é transitório. Rede instável
        // não deve desligar o remoto para o resto da sessão.
        if (/não configurado|403|401/.test(ultimoErro || '')) estadoRemoto = 'fora';
      }
    }

    const local = askLocal(question, ctx);
    if (cfg.ligado && ultimoErro) {
      return local.then((r) => ({
        ...r,
        note: (r.note ? r.note + ' ' : '') +
          `(O tutor remoto não respondeu: ${ultimoErro}. Respondi com o motor local.)`
      }));
    }
    return local;
  }

  function providerLabel() {
    const cfg = config();
    if (!cfg.ligado) return 'motor local';
    if (estadoRemoto === 'ok') return 'modelo remoto';
    if (estadoRemoto === 'fora') return 'motor local (remoto indisponível)';
    return 'motor local';
  }

  function estado() {
    return { ...config(), estadoRemoto, ultimoErro };
  }

  CZ.ai = {
    ask, askLocal, askRemote, providerLabel, configurar, config, estado,
    GLOSSARY, studentContext
  };
})(window.CZ);
