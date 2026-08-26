/* ==========================================================================
   pages/perfil.js — o que a plataforma acha que sabe sobre você.

   Um sistema que observa o comportamento de alguém e muda de conduta por
   causa disso precisa mostrar o que concluiu. Esta tela existe por isso, e
   segue três regras:

   1. Toda inferência aparece com a evidência que a produziu ("você abriu
      esta lente 7 vezes e acertou 5 exercícios depois").
   2. Nada é apresentado como diagnóstico definitivo. São leituras de
      comportamento, e a tela diz isso.
   3. Dá para apagar tudo, sem perder o progresso de estudo.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h } = CZ.dom;

  function leitura(titulo, valor, porque, extra) {
    return h('div.leitura',
      h('div.leitura-topo',
        h('span.rot', titulo),
        h('span.val', valor)),
      h('p.pq', porque),
      extra || null);
  }

  function render() {
    const r = CZ.profile.retrato();

    if (!r.maduro) {
      return h('div.wrap', h('div.lesson-shell',
        h('p.eyebrow', 'Seu perfil de estudo'),
        h('h2', { style: { margin: '10px 0 8px' } }, 'Ainda estou te conhecendo'),
        h('div.card.mt-24',
          h('div.zero-fala',
            CZ.mascote.draw('curioso', { tamanho: 66 }),
            h('div.balao', h('p',
              `Respondi ${r.amostra.respostas} ${r.amostra.respostas === 1 ? 'questão sua' : 'questões suas'} até agora. ` +
              'Com umas oito eu já começo a perceber seu ritmo, quanto apoio você quer e que tipo de explicação funciona melhor para você.')))),
        h('div.card.mt-16', { style: { background: 'var(--surface-2)', border: 0 } },
          h('h4', 'O que eu observo'),
          h('ul.revisao.mt-8',
            h('li', 'Qual lente de explicação você abre — e se o exercício seguinte sai certo.'),
            h('li', 'Quantas dicas você pede antes de tentar.'),
            h('li', 'Quanto tempo cada passo leva.'),
            h('li', 'Erros seguidos, e em qual assunto.'),
            h('li', 'A que horas você costuma estudar.')),
          h('p.muted', { style: { fontSize: '13.5px', marginTop: '14px' } },
            'Nada disso sai do seu aparelho. É o mesmo armazenamento local do seu progresso.'))
      ));
    }

    const sug = CZ.profile.sugestao();

    return h('div.wrap', h('div.lesson-shell',
      h('p.eyebrow', 'Seu perfil de estudo'),
      h('h2', { style: { margin: '10px 0 8px' } }, 'O que eu percebi de você'),
      h('p.muted', { style: { maxWidth: '56ch' } },
        'Leituras de comportamento, não diagnóstico. Cada uma vem com a evidência que a produziu, e todas mudam conforme você estuda.'),

      sug ? h('div.card.mt-24', { style: { background: 'var(--accent-soft)', border: 0 } },
        h('div.zero-fala',
          CZ.mascote.draw(sug.tom, { tamanho: 66 }),
          h('div.balao',
            h('p', h('b', sug.titulo)),
            h('p', { style: { marginTop: '6px' } }, sug.texto),
            sug.acao ? h('div.mt-16',
              h('button.btn.btn-sm.btn-primary', {
                onClick: () => {
                  if (sug.acao.sos) return CZ.app.openSOS(null);
                  if (sug.acao.ir) return CZ.router.go(sug.acao.ir);
                  CZ.router.go('/base');
                }
              }, sug.acao.rotulo)) : null))) : null,

      h('div.card.mt-16',
        h('h4', 'Leituras'),
        h('div.leituras.mt-16',
          r.lente
            ? leitura('Explicação que funciona', r.lente.icone + ' ' + r.lente.nome, r.lente.porque,
                h('p.acao', 'Passei a oferecer essa lente primeiro quando você abre "Não entendi".'))
            : leitura('Explicação que funciona', 'ainda não sei',
                'Abra as lentes do "Não entendi" algumas vezes e eu descubro qual delas te destrava.'),

          r.ritmo
            ? leitura('Ritmo', r.ritmo.nome, r.ritmo.porque,
                r.ritmo.cuidado ? h('p.acao', r.ritmo.cuidado) : null)
            : leitura('Ritmo', 'medindo', 'Preciso de mais alguns passos cronometrados.'),

          r.apoio
            ? leitura('Quanto apoio você quer', r.apoio.nome, r.apoio.porque,
                r.apoio.acao ? h('p.acao', r.apoio.acao) : null)
            : leitura('Quanto apoio você quer', 'medindo', 'Ainda são poucos exercícios para saber.'),

          r.horario
            ? leitura('Quando você rende', r.horario.faixa, r.horario.porque)
            : leitura('Quando você rende', 'medindo', 'Preciso de mais sessões em horários diferentes.'),

          leitura('Como está agora',
            r.risco.nivel === 'alto' ? 'cansado' : r.risco.nivel === 'medio' ? 'travando' : 'tranquilo',
            r.risco.porque)
        )),

      r.fragilidades.length ? h('div.card.mt-16',
        h('h4', 'Assuntos que voltam a falhar'),
        h('p.muted', { style: { fontSize: '14px', margin: '8px 0 0' } },
          'Erro que se repete raramente é distração. Costuma ser um conceito anterior pela metade.'),
        h('div.mt-16', r.fragilidades.map((f) =>
          h('button.topic-row', {
            onClick: () => CZ.router.go(
              CZ.syllabus.topic(f.id) ? '/topico/' + f.id : '/praticar/' + f.id)
          },
            h('div.topic-row-main',
              h('div.topic-row-head',
                h('span.nm', f.topico.name),
                h('span.chip.err', `${f.erros} erros`)),
              h('div.topic-row-goal', f.topico.goal || f.topico.desc || '')),
            h('span.topic-row-go', '›'))))
      ) : null,

      r.ordemLentes && r.ordemLentes.length > 1 ? h('div.card.mt-16',
        h('h4', 'Sua ordem de lentes'),
        h('p.muted', { style: { fontSize: '14px', margin: '8px 0 12px' } },
          'É nesta ordem que as explicações aparecem para você. Quem funcionou vem primeiro.'),
        h('div.lentes', r.ordemLentes.map((id, i) => {
          const l = CZ.explain.porId[id];
          if (!l) return null;
          return h('span.lente-chip', { 'data-on': i === 0 }, h('i', l.icone), l.nome);
        }))
      ) : null,

      h('div.card.mt-16', { style: { background: 'var(--surface-2)', border: 0 } },
        h('h4', 'Onde isso fica'),
        h('p.muted', { style: { fontSize: '14px', margin: '8px 0 0' } },
          `${r.amostra.respostas} respostas e ${r.amostra.sessoes} ${r.amostra.sessoes === 1 ? 'sessão' : 'sessões'} registradas desde ` +
          new Date(r.amostra.desde).toLocaleDateString('pt-BR') + '. ' +
          'Tudo guardado no seu próprio aparelho — nada é enviado para lugar nenhum.'),
        h('div.row.gap-10.mt-16.wrapf',
          h('button.btn.btn-sm.btn-ghost', {
            onClick: () => {
              CZ.ui.modal('Apagar o que eu aprendi sobre você?',
                h('p', 'Some a leitura de ritmo, de apoio e de lentes. Seu progresso de estudo, XP e domínio ficam intactos.'),
                (close) => [
                  h('button.btn.btn-ghost', { onClick: close }, 'Cancelar'),
                  h('button.btn.btn-danger-soft', {
                    onClick: () => { CZ.profile.esquecer(); close(); CZ.app.refresh(); }
                  }, 'Apagar o perfil')
                ]);
            }
          }, 'Apagar meu perfil de estudo')))
    ));
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.perfil = render;
})(window.CZ);
