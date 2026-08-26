/* ==========================================================================
   pages/lab.js — tela de laboratório.

   O laboratório não é ilustração: é atividade. Por isso a tela abre com a
   pergunta que ele responde e com a lista do que observar, e só depois
   entrega os controles. Mexer sem saber o que procurar não ensina nada.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h } = CZ.dom;

  /** Tópicos da base curricular que apontam para este laboratório. */
  function topicosDoLab(labId) {
    return CZ.syllabus.allTopics().filter((t) => t.lab === labId);
  }

  function render(params) {
    const lab = CZ.labs.get(params.labId);
    if (!lab) return h('div.wrap', h('div.card', h('h3', 'Laboratório não encontrado')));

    const conteudo = CZ.labs.build(lab.id);
    const ligados = topicosDoLab(lab.id);

    return h('div.wrap',
      h('div.lesson-shell',
        h('div.row.gap-10.wrapf',
          h('button.btn.btn-sm.btn-quiet', { onClick: () => history.length > 1 ? history.back() : CZ.router.go('/base') }, '← Voltar')),

        h('div.lab-hero.mt-16',
          h('span.ico', lab.icon),
          h('div',
            h('p.eyebrow', 'Laboratório interativo'),
            h('h2', { style: { margin: '6px 0 0' } }, lab.name))),

        h('div.card.mt-16', { style: { background: 'var(--accent-soft)', border: 0 } },
          h('div.eyebrow', 'A pergunta'),
          h('p', { style: { margin: '6px 0 0', fontSize: '16px', fontWeight: '600' } }, lab.pergunta)),

        h('div.card.mt-16',
          conteudo || h('p.muted', 'Este laboratório não pôde ser carregado.')),

        h('div.card.mt-16',
          h('h4', 'O que observar'),
          h('ul.revisao.mt-8', lab.observar.map((o) => h('li', o)))),

        ligados.length ? h('div.card.mt-16',
          h('h4', 'Tópicos que usam este laboratório'),
          h('div.dep-list.mt-8', ligados.map((t) =>
            h('button.dep', { onClick: () => CZ.router.go('/topico/' + t.id) }, h('i', '›'), t.name)))
        ) : null,

        h('div.card.mt-16', { style: { background: 'var(--surface-2)', border: 0 } },
          h('h4', 'Todos os laboratórios'),
          h('div.dep-list.mt-8', CZ.labs.all().map((l) =>
            h('button.dep', { 'data-on': l.id === lab.id, onClick: () => CZ.router.go('/lab/' + l.id) },
              h('i', l.icon), l.name))))
      ));
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.lab = render;
})(window.CZ);
