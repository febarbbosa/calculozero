/* ==========================================================================
   core/explain.js — as lentes de explicação.

   O princípio: uma explicação que não pegou não fica melhor repetida mais
   devagar. Ela precisa mudar de natureza. Por isso o mesmo conteúdo é
   servido por lentes diferentes — analogia, passo a passo, imagem mental,
   erro comum, formalismo, código, pergunta guiada.

   Cada lente declara de onde tira o conteúdo. Quase todas leem o que já
   existe (a ficha, a aula, os exercícios); as que precisam de material
   próprio simplesmente não aparecem quando ele não foi escrito. Nenhuma
   lente inventa conteúdo.

   Qual lente o aluno escolhe é informação valiosa: `core/profile.js` usa
   isso para descobrir como essa pessoa entende, e passa a oferecer
   primeiro o que funcionou antes.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  /* ------------------------------------------------------------------
     Catálogo de lentes. `pega(ctx)` devolve o conteúdo ou null.
     ------------------------------------------------------------------ */

  const sheetDe = (ctx) => (ctx.topicId && CZ.sheets.get(ctx.topicId)) || null;
  const lessonDe = (ctx) => (ctx.lessonId && CZ.lessons.byId[ctx.lessonId]) || null;
  const passoDe = (ctx) => {
    const l = lessonDe(ctx);
    return l && typeof ctx.stepIndex === 'number' ? l.steps[ctx.stepIndex] : null;
  };
  const exDe = (ctx) => (ctx.exerciseId && CZ.exercises.byId[ctx.exerciseId]) || null;

  const txt = (t) => (t ? { tipo: 'texto', texto: t } : null);
  const html = (t) => (t ? { tipo: 'html', html: t } : null);

  const LENTES = [
    {
      id: 'simples', nome: 'Mais simples', icone: '🍃',
      pitch: 'A mesma ideia com menos palavras.',
      pega: (ctx) => {
        const p = passoDe(ctx);
        if (p && p.alt && p.alt.simples) return txt(p.alt.simples);
        const sh = sheetDe(ctx);
        return sh && sh.simple ? txt(sh.simple) : null;
      }
    },
    {
      id: 'cotidiano', nome: 'No dia a dia', icone: '🧺',
      pitch: 'Um exemplo fora da matemática.',
      pega: (ctx) => {
        const p = passoDe(ctx);
        if (p && p.alt && p.alt.cotidiano) return txt(p.alt.cotidiano);
        const sh = sheetDe(ctx);
        if (sh && sh.application) {
          return { tipo: 'html', html: `<p><strong>${sh.application.area}.</strong> ${sh.application.text}</p>` };
        }
        return null;
      }
    },
    {
      id: 'visual', nome: 'Visualmente', icone: '👁',
      pitch: 'Uma imagem mental para pendurar a ideia.',
      pega: (ctx) => {
        const p = passoDe(ctx);
        if (p && p.alt && p.alt.visual) return txt(p.alt.visual);
        const sh = sheetDe(ctx);
        if (sh && sh.viz) return { tipo: 'viz', viz: sh.viz };
        if (sh && sh.lab) return { tipo: 'lab', lab: sh.lab };
        const t = ctx.topicId && CZ.syllabus.topic(ctx.topicId);
        return t && t.lab ? { tipo: 'lab', lab: t.lab } : null;
      }
    },
    {
      id: 'passos', nome: 'Passo a passo', icone: '🪜',
      pitch: 'O raciocínio quebrado em etapas.',
      pega: (ctx) => {
        const p = passoDe(ctx);
        if (p && p.alt && p.alt.passos) return txt(p.alt.passos);
        const sh = sheetDe(ctx);
        const ex = sh && sh.examples && sh.examples[0];
        if (ex && ex.steps) {
          return { tipo: 'lista', titulo: ex.prompt, itens: ex.steps, fim: 'Resposta: ' + ex.answer };
        }
        return null;
      }
    },
    {
      id: 'porque', nome: 'Por que existe', icone: '🌱',
      pitch: 'O problema que fez isso ser inventado.',
      pega: (ctx) => {
        const sh = sheetDe(ctx);
        if (sh && sh.whyExists) return html(sh.whyExists);
        const l = lessonDe(ctx);
        return l && l.why ? txt(l.why) : null;
      }
    },
    {
      id: 'erro', nome: 'Pelo erro comum', icone: '🪤',
      pitch: 'Entender vendo o que dá errado.',
      pega: (ctx) => {
        const sh = sheetDe(ctx);
        if (sh && sh.mistakes && sh.mistakes.length) {
          return { tipo: 'erros', itens: sh.mistakes };
        }
        const ex = exDe(ctx);
        if (ex && ex.traps && Object.keys(ex.traps).length) {
          return { tipo: 'erros', itens: Object.keys(ex.traps).map((k) => ({
            erro: 'Responder ' + k, porque: ex.traps[k], certo: null
          })) };
        }
        return null;
      }
    },
    {
      id: 'outro', nome: 'Outro exemplo', icone: '🔁',
      pitch: 'O mesmo tipo, com outros números.',
      pega: (ctx) => {
        const p = passoDe(ctx);
        if (p && p.alt && p.alt.outro) return txt(p.alt.outro);
        const sh = sheetDe(ctx);
        const ex = sh && sh.examples && (sh.examples[1] || sh.examples[0]);
        if (ex) return { tipo: 'lista', titulo: ex.prompt, itens: ex.steps || [], fim: 'Resposta: ' + ex.answer };
        return null;
      }
    },
    {
      id: 'formula', nome: 'Só a fórmula', icone: '𝑓',
      pitch: 'O que cada símbolo quer dizer.',
      pega: (ctx) => {
        const sh = sheetDe(ctx);
        return sh && sh.formulas && sh.formulas.length
          ? { tipo: 'formulas', itens: sh.formulas } : null;
      }
    },
    {
      id: 'academico', nome: 'Versão formal', icone: '🎓',
      pitch: 'Como o livro escreveria.',
      pega: (ctx) => {
        const sh = sheetDe(ctx);
        return sh && sh.academic ? html(sh.academic) : null;
      }
    },
    {
      id: 'area', nome: 'Para o meu curso', icone: '🎯',
      pitch: 'Como isso aparece na sua área.',
      pega: (ctx) => {
        const area = CZ.store.get().area;
        const l = lessonDe(ctx);
        if (l && l.whyByArea && l.whyByArea[area]) return txt(l.whyByArea[area]);
        const sh = sheetDe(ctx);
        if (sh && sh.byArea && sh.byArea[area]) return txt(sh.byArea[area]);
        return null;
      }
    },
    {
      id: 'codigo', nome: 'Em código', icone: '⌨',
      pitch: 'O conceito virando programa.',
      pega: (ctx) => {
        const sh = sheetDe(ctx);
        return sh && sh.code ? { tipo: 'codigo', ...sh.code } : null;
      }
    },
    {
      id: 'historia', nome: 'De onde veio', icone: '📜',
      pitch: 'Quem inventou isso, e para quê.',
      pega: (ctx) => {
        const sh = sheetDe(ctx);
        return sh && sh.history ? html(sh.history) : null;
      }
    },
    {
      id: 'contra', nome: 'E se não valesse?', icone: '🚫',
      pitch: 'O que quebra quando a regra é ignorada.',
      pega: (ctx) => {
        const sh = sheetDe(ctx);
        return sh && sh.counter ? html(sh.counter) : null;
      }
    },
    {
      id: 'socratico', nome: 'Me pergunte', icone: '❓',
      pitch: 'Perguntas em vez de resposta pronta.',
      pega: (ctx) => {
        /* Montado das dicas do exercício ou dos passos do exemplo: as dicas
           já são uma escada, e uma escada lida como pergunta obriga a
           pensar antes de ver a linha seguinte. */
        const ex = exDe(ctx);
        if (ex && ex.hints && ex.hints.length) {
          return { tipo: 'socratico', itens: ex.hints, fonte: 'exercicio' };
        }
        const sh = sheetDe(ctx);
        const exemplo = sh && sh.examples && sh.examples[0];
        if (exemplo && exemplo.steps && exemplo.steps.length > 1) {
          return { tipo: 'socratico', itens: exemplo.steps, fonte: 'exemplo', titulo: exemplo.prompt };
        }
        return null;
      }
    },
    {
      id: 'resumo', nome: 'Só o essencial', icone: '📌',
      pitch: 'As quatro linhas que precisam ficar.',
      pega: (ctx) => {
        const sh = sheetDe(ctx);
        if (sh && sh.review && sh.review.length) return { tipo: 'bullets', itens: sh.review };
        const l = lessonDe(ctx);
        const rev = l && l.steps.find((s) => s.kind === 'revisao');
        return rev && rev.html ? html(rev.html) : null;
      }
    }
  ];

  const porId = Object.fromEntries(LENTES.map((l) => [l.id, l]));

  /**
   * Quais lentes têm conteúdo para este contexto, já na ordem em que devem
   * ser oferecidas. A ordem vem do perfil do aluno quando ele existe: o
   * jeito que funcionou antes aparece primeiro.
   */
  function disponiveis(ctx) {
    ctx = ctx || {};
    const achadas = [];
    LENTES.forEach((lente) => {
      let conteudo = null;
      try { conteudo = lente.pega(ctx); } catch (_) { conteudo = null; }
      if (conteudo) achadas.push({ lente, conteudo });
    });

    const pref = CZ.profile && CZ.profile.ordemDeLentes
      ? CZ.profile.ordemDeLentes()
      : null;
    if (!pref) return achadas;

    return achadas.slice().sort((a, b) => {
      const ia = pref.indexOf(a.lente.id), ib = pref.indexOf(b.lente.id);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  }

  function conteudoDe(lenteId, ctx) {
    const l = porId[lenteId];
    if (!l) return null;
    try { return l.pega(ctx || {}); } catch (_) { return null; }
  }

  CZ.explain = { LENTES, porId, disponiveis, conteudoDe };
})(window.CZ);
