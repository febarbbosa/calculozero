/* ==========================================================================
   components/ui.js — componentes reutilizáveis.

   O componente mais importante daqui é o Exercise: ele carrega a política
   de feedback da plataforma (dica gradual, diagnóstico do erro, solução
   passo a passo) e é usado igual na aula, na prática e na revisão.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;

  /* ---------------- Barra de progresso ---------------- */
  function Bar(pct, variant, large) {
    return h('div.bar' + (variant ? '.' + variant : '') + (large ? '.bar-lg' : ''),
      { role: 'progressbar', 'aria-valuenow': Math.round(pct), 'aria-valuemin': 0, 'aria-valuemax': 100 },
      h('i', { style: { width: Math.max(0, Math.min(100, pct)) + '%' } })
    );
  }

  function Chip(text, variant) {
    return h('span.chip' + (variant ? '.' + variant : ''), text);
  }

  /* ---------------- Toast ---------------- */
  let toastWrap = null;
  function toast(msg) {
    if (!toastWrap) {
      toastWrap = h('div.toast-wrap');
      document.body.appendChild(toastWrap);
    }
    const t = h('div.toast', msg);
    toastWrap.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 2200);
    setTimeout(() => t.remove(), 2600);
  }

  /* ---------------- Modal ---------------- */
  function modal(title, bodyNode, actions) {
    const back = h('div.modal-back', {
      onClick: (e) => { if (e.target === back) close(); }
    });
    function close() { back.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);

    const box = h('div.modal', { role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
      h('h3', title),
      bodyNode,
      actions ? h('div.row.gap-10.mt-24.wrapf', actions(close)) : null
    );
    back.appendChild(box);
    document.body.appendChild(back);
    return { close, node: back };
  }

  /* ---------------- Exercício ---------------- */
  /**
   * Renderiza um exercício completo.
   * @param {object} ex          item de CZ.exercises
   * @param {object} opts        { guided, onDone(correct) }
   */
  function Exercise(ex, opts) {
    opts = opts || {};
    let hintLevel = 0;
    let answered = false;
    const abertoEm = Date.now();

    const hints = h('div');
    const feedback = h('div');
    const actions = h('div.row.gap-10.mt-16.wrapf');

    const input = ex.type === 'input'
      ? h('input.answer-input', {
          type: 'text', placeholder: 'sua resposta', 'aria-label': 'Resposta',
          autocomplete: 'off',
          onKeydown: (e) => { if (e.key === 'Enter') submit(); }
        })
      : null;

    const choiceNodes = [];
    const choices = ex.type === 'choice'
      ? h('div.opts', ex.choices.map((c, i) => {
          const b = h('button.opt', { type: 'button', onClick: () => { if (!answered) submit(i); } },
            h('span.key', String.fromCharCode(65 + i)),
            h('span', c)
          );
          choiceNodes.push(b);
          return b;
        }))
      : null;

    const hintBtn = h('button.btn.btn-sm.btn-ghost', { onClick: showHint }, '💡 Preciso de uma dica');
    const sendBtn = ex.type === 'input'
      ? h('button.btn.btn-primary', { onClick: () => submit() }, 'Responder')
      : null;

    function showHint() {
      if (hintLevel >= ex.hints.length) return;
      const text = ex.hints[hintLevel];
      hintLevel++;
      hints.appendChild(h('div.hint-box',
        h('div.lbl', `Dica ${hintLevel} de ${ex.hints.length}`),
        h('div', text)
      ));
      if (hintLevel >= ex.hints.length) {
        hintBtn.disabled = true;
        hintBtn.textContent = 'Sem mais dicas — tente responder';
      } else {
        hintBtn.textContent = `💡 Outra dica (${hintLevel}/${ex.hints.length})`;
      }
    }

    function submit(choiceIndex) {
      if (answered) return;
      const given = ex.type === 'choice' ? choiceIndex : (input.value || '').trim();
      if (ex.type === 'input' && !given) { input.focus(); return; }

      const res = CZ.exercises.check(ex, given);
      answered = true;

      if (ex.type === 'choice') {
        choiceNodes.forEach((n, i) => {
          if (i === ex.answer) n.dataset.state = 'right';
          else if (i === choiceIndex && !res.ok) n.dataset.state = 'wrong';
        });
      } else {
        input.disabled = true;
        if (sendBtn) sendBtn.disabled = true;
      }
      hintBtn.disabled = true;

      // Exercício de trilha e exercício de ficha gravam em lugares
      // diferentes: um no progresso da trilha, outro no do currículo.
      const doCurriculo = CZ.syllabus && CZ.syllabus.topic(ex.topic);
      const fresh = doCurriculo
        ? CZ.engine.recordTopicAnswer(ex.topic, ex.id, ex.level, res.ok, hintLevel > 0)
        : CZ.engine.recordAnswer(ex.topic, res.ok, hintLevel > 0);
      fresh.forEach((a) => toast(`${a.em} ${a.name}`));

      // alimenta o modelo do aluno: é daqui que sai a leitura de ritmo,
      // de quanto apoio a pessoa quer e de qual lente explica melhor
      if (CZ.profile) {
        CZ.profile.registrarResposta({
          correto: res.ok, dicas: hintLevel, topico: ex.topic, nivel: ex.level
        });
        const decorrido = (Date.now() - abertoEm) / 1000;
        CZ.profile.registrarTempo(decorrido, { topicId: ex.topic });
      }

      clear(feedback);
      // O mascote dá o veredito em uma linha; a resolução vem logo abaixo.
      // Separar as duas coisas evita que a pessoa pule o raciocínio por já
      // ter visto "certo" ou "errado" no meio do texto.
      feedback.appendChild(CZ.celebrate.faixa(res.ok, {
        usouDica: hintLevel > 0,
        texto: res.ok ? null : (res.trap || null)
      }));
      feedback.appendChild(res.ok ? okBox() : errBox(res.trap));

      if (res.ok) {
        const ganho = doCurriculo ? CZ.engine.xpFor(ex.level) : CZ.engine.XP_RIGHT;
        CZ.celebrate.pontos('+' + ganho + ' XP', sendBtn || node);
      }

      clear(actions);
      actions.appendChild(h('button.btn.btn-primary', {
        onClick: () => opts.onDone && opts.onDone(res.ok)
      }, opts.nextLabel || 'Continuar'));
      if (!res.ok) {
        actions.appendChild(h('button.btn.btn-ghost', { onClick: retry }, 'Tentar de novo'));
      }
    }

    function retry() {
      answered = false; hintLevel = 0;
      clear(hints); clear(feedback); clear(actions);
      if (input) { input.disabled = false; input.value = ''; input.focus(); }
      choiceNodes.forEach((n) => delete n.dataset.state);
      hintBtn.disabled = false;
      hintBtn.textContent = '💡 Preciso de uma dica';
      actions.appendChild(hintBtn);
      if (sendBtn) actions.appendChild(sendBtn);
    }

    function okBox() {
      return h('div.feedback.ok',
        h('h4', 'O raciocínio completo'),
        h('div', { html: solutionHtml() })
      );
    }

    function errBox(trap) {
      return h('div.feedback.err',
        h('h4', 'Onde o raciocínio saiu do trilho'),
        trap ? h('p', { style: { fontWeight: '600' } }, trap) : null,
        h('div', { html: solutionHtml() })
      );
    }

    function solutionHtml() {
      const steps = (ex.solution || []).map((s) => `<li>${s}</li>`).join('');
      const ansTxt = ex.type === 'choice' ? ex.choices[ex.answer] : ex.answer;
      return `<ol class="solution-steps">${steps}</ol>
              <p style="margin-top:12px"><strong>Resposta: ${ansTxt}</strong></p>`;
    }

    actions.appendChild(hintBtn);
    if (sendBtn) actions.appendChild(sendBtn);

    const node = h('div',
      h('div.ex-prompt', { html: ex.prompt }),
      ex.type === 'input' ? h('div.answer-row', input) : choices,
      hints,
      feedback,
      actions
    );

    // O exercício guiado abre a primeira dica sozinho — a menos que o
    // modelo do aluno já tenha percebido que essa pessoa prefere tentar
    // antes de receber andaime.
    const querAndaime = !CZ.profile || !CZ.profile.apoio() ||
      CZ.profile.apoio().nome !== 'prefere tentar sozinho';
    if (opts.guided && querAndaime) setTimeout(showHint, 350);
    return node;
  }

  /* ---------------- Ficha de tópico ---------------- */
  function TopicCard(topic, state, onOpen) {
    const st = CZ.engine.status(state, topic.id);
    const m = CZ.engine.mastery(state, topic.id);
    const meta = CZ.engine.STATUS_LABEL[st];
    const lessons = CZ.lessons.byTopic(topic.id).length;
    const done = state.topics[topic.id].lessonsDone.length;
    const locked = st === 'bloqueado';

    return h('button.topic-card', {
      'data-status': st, disabled: locked,
      onClick: () => { if (!locked) onOpen(topic); }
    },
      h('div.glyph', topic.icon),
      h('div.body',
        h('h3', topic.name, Chip(meta.txt, meta.cls)),
        h('div.desc', topic.desc),
        Bar(m, st === 'concluido' ? 'ok' : st === 'revisar' ? 'warn' : null),
        h('div.meta',
          h('span', `${done}/${lessons} aulas`),
          h('span', '·'),
          h('span', `${m}% domínio`)
        )
      )
    );
  }

  CZ.ui = { Bar, Chip, toast, modal, Exercise, TopicCard };
})(window.CZ);
