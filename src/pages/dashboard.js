/* ==========================================================================
   pages/dashboard.js — painel do aluno.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h } = CZ.dom;
  const E = CZ.engine;

  function render(state) {
    const name = state.name || 'tudo bem';
    const progress = E.overallProgress(state);
    const lvl = E.levelInfo(state.xp);
    const next = E.nextUp(state);
    const reviews = E.dueReviews(state);

    const strong = CZ.curriculum.TOPICS.filter((t) => E.mastery(state, t.id) >= E.DONE_AT);
    const weak = CZ.curriculum.TOPICS.filter((t) => {
      const st = E.status(state, t.id);
      return st === 'revisar' || (st === 'andamento' && E.mastery(state, t.id) < E.REVIEW_BELOW);
    });
    const locked = E.firstLockedTopic(state);

    /* ---- cartão principal: continuar ---- */
    function continueCard() {
      if (!next) {
        return h('div.card.continue-card',
          h('h3', 'Você percorreu a trilha inteira'),
          h('p.sub', { style: { marginTop: '6px' } },
            'Da aritmética até o Teorema Fundamental do Cálculo. Use a prática livre para manter tudo afiado.'),
          h('div.mt-24', h('button.btn.btn-ghost', { onClick: () => CZ.router.go('/mapa') }, 'Ver o mapa'))
        );
      }
      const topic = next.topic;
      const lesson = E.nextLesson(state, topic.id);
      const m = E.mastery(state, topic.id);
      const isReview = next.reason === 'revisar';

      return h('div.card.continue-card',
        h('p.eyebrow', { style: { color: '#A79BFF' } }, isReview ? 'Hora de revisar' : 'Continuar estudando'),
        h('h3', { style: { marginTop: '8px' } }, topic.name),
        h('p.sub', { style: { margin: '4px 0 16px' } },
          isReview
            ? 'Você teve dificuldade com esse assunto. Uma passada rápida agora evita que ele vire buraco.'
            : (lesson ? lesson.title : 'Praticar')),
        CZ.ui.Bar(m),
        h('div.row.gap-10.mt-24.wrapf',
          h('button.btn.btn-primary.grow', {
            style: { background: '#fff', color: '#14161C' },
            onClick: () => CZ.router.go(isReview ? `/praticar/${topic.id}` : `/aula/${lesson.id}`)
          }, isReview ? 'Revisar agora' : 'Continuar'),
          h('button.btn.btn-ghost', {
            style: { background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.3)' },
            onClick: () => CZ.router.go(`/praticar/${topic.id}`)
          }, 'Só praticar')
        )
      );
    }

    /* ---- pontos fortes e revisão ---- */
    function statusCard() {
      return h('div.card',
        h('h4', { style: { marginBottom: '10px' } }, 'Seus pontos fortes'),
        strong.length
          ? h('div', strong.map((t) => h('div.list-line',
              h('span.mark', { style: { color: 'var(--ok)' } }, '✓'), h('span', t.name))))
          : h('p.muted', { style: { fontSize: '14px' } },
              'Ainda nenhum assunto fechado. Conclua as aulas de um tópico para ele aparecer aqui.'),

        h('h4', { style: { margin: '22px 0 10px' } }, 'Precisa revisar'),
        weak.length
          ? h('div', weak.map((t) => h('div.list-line',
              h('span.mark', { style: { color: 'var(--warn)' } }, '⚠'),
              h('span.grow', t.name),
              h('button.btn.btn-sm.btn-quiet', { onClick: () => CZ.router.go(`/praticar/${t.id}`) }, 'praticar'))))
          : h('p.muted', { style: { fontSize: '14px' } }, 'Nada pendente de revisão. Bom sinal.'),

        locked ? h('div', { style: { marginTop: '22px', paddingTop: '18px', borderTop: '1px solid var(--line)' } },
          h('h4', { style: { marginBottom: '6px' } }, 'Próximo objetivo'),
          h('div.row.gap-10',
            h('span', '🔒'),
            h('span', { style: { fontWeight: '600' } }, locked.name)),
          h('p.muted', { style: { fontSize: '13.5px', marginTop: '6px' } },
            `Complete ${locked.requires.map((r) => CZ.curriculum.byId[r].name).join(' e ')} para desbloquear.`)
        ) : null
      );
    }

    /* ---- sequência + XP ---- */
    function streakCard() {
      const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
      const todayIdx = new Date().getDay();
      const activeCount = Math.min(state.streak.count, 7);
      return h('div.card',
        h('div.row.gap-10',
          h('div.grow',
            h('h4', `🔥 ${state.streak.count} ${state.streak.count === 1 ? 'dia estudando' : 'dias seguidos'}`),
            h('p.muted', { style: { fontSize: '13px', margin: '3px 0 0' } },
              state.streak.count >= 2 ? 'Constância vale mais que maratona.' : 'Volte amanhã para começar uma sequência.')
          ),
          h('div', { style: { textAlign: 'right' } },
            h('div', { style: { fontFamily: 'var(--mono)', fontWeight: '600', fontSize: '15px' } }, `Nível ${lvl.level}`),
            h('div.dim', { style: { fontSize: '12px' } }, `${state.xp} XP`)
          )
        ),
        h('div.streak-strip', days.map((d, i) => {
          const on = i <= todayIdx && i > todayIdx - activeCount;
          return h('div.streak-day', { 'data-on': on }, d);
        })),
        h('div.mt-16', CZ.ui.Bar(lvl.pct)),
        h('p.dim', { style: { fontSize: '12px', marginTop: '6px' } },
          `${lvl.into} / ${lvl.need} XP para o nível ${lvl.level + 1}`)
      );
    }

    /* ---- conquistas ---- */
    function achievementsCard() {
      return h('div.card',
        h('h4', { style: { marginBottom: '12px' } }, 'Conquistas'),
        h('div.ach-grid', E.ACHIEVEMENTS.map((a) => {
          const got = state.achievements.includes(a.id);
          return h('div.ach', { 'data-locked': !got },
            h('div.em', got ? a.em : '🔒'), h('div.nm', a.name));
        }))
      );
    }

    /* ---- modo faculdade ---- */
    function areaCard() {
      return h('div.card',
        h('h4', '🎓 Preparação para faculdade'),
        h('p.muted', { style: { fontSize: '14px', margin: '6px 0 14px' } },
          'Escolha seu curso e os exemplos das aulas passam a usar situações da sua área.'),
        h('div.area-grid', CZ.curriculum.AREAS.map((a) => h('button.area-opt', {
          'data-on': state.area === a.id,
          onClick: () => { CZ.store.update((s) => { s.area = a.id; }); CZ.app.refresh(); }
        }, a.name, h('span.ex', a.ex))))
      );
    }

    /* O Zero abre o painel dizendo o que o modelo do aluno concluiu agora.
       É a leitura de comportamento virando conduta, no lugar mais visível. */
    function cartaoDoZero() {
      const sug = CZ.profile.sugestao();
      if (!sug) return null;
      return h('div.card.mt-16', { style: { background: 'var(--accent-soft)', border: 0 } },
        h('div.zero-fala',
          CZ.mascote.draw(sug.tom, { tamanho: 64 }),
          h('div.balao',
            h('p', h('b', sug.titulo)),
            h('p', { style: { marginTop: '5px' } }, sug.texto),
            h('div.row.gap-10.mt-16.wrapf',
              sug.acao ? h('button.btn.btn-sm.btn-primary', {
                onClick: () => {
                  if (sug.acao.sos) return CZ.app.openSOS(null);
                  if (sug.acao.lente) return CZ.tutor.open();
                  if (sug.acao.ir) return CZ.router.go(sug.acao.ir);
                }
              }, sug.acao.rotulo) : null,
              h('button.btn.btn-sm.btn-quiet', { onClick: () => CZ.router.go('/perfil') },
                'O que você sabe sobre mim?')))));
    }

    return h('div.wrap',
      h('div.dash-hello',
        h('h2', `Olá, ${name}.`),
        h('p.muted', reviews.length
          ? `Você tem ${reviews.length} ${reviews.length === 1 ? 'assunto' : 'assuntos'} esperando revisão.`
          : 'Vamos continuar de onde paramos?')
      ),

      cartaoDoZero(),

      h('div.card.mt-24',
        h('div.row.gap-14.wrapf',
          h('div.grow',
            h('h4', 'Progresso geral'),
            h('p.dim', { style: { fontSize: '13px', margin: '3px 0 10px' } },
              `${E.totalLessons(state)} aulas concluídas de ${CZ.lessons.LESSONS.length}`),
            CZ.ui.Bar(progress, null, true)),
          h('div', { style: { fontFamily: 'var(--mono)', fontSize: '26px', fontWeight: '600' } }, progress + '%')
        )
      ),

      h('div.dash-grid',
        h('div.stack.gap-14', continueCard(), streakCard()),
        h('div.stack.gap-14', statusCard())
      ),

      h('div.dash-grid', { style: { marginTop: '16px' } },
        achievementsCard(),
        areaCard()
      )
    );
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.dashboard = render;
})(window.CZ);
