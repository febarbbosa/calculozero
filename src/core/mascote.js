/* ==========================================================================
   core/mascote.js — o Zero.

   Um mascote existe para uma coisa só: dar a quem estuda a sensação de que
   tem alguém do lado. Numa plataforma cujo princípio é "você não é ruim em
   matemática", isso não é enfeite — é o tom do produto virando personagem.

   O Zero é literalmente o zero do nome. Corpo oval, olhos grandes, braços
   curtos. Ele muda de expressão conforme o momento, e o que ele diz muda
   conforme o que o aluno está fazendo — nunca é elogio vazio, e ele nunca
   finge que um erro foi acerto.

   Desenhado em SVG à mão, como o resto do projeto: sem dependência, sem
   imagem externa, funcionando offline.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h } = CZ.dom;

  /* Cada expressão descreve olhos, boca e braços. Manter isso como dados
     evita seis funções de desenho quase iguais. */
  const FACES = {
    neutro: {
      olhos: 'abertos', boca: 'sorriso-leve', bracos: 'lado',
      corpo: 'var(--accent)'
    },
    feliz: {
      olhos: 'felizes', boca: 'sorriso', bracos: 'lado',
      corpo: 'var(--accent)'
    },
    comemora: {
      olhos: 'felizes', boca: 'aberta', bracos: 'cima',
      corpo: 'var(--accent)', pulo: true
    },
    pensando: {
      olhos: 'olhando', boca: 'reta', bracos: 'queixo',
      corpo: 'var(--d6)'
    },
    curioso: {
      olhos: 'grandes', boca: 'o', bracos: 'lado',
      corpo: 'var(--d3)', inclina: -8
    },
    preocupado: {
      olhos: 'caidos', boca: 'ondulada', bracos: 'baixo',
      corpo: 'var(--signal)'
    },
    apoio: {
      olhos: 'abertos', boca: 'sorriso-leve', bracos: 'aceno',
      corpo: 'var(--d2)'
    },
    dormindo: {
      olhos: 'fechados', boca: 'reta', bracos: 'baixo',
      corpo: 'var(--ink-3)', zzz: true
    }
  };

  /* ---------------- peças do desenho ---------------- */

  function olhos(tipo) {
    const g = h('g');
    const par = (cx) => {
      if (tipo === 'fechados' || tipo === 'felizes') {
        // arco para cima: olho fechado de contentamento
        g.appendChild(h('path', {
          d: `M ${cx - 7} 44 q 7 ${tipo === 'felizes' ? -9 : 6} 14 0`,
          fill: 'none', stroke: '#10241A', 'stroke-width': 3.2, 'stroke-linecap': 'round'
        }));
        return;
      }
      const r = tipo === 'grandes' ? 9 : 7.5;
      g.appendChild(h('circle', { cx, cy: 43, r, fill: '#fff' }));
      const desloc = tipo === 'olhando' ? 2.4 : 0;
      g.appendChild(h('circle', {
        cx: cx + desloc, cy: tipo === 'caidos' ? 45 : 43,
        r: tipo === 'grandes' ? 4.6 : 3.8, fill: '#10241A'
      }));
      g.appendChild(h('circle', { cx: cx + desloc + 1.6, cy: 41, r: 1.4, fill: '#fff', opacity: .9 }));
    };
    par(35); par(65);

    if (tipo === 'caidos') {
      // Sobrancelha preocupada sobe na ponta de dentro. Descendo, viraria
      // cara de bravo — e o Zero nunca fica bravo com quem errou.
      g.appendChild(h('path', { d: 'M 26 35 q 8 -2 16 -5', fill: 'none',
        stroke: '#10241A', 'stroke-width': 2.6, 'stroke-linecap': 'round' }));
      g.appendChild(h('path', { d: 'M 74 35 q -8 -2 -16 -5', fill: 'none',
        stroke: '#10241A', 'stroke-width': 2.6, 'stroke-linecap': 'round' }));
    }
    return g;
  }

  function boca(tipo) {
    if (tipo === 'aberta') {
      return h('path', { d: 'M 40 58 q 10 14 20 0 q -10 5 -20 0 z', fill: '#10241A' });
    }
    if (tipo === 'o') {
      return h('ellipse', { cx: 50, cy: 60, rx: 5, ry: 6, fill: '#10241A' });
    }
    if (tipo === 'reta') {
      return h('line', { x1: 43, y1: 60, x2: 57, y2: 60,
        stroke: '#10241A', 'stroke-width': 3, 'stroke-linecap': 'round' });
    }
    if (tipo === 'ondulada') {
      return h('path', { d: 'M 41 61 q 4.5 -5 9 0 q 4.5 5 9 0', fill: 'none',
        stroke: '#10241A', 'stroke-width': 3, 'stroke-linecap': 'round' });
    }
    const largura = tipo === 'sorriso' ? 11 : 7;
    return h('path', {
      d: `M ${50 - largura} 57 q ${largura} ${tipo === 'sorriso' ? 12 : 8} ${largura * 2} 0`,
      fill: 'none', stroke: '#10241A', 'stroke-width': 3.2, 'stroke-linecap': 'round'
    });
  }

  function bracos(tipo, cor) {
    const g = h('g');
    const traco = (d) => g.appendChild(h('path', {
      d, fill: 'none', stroke: cor, 'stroke-width': 7, 'stroke-linecap': 'round'
    }));
    if (tipo === 'cima') { traco('M 16 62 L 6 40'); traco('M 84 62 L 94 40'); }
    else if (tipo === 'aceno') { traco('M 16 66 L 8 74'); traco('M 84 64 L 94 44'); }
    else if (tipo === 'queixo') { traco('M 16 66 L 8 74'); traco('M 84 66 Q 78 74 62 68'); }
    else if (tipo === 'baixo') { traco('M 16 66 L 10 78'); traco('M 84 66 L 90 78'); }
    else { traco('M 15 64 L 6 70'); traco('M 85 64 L 94 70'); }
    return g;
  }

  /**
   * Desenha o Zero.
   * @param {string} expr  chave de FACES
   * @param {object} opts  { tamanho, animar }
   */
  function draw(expr, opts) {
    opts = opts || {};
    const f = FACES[expr] || FACES.neutro;
    const tam = opts.tamanho || 96;

    const corpo = h('g', { transform: f.inclina ? `rotate(${f.inclina} 50 55)` : null },
      // pés
      h('ellipse', { cx: 38, cy: 92, rx: 9, ry: 5, fill: f.corpo }),
      h('ellipse', { cx: 62, cy: 92, rx: 9, ry: 5, fill: f.corpo }),
      bracos(f.bracos, f.corpo),
      // corpo: o zero
      h('ellipse', { cx: 50, cy: 55, rx: 34, ry: 37, fill: f.corpo }),
      h('ellipse', { cx: 50, cy: 51, rx: 26, ry: 27, fill: 'rgba(255,255,255,.16)' }),
      olhos(f.olhos),
      boca(f.boca)
    );

    const svg = h('svg', {
      viewBox: '0 0 100 100', width: tam, height: tam,
      className: 'mascote' + (opts.animar === false ? '' : ' mascote-vivo'),
      'data-expr': expr, role: 'img', 'aria-label': 'Zero, o mascote'
    }, corpo);

    if (f.zzz) {
      svg.appendChild(h('text', { x: 78, y: 26, fill: 'var(--ink-3)',
        'font-size': 16, 'font-family': 'var(--display)', 'font-weight': 700 }, 'z'));
      svg.appendChild(h('text', { x: 88, y: 16, fill: 'var(--ink-3)',
        'font-size': 11, 'font-family': 'var(--display)', 'font-weight': 700 }, 'z'));
    }
    return svg;
  }

  /* ==================================================================
     O que o Zero diz.

     Regra de escrita: nunca elogio vazio, nunca "parabéns!" sozinho.
     Cada fala ou nomeia o que aconteceu, ou aponta o próximo passo.
     ================================================================== */
  const FALAS = {
    acerto: [
      'Isso. Você fez o passo do meio certo — é onde a maioria escorrega.',
      'Fechou. Repare que você não precisou de dica nessa.',
      'Certo. Guarda esse raciocínio: ele volta no próximo nível.',
      'Boa. Esse tipo de questão costuma cair em prova quase igual.'
    ],
    acertoComDica: [
      'Certo. Pedir dica não desconta nada — o que conta é ter chegado lá.',
      'Fechou. Na próxima tenta um passo a mais antes de abrir a dica.',
      'Isso. A dica te deu o começo; o resto foi você.'
    ],
    erro: [
      'Errou, e agora a gente sabe onde. Olha a solução com calma.',
      'Esse erro é dos comuns. Ler o passo a passo aqui vale mais que refazer no chute.',
      'Sem drama: erro em exercício é informação, não nota.',
      'Quase. O problema está num passo só — acha ele antes de tentar de novo.'
    ],
    erroRepetido: [
      'Segunda vez no mesmo tipo. Isso costuma ser um degrau anterior solto, não este assunto.',
      'Você está errando o mesmo passo. Vale voltar um tópico antes de insistir aqui.'
    ],
    nivelLimpo: [
      'Nível limpo. Sobe um degrau — é no difícil que o domínio cresce.',
      'Todas certas. O próximo nível é onde isso vira firmeza de verdade.'
    ],
    topicoDominado: [
      'Dominado. Esse assunto não vai mais te derrubar lá na frente.',
      'Fechou o tópico. Olha o que ele acabou de destravar.'
    ],
    boasVindas: [
      'Oi. Eu sou o Zero. Começo com você do começo mesmo.',
      'Bora. Você escolhe o ritmo; eu acho o buraco.'
    ],
    volta: [
      'Que bom te ver de novo. Continuo de onde você parou.',
      'De volta. Tem coisa esperando revisão — é rápido.'
    ],
    lacuna: [
      'Achei. O problema não é aqui — é um degrau atrás.',
      'Travou por causa de outro assunto. Deixa eu te levar até ele.'
    ],
    revisao: [
      'Hora de revisar. A memória começa a apagar exatamente agora.',
      'Isso aqui você errou dias atrás. Uma passada rápida resolve.'
    ],
    ocioso: [
      'Ainda por aí? Sem pressa.',
      'Se travou, me chama. Tenho seis jeitos de explicar isso.'
    ]
  };

  /** Sorteia uma fala do grupo, evitando repetir a última. */
  const ultima = {};
  function fala(grupo) {
    const lista = FALAS[grupo];
    if (!lista || !lista.length) return null;
    if (lista.length === 1) return lista[0];
    let i, tentativas = 0;
    do { i = Math.floor(Math.random() * lista.length); }
    while (i === ultima[grupo] && ++tentativas < 5);
    ultima[grupo] = i;
    return lista[i];
  }

  /** Expressão adequada a um grupo de fala. */
  const EXPR_DE = {
    acerto: 'feliz', acertoComDica: 'feliz', nivelLimpo: 'comemora',
    topicoDominado: 'comemora', erro: 'apoio', erroRepetido: 'pensando',
    boasVindas: 'curioso', volta: 'feliz', lacuna: 'pensando',
    revisao: 'apoio', ocioso: 'dormindo'
  };

  /**
   * Bloco pronto: mascote + balão de fala. É o que as telas usam.
   * `grupo` escolhe a fala e a expressão; `texto` sobrepõe a fala sorteada.
   */
  function diz(grupo, opts) {
    opts = opts || {};
    const texto = opts.texto || fala(grupo) || '';
    const expr = opts.expr || EXPR_DE[grupo] || 'neutro';

    return h('div.zero-fala', { 'data-lado': opts.lado || 'esq' },
      draw(expr, { tamanho: opts.tamanho || 72 }),
      h('div.balao',
        h('p', texto),
        opts.acao || null)
    );
  }

  CZ.mascote = { draw, diz, fala, FACES, FALAS, EXPR_DE };
})(window.CZ);
