/* ==========================================================================
   components/explainer.js — o painel "explique de outro jeito".

   Substitui o antigo botão "Não entendi", que oferecia seis reescritas de
   texto. Aqui as lentes são de naturezas diferentes — analogia, escada de
   passos, erro comum, formalismo, código, pergunta guiada — e o painel
   registra qual delas a pessoa usou.

   Esse registro é o que permite, na próxima vez, oferecer primeiro o jeito
   que funcionou. Ninguém precisa preencher um formulário de "estilo de
   aprendizagem": o comportamento diz.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;

  /* ---------------- renderizadores por tipo de conteúdo ---------------- */

  function corpoDe(c, ctx) {
    if (!c) return h('p.muted', 'Sem conteúdo para esta lente.');

    if (c.tipo === 'texto') return h('p.explica-simples', c.texto);
    if (c.tipo === 'html') return h('div.step-body', { html: c.html });

    if (c.tipo === 'lista') {
      return h('div',
        c.titulo ? h('p.exemplo-prompt', { html: c.titulo }) : null,
        h('ol.solution-steps.mt-8', c.itens.map((s) => h('li', s))),
        c.fim ? h('p.exemplo-resp', h('strong', c.fim)) : null);
    }

    if (c.tipo === 'bullets') {
      return h('ul.revisao', c.itens.map((s) => h('li', s)));
    }

    if (c.tipo === 'erros') {
      return h('div.erros', c.itens.map((m) =>
        h('div.erro',
          h('div.erro-tit', m.erro),
          h('div.erro-pq', h('b', 'Por que acontece: '), m.porque),
          m.certo ? h('div.erro-ok', h('b', 'O correto: '), m.certo) : null)));
    }

    if (c.tipo === 'formulas') {
      return h('div.formulas', c.itens.map((f) =>
        h('div.formula', h('div.f', f.f), f.note ? h('div.n', f.note) : null)));
    }

    if (c.tipo === 'codigo') {
      return h('div',
        c.nota ? h('p.muted', { style: { fontSize: '14px' } }, c.nota) : null,
        h('pre.codigo', h('code', c.fonte)),
        c.saida ? h('div.codigo-saida', h('span.lbl', 'saída'), h('code', c.saida)) : null);
    }

    if (c.tipo === 'viz') {
      const v = CZ.viz.build({ type: c.viz });
      return v || h('p.muted', 'Visualização indisponível.');
    }

    if (c.tipo === 'lab') {
      const lab = CZ.labs.get(c.lab);
      if (!lab) return h('p.muted', 'Laboratório indisponível.');
      return h('div',
        h('p.muted', { style: { fontSize: '14.5px' } }, lab.pergunta),
        h('div.mt-8', CZ.labs.build(lab.id) || null),
        h('button.btn.btn-sm.btn-ghost.mt-16', {
          onClick: () => CZ.router.go('/lab/' + lab.id)
        }, 'Abrir o laboratório inteiro'));
    }

    if (c.tipo === 'socratico') return socratico(c);

    return h('p.muted', 'Sem conteúdo para esta lente.');
  }

  /**
   * A lente socrática mostra uma pergunta por vez. A pausa entre uma e
   * outra é o ponto: se as três aparecessem juntas, viraria só mais um
   * passo a passo.
   */
  function socratico(c) {
    let i = 0;
    const area = h('div');
    const wrap = h('div',
      c.titulo ? h('p.exemplo-prompt', { html: c.titulo }) : null,
      area);

    function desenhar() {
      clear(area);
      c.itens.slice(0, i + 1).forEach((q, k) => {
        area.appendChild(h('div.socratica', { 'data-atual': k === i },
          h('span.n', k + 1),
          h('p', q)));
      });
      if (i < c.itens.length - 1) {
        area.appendChild(h('button.btn.btn-sm.btn-ghost.mt-16', {
          onClick: () => { i++; desenhar(); }
        }, 'Pensei nisso — próxima pergunta'));
      } else {
        area.appendChild(h('p.dim.mt-16', { style: { fontSize: '13px' } },
          c.fonte === 'exercicio'
            ? 'Essas são as dicas do exercício, lidas como perguntas. Tente responder antes de voltar.'
            : 'Se as três fizeram sentido, você já tem a resolução inteira.'));
      }
    }
    desenhar();
    return wrap;
  }

  /* ---------------- o painel ---------------- */

  /**
   * @param {object} ctx   { topicId, lessonId, stepIndex, exerciseId }
   * @param {object} opts  { titulo, aberto, onSOS }
   */
  function Explainer(ctx, opts) {
    opts = opts || {};
    const achadas = CZ.explain.disponiveis(ctx);
    if (!achadas.length) return null;

    let atual = null;
    const chips = h('div.lentes');
    const painel = h('div.lente-painel');
    const rodape = h('div');

    function escolher(item) {
      atual = item.lente.id;
      Array.from(chips.children).forEach((b) => {
        b.dataset.on = String(b.dataset.lente === atual);
      });

      clear(painel);
      painel.appendChild(h('div.lente-cab',
        h('span.ico', item.lente.icone),
        h('div',
          h('b', item.lente.nome),
          h('span', item.lente.pitch))));
      painel.appendChild(h('div.lente-corpo', corpoDe(item.conteudo, ctx)));

      if (CZ.profile) CZ.profile.registrarLente(item.lente.id, ctx);

      clear(rodape);
      rodape.appendChild(h('div.lente-rodape',
        h('span.dim', 'Ainda não fechou?'),
        h('button.btn.btn-sm.btn-quiet', {
          onClick: () => { const prox = proxima(); if (prox) escolher(prox); }
        }, 'Tentar outra lente'),
        h('button.btn.btn-sm.btn-quiet', {
          onClick: () => opts.onSOS ? opts.onSOS() : CZ.app.openSOS(ctx.trackTopic || null)
        }, 'O problema é antes disso')));
    }

    function proxima() {
      const i = achadas.findIndex((a) => a.lente.id === atual);
      return achadas[(i + 1) % achadas.length];
    }

    achadas.forEach((item) => {
      chips.appendChild(h('button.lente-chip', {
        'data-lente': item.lente.id, 'data-on': false,
        title: item.lente.pitch,
        onClick: () => escolher(item)
      }, h('i', item.lente.icone), item.lente.nome));
    });

    const node = h('div.explicador',
      h('div.explicador-cab',
        CZ.mascote.draw('apoio', { tamanho: 46 }),
        h('div',
          h('b', opts.titulo || 'Não entendi assim'),
          h('span', `${achadas.length} jeitos diferentes de explicar a mesma coisa. Se um não pegar, tenta outro — é para isso que eles existem.`))),
      chips, painel, rodape);

    if (opts.aberto && achadas.length) escolher(achadas[0]);
    return node;
  }

  /** Versão compacta: só o botão, que abre o painel abaixo. */
  function ExplainerDobrado(ctx, opts) {
    const area = h('div');
    let aberto = false;
    const btn = h('button.btn.btn-danger-soft', {
      onClick: () => {
        aberto = !aberto;
        clear(area);
        btn.textContent = aberto ? 'Fechar as explicações' : '🤔 Não entendi';
        if (aberto) {
          const p = Explainer(ctx, { ...opts, aberto: true });
          if (p) area.appendChild(p);
          else area.appendChild(h('p.muted.mt-16',
            'Não há outra explicação escrita para este passo. Se travou, o botão "Estou perdido" sonda seus pré-requisitos.'));
        }
      }
    }, '🤔 Não entendi');

    return h('div.helpbar',
      h('div.row.gap-10.wrapf', btn,
        h('span.dim', { style: { fontSize: '13px' } },
          'Posso explicar de outro jeito — tem várias lentes.')),
      area);
  }

  CZ.explainer = { Explainer, ExplainerDobrado };
})(window.CZ);
