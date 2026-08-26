/* ==========================================================================
   pages/map.js — a senda.

   O mapa deixou de ser lista e virou caminho. O zigue-zague não é enfeite:
   ele responde de relance a pergunta que uma lista vertical não responde —
   "onde eu estou agora e o que vem logo depois". O nó atual pulsa, os
   anteriores estão fechados, os seguintes estão apagados, e a distância
   entre você e o próximo assunto é literalmente uma distância na tela.

   Cada trilha ganha cor própria. É o que permite reconhecer, sem ler, se
   você está no ramo de cálculo ou no de vetores.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h } = CZ.dom;
  const E = CZ.engine;

  const COR_TRILHA = { calculo: 'var(--d7)', vetores: 'var(--d12)' };

  /* Marca de cada estado no nó. Ícone, não texto: o nó é pequeno. */
  const MARCA = {
    concluido: '★', andamento: '▸', revisar: '↻', bloqueado: '🔒', disponivel: '●'
  };

  function render(state) {
    /* ---------------- folha do tópico ---------------- */
    function abrirTopico(topic) {
      const lessons = CZ.lessons.byTopic(topic.id);
      const done = state.topics[topic.id].lessonsDone;
      const m = E.mastery(state, topic.id);
      let dialog;

      dialog = CZ.ui.modal(topic.name,
        h('div',
          h('div.zero-fala.mb-16',
            CZ.mascote.draw(m >= E.DONE_AT ? 'comemora' : m > 0 ? 'feliz' : 'curioso', { tamanho: 56 }),
            h('div.balao', h('p', m >= E.DONE_AT
              ? 'Esse aqui você já fechou. Refazer uma aula nunca é desperdício.'
              : m > 0
                ? `Você está em ${m}% de domínio. Continua de onde parou.`
                : topic.desc))),

          h('div.mt-16', lessons.map((l, i) => {
            const isDone = done.includes(l.id);
            return h('button.aula-linha', { 'data-feita': isDone,
              onClick: () => { dialog.close(); CZ.router.go(`/aula/${l.id}`); }
            },
              h('span.n', isDone ? '★' : String(i + 1).padStart(2, '0')),
              h('span.body',
                h('b', l.title),
                h('span', l.why)),
              h('span.go', '›'));
          })),

          h('div.mt-16',
            h('button.btn.btn-ghost.btn-block', {
              onClick: () => { dialog.close(); CZ.router.go(`/praticar/${topic.id}`); }
            }, 'Praticar exercícios deste tópico'))
        )
      );
    }

    /* ---------------- um nó da senda ---------------- */
    function no(topic, indice, atual, cor) {
      const st = E.status(state, topic.id);
      const m = E.mastery(state, topic.id);
      const bloqueado = st === 'bloqueado';
      const feito = st === 'concluido';

      const corNo = bloqueado ? null
        : feito ? 'var(--ok)'
        : st === 'revisar' ? 'var(--signal)'
        : cor;

      const btn = h('button.senda-btn', {
        disabled: bloqueado,
        style: corNo ? { '--no-cor': corNo, '--no-sombra': `color-mix(in srgb, ${corNo} 62%, #000)` } : null,
        'aria-label': topic.name + ' — ' + E.STATUS_LABEL[st].txt,
        onClick: () => !bloqueado && abrirTopico(topic)
      }, feito ? MARCA.concluido : bloqueado ? MARCA.bloqueado : topic.icon);

      /* anel de progresso: só aparece quando há progresso parcial */
      const anel = (!bloqueado && m > 0 && m < E.DONE_AT)
        ? h('svg.anel', { width: 86, height: 78, viewBox: '0 0 86 78', 'aria-hidden': 'true' },
            h('circle', { cx: 43, cy: 39, r: 40, fill: 'none',
              stroke: 'var(--line)', 'stroke-width': 5 }),
            h('circle', { cx: 43, cy: 39, r: 40, fill: 'none',
              stroke: corNo, 'stroke-width': 5, 'stroke-linecap': 'round',
              'stroke-dasharray': `${(m / 100) * 251} 251`,
              transform: 'rotate(-90 43 39)' }))
        : null;

      return h('div.senda-no', {
        'data-desloc': indice % 8, 'data-status': st, 'data-atual': atual
      },
        atual ? h('span.senda-agora', 'você está aqui') : null,
        anel, btn,
        h('div.rot', topic.name));
    }

    /* ---------------- uma trilha ---------------- */
    function trilha(track) {
      const topics = CZ.curriculum.byTrack(track.id);
      const feitos = topics.filter((t) => E.status(state, t.id) === 'concluido').length;
      const pct = Math.round((topics.reduce((a, t) => a + E.mastery(state, t.id), 0) / topics.length));
      const cor = COR_TRILHA[track.id] || 'var(--accent)';

      /* "atual" é o primeiro que ainda não fechou e está aberto */
      const atualId = (topics.find((t) => {
        const st = E.status(state, t.id);
        return st === 'andamento' || st === 'revisar' || st === 'disponivel';
      }) || {}).id;

      return h('section.senda-secao',
        h('div.senda-cab', { style: { '--secao-cor': cor } },
          h('span.ico', track.id === 'vetores' ? '⟨⟩' : '∫'),
          h('div',
            h('div.nm', track.name),
            h('div.sub', track.blurb)),
          h('span.pct', `${feitos}/${topics.length}`)),
        h('div.senda-passos', topics.map((t, i) => no(t, i, t.id === atualId, cor))),
        h('div.senda-rodape',
          CZ.ui.Bar(pct, pct >= 80 ? 'ok' : null),
          h('span', `${pct}% da trilha`))
      );
    }

    const progress = E.overallProgress(state);
    const proximo = E.nextUp(state);

    return h('div.wrap',
      h('div.senda-topo',
        CZ.mascote.draw(progress > 60 ? 'comemora' : progress > 0 ? 'feliz' : 'curioso', { tamanho: 78 }),
        h('div',
          h('p.eyebrow', 'Mapa de aprendizado'),
          h('h2', { style: { margin: '6px 0 6px' } }, 'A sua senda'),
          h('p.muted', { style: { fontSize: '14.5px', margin: 0 } },
            proximo
              ? `Próxima parada: ${proximo.topic.name}.`
              : 'Você percorreu as duas trilhas inteiras.'))),

      h('div.card.mt-16',
        h('div.row.gap-14.wrapf',
          h('div.grow', CZ.ui.Bar(progress, progress >= 80 ? 'ok' : null, true)),
          h('span', { style: { fontFamily: 'var(--mono)', fontWeight: '700' } }, progress + '%'))),

      h('div.senda.mt-24', CZ.curriculum.TRACKS.map(trilha)),

      h('div.card.mt-24', { style: { background: 'var(--surface-2)', border: 0 } },
        h('div.zero-fala',
          CZ.mascote.draw('pensando', { tamanho: 56 }),
          h('div.balao',
            h('p', 'Um assunto abre quando os anteriores chegam a 80% de domínio. Não é para te prender: é porque tentar derivada sem função é exatamente o que faz gente boa achar que é ruim em matemática.')))),

      h('div.card.mt-16',
        h('h4', 'Quer o mapa completo?'),
        h('p.muted', { style: { fontSize: '14px', margin: '8px 0 14px' } },
          'A senda acima é o caminho guiado. A base curricular tem as 12 disciplinas inteiras, com 355 tópicos e o grafo de pré-requisitos completo.'),
        h('button.btn.btn-ghost', { onClick: () => CZ.router.go('/base') }, 'Abrir a base curricular'))
    );
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.map = render;
})(window.CZ);
