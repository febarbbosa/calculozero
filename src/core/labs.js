/* ==========================================================================
   core/labs.js — laboratórios interativos.

   Diferença entre `viz` e `lab`: uma visualização ilustra um passo de aula
   e cabe dentro dele. Um laboratório é a atividade em si — o aluno mexe em
   parâmetros e persegue uma pergunta. Por isso os laboratórios têm tela
   própria, enunciado e um "o que observar".

   Mesma restrição do resto do projeto: SVG escrito à mão, sem dependência
   externa, funcionando offline.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;
  const { W, HT, C, scale, gridLayer, pathOf, svg, slider, readout, shell } = CZ.viz.helpers;

  /* ---------------- utilitários locais ---------------- */

  function botao(label, ativo, onClick) {
    return h('button.btn.btn-sm' + (ativo ? '.btn-primary' : '.btn-ghost'), { onClick }, label);
  }

  /** Grupo de botões que se comportam como um seletor de opção única. */
  function seletor(opcoes, atual, onPick) {
    const wrap = h('div.row.gap-6.wrapf', { style: { justifyContent: 'center' } });
    function draw() {
      clear(wrap);
      opcoes.forEach((o) => {
        wrap.appendChild(botao(o.label, o.id === atual, () => {
          atual = o.id; draw(); onPick(o.id);
        }));
      });
    }
    draw();
    return wrap;
  }

  function fmt(v, casas) {
    const n = Number(v);
    if (!isFinite(n)) return '—';
    return n.toFixed(casas === undefined ? 2 : casas).replace('.', ',');
  }

  /* ============================================================
     Laboratório de funções
     Uma família por vez, parâmetros ao vivo, e a curva base em
     cinza atrás para que a transformação fique visível.
     ============================================================ */
  function labFuncoes() {
    const FAMILIAS = [
      { id: 'afim',     label: 'Reta',        base: (x) => x,
        f: (x, p) => p.a * x + p.b,
        ctrls: [['a', -4, 4, 0.25, 1], ['b', -5, 5, 0.5, 0]],
        formula: (p) => `f(x) = ${fmt(p.a, 2)}·x ${p.b < 0 ? '−' : '+'} ${fmt(Math.abs(p.b), 2)}` },
      { id: 'quad',     label: 'Parábola',    base: (x) => x * x,
        f: (x, p) => p.a * Math.pow(x - p.h, 2) + p.k,
        ctrls: [['a', -3, 3, 0.25, 1], ['h', -4, 4, 0.5, 0], ['k', -5, 5, 0.5, 0]],
        formula: (p) => `f(x) = ${fmt(p.a, 2)}·(x ${p.h < 0 ? '+' : '−'} ${fmt(Math.abs(p.h), 1)})² ${p.k < 0 ? '−' : '+'} ${fmt(Math.abs(p.k), 1)}` },
      { id: 'expo',     label: 'Exponencial', base: (x) => Math.pow(2, x),
        f: (x, p) => p.a * Math.pow(p.b, x),
        ctrls: [['a', -3, 3, 0.25, 1], ['b', 0.25, 4, 0.25, 2]],
        formula: (p) => `f(x) = ${fmt(p.a, 2)} · ${fmt(p.b, 2)}^x` },
      { id: 'log',      label: 'Logaritmo',   base: (x) => (x > 0 ? Math.log(x) / Math.log(2) : NaN),
        f: (x, p) => (x - p.h > 0 ? p.a * Math.log(x - p.h) / Math.log(2) : NaN),
        ctrls: [['a', -3, 3, 0.25, 1], ['h', -4, 3, 0.5, 0]],
        formula: (p) => `f(x) = ${fmt(p.a, 2)} · log₂(x ${p.h < 0 ? '+' : '−'} ${fmt(Math.abs(p.h), 1)})` },
      { id: 'seno',     label: 'Senoide',     base: (x) => Math.sin(x),
        f: (x, p) => p.A * Math.sin(p.B * x + p.C) + p.D,
        ctrls: [['A', -4, 4, 0.25, 1], ['B', 0.25, 4, 0.25, 1], ['C', -3.14, 3.14, 0.1, 0], ['D', -4, 4, 0.5, 0]],
        formula: (p) => `f(x) = ${fmt(p.A, 2)}·sen(${fmt(p.B, 2)}x ${p.C < 0 ? '−' : '+'} ${fmt(Math.abs(p.C), 2)}) ${p.D < 0 ? '−' : '+'} ${fmt(Math.abs(p.D), 1)}` },
      { id: 'racional', label: 'Racional',    base: (x) => 1 / x,
        f: (x, p) => p.a / (x - p.h) + p.k,
        ctrls: [['a', -4, 4, 0.5, 1], ['h', -4, 4, 0.5, 0], ['k', -4, 4, 0.5, 0]],
        formula: (p) => `f(x) = ${fmt(p.a, 1)}/(x ${p.h < 0 ? '+' : '−'} ${fmt(Math.abs(p.h), 1)}) ${p.k < 0 ? '−' : '+'} ${fmt(Math.abs(p.k), 1)}` }
    ];

    let familia = FAMILIAS[1];
    let p = {};
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();
    const controles = h('div');
    const xMin = -6, xMax = 6, yMin = -6, yMax = 6;
    const s = scale(xMin, xMax, yMin, yMax);

    function resetParams() {
      p = {};
      familia.ctrls.forEach(([nome, , , , inicial]) => { p[nome] = inicial; });
    }

    function draw() {
      clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));

      // a curva base fica atrás, para que a transformação seja visível
      box.appendChild(h('path', {
        d: pathOf(familia.base, xMin, xMax, s), fill: 'none',
        stroke: C.axis, 'stroke-width': 1.6, 'stroke-dasharray': '4 4'
      }));
      box.appendChild(h('path', {
        d: pathOf((x) => familia.f(x, p), xMin, xMax, s), fill: 'none',
        stroke: C.curve, 'stroke-width': 2.6
      }));

      clear(out);
      out.appendChild(h('span', { html:
        `<span class="hl">${familia.formula(p)}</span>` }));
    }

    function montarControles() {
      clear(controles);
      familia.ctrls.forEach(([nome, min, max, passo]) => {
        controles.appendChild(slider(nome, min, max, passo, p[nome],
          (v) => { p[nome] = v; draw(); }, (v) => fmt(v, 2)));
      });
    }

    const picker = seletor(FAMILIAS.map((f) => ({ id: f.id, label: f.label })), familia.id, (id) => {
      familia = FAMILIAS.find((f) => f.id === id);
      resetParams();
      montarControles();
      draw();
    });

    resetParams();
    montarControles();
    const el = shell(picker, h('div.mt-8', box), controles, out);
    draw();
    return el;
  }

  /* ============================================================
     Laboratório do círculo trigonométrico
     Círculo e gráfico lado a lado: a mesma informação, duas
     representações. É a ponte entre razão e função.
     ============================================================ */
  function labTrig() {
    let ang = Math.PI / 6;      // radianos
    let mostra = 'sen';
    const box = h('svg', { viewBox: '0 0 460 240', role: 'img' });
    const out = readout();

    const cx = 110, cy = 120, R = 88;          // círculo
    const gx0 = 225, gx1 = 445, gy = 120, gA = 62;   // gráfico

    function draw() {
      clear(box);
      const cos = Math.cos(ang), sen = Math.sin(ang);

      /* ---- círculo ---- */
      box.appendChild(h('line', { x1: cx - R - 14, y1: cy, x2: cx + R + 14, y2: cy, stroke: C.axis }));
      box.appendChild(h('line', { x1: cx, y1: cy - R - 14, x2: cx, y2: cy + R + 14, stroke: C.axis }));
      box.appendChild(h('circle', { cx, cy, r: R, fill: 'none', stroke: C.grid, 'stroke-width': 1.6 }));

      const px = cx + R * cos, py = cy - R * sen;

      // projeções: cosseno na horizontal, seno na vertical
      box.appendChild(h('line', { x1: cx, y1: cy, x2: px, y2: cy,
        stroke: mostra === 'cos' ? C.accent : C.grid, 'stroke-width': mostra === 'cos' ? 3 : 2 }));
      box.appendChild(h('line', { x1: px, y1: cy, x2: px, y2: py,
        stroke: mostra === 'sen' ? C.accent : C.grid, 'stroke-width': mostra === 'sen' ? 3 : 2 }));
      box.appendChild(h('line', { x1: cx, y1: cy, x2: px, y2: py, stroke: C.curve, 'stroke-width': 2.4 }));
      box.appendChild(h('circle', { cx: px, cy: py, r: 5, fill: C.curve, stroke: '#fff', 'stroke-width': 2 }));

      // arco do ângulo
      const rArc = 26;
      const largeArc = ang > Math.PI ? 1 : 0;
      box.appendChild(h('path', {
        d: `M ${cx + rArc} ${cy} A ${rArc} ${rArc} 0 ${largeArc} 0 ${cx + rArc * cos} ${cy - rArc * sen}`,
        fill: 'none', stroke: C.ink, 'stroke-width': 1.4
      }));

      /* ---- gráfico: o círculo desenrolado ---- */
      const fn = mostra === 'sen' ? Math.sin : mostra === 'cos' ? Math.cos : Math.tan;
      box.appendChild(h('line', { x1: gx0, y1: gy, x2: gx1, y2: gy, stroke: C.axis }));
      box.appendChild(h('line', { x1: gx0, y1: gy - gA - 12, x2: gx0, y2: gy + gA + 12, stroke: C.axis }));

      let d = '', pen = false;
      for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * (2 * Math.PI);
        const v = fn(t);
        if (!isFinite(v) || Math.abs(v) > 2.4) { pen = false; continue; }
        const X = gx0 + (t / (2 * Math.PI)) * (gx1 - gx0);
        const Y = gy - v * gA;
        d += (pen ? ' L ' : ' M ') + X.toFixed(1) + ' ' + Y.toFixed(1);
        pen = true;
      }
      box.appendChild(h('path', { d, fill: 'none', stroke: C.curve, 'stroke-width': 2.2 }));

      const valor = fn(ang);
      const X = gx0 + (ang / (2 * Math.PI)) * (gx1 - gx0);
      const Y = gy - Math.max(-2.4, Math.min(2.4, valor)) * gA;
      box.appendChild(h('line', { x1: X, y1: gy, x2: X, y2: Y, stroke: C.accent, 'stroke-width': 2 }));
      box.appendChild(h('circle', { cx: X, cy: Y, r: 5, fill: C.accent, stroke: '#fff', 'stroke-width': 2 }));

      ['0', 'π/2', 'π', '3π/2', '2π'].forEach((rot, i) => {
        const X2 = gx0 + (i / 4) * (gx1 - gx0);
        box.appendChild(h('text', { x: X2, y: gy + gA + 26, fill: C.ink, 'font-size': 10,
          'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle' }, rot));
      });

      const graus = (ang * 180 / Math.PI);
      clear(out);
      out.appendChild(h('span', { html:
        `θ = <span class="hl">${fmt(graus, 0)}°</span> = ${fmt(ang, 2)} rad · ` +
        `sen = ${fmt(sen, 3)} · cos = ${fmt(cos, 3)} · ` +
        `tan = ${Math.abs(cos) < 1e-6 ? '∄' : fmt(sen / cos, 3)}` }));
    }

    const picker = seletor(
      [{ id: 'sen', label: 'seno' }, { id: 'cos', label: 'cosseno' }, { id: 'tan', label: 'tangente' }],
      mostra, (id) => { mostra = id; draw(); });

    const el = shell(
      picker,
      h('div.mt-8', box),
      slider('ângulo (graus)', 0, 360, 1, 30, (v) => { ang = v * Math.PI / 180; draw(); }, (v) => v + '°'),
      out
    );
    draw();
    return el;
  }

  /* ============================================================
     Laboratório de limites
     Aproxima pelos dois lados e mostra a tabela ao vivo. A função
     escolhida tem buraco de propósito.
     ============================================================ */
  function labLimite() {
    const CASOS = [
      { id: 'removivel', label: '(x²−1)/(x−1)', a: 1, limite: 2,
        f: (x) => (x * x - 1) / (x - 1),
        nota: 'Em x = 1 a expressão vira 0/0. O gráfico tem um buraco, mas o limite existe: 2.' },
      { id: 'salto', label: '|x|/x', a: 0, limite: null,
        f: (x) => Math.abs(x) / x,
        nota: 'Pela esquerda dá −1, pela direita dá +1. Os lados discordam, então o limite não existe.' },
      { id: 'infinito', label: '1/x²', a: 0, limite: Infinity,
        f: (x) => 1 / (x * x),
        nota: 'Os dois lados crescem sem parar. O limite é infinito — o que também significa que não existe como número.' },
      { id: 'senoX', label: 'sen(x)/x', a: 0, limite: 1,
        f: (x) => Math.sin(x) / x,
        nota: 'O limite fundamental. Vale 1, e é ele que faz a derivada do seno ser o cosseno.' }
    ];

    let caso = CASOS[0];
    let dist = 0.5;
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const tabela = h('div.lab-table');
    const out = readout();

    function draw() {
      const xMin = caso.a - 3, xMax = caso.a + 3;
      const yMin = caso.id === 'infinito' ? -1 : -3, yMax = caso.id === 'infinito' ? 8 : 4;
      const s = scale(xMin, xMax, yMin, yMax);

      clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));
      box.appendChild(h('line', { x1: s.sx(caso.a), y1: 0, x2: s.sx(caso.a), y2: HT,
        stroke: C.accent, 'stroke-width': 1.2, 'stroke-dasharray': '5 4' }));
      box.appendChild(h('path', { d: pathOf(caso.f, xMin, xMax, s, caso.a),
        fill: 'none', stroke: C.curve, 'stroke-width': 2.4 }));

      [-1, 1].forEach((lado) => {
        const x = caso.a + lado * dist;
        const y = caso.f(x);
        if (!isFinite(y)) return;
        box.appendChild(h('circle', { cx: s.sx(x), cy: s.sy(Math.max(yMin, Math.min(yMax, y))),
          r: 5.5, fill: lado < 0 ? C.err : C.ok, stroke: '#fff', 'stroke-width': 2 }));
      });

      // buraco: ponto vazado onde a função não está definida
      if (caso.limite !== null && isFinite(caso.limite)) {
        box.appendChild(h('circle', { cx: s.sx(caso.a), cy: s.sy(caso.limite), r: 5,
          fill: '#fff', stroke: C.curve, 'stroke-width': 2.2 }));
      }

      clear(tabela);
      const linhas = [dist, dist / 2, dist / 10, dist / 100];
      const head = h('div.lab-row.lab-head',
        h('span', 'distância'), h('span', 'pela esquerda'), h('span', 'pela direita'));
      tabela.appendChild(head);
      linhas.forEach((d) => {
        const e = caso.f(caso.a - d), dd = caso.f(caso.a + d);
        tabela.appendChild(h('div.lab-row',
          h('span', fmt(d, 4)),
          h('span', isFinite(e) ? fmt(e, 4) : '—'),
          h('span', isFinite(dd) ? fmt(dd, 4) : '—')));
      });

      clear(out);
      out.appendChild(h('span', { html: caso.nota }));
    }

    const picker = seletor(CASOS.map((c) => ({ id: c.id, label: c.label })), caso.id, (id) => {
      caso = CASOS.find((c) => c.id === id); draw();
    });

    const el = shell(
      picker,
      h('div.mt-8', box),
      slider('distância até o ponto', 0.01, 1, 0.01, 0.5, (v) => { dist = v; draw(); }, (v) => fmt(v, 2)),
      tabela, out
    );
    draw();
    return el;
  }

  /* ============================================================
     Laboratório de derivadas
     A secante encolhendo até virar tangente, com f e f′ lado a lado.
     ============================================================ */
  function labDerivada() {
    const CASOS = [
      { id: 'quad', label: 'x²',      f: (x) => x * x,            d: (x) => 2 * x },
      { id: 'cubo', label: 'x³ − 3x', f: (x) => x * x * x - 3 * x, d: (x) => 3 * x * x - 3 },
      { id: 'seno', label: 'sen x',   f: Math.sin,                 d: Math.cos },
      { id: 'expo', label: 'eˣ',      f: Math.exp,                 d: Math.exp }
    ];

    let caso = CASOS[0];
    let x0 = 1, hh = 1;
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();
    const xMin = -3.2, xMax = 3.2, yMin = -4, yMax = 6;
    const s = scale(xMin, xMax, yMin, yMax);

    function draw() {
      clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));

      // f′ desenhada atrás, para que a relação fique visível
      box.appendChild(h('path', { d: pathOf(caso.d, xMin, xMax, s), fill: 'none',
        stroke: C.ok, 'stroke-width': 1.6, 'stroke-dasharray': '5 4' }));
      box.appendChild(h('path', { d: pathOf(caso.f, xMin, xMax, s), fill: 'none',
        stroke: C.curve, 'stroke-width': 2.6 }));

      const y0 = caso.f(x0);
      const x1 = x0 + hh, y1 = caso.f(x1);
      const mSec = (y1 - y0) / hh;
      const mTan = caso.d(x0);

      // secante entre os dois pontos, estendida até as bordas
      const secY = (x) => y0 + mSec * (x - x0);
      box.appendChild(h('line', { x1: s.sx(xMin), y1: s.sy(secY(xMin)), x2: s.sx(xMax), y2: s.sy(secY(xMax)),
        stroke: C.err, 'stroke-width': 1.6 }));
      const tanY = (x) => y0 + mTan * (x - x0);
      box.appendChild(h('line', { x1: s.sx(xMin), y1: s.sy(tanY(xMin)), x2: s.sx(xMax), y2: s.sy(tanY(xMax)),
        stroke: C.accent, 'stroke-width': 2.2, 'stroke-dasharray': '6 4' }));

      box.appendChild(h('circle', { cx: s.sx(x0), cy: s.sy(y0), r: 5.5, fill: C.curve, stroke: '#fff', 'stroke-width': 2 }));
      box.appendChild(h('circle', { cx: s.sx(x1), cy: s.sy(y1), r: 5, fill: C.err, stroke: '#fff', 'stroke-width': 2 }));

      clear(out);
      out.appendChild(h('span', { html:
        `secante = <span class="hl">${fmt(mSec, 4)}</span> · ` +
        `tangente = <span class="hl">${fmt(mTan, 4)}</span> · ` +
        `diferença = ${fmt(Math.abs(mSec - mTan), 4)}` }));
    }

    const picker = seletor(CASOS.map((c) => ({ id: c.id, label: c.label })), caso.id, (id) => {
      caso = CASOS.find((c) => c.id === id); draw();
    });

    const el = shell(
      picker,
      h('div.mt-8', box),
      slider('ponto x₀', -3, 3, 0.1, 1, (v) => { x0 = v; draw(); }, (v) => fmt(v, 1)),
      slider('afastamento h', 0.01, 2, 0.01, 1, (v) => { hh = v; draw(); }, (v) => fmt(v, 2)),
      out
    );
    draw();
    return el;
  }

  /* ============================================================
     Laboratório de integrais
     Soma de Riemann com partição controlável e erro ao vivo.
     ============================================================ */
  function labIntegral() {
    const CASOS = [
      { id: 'quad', label: 'x²',       f: (x) => x * x,              F: (x) => x * x * x / 3 },
      { id: 'seno', label: 'sen x',    f: Math.sin,                  F: (x) => -Math.cos(x) },
      { id: 'raiz', label: '√x',       f: (x) => Math.sqrt(Math.max(0, x)), F: (x) => (2 / 3) * Math.pow(Math.max(0, x), 1.5) },
      { id: 'expo', label: 'eˣ',       f: Math.exp,                  F: Math.exp }
    ];

    let caso = CASOS[0];
    let n = 8, modo = 'esq';
    let a = 0, b = 2;
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const xMin = -0.4, xMax = 3.4;
      let topo = 1;
      for (let i = 0; i <= 40; i++) topo = Math.max(topo, caso.f(xMin + (i / 40) * (xMax - xMin)));
      const yMin = -1, yMax = Math.ceil(Math.min(9, topo + 1));
      const s = scale(xMin, xMax, yMin, yMax);

      clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));

      const dx = (b - a) / n;
      let soma = 0;
      for (let i = 0; i < n; i++) {
        const xe = a + i * dx;
        const xAmostra = modo === 'esq' ? xe : modo === 'dir' ? xe + dx : xe + dx / 2;
        const alt = caso.f(xAmostra);
        soma += alt * dx;
        const y = s.sy(Math.max(0, alt));
        box.appendChild(h('rect', {
          x: s.sx(xe), y, width: Math.max(0, s.sx(xe + dx) - s.sx(xe)),
          height: Math.max(0, s.sy(0) - y),
          fill: C.accent, 'fill-opacity': 0.22, stroke: C.accent, 'stroke-width': 0.8
        }));
      }

      box.appendChild(h('path', { d: pathOf(caso.f, xMin, xMax, s), fill: 'none',
        stroke: C.curve, 'stroke-width': 2.4 }));

      const exato = caso.F(b) - caso.F(a);
      clear(out);
      out.appendChild(h('span', { html:
        `soma = <span class="hl">${fmt(soma, 5)}</span> · exato = ${fmt(exato, 5)} · ` +
        `erro = ${fmt(Math.abs(soma - exato), 5)}` }));
    }

    const picker = seletor(CASOS.map((c) => ({ id: c.id, label: c.label })), caso.id, (id) => {
      caso = CASOS.find((c) => c.id === id); draw();
    });
    const modoPicker = seletor(
      [{ id: 'esq', label: 'por baixo' }, { id: 'med', label: 'ponto médio' }, { id: 'dir', label: 'por cima' }],
      modo, (id) => { modo = id; draw(); });

    const el = shell(
      picker,
      h('div.mt-8', box),
      slider('retângulos', 1, 120, 1, 8, (v) => { n = v; draw(); }),
      slider('limite inferior a', 0, 2, 0.1, 0, (v) => { a = Math.min(v, b - 0.1); draw(); }, (v) => fmt(v, 1)),
      slider('limite superior b', 0.5, 3, 0.1, 2, (v) => { b = Math.max(v, a + 0.1); draw(); }, (v) => fmt(v, 1)),
      h('div.mt-8', modoPicker),
      out
    );
    draw();
    return el;
  }

  /* ============================================================
     Laboratório de probabilidade
     Milhares de repetições, comparando frequência relativa com o
     valor teórico. É o argumento visual da lei dos grandes números.
     ============================================================ */
  function labProbabilidade() {
    const EXPERIMENTOS = [
      { id: 'moeda', label: 'Moeda: cara', teorico: 0.5,
        run: () => Math.random() < 0.5,
        nota: 'Uma moeda honesta. Com poucas jogadas a frequência oscila muito; com milhares, ela cola em 0,5.' },
      { id: 'dado6', label: 'Dado: sai 6', teorico: 1 / 6,
        run: () => Math.floor(Math.random() * 6) + 1 === 6,
        nota: 'Um dado de seis faces. O valor teórico é 1/6 ≈ 0,1667.' },
      { id: 'soma7', label: 'Dois dados: soma 7', teorico: 6 / 36,
        run: () => (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) === 7,
        nota: 'Soma 7 é a mais provável com dois dados: 6 dos 36 pares possíveis.' },
      { id: 'aniversario', label: '23 pessoas: aniversário repetido', teorico: 0.5073,
        run: () => {
          const vistos = new Set();
          for (let i = 0; i < 23; i++) {
            const d = Math.floor(Math.random() * 365);
            if (vistos.has(d)) return true;
            vistos.add(d);
          }
          return false;
        },
        nota: 'O paradoxo do aniversário: com apenas 23 pessoas a chance de repetição já passa de 50%.' }
    ];

    let exp = EXPERIMENTOS[0];
    let total = 0, sucessos = 0;
    const historico = [];      // frequência relativa ao longo do tempo

    const box = h('svg', { viewBox: '0 0 460 200', role: 'img' });
    const out = readout();
    const nota = h('p.dim', { style: { fontSize: '13px', textAlign: 'center', margin: '10px 0 0' } });

    function reset() {
      total = 0; sucessos = 0; historico.length = 0; draw();
    }

    function rodar(quantas) {
      for (let i = 0; i < quantas; i++) {
        total++;
        if (exp.run()) sucessos++;
        // amostra o histórico em escala logarítmica: os primeiros
        // resultados importam mais, e guardar 100 mil pontos é inútil
        if (total < 50 || total % Math.ceil(total / 50) === 0) {
          historico.push({ n: total, p: sucessos / total });
        }
      }
      draw();
    }

    function draw() {
      clear(box);
      const x0 = 40, x1 = 440, y0 = 20, y1 = 160;
      const yTop = Math.max(1, Math.min(1, exp.teorico * 2 + 0.3));

      const sy = (p) => y1 - (p / yTop) * (y1 - y0);

      box.appendChild(h('line', { x1: x0, y1, x2: x1, y2: y1, stroke: C.axis }));
      box.appendChild(h('line', { x1: x0, y1: y0, x2: x0, y2: y1, stroke: C.axis }));

      // linha do valor teórico
      const yT = sy(exp.teorico);
      box.appendChild(h('line', { x1: x0, y1: yT, x2: x1, y2: yT,
        stroke: C.ok, 'stroke-width': 1.8, 'stroke-dasharray': '6 4' }));
      box.appendChild(h('text', { x: x1 - 2, y: yT - 6, fill: C.ok, 'font-size': 10,
        'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'end' },
        'teórico ' + fmt(exp.teorico, 4)));

      [0, yTop / 2, yTop].forEach((v) => {
        box.appendChild(h('text', { x: x0 - 6, y: sy(v) + 3.5, fill: C.ink, 'font-size': 9,
          'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'end' }, fmt(v, 2)));
      });

      if (historico.length > 1) {
        let d = '';
        historico.forEach((pt, i) => {
          const X = x0 + (i / (historico.length - 1)) * (x1 - x0);
          const Y = sy(Math.max(0, Math.min(yTop, pt.p)));
          d += (i ? ' L ' : 'M ') + X.toFixed(1) + ' ' + Y.toFixed(1);
        });
        box.appendChild(h('path', { d, fill: 'none', stroke: C.curve, 'stroke-width': 2 }));
      }

      box.appendChild(h('text', { x: (x0 + x1) / 2, y: 186, fill: C.ink, 'font-size': 10,
        'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle' },
        total ? `${total} repetições` : 'nenhuma repetição ainda'));

      const freq = total ? sucessos / total : 0;
      clear(out);
      out.appendChild(h('span', { html: total
        ? `frequência = <span class="hl">${fmt(freq, 4)}</span> (${sucessos}/${total}) · ` +
          `teórico = ${fmt(exp.teorico, 4)} · diferença = ${fmt(Math.abs(freq - exp.teorico), 4)}`
        : 'Escolha um experimento e rode as repetições.' }));
      nota.textContent = exp.nota;
    }

    const picker = seletor(EXPERIMENTOS.map((e) => ({ id: e.id, label: e.label })), exp.id, (id) => {
      exp = EXPERIMENTOS.find((e) => e.id === id); reset();
    });

    const botoes = h('div.row.gap-6.wrapf.mt-8', { style: { justifyContent: 'center' } },
      h('button.btn.btn-sm.btn-ghost', { onClick: () => rodar(1) }, '+1'),
      h('button.btn.btn-sm.btn-ghost', { onClick: () => rodar(100) }, '+100'),
      h('button.btn.btn-sm.btn-primary', { onClick: () => rodar(1000) }, '+1.000'),
      h('button.btn.btn-sm.btn-primary', { onClick: () => rodar(10000) }, '+10.000'),
      h('button.btn.btn-sm.btn-quiet', { onClick: reset }, 'zerar')
    );

    const el = shell(picker, h('div.mt-8', box), botoes, out, nota);
    draw();
    return el;
  }

  /* ============================================================
     Laboratório de estatística
     Um conjunto de dados manipulável: histograma, boxplot e as
     medidas mudando juntas. Serve para ver o outlier arrastar a
     média sem mexer na mediana.
     ============================================================ */
  function labEstatistica() {
    let dados = [12, 14, 15, 15, 16, 17, 18, 18, 19, 21, 22, 24];
    let vista = 'histograma';
    let outlier = 0;

    const box = h('svg', { viewBox: '0 0 460 210', role: 'img' });
    const out = readout();

    function amostra() {
      return outlier ? dados.concat(outlier) : dados.slice();
    }

    function medidas(v) {
      const ord = v.slice().sort((p, q) => p - q);
      const n = ord.length;
      const media = ord.reduce((s2, x) => s2 + x, 0) / n;
      const q = (p) => {
        const pos = p * (n - 1);
        const lo = Math.floor(pos), hi = Math.ceil(pos);
        return ord[lo] + (ord[hi] - ord[lo]) * (pos - lo);
      };
      const variancia = ord.reduce((s2, x) => s2 + Math.pow(x - media, 2), 0) / (n - 1);
      return { ord, n, media, mediana: q(0.5), q1: q(0.25), q3: q(0.75),
               dp: Math.sqrt(variancia), min: ord[0], max: ord[n - 1] };
    }

    function draw() {
      const v = amostra();
      const m = medidas(v);
      clear(box);

      const x0 = 40, x1 = 440, base = 168;
      const lo = Math.min(m.min, 8), hi = Math.max(m.max, 30);
      const sx = (x) => x0 + ((x - lo) / (hi - lo || 1)) * (x1 - x0);

      box.appendChild(h('line', { x1: x0, y1: base, x2: x1, y2: base, stroke: C.axis }));
      for (let t = Math.ceil(lo / 5) * 5; t <= hi; t += 5) {
        box.appendChild(h('line', { x1: sx(t), y1: base, x2: sx(t), y2: base + 5, stroke: C.axis }));
        box.appendChild(h('text', { x: sx(t), y: base + 18, fill: C.ink, 'font-size': 10,
          'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle' }, String(t)));
      }

      if (vista === 'histograma') {
        const nClasses = 8;
        const larg = (hi - lo) / nClasses;
        const contagem = new Array(nClasses).fill(0);
        v.forEach((x) => {
          const i = Math.min(nClasses - 1, Math.floor((x - lo) / larg));
          contagem[i]++;
        });
        const maxC = Math.max(...contagem, 1);
        contagem.forEach((c, i) => {
          if (!c) return;
          const alt = (c / maxC) * 110;
          box.appendChild(h('rect', {
            x: sx(lo + i * larg) + 1, y: base - alt,
            width: Math.max(1, sx(lo + (i + 1) * larg) - sx(lo + i * larg) - 2), height: alt,
            fill: C.curve, 'fill-opacity': 0.3, stroke: C.curve, 'stroke-width': 1.2
          }));
        });
      } else {
        const yc = 100, alt = 40;
        const iqr = m.q3 - m.q1;
        const limInf = m.q1 - 1.5 * iqr, limSup = m.q3 + 1.5 * iqr;
        const dentro = m.ord.filter((x) => x >= limInf && x <= limSup);
        const bigodeMin = Math.min(...dentro), bigodeMax = Math.max(...dentro);

        box.appendChild(h('line', { x1: sx(bigodeMin), y1: yc, x2: sx(m.q1), y2: yc, stroke: C.ink, 'stroke-width': 1.4 }));
        box.appendChild(h('line', { x1: sx(m.q3), y1: yc, x2: sx(bigodeMax), y2: yc, stroke: C.ink, 'stroke-width': 1.4 }));
        [bigodeMin, bigodeMax].forEach((x) => {
          box.appendChild(h('line', { x1: sx(x), y1: yc - 12, x2: sx(x), y2: yc + 12, stroke: C.ink, 'stroke-width': 1.4 }));
        });
        box.appendChild(h('rect', { x: sx(m.q1), y: yc - alt / 2, width: Math.max(2, sx(m.q3) - sx(m.q1)),
          height: alt, fill: C.curve, 'fill-opacity': 0.22, stroke: C.curve, 'stroke-width': 1.6 }));
        box.appendChild(h('line', { x1: sx(m.mediana), y1: yc - alt / 2, x2: sx(m.mediana), y2: yc + alt / 2,
          stroke: C.accent, 'stroke-width': 2.6 }));
        m.ord.filter((x) => x < limInf || x > limSup).forEach((x) => {
          box.appendChild(h('circle', { cx: sx(x), cy: yc, r: 4.5, fill: 'none', stroke: C.err, 'stroke-width': 2 }));
        });
      }

      // média e mediana marcadas sobre o eixo, para comparação direta
      box.appendChild(h('line', { x1: sx(m.media), y1: base - 132, x2: sx(m.media), y2: base,
        stroke: C.err, 'stroke-width': 1.8, 'stroke-dasharray': '5 4' }));
      box.appendChild(h('text', { x: sx(m.media), y: base - 138, fill: C.err, 'font-size': 9,
        'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle' }, 'média'));
      box.appendChild(h('line', { x1: sx(m.mediana), y1: base - 116, x2: sx(m.mediana), y2: base,
        stroke: C.ok, 'stroke-width': 1.8, 'stroke-dasharray': '5 4' }));
      box.appendChild(h('text', { x: sx(m.mediana), y: base - 122, fill: C.ok, 'font-size': 9,
        'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle' }, 'mediana'));

      clear(out);
      out.appendChild(h('span', { html:
        `n = ${m.n} · média = <span class="hl">${fmt(m.media, 2)}</span> · ` +
        `mediana = <span class="hl">${fmt(m.mediana, 2)}</span> · ` +
        `desvio padrão = ${fmt(m.dp, 2)} · IQR = ${fmt(m.q3 - m.q1, 2)}` }));
    }

    const picker = seletor(
      [{ id: 'histograma', label: 'histograma' }, { id: 'boxplot', label: 'boxplot' }],
      vista, (id) => { vista = id; draw(); });

    const el = shell(
      picker,
      h('div.mt-8', box),
      slider('adicionar um valor extremo', 0, 120, 5, 0,
        (v) => { outlier = v; draw(); }, (v) => (v ? String(v) : 'nenhum')),
      out,
      h('p.dim', { style: { fontSize: '13px', textAlign: 'center', margin: '10px 0 0' } },
        'Arraste o valor extremo e compare: a média corre atrás dele, a mediana quase não se mexe.')
    );
    draw();
    return el;
  }

  /* ---------------- catálogo ---------------- */

  const LABS = {
    labFuncoes: {
      id: 'labFuncoes', name: 'Laboratório de funções', icon: 'ƒ',
      build: labFuncoes,
      pergunta: 'O que cada parâmetro faz com o gráfico?',
      observar: [
        'Mude um parâmetro por vez e tente prever o efeito antes de soltar o controle.',
        'A curva tracejada cinza é a função base. A colorida é a sua versão transformada.',
        'Na parábola, note que h desloca para o lado contrário do sinal que aparece na fórmula.',
        'Na senoide, aumentar B aperta o gráfico: o período é 2π/B, não 2π·B.'
      ]
    },
    labTrig: {
      id: 'labTrig', name: 'Círculo trigonométrico', icon: '◯',
      build: labTrig,
      pergunta: 'Como o giro no círculo vira a onda do gráfico?',
      observar: [
        'O ponto no círculo e o ponto no gráfico são o mesmo ângulo, em duas representações.',
        'O seno é a altura do ponto; o cosseno é a distância horizontal.',
        'Passe de 90°: o cosseno fica negativo enquanto o seno ainda é positivo.',
        'Na tangente, veja o gráfico explodir exatamente onde o cosseno zera.'
      ]
    },
    labLimite: {
      id: 'labLimite', name: 'Laboratório de limites', icon: '→',
      build: labLimite,
      pergunta: 'Para onde a função aponta quando x chega perto?',
      observar: [
        'Diminua a distância e acompanhe as duas colunas da tabela.',
        'No primeiro caso, a função não existe em x = 1 — e mesmo assim o limite existe.',
        'Em |x|/x os dois lados discordam: é assim que um limite deixa de existir.',
        'Em sen(x)/x, note o valor se aproximando de 1. Esse é o limite fundamental.'
      ]
    },
    labDerivada: {
      id: 'labDerivada', name: 'Laboratório de derivadas', icon: '∂',
      build: labDerivada,
      pergunta: 'Como a secante vira tangente?',
      observar: [
        'Diminua h e veja a reta vermelha (secante) encostar na laranja (tangente).',
        'A diferença entre as duas inclinações é o erro que o limite elimina.',
        'A curva verde tracejada é f′. Onde ela cruza o zero, f tem pico ou vale.',
        'Onde f cresce, f′ está acima do eixo. Onde f decresce, abaixo.'
      ]
    },
    labIntegral: {
      id: 'labIntegral', name: 'Laboratório de integrais', icon: '∫',
      build: labIntegral,
      pergunta: 'Quantos retângulos são necessários para acertar a área?',
      observar: [
        'Aumente o número de retângulos e acompanhe o erro encolher.',
        'Compare "por baixo" e "por cima": um subestima, o outro superestima.',
        'O ponto médio erra bem menos que os dois, com o mesmo número de retângulos.',
        'Mude os limites a e b e confira o resultado pelo Teorema Fundamental.'
      ]
    },
    labProbabilidade: {
      id: 'labProbabilidade', name: 'Simulador de probabilidade', icon: '🎲',
      build: labProbabilidade,
      pergunta: 'A frequência observada bate com a probabilidade teórica?',
      observar: [
        'Comece com +1 algumas vezes: com poucas repetições a frequência pula muito.',
        'Depois vá para +10.000 e veja a curva assentar na linha verde.',
        'É a lei dos grandes números acontecendo — não é garantia, é convergência.',
        'No paradoxo do aniversário, confira se você teria apostado nesse resultado.'
      ]
    },
    labEstatistica: {
      id: 'labEstatistica', name: 'Laboratório de estatística', icon: '📊',
      build: labEstatistica,
      pergunta: 'O que um único valor extremo faz com cada medida?',
      observar: [
        'Sem outlier, média e mediana ficam quase no mesmo lugar.',
        'Arraste o valor extremo: a média persegue, a mediana resiste.',
        'No boxplot, o outlier aparece como bolinha fora dos bigodes.',
        'O desvio padrão cresce muito mais que o IQR — por isso o IQR é preferido em dados sujos.'
      ]
    }
  };

  function build(id) {
    const lab = LABS[id];
    if (!lab) return null;
    try { return lab.build(); }
    catch (err) { console.error('laboratório falhou:', id, err); return null; }
  }

  const get = (id) => LABS[id] || null;
  const all = () => Object.values(LABS);

  CZ.labs = { LABS, build, get, all };
})(window.CZ);
