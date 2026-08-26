/* ==========================================================================
   components/tutor.js — painel do tutor.

   Sabe em que aula, passo e exercício o aluno está, e mostra isso de forma
   explícita. Também mostra qual provedor respondeu: o aluno tem direito de
   saber se está falando com um buscador de conteúdo ou com um modelo.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;

  let panel = null;
  let context = {};          // { topic, lesson, step, exercise }
  const history = [];

  /** As páginas chamam isto ao navegar, para o tutor saber onde o aluno está. */
  function setContext(next) {
    context = next || {};
    const badge = document.querySelector('.tutor-where');
    if (badge) badge.textContent = whereText();
  }

  function whereText() {
    const lesson = context.lesson && CZ.lessons.byId[context.lesson];
    const topic = context.topic && CZ.curriculum.byId[context.topic];
    if (lesson) return `vendo: ${lesson.title}`;
    if (topic) return `em: ${topic.name}`;
    return 'sem aula aberta';
  }

  const QUICK = [
    'Não entendi essa parte',
    'O que eu estudo agora?',
    'Me dá um exemplo',
    'Por que eu errei isso?'
  ];

  function bubble(role, node) {
    return h('div.msg', { 'data-role': role },
      role === 'bot' ? h('div.msg-who', 'Tutor') : null,
      h('div.msg-body', node)
    );
  }

  /** Markdown mínimo: só negrito e quebra de linha. Nada de HTML solto. */
  function rich(text) {
    const esc = CZ.dom.esc(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    return h('div', { html: esc });
  }

  function render(res, log) {
    const parts = [];
    if (res.html) parts.push(h('div.step-body.tutor-rich', { html: res.html }));
    else if (res.text) parts.push(rich(res.text));

    if (res.suggestions) {
      parts.push(h('div.tutor-chips',
        res.suggestions.map((sug) => h('button.tutor-chip', { onClick: () => send(sug) }, sug))));
    }

    if (res.actions && res.actions.length) {
      parts.push(h('div.tutor-actions', res.actions.map((a) =>
        h('button.btn.btn-sm.btn-ghost', { onClick: () => runAction(a) }, a.label))));
    }

    if (res.note) parts.push(h('div.tutor-note', res.note));

    parts.push(h('div.tutor-src', 'respondido pelo ' +
      (res.provider === 'remoto' ? 'modelo remoto' : 'motor local')));
    log.appendChild(bubble('bot', h('div', parts)));
    log.scrollTop = log.scrollHeight;
  }

  function runAction(a) {
    if (a.act === 'sos') { close(); return CZ.app.openSOS(context.topic || null); }
    if (a.act === 'aula') { close(); return CZ.router.go('/aula/' + a.id); }
    if (a.act === 'praticar-id') { close(); return CZ.router.go('/praticar/' + a.id); }
    if (a.act === 'praticar') {
      const t = CZ.curriculum.TOPICS.find((x) => x.name === a.topic);
      if (t) { close(); CZ.router.go('/praticar/' + t.id); }
    }
  }

  let sendFn = null;
  function send(text) { if (sendFn) sendFn(text); }

  function open() {
    if (panel) return;

    const log = h('div.tutor-log');
    const input = h('input.tutor-input', {
      type: 'text', placeholder: 'pergunte alguma coisa…', 'aria-label': 'Pergunta para o tutor',
      autocomplete: 'off',
      onKeydown: (e) => { if (e.key === 'Enter') submit(); }
    });

    sendFn = (text) => { input.value = text; submit(); };

    async function submit() {
      const q = (input.value || '').trim();
      if (!q) return;
      input.value = '';
      log.appendChild(bubble('me', h('div', q)));
      log.scrollTop = log.scrollHeight;

      const thinking = bubble('bot', h('div.tutor-dots', h('i'), h('i'), h('i')));
      log.appendChild(thinking);
      log.scrollTop = log.scrollHeight;

      // A resposta remota chega em pedaços. Escrever conforme chega é o que
      // separa "conversa" de "formulário que demorou".
      let fluxo = null;
      const onDelta = (_pedaco, acumulado) => {
        if (!fluxo) {
          thinking.remove();
          fluxo = h('div');
          log.appendChild(bubble('bot', fluxo));
        }
        CZ.dom.clear(fluxo);
        fluxo.appendChild(rich(acumulado));
        log.scrollTop = log.scrollHeight;
      };

      let res;
      try {
        res = await CZ.ai.ask(q, { ...context, historico: historicoParaApi() }, onDelta);
      } catch (_) {
        res = { provider: 'local', text: 'Deu ruim aqui. Tenta de novo com outras palavras.' };
      }

      if (fluxo) fluxo.parentElement.parentElement.remove();
      thinking.remove();
      history.push({ q, res });
      render(res, log);
    }

    /** Últimas rodadas em formato de mensagens, para o proxy. */
    function historicoParaApi() {
      const out = [];
      history.slice(-3).forEach((t) => {
        out.push({ role: 'user', content: t.q });
        if (t.res && t.res.text) out.push({ role: 'assistant', content: t.res.text });
      });
      return out;
    }

    panel = h('div.tutor-panel', { role: 'dialog', 'aria-label': 'Tutor' },
      h('div.tutor-head',
        CZ.mascote.draw('neutro', { tamanho: 38, animar: false }),
        h('div',
          h('div.tutor-title', 'Zero'),
          h('div.tutor-where', whereText())),
        h('button.tutor-x', { onClick: abrirConfig, 'aria-label': 'Configurar o tutor', title: 'Configurar' }, '⚙'),
        h('button.tutor-x', { onClick: close, 'aria-label': 'Fechar' }, '✕')
      ),
      log,
      h('div.tutor-chips', QUICK.map((q) => h('button.tutor-chip', { onClick: () => send(q) }, q))),
      h('div.tutor-bar', input, h('button.btn.btn-primary.btn-sm', { onClick: submit }, 'Enviar'))
    );

    document.body.appendChild(panel);
    requestAnimationFrame(() => panel.setAttribute('data-open', 'true'));

    // histórico da sessão sobrevive ao fechar e reabrir
    if (history.length) {
      history.forEach((turn) => {
        log.appendChild(bubble('me', h('div', turn.q)));
        render(turn.res, log);
      });
    } else {
      render({
        provider: 'local',
        text: 'Pergunte o que quiser sobre o que você está estudando. Eu não entrego resposta de exercício de primeira — dou dica e espero você tentar.',
        suggestions: QUICK
      }, log);
    }

    input.focus();
    document.addEventListener('keydown', onKey);
  }

  /**
   * Configuração do provedor remoto. O campo aceita ENDEREÇO, não chave —
   * e `CZ.ai.configurar` recusa qualquer coisa com cara de chave, porque
   * isso aqui roda no navegador de quem visita.
   */
  function abrirConfig() {
    const est = CZ.ai.estado();
    const campo = h('input.answer-input', {
      type: 'url', placeholder: 'https://seu-proxy.vercel.app/api/tutor',
      value: est.endpoint || '',
      style: { fontFamily: 'var(--body)', fontWeight: '500', fontSize: '14px' }
    });
    const aviso = h('div');

    CZ.ui.modal('Tutor com modelo remoto',
      h('div',
        h('p.muted', { style: { fontSize: '14.5px' } },
          'Por padrão o tutor usa o motor local: ele busca no conteúdo que já existe na plataforma e funciona offline. ' +
          'Para pergunta aberta, dá para ligar um modelo remoto.'),

        h('div.card.card-pad-sm.mt-16', { style: { background: 'var(--signal-soft)', border: 0 } },
          h('b', { style: { fontSize: '14px' } }, 'Cole o endereço do proxy, nunca a chave'),
          h('p', { style: { fontSize: '13.5px', margin: '6px 0 0', color: 'var(--ink-2)' } },
            'Chave de API no navegador é chave publicada — qualquer visitante lê o JavaScript. ' +
            'A chave fica no servidor; aqui vai só o endereço. As instruções estão em api/README.md do repositório.')),

        h('div.mt-16', campo),
        aviso,

        est.estadoRemoto === 'ok'
          ? h('p.mt-16', { style: { fontSize: '13px', color: 'var(--ok)' } }, '● Remoto respondendo normalmente.')
          : est.ultimoErro
            ? h('p.mt-16', { style: { fontSize: '13px', color: 'var(--signal)' } }, '● Última tentativa falhou: ' + est.ultimoErro)
            : null
      ),
      (close) => [
        h('button.btn.btn-ghost', { onClick: close }, 'Cancelar'),
        est.ligado ? h('button.btn.btn-quiet', {
          onClick: () => { CZ.ai.configurar(''); close(); CZ.ui.toast('Voltou para o motor local'); }
        }, 'Desligar o remoto') : null,
        h('button.btn.btn-primary', {
          onClick: () => {
            const r = CZ.ai.configurar(campo.value);
            CZ.dom.clear(aviso);
            if (!r.ok) {
              aviso.appendChild(h('p', {
                style: { fontSize: '13.5px', color: 'var(--alert)', marginTop: '10px' }
              }, r.erro));
              return;
            }
            close();
            CZ.ui.toast(r.ligado ? 'Tutor remoto ligado' : 'Voltou para o motor local');
          }
        }, 'Salvar')
      ]);
  }

  function onKey(e) { if (e.key === 'Escape') close(); }

  function close() {
    if (!panel) return;
    panel.removeAttribute('data-open');
    const dead = panel;
    panel = null;
    sendFn = null;
    document.removeEventListener('keydown', onKey);
    setTimeout(() => dead.remove(), 200);
  }

  function toggle() { panel ? close() : open(); }

  function fab() {
    return h('button.tutor-fab', { onClick: toggle, 'aria-label': 'Abrir o tutor' },
      h('span.tutor-fab-mark', '✳'),
      h('span.tutor-fab-txt', 'Tutor'));
  }

  CZ.tutor = { open, close, toggle, setContext, fab, abrirConfig };
})(window.CZ);
