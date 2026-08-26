/* ==========================================================================
   pages/catalog.js — o catálogo da base curricular.

   Duas telas no mesmo arquivo porque compartilham quase tudo: a lista de
   disciplinas e a árvore de uma disciplina.

   Decisão de interface: o tópico sem ficha aparece do mesmo jeito, com o
   objetivo e os subtópicos visíveis, marcado como "mapeado". Esconder o
   que ainda não foi escrito faria o mapa mentir sobre o tamanho do
   caminho.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;
  const E = CZ.engine;
  const S = CZ.syllabus;

  /* ---------------- peças reaproveitadas ---------------- */

  /** Selo de nível de domínio de um tópico. */
  function selo(state, topicId) {
    const pct = E.topicMastery(state, topicId);
    const nivel = E.levelFor(pct);
    return h('span.selo', { 'data-level': nivel.id, title: `${nivel.name} · ${pct}%` },
      h('i', nivel.mark), nivel.name);
  }

  function linhaTopico(state, t, opts) {
    opts = opts || {};
    const temFicha = CZ.sheets.has(t.id);
    const bloqueado = temFicha && !E.isTopicUnlocked(state, t.id);
    const pct = E.topicMastery(state, t.id);

    return h('button.topic-row', {
      'data-locked': bloqueado, 'data-empty': !temFicha,
      onClick: () => CZ.router.go('/topico/' + t.id)
    },
      h('div.topic-row-main',
        h('div.topic-row-head',
          h('span.nm', t.name),
          temFicha ? selo(state, t.id) : h('span.selo', { 'data-level': 'mapeado' }, h('i', '○'), 'mapeado')
        ),
        h('div.topic-row-goal', t.goal),
        t.sub.length ? h('div.topic-row-sub', t.sub.slice(0, 5).map((s) =>
          h('span.subchip', s)).concat(t.sub.length > 5 ? [h('span.subchip.more', `+${t.sub.length - 5}`)] : [])) : null,
        temFicha && pct > 0 ? CZ.ui.Bar(pct, pct >= 85 ? 'ok' : pct >= 60 ? null : 'warn') : null
      ),
      opts.arrow === false ? null : h('span.topic-row-go', '›')
    );
  }

  /* ---------------- tela 1: lista de disciplinas ---------------- */

  function renderIndex(state) {
    const cob = CZ.sheets.coverage();
    const st = S.stats();

    const busca = h('input.answer-input.busca', {
      type: 'search', placeholder: 'buscar tópico ou subtópico… ex: assíntota, Bayes, versor',
      'aria-label': 'Buscar na base curricular',
      onInput: (e) => desenharBusca(e.target.value)
    });
    const resultados = h('div.mt-16');

    function desenharBusca(q) {
      clear(resultados);
      const achados = S.search(q, 12);
      if (!q || q.trim().length < 2) return;
      if (!achados.length) {
        resultados.appendChild(h('p.muted', { style: { fontSize: '14px' } },
          'Nada encontrado. Tente o nome do conceito — "derivada", "quartil", "produto escalar".'));
        return;
      }
      resultados.appendChild(h('div.card.card-pad-sm',
        achados.map((t) => {
          const caminho = S.pathOf(t.id);
          return h('button.search-hit', { onClick: () => CZ.router.go('/topico/' + t.id) },
            h('span.nm', t.name),
            h('span.path', `${caminho.discipline.name} › ${caminho.module.name}`),
            CZ.sheets.has(t.id) ? h('span.chip.ok', 'ficha') : h('span.chip', 'mapeado'));
        })
      ));
    }

    const cards = S.DISCIPLINES.map((d) => {
      const prog = E.disciplineProgress(state, d.id);
      const c = cob.porDisciplina[d.id];
      const preReqs = (d.requires || []).map((r) => S.discipline(r)).filter(Boolean);

      return h('button.disc-card', { onClick: () => CZ.router.go('/base/' + d.id) },
        h('div.disc-ico', d.icon),
        h('div.disc-body',
          h('h3', h('span.disc-n', String(d.n).padStart(2, '0')), d.name),
          h('p.disc-tag', d.tagline),
          CZ.ui.Bar(prog.pct, prog.pct >= 85 ? 'ok' : null),
          h('div.disc-meta',
            h('span', `${prog.total} tópicos`),
            h('span', '·'),
            h('span', `${c.comFicha} com ficha`),
            preReqs.length ? h('span', '·') : null,
            preReqs.length ? h('span', 'depois de ' + preReqs.map((p) => p.name).join(' e ')) : null
          )
        )
      );
    });

    return h('div.wrap',
      h('p.eyebrow', 'Base curricular'),
      h('h2', { style: { margin: '10px 0 8px' } }, 'Do zero até Ciência de Dados'),
      h('p.muted', { style: { maxWidth: '58ch' } },
        'Doze disciplinas ligadas por um grafo de pré-requisitos. Cada tópico sabe de quem depende e o que ele destrava — é assim que a plataforma consegue dizer que você trava em derivada porque frações ficaram para trás.'),

      h('div.card.mt-24',
        h('div.row.gap-14.wrapf',
          h('div.stat', h('b', String(st.disciplines)), h('span', 'disciplinas')),
          h('div.stat', h('b', String(st.modules)), h('span', 'módulos')),
          h('div.stat', h('b', String(st.units)), h('span', 'unidades')),
          h('div.stat', h('b', String(st.topics)), h('span', 'tópicos')),
          h('div.stat', h('b', String(st.sub)), h('span', 'subtópicos')),
          h('div.stat', h('b', `${cob.comFicha}`), h('span', 'fichas completas'))
        ),
        h('div.mt-16', busca),
        resultados
      ),

      h('div.disc-grid.mt-24', cards),

      h('div.card.mt-24', { style: { background: 'var(--surface-2)', border: 0 } },
        h('h4', 'Como ler os selos'),
        h('div.legend.mt-8', E.MASTERY_LEVELS.map((l) =>
          h('div.legend-item',
            h('span.selo', { 'data-level': l.id }, h('i', l.mark), l.name),
            h('span.dim', l.blurb))
        ).concat([
          h('div.legend-item',
            h('span.selo', { 'data-level': 'mapeado' }, h('i', '○'), 'mapeado'),
            h('span.dim', 'O tópico está no mapa com objetivo e subtópicos, mas a ficha completa ainda não foi escrita.'))
        ])),
        h('p.muted', { style: { fontSize: '13.5px', margin: '14px 0 0' } },
          'O nível vem do desempenho, não de ter aberto a aula: cada exercício vale um peso conforme a dificuldade, e errar recente derruba o nível de volta.')
      )
    );
  }

  /* ---------------- tela 2: uma disciplina ---------------- */

  function renderDiscipline(params) {
    const state = CZ.store.get();
    const d = S.discipline(params.disciplineId);
    if (!d) return h('div.wrap', h('div.card', h('h3', 'Disciplina não encontrada')));

    const prog = E.disciplineProgress(state, d.id);
    const simulados = CZ.exams.forDiscipline(d.id);
    const proximo = E.nextTopic(state, d.id);

    const modulos = d.modules.map((m) => {
      const mp = E.moduleProgress(state, m.id);
      const unidades = m.units.map((u) =>
        h('div.unit',
          h('div.unit-head',
            h('span.unit-nm', u.name),
            h('span.dim', `${u.topics.length} tópicos`)),
          h('div.unit-topics', u.topics.map((t) => linhaTopico(state, t)))
        ));

      return h('section.card.mt-16',
        h('div.mod-head',
          h('div',
            h('h3', m.name),
            h('p.muted', { style: { fontSize: '14px', margin: '6px 0 0' } }, m.goal)),
          h('div.mod-pct', mp.pct + '%')
        ),
        CZ.ui.Bar(mp.pct, mp.pct >= 85 ? 'ok' : null),
        h('div.mt-16', unidades)
      );
    });

    return h('div.wrap',
      h('div.row.gap-10.wrapf',
        h('button.btn.btn-sm.btn-quiet', { onClick: () => CZ.router.go('/base') }, '← Base curricular')),

      h('div.disc-hero.mt-16',
        h('div.disc-ico.lg', d.icon),
        h('div',
          h('p.eyebrow', `Disciplina ${String(d.n).padStart(2, '0')}`),
          h('h2', { style: { margin: '6px 0 6px' } }, d.name),
          h('p.muted', d.tagline))
      ),

      h('div.card.mt-16', { style: { background: 'var(--accent-soft)', border: 0 } },
        h('div.eyebrow', 'Objetivo da disciplina'),
        h('p', { style: { margin: '6px 0 0', fontSize: '15px' } }, d.goal)),

      h('div.card.mt-16',
        h('div.row.gap-14.wrapf',
          h('div.grow', CZ.ui.Bar(prog.pct, prog.pct >= 85 ? 'ok' : null, true)),
          h('span', { style: { fontFamily: 'var(--mono)', fontWeight: '600' } }, prog.pct + '%')),
        h('div.disc-meta.mt-8',
          h('span', `${prog.total} tópicos`),
          h('span', '·'),
          h('span', `${prog.comFicha} com ficha`),
          h('span', '·'),
          h('span', `${prog.dominados} dominados`)),
        proximo ? h('div.mt-16',
          h('button.btn.btn-primary', { onClick: () => CZ.router.go('/topico/' + proximo.topic.id) },
            (proximo.reason === 'andamento' ? 'Continuar: ' : proximo.reason === 'reforcar' ? 'Reforçar: ' : 'Começar por: ') + proximo.topic.name)
        ) : null
      ),

      simulados.length ? h('div.card.mt-16',
        h('h4', 'Simulados desta disciplina'),
        h('div.mt-8', simulados.map((ex) => {
          const res = CZ.exams.resultOf(ex.id);
          const ok = CZ.exams.available(ex.id);
          return h('button.exam-row', { disabled: !ok, onClick: () => ok && CZ.router.go('/simulado/' + ex.id) },
            h('div',
              h('span.nm', ex.name),
              h('span.path', ok ? ex.blurb : 'ainda sem questões suficientes — faltam fichas neste escopo')),
            res ? h('span.chip.ok', `melhor: ${res.melhor}%`) : h('span.chip', ok ? 'não feito' : 'em construção'));
        }))
      ) : null,

      h('div.mt-16', modulos)
    );
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.catalog = renderIndex;
  CZ.pages.discipline = renderDiscipline;
  CZ.pages.catalogParts = { selo, linhaTopico };
})(window.CZ);
