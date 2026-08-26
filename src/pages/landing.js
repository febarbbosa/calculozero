/* ==========================================================================
   pages/landing.js — porta de entrada.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h } = CZ.dom;

  const BENEFITS = [
    { ico: '🎯', t: 'Começa onde você está', d: 'Um diagnóstico curto descobre suas lacunas reais. Você não repete o que já sabe.' },
    { ico: '🧩', t: 'Aulas pequenas', d: 'Cada aula tem sete passos curtos e termina com você resolvendo algo sozinho.' },
    { ico: '📐', t: 'Gráficos que você mexe', d: 'Tangente, área, limite: você arrasta e vê o conceito acontecer antes de decorar a fórmula.' },
    { ico: '🆘', t: 'Botão "não entendi"', d: 'Seis jeitos diferentes de explicar a mesma coisa. Se um não pegar, tente outro.' },
    { ico: '🔁', t: 'Revisão automática', d: 'O que você errou volta alguns dias depois, no momento em que a memória começa a falhar.' },
    { ico: '🧭', t: 'GPS da matemática', d: 'Travou numa derivada por causa de fração? A plataforma detecta e te leva de volta ao ponto certo.' }
  ];

  const HOW = [
    { t: 'Você faz um diagnóstico curto', d: 'Perguntas simples primeiro, subindo aos poucos. Sem pegadinha e sem nota.' },
    { t: 'A plataforma monta seu mapa', d: 'Você vê exatamente quais assuntos estão firmes e quais precisam de reforço.' },
    { t: 'Você estuda em blocos curtos', d: 'Contexto, explicação, exemplo, visualização e prática — nessa ordem, sempre.' },
    { t: 'O sistema volta ao que falta', d: 'Errou muito num assunto? Ele reaparece na revisão em vez de virar buraco.' }
  ];

  /**
   * Elemento-assinatura: a trilha desenhada como pontos plotados sobre a malha
   * de coordenadas. A altura de cada ponto é a profundidade do assunto, então
   * a curva que sobe é literalmente o percurso do aluno — a estrutura codifica
   * conteúdo, não decora.
   */
  function plot(state) {
    const pts = CZ.curriculum.TOPICS.map((t, i, arr) => ({
      name: t.name.split(' ')[0],
      y: i / (arr.length - 1),
      open: CZ.engine.isUnlocked(state, t.id)
    }));

    const W = 100, H = 100;
    const x = (i) => (i / (pts.length - 1)) * (W - 8) + 4;
    const y = (v) => H - 8 - v * (H - 20);
    const line = pts.map((p, i) => `${x(i)},${y(p.y)}`).join(' ');

    return h('div.plot',
      h('div.plot-label', 'a trilha inteira · cada ponto abre quando o anterior firma'),
      h('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none',
                 style: { width: '100%', height: '110px', display: 'block' }, 'aria-hidden': 'true' },
        h('polyline', { points: line, fill: 'none', stroke: 'var(--line-2)',
                        'stroke-width': .6, 'vector-effect': 'non-scaling-stroke' }),
        pts.map((p, i) => h('circle', {
          cx: x(i), cy: y(p.y), r: 1.8,
          fill: p.open ? 'var(--accent)' : 'var(--line-2)'
        }))
      ),
      h('div.plot-names', pts.map((p) => h('span', { 'data-dim': !p.open }, p.name)))
    );
  }

  function render(state) {
    const started = state.onboarded || state.diagnostic;

    return h('div',
      /* ---- Hero ---- */
      h('section.hero',
        h('div.wrap',
          h('p.eyebrow', 'Do zero até Cálculo I'),
          h('h1', 'Matemática ', h('span.accent', 'sem medo.'), h('br'), 'Do zero até o cálculo.'),
          h('p.hero-sub', 'Aprenda matemática começando exatamente de onde você está.'),
          h('div.hero-cta',
            h('button.btn.btn-primary.btn-lg', { onClick: () => CZ.router.go('/diagnostico') },
              started ? 'Refazer diagnóstico' : 'Começar diagnóstico'),
            started
              ? h('button.btn.btn-ghost.btn-lg', { onClick: () => CZ.router.go('/painel') }, 'Ir para meu painel')
              : h('button.btn.btn-ghost.btn-lg', { onClick: () => CZ.router.go('/mapa') }, 'Ver o mapa completo')
          ),
          h('p.hero-note', 'Leva uns 4 minutos. Nenhuma pergunta vale nota — serve só para achar seu ponto de partida.'),

          plot(state)
        )
      ),

      /* ---- Benefícios ---- */
      h('section.section',
        h('div.wrap',
          h('div.section-head',
            h('h2', 'O que você encontra aqui'),
            h('p', 'Não é uma lista de vídeos. É um sistema que acompanha onde você está e reage quando você trava.')
          ),
          h('div.grid-3', BENEFITS.map((b) => h('div.card.feat',
            h('div.ico', b.ico), h('h3', b.t), h('p', b.d)
          )))
        )
      ),

      /* ---- Como funciona ---- */
      h('section.section', { style: { paddingTop: '0' } },
        h('div.wrap',
          h('div.section-head', h('h2', 'Como funciona')),
          h('div.steps-how', HOW.map((s, i) => h('div.step-how',
            h('div.num', String(i + 1).padStart(2, '0')),
            h('div', h('h4', s.t), h('p', s.d))
          )))
        )
      ),

      /* ---- Reassurance ---- */
      h('section.section', { style: { paddingTop: '0' } },
        h('div.wrap',
          h('div.reassure',
            h('h2', 'Você não precisa saber matemática para começar'),
            h('p', 'Se você acha que é ruim em matemática, provavelmente o que aconteceu foi outra coisa: em algum momento a base ficou para trás e o conteúdo seguinte foi empilhado em cima mesmo assim. Daí em diante tudo parece difícil — não porque você não consegue, mas porque falta um degrau lá embaixo.'),
            h('p', 'Aqui a lacuna é encontrada e preenchida. Depois você segue em frente.'),
            h('div.quote', '"O aluno não é ruim em matemática. Talvez só esteja tentando aprender algo antes de ter aprendido a base necessária."'),
            h('div.mt-24',
              h('button.btn.btn-primary.btn-lg', { onClick: () => CZ.router.go('/diagnostico') },
                'Descobrir onde eu estou')
            )
          )
        )
      ),

      /* ---- Progresso (se já começou) ---- */
      started ? h('section.section', { style: { paddingTop: '0' } },
        h('div.wrap',
          h('div.card',
            h('div.row.gap-14.wrapf',
              h('div.grow',
                h('h3', 'Seu progresso'),
                h('p.muted', { style: { fontSize: '14px', margin: '4px 0 12px' } },
                  `${CZ.engine.totalLessons(state)} aulas concluídas · ${state.xp} XP`),
                CZ.ui.Bar(CZ.engine.overallProgress(state), null, true)
              ),
              h('button.btn.btn-primary', { onClick: () => CZ.router.go('/painel') }, 'Continuar')
            )
          )
        )
      ) : null
    );
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.landing = render;
})(window.CZ);
