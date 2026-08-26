/* ==========================================================================
   pages/practice.js — sessão de prática e revisão.

   Serve tanto para treino livre quanto para as revisões agendadas pela
   repetição espaçada. Ordem embaralhada, feedback igual ao da aula.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function render(params) {
    const topic = CZ.curriculum.byId[params.topicId];
    if (!topic) return h('div.wrap', h('div.card', h('h3', 'Tópico não encontrado')));

    const pool = shuffle(CZ.exercises.byTopic(topic.id));
    if (!pool.length) {
      return h('div.wrap', h('div.card',
        h('h3', 'Ainda não há exercícios avulsos aqui'),
        h('p.muted', 'Use as aulas deste tópico — cada uma termina com dois exercícios.'),
        h('div.mt-16', h('button.btn.btn-primary', { onClick: () => CZ.router.go('/mapa') }, 'Ver aulas'))));
    }

    const isReview = CZ.engine.needsReview(CZ.store.get(), topic.id);
    let i = 0, right = 0;
    const body = h('div');
    const counter = h('span.lbl', { style: { fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--ink-2)' } });

    function draw() {
      clear(body);
      counter.textContent = `${i + 1} de ${pool.length}`;
      const ex = pool[i];
      body.appendChild(h('div.card',
        h('div.step-kind', isReview ? 'Revisão' : 'Prática livre'),
        CZ.ui.Exercise(ex, {
          onDone: (ok) => { if (ok) right++; advance(); },
          nextLabel: i === pool.length - 1 ? 'Ver resultado' : 'Próximo'
        })
      ));
      CZ.dom.scrollTop();
    }

    function advance() {
      i++;
      if (i < pool.length) draw();
      else summary();
    }

    function summary() {
      const pct = Math.round((right / pool.length) * 100);
      const st = CZ.store.get();
      const mastery = CZ.engine.mastery(st, topic.id);
      const msg = pct >= 80
        ? 'Esse assunto está firme. Pode seguir em frente com tranquilidade.'
        : pct >= 50
          ? 'Você tem a ideia principal, mas escorrega nos detalhes. Vale revisitar as aulas do tópico.'
          : 'Isso aqui ainda não assentou — e tudo bem. Refazer a aula costuma resolver mais rápido que insistir nos exercícios.';

      clear(body);
      body.appendChild(h('div.card.center',
        h('h2', { style: { margin: '0 0 6px' } }, `${right} de ${pool.length}`),
        h('p.muted', msg),
        h('div', { style: { maxWidth: '320px', margin: '20px auto' } },
          CZ.ui.Bar(mastery, pct >= 80 ? 'ok' : pct >= 50 ? 'warn' : 'err'),
          h('p.dim', { style: { fontSize: '12.5px', marginTop: '8px' } }, `${topic.name}: ${mastery}% de domínio`)),
        h('div.row.gap-10.wrapf', { style: { justifyContent: 'center' } },
          h('button.btn.btn-ghost', { onClick: () => { i = 0; right = 0; draw(); } }, 'Praticar de novo'),
          h('button.btn.btn-primary', { onClick: () => CZ.router.go('/painel') }, 'Voltar ao painel'))
      ));
      CZ.dom.scrollTop();
    }

    draw();

    return h('div.wrap',
      h('div.lesson-shell',
        h('div.lesson-head',
          h('button.btn.btn-sm.btn-quiet', { onClick: () => CZ.router.go('/mapa') }, '← ' + topic.name),
          h('div', { style: { marginLeft: 'auto' } }, counter)),
        h('h2', isReview ? 'Revisão: ' + topic.name : 'Praticar: ' + topic.name),
        h('p.muted', { style: { marginTop: '6px' } },
          isReview
            ? 'Você teve dificuldade com este assunto. Revisar agora, no momento em que a memória começa a falhar, é o que faz o conteúdo grudar.'
            : 'Sem pressa e sem nota. Pedir dica aqui é parte do processo.'),
        h('div.mt-24', body)
      )
    );
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.practice = render;
})(window.CZ);
