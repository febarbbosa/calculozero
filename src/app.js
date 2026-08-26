/* ==========================================================================
   app.js — montagem da aplicação.

   Monta o shell (topo + área de conteúdo), liga as rotas e hospeda o modo
   "Estou completamente perdido", que é global porque pode ser acionado de
   qualquer lugar.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear, mount } = CZ.dom;

  const root = document.getElementById('app');
  const outlet = h('main');
  let topnav = null;
  let bottomnav = null;

  const NAV = [
    { path: '/painel', label: 'Painel', icon: '◈' },
    { path: '/mapa',   label: 'Mapa',   icon: '⋰' },
    { path: '/base',   label: 'Base',   icon: '⊞' }
  ];

  /* ---------------- Tema ---------------- */
  function applyTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', mode === 'dark' ? '#0D1210' : '#F4F6F3');
  }

  function toggleTheme() {
    const cur = CZ.store.get().theme === 'dark' ? 'light' : 'dark';
    CZ.store.update((st) => { st.theme = cur; });
    applyTheme(cur);
    const btn = root.querySelector('.js-theme');
    if (btn) btn.textContent = cur === 'dark' ? '☾' : '☀';
  }

  /* ---------------- Shell ---------------- */
  function buildShell() {
    const state = CZ.store.get();
    const lvl = CZ.engine.levelInfo(state.xp);

    topnav = h('div.topnav', NAV.map((n) => h('button', {
      'data-on': window.location.hash.startsWith('#' + n.path),
      onClick: () => CZ.router.go(n.path)
    }, n.label)));

    bottomnav = h('nav.bottomnav', { 'aria-label': 'Navegação' },
      h('button', { 'data-on': (window.location.hash || '#/') === '#/',
        onClick: () => CZ.router.go('/') }, h('i', '◐'), h('span', 'Início')),
      NAV.map((n) => h('button', {
        'data-on': window.location.hash.startsWith('#' + n.path),
        onClick: () => CZ.router.go(n.path)
      }, h('i', n.icon), h('span', n.label)))
    );

    const bar = h('header.topbar',
      h('div.wrap',
        h('button.brand', { onClick: () => CZ.router.go('/'), 'aria-label': 'Início' },
          h('span.brand-mark', '∫'),
          h('span', 'Cálculo Zero')),
        topnav,
        h('span.xp-pill', `Nv ${lvl.level} · ${state.xp} XP`),
        h('button.icon-btn.js-theme', {
          onClick: toggleTheme,
          'aria-label': 'Alternar tema claro e escuro'
        }, state.theme === 'dark' ? '☾' : '☀')
      )
    );

    clear(root);
    root.appendChild(bar);
    root.appendChild(outlet);
    root.appendChild(bottomnav);
    root.appendChild(sosButton());
    root.appendChild(CZ.tutor.fab());
  }

  function syncNav() {
    if (!topnav) return;
    const state = CZ.store.get();
    const lvl = CZ.engine.levelInfo(state.xp);
    const pill = root.querySelector('.xp-pill');
    if (pill) pill.textContent = `Nv ${lvl.level} · ${state.xp} XP`;
    const hash = window.location.hash || '#/';
    Array.from(topnav.children).forEach((btn, i) => {
      btn.dataset.on = String(hash.startsWith('#' + NAV[i].path));
    });
    if (bottomnav) {
      const paths = ['/', ...NAV.map((n) => n.path)];
      Array.from(bottomnav.children).forEach((btn, i) => {
        btn.dataset.on = String(i === 0 ? hash === '#/' : hash.startsWith('#' + paths[i]));
      });
    }
  }

  /* ---------------- Modo "Estou completamente perdido" ---------------- */
  function sosButton() {
    return h('button.sos-fab', {
      onClick: () => openSOS(null),
      'aria-label': 'Estou completamente perdido'
    }, '🆘 Estou perdido');
  }

  /**
   * Mini diagnóstico de emergência.
   * Em vez de repetir a explicação que não funcionou, sonda os
   * pré-requisitos e aponta o degrau que está faltando.
   */
  function openSOS(topicId) {
    const state = CZ.store.get();
    const guessed = topicId
      || (CZ.engine.nextUp(state) && CZ.engine.nextUp(state).topic.id)
      || 'aritmetica';

    const probes = CZ.engine.probeQuestions(guessed);
    const answers = {};
    let i = 0;

    const body = h('div');
    const dialog = CZ.ui.modal('Vamos achar onde está o problema', body);

    function intro() {
      clear(body);
      body.appendChild(h('div',
        h('p', { style: { fontSize: '15px' } },
          'Travar quase nunca é falta de capacidade. Costuma ser um degrau anterior que ficou solto.'),
        h('p.muted', { style: { fontSize: '14.5px' } },
          `Vou fazer ${probes.length} ${probes.length === 1 ? 'pergunta rápida' : 'perguntas rápidas'} sobre os assuntos que sustentam ${CZ.curriculum.byId[guessed].name}. Nada disso vale nota.`),
        h('div.mt-24',
          h('button.btn.btn-primary.btn-block', { onClick: ask }, 'Vamos lá'))
      ));
    }

    function ask() {
      if (i >= probes.length) return verdict();
      const { topicId: tid, q } = probes[i];
      clear(body);
      const nodes = [];
      let locked = false;

      body.appendChild(h('div',
        h('div.diag-progress', h('span.lbl', `${i + 1}/${probes.length}`), CZ.ui.Bar((i / probes.length) * 100)),
        h('div.q-prompt', { style: { fontSize: '20px' }, html: q.prompt }),
        h('div.opts', q.opts.map((o, k) => {
          const b = h('button.opt', { onClick: () => pick(k) },
            h('span.key', String.fromCharCode(65 + k)), h('span', o));
          nodes.push(b);
          return b;
        })),
        h('div.diag-skip',
          h('button.btn.btn-quiet.btn-sm', { onClick: () => { answers[tid] = false; i++; ask(); } },
            'Não sei essa'))
      ));

      function pick(k) {
        if (locked) return;
        locked = true;
        const ok = k === q.answer;
        answers[tid] = ok;
        nodes.forEach((n, idx) => {
          if (idx === q.answer) n.dataset.state = 'right';
          else if (idx === k && !ok) n.dataset.state = 'wrong';
        });
        setTimeout(() => { i++; ask(); }, 700);
      }
    }

    function verdict() {
      // primeiro pré-requisito errado na ordem da trilha é o degrau que falta
      const gapId = probes.map((p) => p.topicId).find((tid) => answers[tid] === false);
      clear(body);

      if (!gapId) {
        body.appendChild(h('div',
          h('p', { style: { fontSize: '15px' } },
            'Sua base está firme — o problema é o assunto atual mesmo, não algo anterior.'),
          h('p.muted', { style: { fontSize: '14.5px' } },
            'Nesse caso o caminho é diferente: refaça a aula usando o botão "Não entendi" e peça a explicação visual ou o passo a passo. Explicações diferentes pegam pessoas diferentes.'),
          h('div.mt-24',
            h('button.btn.btn-primary.btn-block', { onClick: dialog.close }, 'Voltar para a aula'))
        ));
        return;
      }

      const gap = CZ.curriculum.byId[gapId];
      const lesson = CZ.engine.nextLesson(CZ.store.get(), gapId);
      const alvo = CZ.curriculum.byId[guessed];

      body.appendChild(h('div',
        h('div.card', { style: { background: 'var(--warn-soft)', border: 0 } },
          h('h3', { style: { color: 'var(--warn)' } }, 'Encontrei'),
          h('p', { style: { margin: '8px 0 0', fontSize: '15px' } },
            `Parece que o problema não é ${alvo.name}. É ${gap.name}.`)),
        h('p.mt-16', { style: { fontSize: '15px' } },
          `Sem ${gap.name} firme, ${alvo.name} vira decoreba — você consegue seguir o passo a passo mas não entende por que funciona. Vamos fortalecer isso primeiro.`),
        h('div.row.gap-10.mt-24.wrapf',
          lesson ? h('button.btn.btn-primary.grow', {
            onClick: () => { dialog.close(); CZ.router.go(`/aula/${lesson.id}`); }
          }, `Revisar ${gap.name}`) : null,
          h('button.btn.btn-ghost', {
            onClick: () => { dialog.close(); CZ.router.go(`/praticar/${gapId}`); }
          }, 'Só praticar')
        )
      ));
    }

    intro();
  }

  /* ---------------- Rotas ---------------- */
  function show(node, ctx) {
    mount(outlet, node);
    syncNav();
    CZ.tutor.setContext(ctx || {});
  }

  /** Redesenha a rota atual — usado quando o estado muda fora de uma navegação. */
  function refresh() {
    CZ.router.go((window.location.hash || '#/').replace(/^#/, '') || '/');
  }

  function requireOnboarding(fn) {
    return (params) => {
      const state = CZ.store.get();
      if (!state.onboarded && !state.diagnostic) return CZ.router.go('/diagnostico');
      fn(params);
    };
  }

  async function boot() {
    await CZ.store.load();
    CZ.profile.abrirSessao();

    // tema salvo, ou o do sistema na primeira visita
    const saved = CZ.store.get().theme;
    if (!saved) {
      const prefereEscuro = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      CZ.store.update((st) => { st.theme = prefereEscuro ? 'dark' : 'light'; });
    }
    applyTheme(CZ.store.get().theme);

    buildShell();

    CZ.router.on('/',            () => show(CZ.pages.landing(CZ.store.get())));
    CZ.router.on('/diagnostico', () => show(CZ.pages.diagnostic()));
    CZ.router.on('/painel',      requireOnboarding(() => show(CZ.pages.dashboard(CZ.store.get()))));
    CZ.router.on('/mapa',        () => show(CZ.pages.map(CZ.store.get())));
    CZ.router.on('/aula/:lessonId', (p) => {
      const l = CZ.lessons.byId[p.lessonId];
      show(CZ.pages.lesson(p), l ? { topic: l.topic, lesson: l.id, step: 0 } : {});
    });
    CZ.router.on('/praticar/:topicId', (p) => show(CZ.pages.practice(p), { topic: p.topicId }));

    /* base curricular: catálogo, disciplina, ficha, laboratório e simulado */
    CZ.router.on('/base',               () => show(CZ.pages.catalog(CZ.store.get())));
    CZ.router.on('/base/:disciplineId', (p) => show(CZ.pages.discipline(p), { discipline: p.disciplineId }));
    CZ.router.on('/topico/:topicId',    (p) => show(CZ.pages.topic(p), { syllabusTopic: p.topicId }));
    CZ.router.on('/lab/:labId',         (p) => show(CZ.pages.lab(p)));
    CZ.router.on('/simulado/:examId',   (p) => show(CZ.pages.exam(p)));
    CZ.router.on('/perfil',             () => show(CZ.pages.perfil()));

    CZ.router.start(() => CZ.router.go('/'));

    // o topo reflete XP e nível em tempo real
    CZ.store.subscribe(syncNav);
  }

  CZ.app = { boot, openSOS, refresh, show, applyTheme, toggleTheme };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window.CZ);
