/* ==========================================================================
   pages/topic.js — a ficha de um tópico.

   A ordem das seções é o método, e por isso é fixa: primeiro o que é e
   por que existe, depois as duas explicações, os três exemplos, a
   aplicação, as fórmulas, os erros, os exercícios e a revisão.

   Duas decisões que valem comentário:

   1. Os exercícios ficam fechados até o aluno escolher o nível. Abrir a
      ficha e cair direto numa lista de questões empurra para o "tenta e
      vê", que é justamente o hábito que a plataforma combate.

   2. Se os pré-requisitos estão fracos, isso aparece ANTES do conteúdo.
      É o diagnóstico que dá nome ao projeto: o problema quase nunca é o
      tópico que está na tela.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;
  const E = CZ.engine;
  const S = CZ.syllabus;

  function secao(titulo, ...corpo) {
    return h('section.sheet-sec',
      h('h3.sheet-h', titulo),
      ...corpo);
  }

  /* ---------------- cabeçalho: caminho, nível, objetivo ---------------- */

  function cabecalho(state, t) {
    const caminho = S.pathOf(t.id);
    const pct = E.topicMastery(state, t.id);
    const nivel = E.levelFor(pct);

    return h('header',
      h('div.crumbs',
        h('button', { onClick: () => CZ.router.go('/base') }, 'Base'),
        h('span', '›'),
        h('button', { onClick: () => CZ.router.go('/base/' + caminho.discipline.id) }, caminho.discipline.name),
        h('span', '›'),
        h('span.dim', caminho.module.name),
        h('span', '›'),
        h('span.dim', caminho.unit.name)),

      h('h2.mt-16', t.name),

      h('div.row.gap-10.wrapf.mt-8',
        h('span.selo', { 'data-level': CZ.sheets.has(t.id) ? nivel.id : 'mapeado' },
          h('i', CZ.sheets.has(t.id) ? nivel.mark : '○'),
          CZ.sheets.has(t.id) ? nivel.name : 'mapeado'),
        CZ.sheets.has(t.id) ? h('span.dim', { style: { fontSize: '13px' } }, `${pct}% de domínio`) : null),

      h('div.card.card-pad-sm.mt-16', { style: { background: 'var(--accent-soft)', border: 0 } },
        h('div.eyebrow', 'Objetivo deste tópico'),
        h('p', { style: { margin: '6px 0 0', fontSize: '15px' } }, t.goal))
    );
  }

  /* ---------------- pré-requisitos e desbloqueios ---------------- */

  function preRequisitos(state, t) {
    const diretos = t.requires.map((id) => S.topic(id)).filter(Boolean);
    const destrava = S.dependents(t.id);
    const gap = E.topicGap(state, t.id);

    if (!diretos.length && !destrava.length) return null;

    return h('div',
      gap ? h('div.card.mt-16', { style: { background: 'var(--signal-soft)', border: 0 } },
        h('h4', { style: { color: 'var(--signal)' } }, 'Antes de começar por aqui'),
        h('p', { style: { margin: '8px 0 0', fontSize: '15px' } },
          gap.motivo === 'errando-aqui'
            ? `Você está errando em ${t.name}, e o pré-requisito mais frágil é ${gap.topic.name} — ${gap.mastery}% de domínio. ` +
              'Quase sempre o erro está lá, não aqui: a conta trava no passo anterior e parece dificuldade do assunto novo.'
            : `Você já tentou ${gap.topic.name} e ficou em ${gap.mastery}% de domínio. Ele sustenta ${t.name}. ` +
              'Seguir sem isso firme costuma virar decoreba: você acompanha o passo a passo, mas não consegue adaptar.'),
        h('div.mt-16',
          h('button.btn.btn-primary', { onClick: () => CZ.router.go('/topico/' + gap.topic.id) },
            'Ir para ' + gap.topic.name))
      ) : null,

      h('div.card.mt-16',
        diretos.length ? h('div',
          h('h4', 'Depende de'),
          h('div.dep-list.mt-8', diretos.map((d) => {
            const p = E.topicMastery(state, d.id);
            const nv = E.levelFor(p);
            const temFicha = CZ.sheets.has(d.id);
            return h('button.dep', { 'data-level': temFicha ? nv.id : 'mapeado',
              onClick: () => CZ.router.go('/topico/' + d.id) },
              h('i', temFicha ? nv.mark : '○'), d.name);
          }))
        ) : null,

        destrava.length ? h('div', { style: { marginTop: diretos.length ? '18px' : '0' } },
          h('h4', 'Dominar isto destrava'),
          h('div.dep-list.mt-8', destrava.slice(0, 8).map((d) =>
            h('button.dep', { onClick: () => CZ.router.go('/topico/' + d.id) }, h('i', '→'), d.name))
            .concat(destrava.length > 8
              ? [h('span.dep.static', `e mais ${destrava.length - 8}`)] : []))
        ) : null
      )
    );
  }

  /* ---------------- explicações: as lentes ----------------
     A ficha traz simples e acadêmica, mas o explicador monta muito mais do
     que isso a partir do mesmo conteúdo — analogia, escada de passos, erro
     comum, fórmula comentada, pergunta guiada. E oferece na ordem que já
     funcionou para esta pessoa. */
  function explicacoes(sheet, t) {
    const painel = CZ.explainer.Explainer(
      { topicId: t.id, trackTopic: t.track || null },
      { titulo: 'Escolha como entender', aberto: true }
    );
    if (!painel) return null;
    return secao('Como entender', painel);
  }

  /* ---------------- exemplos em três níveis ---------------- */

  function exemplos(sheet) {
    if (!sheet.examples || !sheet.examples.length) return null;

    const itens = sheet.examples.map((ex) => {
      const nome = (CZ.sheets.EXAMPLE_LEVELS.find((l) => l.id === ex.level) || {}).name || 'Exemplo';
      const passos = h('div.exemplo-passos');
      let aberto = false;

      const btn = h('button.btn.btn-sm.btn-ghost.mt-8', { onClick: () => {
        aberto = !aberto;
        clear(passos);
        btn.textContent = aberto ? 'Esconder a resolução' : 'Ver a resolução passo a passo';
        if (!aberto) return;
        passos.appendChild(h('ol.solution-steps', (ex.steps || []).map((s) => h('li', s))));
        passos.appendChild(h('p.exemplo-resp', { html: `<strong>Resposta: ${ex.answer}</strong>` }));
      } }, 'Ver a resolução passo a passo');

      return h('div.exemplo', { 'data-level': ex.level },
        h('div.exemplo-tag', nome),
        h('div.exemplo-prompt', { html: ex.prompt }),
        btn, passos);
    });

    return secao('Exemplos', h('div.exemplos', itens));
  }

  /* ---------------- exercícios por nível ---------------- */

  function exercicios(state, t) {
    const count = CZ.sheets.drillCount(t.id);
    if (!count.total) return null;

    const area = h('div.mt-16');

    function abrirNivel(lv) {
      const lista = CZ.sheets.drillsByLevel(t.id, lv.id);
      if (!lista.length) return;
      let i = 0, acertos = 0;

      function desenhar() {
        clear(area);
        if (i >= lista.length) return resumo();
        const ex = lista[i];
        area.appendChild(h('div.card',
          h('div.step-kind', `${lv.name} · ${i + 1} de ${lista.length}`),
          CZ.ui.Exercise(ex, {
            onDone: (ok) => { if (ok) acertos++; i++; desenhar(); },
            nextLabel: i === lista.length - 1 ? 'Ver resultado' : 'Próximo'
          })));
      }

      function resumo() {
        const pct = E.topicMastery(CZ.store.get(), t.id);
        const nv = E.levelFor(pct);
        clear(area);
        area.appendChild(h('div.card.center',
          h('h3', `${acertos} de ${lista.length}`),
          h('p.muted', { style: { marginTop: '8px' } },
            acertos === lista.length
              ? 'Nível limpo. Suba um degrau — é lá que o domínio realmente cresce.'
              : 'Erro aqui é informação, não fracasso. Releia a solução do que caiu e refaça.'),
          h('div', { style: { maxWidth: '320px', margin: '18px auto' } },
            CZ.ui.Bar(pct, pct >= 85 ? 'ok' : pct >= 60 ? null : 'warn'),
            h('p.dim', { style: { fontSize: '12.5px', marginTop: '8px' } },
              `${t.name}: ${nv.name} · ${pct}%`)),
          h('div.row.gap-10.wrapf', { style: { justifyContent: 'center' } },
            h('button.btn.btn-ghost', { onClick: () => { i = 0; acertos = 0; desenhar(); } }, 'Refazer este nível'),
            h('button.btn.btn-primary', { onClick: () => { clear(area); CZ.app.refresh(); } }, 'Voltar à ficha'))));
      }

      desenhar();
      area.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    const botoes = CZ.sheets.DRILL_LEVELS.filter((lv) => count[lv.id]).map((lv) => {
      const prog = E.topicProgress(state, t.id);
      const feitos = prog ? CZ.sheets.drillsByLevel(t.id, lv.id).filter((e) => prog.done.includes(e.id)).length : 0;
      return h('button.drill-card', { 'data-level': lv.id, onClick: () => abrirNivel(lv) },
        h('div.drill-head',
          h('span.nm', lv.name),
          h('span.qtd', `${feitos}/${count[lv.id]}`)),
        h('span.blurb', lv.blurb));
    });

    return secao('Exercícios',
      h('p.muted', { style: { fontSize: '14.5px' } },
        'Comece pelo nível em que você ainda erra. Pular direto para o avançado não acelera nada — só produz a sensação de que o assunto é impossível.'),
      h('div.drills.mt-16', botoes),
      area);
  }

  /* ---------------- tópico ainda sem ficha ---------------- */

  function semFicha(state, t) {
    return h('div.wrap',
      h('div.lesson-shell',
        cabecalho(state, t),

        t.sub.length ? secao('O que este tópico cobre',
          h('ul.sub-list', t.sub.map((s) => h('li', s)))) : null,

        preRequisitos(state, t),

        h('div.card.mt-24', { style: { background: 'var(--surface-2)', border: 0 } },
          h('h4', 'A ficha completa deste tópico ainda não foi escrita'),
          h('p.muted', { style: { fontSize: '14.5px', margin: '10px 0 0' } },
            'O tópico já está no mapa: objetivo, subtópicos e lugar no grafo de pré-requisitos. Falta o conteúdo — explicações, exemplos, erros comuns e exercícios.'),
          h('p.muted', { style: { fontSize: '14.5px', margin: '10px 0 0' } },
            'Enquanto isso ele não tranca nada: um pré-requisito sem ficha nunca bloqueia o tópico seguinte.'),
          h('div.row.gap-10.wrapf.mt-16',
            h('button.btn.btn-ghost', { onClick: () => CZ.router.go('/base/' + t.discipline) }, 'Ver a disciplina'),
            h('button.btn.btn-ghost', { onClick: () => CZ.app.openSOS(null) }, 'Achar o que estudar agora')))
      ));
  }

  /* ---------------- render ---------------- */

  function render(params) {
    const state = CZ.store.get();
    const t = S.topic(params.topicId);
    if (!t) return h('div.wrap', h('div.card', h('h3', 'Tópico não encontrado')));

    const sheet = CZ.sheets.get(t.id);
    if (!sheet) return semFicha(state, t);

    E.markTopicSeen(t.id);

    const lab = t.lab ? CZ.labs.get(t.lab) : (sheet.lab ? CZ.labs.get(sheet.lab) : null);
    const viz = sheet.viz ? CZ.viz.build({ type: sheet.viz }) : null;

    return h('div.wrap',
      h('div.lesson-shell',
        cabecalho(state, t),
        preRequisitos(state, t),

        sheet.whatIs ? secao('O que é', h('div.step-body', { html: sheet.whatIs })) : null,
        sheet.whyExists ? secao('Por que isso existe', h('div.step-body', { html: sheet.whyExists })) : null,

        explicacoes(sheet, t),
        viz ? secao('Visualize', viz) : null,
        exemplos(sheet),

        sheet.application ? secao('Aplicação real',
          h('div.aplicacao',
            h('span.chip.pri', sheet.application.area),
            h('div.mt-8', { html: sheet.application.text }))) : null,

        sheet.formulas && sheet.formulas.length ? secao('Fórmulas',
          h('div.formulas', sheet.formulas.map((f) =>
            h('div.formula',
              h('div.f', f.f),
              f.note ? h('div.n', f.note) : null)))) : null,

        sheet.mistakes && sheet.mistakes.length ? secao('Erros comuns',
          h('div.erros', sheet.mistakes.map((m) =>
            h('div.erro',
              h('div.erro-tit', m.erro),
              h('div.erro-pq', h('b', 'Por que acontece: '), m.porque),
              h('div.erro-ok', h('b', 'O correto: '), m.certo))))) : null,

        sheet.tip ? h('div.card.mt-24.dica',
          h('div.eyebrow', 'Dica'),
          h('p', { style: { margin: '8px 0 0', fontSize: '15px' } }, sheet.tip)) : null,

        exercicios(state, t),

        sheet.review && sheet.review.length ? secao('Revisão',
          h('ul.revisao', sheet.review.map((r) => h('li', r)))) : null,

        lab ? secao('Laboratório interativo',
          h('button.lab-cta', { onClick: () => CZ.router.go('/lab/' + lab.id) },
            h('span.ico', lab.icon),
            h('span',
              h('b', lab.name),
              h('span.dim', lab.pergunta)),
            h('span.go', '›'))) : null,

        h('div.mt-32', navegacaoFinal(t))
      ));
  }

  /** Para onde ir depois: o próximo tópico da unidade, ou o que isto destrava. */
  function navegacaoFinal(t) {
    const irmaos = S.topicsOfUnit(t.unit);
    const idx = irmaos.findIndex((x) => x.id === t.id);
    const proximo = irmaos[idx + 1] || S.dependents(t.id)[0] || null;

    return h('div.row.gap-10.wrapf',
      idx > 0 ? h('button.btn.btn-ghost', { onClick: () => CZ.router.go('/topico/' + irmaos[idx - 1].id) },
        '← ' + irmaos[idx - 1].name) : null,
      proximo ? h('button.btn.btn-primary.grow', { onClick: () => CZ.router.go('/topico/' + proximo.id) },
        'Próximo: ' + proximo.name) : null);
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.topic = render;
})(window.CZ);
