/* ==========================================================================
   pages/diagnostic.js — diagnóstico inicial adaptativo.

   Regra do fluxo: começa fácil e só sobe de nível enquanto o aluno acerta.
   Dois erros num nível encerram a subida — o objetivo é achar o teto, não
   cansar quem já está inseguro.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;
  const { QUESTIONS, ORDER } = CZ.diagnosticBank;

  function render() {
    const root = h('div.wrap', h('div.diag-shell'));
    const shell = root.firstChild;

    const session = {
      levelIndex: 0,
      queue: [],
      results: {},        // nivel -> {right, total}
      missesThisLevel: 0,
      ceilingReached: false,
      vectorsDone: false,
      asked: 0,
      totalEstimate: 15
    };

    ORDER.forEach((lvl) => { session.results[lvl] = { right: 0, total: 0 }; });

    function levelQuestions(levelId) {
      return QUESTIONS.filter((q) => q.level === levelId).sort((a, b) => a.d - b.d);
    }

    function start() {
      session.queue = levelQuestions(ORDER[0]);
      next();
    }

    function next() {
      if (session.queue.length === 0) {
        const lvl = ORDER[session.levelIndex];
        const r = session.results[lvl];
        const ratio = r.total ? r.right / r.total : 0;

        // sobe um degrau enquanto o aluno estiver acertando
        const nextLvl = ORDER[session.levelIndex + 1];
        const canClimb = ratio >= 0.5 && nextLvl && nextLvl !== 'vetores' && !session.ceilingReached;
        if (canClimb) {
          session.levelIndex++;
          session.missesThisLevel = 0;
          session.queue = levelQuestions(ORDER[session.levelIndex]);
          return showLevelBreak(ORDER[session.levelIndex], next);
        }

        // Vetores não é continuação de cálculo — é um ramo paralelo que só
        // depende de álgebra. Então ele é oferecido mesmo para quem parou
        // antes, em vez de ficar inacessível atrás da fila.
        if (!session.vectorsDone && session.results.aritmetica.total > 0) {
          session.vectorsDone = true;
          session.levelIndex = ORDER.indexOf('vetores');
          session.missesThisLevel = 0;
          session.ceilingReached = false;
          session.queue = levelQuestions('vetores').slice(0, 4);
          return showBranch(next);
        }

        return finish();
      }
      showQuestion(session.queue.shift());
    }

    /** Aviso de troca de assunto: deixa claro que não é "mais difícil", é outro ramo. */
    function showBranch(onGo) {
      clear(shell);
      shell.appendChild(h('div.card.center',
        h('p.eyebrow', 'Mudando de assunto'),
        h('h2', { style: { margin: '10px 0 8px' } }, 'Vetores'),
        h('p.muted', 'Este é um ramo separado da grade — não depende de cálculo. Mais quatro perguntas rápidas e acabou.'),
        h('div.mt-24', h('button.btn.btn-primary', { onClick: onGo }, 'Continuar')),
        h('div.diag-skip',
          h('button.btn.btn-quiet.btn-sm', { onClick: finish }, 'Não faço essa matéria — pular'))
      ));
    }

    function showLevelBreak(levelId, onGo) {
      const meta = CZ.curriculum.LEVELS.find((l) => l.id === levelId);
      clear(shell);
      shell.appendChild(h('div.card.center',
        h('p.eyebrow', 'Você foi bem — vamos subir um degrau'),
        h('h2', { style: { margin: '10px 0 8px' } }, meta.name),
        h('p.muted', meta.blurb),
        h('div.mt-24', h('button.btn.btn-primary', { onClick: onGo }, 'Continuar')),
        h('div.diag-skip',
          h('button.btn.btn-quiet.btn-sm', { onClick: finish }, 'Parar por aqui e ver meu resultado'))
      ));
    }

    function showQuestion(q) {
      session.asked++;
      const meta = CZ.curriculum.LEVELS.find((l) => l.id === q.level);
      const pct = Math.min(95, (session.asked / session.totalEstimate) * 100);

      clear(shell);
      const optNodes = [];
      let locked = false;

      function pick(i) {
        if (locked) return;
        locked = true;
        const right = i === q.answer;
        session.results[q.level].total++;
        if (right) session.results[q.level].right++;
        else {
          session.missesThisLevel++;
          if (session.missesThisLevel >= 2) {
            session.ceilingReached = true;
            session.queue = [];   // não insiste neste nível
          }
        }
        optNodes.forEach((n, idx) => {
          if (idx === q.answer) n.dataset.state = 'right';
          else if (idx === i && !right) n.dataset.state = 'wrong';
        });
        const why = q.why
          ? h('div.feedback.' + (right ? 'ok' : 'err'), h('p', { style: { margin: 0 } }, q.why))
          : null;
        const after = h('div.mt-16',
          why,
          h('div.mt-16', h('button.btn.btn-primary.btn-block', { onClick: next }, 'Próxima'))
        );
        shell.appendChild(after);
        after.querySelector('button').focus();
      }

      shell.appendChild(h('div.diag-progress',
        h('span.lbl', `${session.asked}`),
        CZ.ui.Bar(pct),
        h('span.lbl', meta.name)
      ));

      shell.appendChild(h('div.card',
        h('div.q-area', `${meta.name} · ${q.skill}`),
        h('div.q-prompt', { html: q.prompt }),
        h('div.opts', q.opts.map((o, i) => {
          const b = h('button.opt', { type: 'button', onClick: () => pick(i) },
            h('span.key', String.fromCharCode(65 + i)), h('span', o));
          optNodes.push(b);
          return b;
        })),
        h('div.diag-skip',
          h('button.btn.btn-quiet.btn-sm', {
            onClick: () => { session.results[q.level].total++; next(); }
          }, 'Não sei essa — pular'))
      ));
    }

    function finish() {
      const scores = {};
      ORDER.forEach((lvl) => {
        const r = session.results[lvl];
        scores[lvl] = r.total ? Math.round((r.right / r.total) * 100) : null;
      });

      CZ.store.update((s) => {
        s.diagnostic = { scores, at: Date.now() };
        s.onboarded = true;
        CZ.engine.touchStreak(s);
        CZ.engine.checkAchievements(s);
      });

      showReport(scores);
    }

    function showReport(scores) {
      const state = CZ.store.get();
      clear(shell);

      const rows = ORDER.map((lvl) => {
        const meta = CZ.curriculum.LEVELS.find((l) => l.id === lvl);
        const sc = scores[lvl];
        const untested = sc === null;
        const variant = untested ? null : sc >= 80 ? 'ok' : sc >= 50 ? 'warn' : 'err';
        const note = untested
          ? 'Não chegamos a avaliar — vamos construir esse degrau quando for a hora.'
          : sc >= 80 ? 'Firme. Você não precisa refazer isso.'
          : sc >= 50 ? 'Você tem a ideia, mas escorrega nos detalhes.'
          : 'Aqui está a lacuna que provavelmente está travando o resto.';
        return h('div.report-row',
          h('div.head',
            h('span.name', meta.name),
            h('span.pct', { style: { color: untested ? 'var(--ink-3)' : `var(--${variant === 'ok' ? 'ok' : variant === 'warn' ? 'warn' : 'err'})` } },
              untested ? 'não avaliado' : sc + '%')
          ),
          untested ? null : CZ.ui.Bar(sc, variant),
          h('div.note', note)
        );
      });

      const weakest = ORDER
        .filter((l) => scores[l] !== null && scores[l] < 80)
        .sort((a, b) => scores[a] - scores[b])[0];
      const weakMeta = weakest ? CZ.curriculum.LEVELS.find((l) => l.id === weakest) : null;

      shell.appendChild(h('div',
        h('p.eyebrow', 'Diagnóstico concluído'),
        h('h2', { style: { margin: '10px 0 8px' } }, 'Descobrimos onde você está.'),
        h('p.muted', 'Isto não é uma nota. É um mapa de onde apoiar o próximo passo.'),
        h('div.card.mt-24', rows),
        h('div.card.mt-16', { style: { background: 'var(--primary-soft)', border: 0 } },
          h('h3', { style: { color: 'var(--primary-deep)' } }, 'Você não precisa estudar tudo de novo'),
          h('p', { style: { margin: '8px 0 0', fontSize: '15px' } },
            weakMeta
              ? `Vamos focar no que está faltando. O ponto mais frágil agora é ${weakMeta.name} — e é bem provável que ele esteja atrapalhando os assuntos seguintes sem você perceber.`
              : 'Sua base está sólida. Você pode ir direto para os assuntos de Cálculo.')
        ),
        h('div.row.gap-10.mt-24.wrapf',
          h('button.btn.btn-primary.grow', { onClick: () => CZ.router.go('/painel') }, 'Ir para meu painel'),
          h('button.btn.btn-ghost', { onClick: () => CZ.router.go('/mapa') }, 'Ver o mapa')
        )
      ));
    }

    /* ---- tela de abertura ---- */
    function intro() {
      clear(shell);
      shell.appendChild(h('div.card',
        h('p.eyebrow', 'Antes de começar'),
        h('h2', { style: { margin: '10px 0 12px' } }, 'Nenhuma pergunta aqui vale nota'),
        h('p.muted', 'São perguntas curtas, começando pelo básico. Se você não souber alguma, pule sem culpa — pular também é informação útil para nós.'),
        h('p.muted', 'Quando você errar duas no mesmo nível, a gente para de subir. Ninguém precisa provar nada.'),
        h('div.mt-24',
          h('label', { style: { fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '8px' } },
            'Como podemos te chamar? (opcional)'),
          h('input.answer-input', {
            type: 'text', placeholder: 'seu nome', style: { fontFamily: 'var(--body)', fontWeight: '500' },
            value: CZ.store.get().name || '',
            onInput: (e) => CZ.store.update((s) => { s.name = e.target.value.trim(); })
          })
        ),
        h('div.mt-24', h('button.btn.btn-primary.btn-block.btn-lg', { onClick: start }, 'Começar'))
      ));
    }

    intro();
    return root;
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.diagnostic = render;
})(window.CZ);
