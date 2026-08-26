/* ==========================================================================
   core/viz.js — visualizações interativas.

   SVG desenhado à mão em vez de biblioteca de gráficos: reta tangente,
   retângulos de Riemann e buracos em funções precisam de controle fino que
   bibliotecas de dashboard não dão. Sem dependência externa também
   significa que a plataforma abre offline.

   Cada construtor devolve um elemento pronto para inserir na aula.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h } = CZ.dom;

  const W = 460, HT = 280, PAD = 34;

  /**
   * As cores saem das variáveis CSS em vez de ficarem fixas aqui — é o que
   * permite o gráfico acompanhar o tema claro/escuro sem código duplicado.
   * Lidas sob demanda porque o tema pode mudar depois do carregamento.
   */
  function theme(name, fallback) {
    try {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim();
      return v || fallback;
    } catch (_) { return fallback; }
  }

  const C = {
    get grid()   { return theme('viz-grid', '#E3E7EF'); },
    get axis()   { return theme('viz-axis', '#B7C0D0'); },
    get curve()  { return theme('accent', '#0E6E5C'); },
    get accent() { return theme('signal', '#D9821B'); },
    get ok()     { return theme('ok', '#0F9D58'); },
    get err()    { return theme('alert', '#C0344A'); },
    get ink()    { return theme('ink-2', '#5A6172'); }
  };

  function scale(xMin, xMax, yMin, yMax) {
    return {
      sx: (x) => PAD + ((x - xMin) / (xMax - xMin)) * (W - 2 * PAD),
      sy: (y) => HT - PAD - ((y - yMin) / (yMax - yMin)) * (HT - 2 * PAD)
    };
  }

  function gridLayer(xMin, xMax, yMin, yMax, s) {
    const g = h('g');
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      g.appendChild(h('line', { x1: s.sx(x), y1: PAD, x2: s.sx(x), y2: HT - PAD,
        stroke: x === 0 ? C.axis : C.grid, 'stroke-width': x === 0 ? 1.4 : 1 }));
      if (x !== 0) g.appendChild(h('text', { x: s.sx(x), y: HT - PAD + 15, fill: C.ink,
        'font-size': 10, 'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle' }, String(x)));
    }
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      g.appendChild(h('line', { x1: PAD, y1: s.sy(y), x2: W - PAD, y2: s.sy(y),
        stroke: y === 0 ? C.axis : C.grid, 'stroke-width': y === 0 ? 1.4 : 1 }));
      if (y !== 0) g.appendChild(h('text', { x: PAD - 7, y: s.sy(y) + 3.5, fill: C.ink,
        'font-size': 10, 'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'end' }, String(y)));
    }
    return g;
  }

  function pathOf(fn, xMin, xMax, s, skip) {
    let d = '', pen = false;
    for (let i = 0; i <= 240; i++) {
      const x = xMin + (i / 240) * (xMax - xMin);
      if (skip !== undefined && Math.abs(x - skip) < 0.015) { pen = false; continue; }
      const y = fn(x);
      if (!isFinite(y) || Math.abs(y) > 1e4) { pen = false; continue; }
      d += (pen ? ' L ' : ' M ') + s.sx(x).toFixed(2) + ' ' + s.sy(y).toFixed(2);
      pen = true;
    }
    return d;
  }

  function svg(children) {
    return h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' }, children);
  }

  function slider(label, min, max, step, value, onInput, fmt) {
    const out = h('b', String(fmt ? fmt(value) : value));
    const input = h('input', {
      type: 'range', className: 'slider', min, max, step, value,
      'aria-label': label,
      onInput: (e) => {
        const v = parseFloat(e.target.value);
        out.textContent = fmt ? fmt(v) : String(v);
        onInput(v);
      }
    });
    return h('div.viz-ctrl',
      h('div.viz-ctrl-row', h('span', label), out),
      input
    );
  }

  function readout() { return h('div.viz-readout'); }

  function shell(...kids) { return h('div.viz', ...kids); }

  /* ============================ 1. Ordem das operações ============================ */
  function ordemOperacoes() {
    const out = readout();
    let withParens = false;
    const btnA = h('button.btn.btn-sm.btn-ghost', { onClick: () => set(false) }, '2 + 3 × 4');
    const btnB = h('button.btn.btn-sm.btn-ghost', { onClick: () => set(true) }, '(2 + 3) × 4');

    function set(p) {
      withParens = p;
      btnA.className = 'btn btn-sm ' + (p ? 'btn-ghost' : 'btn-primary');
      btnB.className = 'btn btn-sm ' + (p ? 'btn-primary' : 'btn-ghost');
      CZ.dom.clear(out);
      out.appendChild(h('span', { html: p
        ? '(2 + 3) × 4 → <span class="hl">5 × 4</span> → <span class="hl">20</span>'
        : '2 + <span class="hl">3 × 4</span> → 2 + <span class="hl">12</span> → <span class="hl">14</span>' }));
    }

    const el = shell(
      h('div.row.gap-10', { style: { justifyContent: 'center' } }, btnA, btnB),
      out
    );
    set(false);
    return el;
  }

  /* ============================ 2. Reta numérica ============================ */
  function retaNumerica() {
    let a = 5, b = -8;
    const out = readout();
    const line = h('svg', { viewBox: '0 0 460 120', role: 'img' });

    function draw() {
      CZ.dom.clear(line);
      const s = { sx: (x) => 30 + ((x + 12) / 24) * 400 };
      line.appendChild(h('line', { x1: 25, y1: 60, x2: 435, y2: 60, stroke: C.axis, 'stroke-width': 2 }));
      for (let t = -12; t <= 12; t += 2) {
        line.appendChild(h('line', { x1: s.sx(t), y1: 54, x2: s.sx(t), y2: 66, stroke: C.axis }));
        line.appendChild(h('text', { x: s.sx(t), y: 82, fill: C.ink, 'font-size': 10,
          'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle' }, String(t)));
      }
      const res = a + b;
      // seta do movimento
      line.appendChild(h('line', { x1: s.sx(a), y1: 40, x2: s.sx(res), y2: 40,
        stroke: b < 0 ? C.err : C.ok, 'stroke-width': 2.5 }));
      line.appendChild(h('circle', { cx: s.sx(a), cy: 60, r: 6, fill: theme('surface', '#fff'), stroke: C.ink, 'stroke-width': 2 }));
      line.appendChild(h('circle', { cx: s.sx(res), cy: 60, r: 7, fill: C.curve, stroke: theme('surface', '#fff'), 'stroke-width': 2.5 }));
      CZ.dom.clear(out);
      out.appendChild(h('span', { html: `${a} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = <span class="hl">${res}</span>` }));
    }

    const el = shell(
      line,
      slider('começa em', -10, 10, 1, a, (v) => { a = v; draw(); }),
      slider('anda', -10, 10, 1, b, (v) => { b = v; draw(); }),
      out
    );
    draw();
    return el;
  }

  /* ============================ 3. Barras de fração ============================ */
  function fracaoBarra() {
    let n1 = 3, d1 = 4, n2 = 5, d2 = 8;
    const out = readout();
    const box = h('svg', { viewBox: '0 0 460 150', role: 'img' });

    function bar(y, n, d, color, label) {
      const g = h('g');
      const x0 = 70, wTot = 340;
      for (let i = 0; i < d; i++) {
        const w = wTot / d;
        g.appendChild(h('rect', { x: x0 + i * w, y, width: w - 1.5, height: 38,
          fill: i < n ? color : '#EDF0F6', rx: 3 }));
      }
      g.appendChild(h('text', { x: 60, y: y + 24, fill: C.ink, 'font-size': 13,
        'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'end', 'font-weight': 600 }, label));
      return g;
    }

    function draw() {
      n1 = Math.min(n1, d1); n2 = Math.min(n2, d2);
      CZ.dom.clear(box);
      box.appendChild(bar(20, n1, d1, C.curve, `${n1}/${d1}`));
      box.appendChild(bar(85, n2, d2, C.accent, `${n2}/${d2}`));
      const v1 = n1 / d1, v2 = n2 / d2;
      const verdict = Math.abs(v1 - v2) < 1e-9 ? 'são iguais'
        : v1 > v2 ? `<span class="hl">${n1}/${d1}</span> é maior` : `<span class="hl">${n2}/${d2}</span> é maior`;
      CZ.dom.clear(out);
      out.appendChild(h('span', { html: `${v1.toFixed(3)} vs ${v2.toFixed(3)} — ${verdict}` }));
    }

    const el = shell(
      box,
      slider('numerador A', 0, 12, 1, n1, (v) => { n1 = v; draw(); }),
      slider('denominador A', 1, 12, 1, d1, (v) => { d1 = v; draw(); }),
      slider('numerador B', 0, 12, 1, n2, (v) => { n2 = v; draw(); }),
      slider('denominador B', 1, 12, 1, d2, (v) => { d2 = v; draw(); }),
      out
    );
    draw();
    return el;
  }

  /* ============================ 4. Balança da equação ============================ */
  function balanca() {
    let x = 3;
    const out = readout();
    const box = h('svg', { viewBox: '0 0 460 150', role: 'img' });

    function draw() {
      const left = 2 * x + 5, right = 15;
      const diff = left - right;
      const tilt = Math.max(-14, Math.min(14, diff * 1.6));
      CZ.dom.clear(box);
      box.appendChild(h('line', { x1: 230, y1: 75, x2: 230, y2: 130, stroke: C.axis, 'stroke-width': 3 }));
      const beam = h('g', { transform: `rotate(${tilt} 230 75)` });
      beam.appendChild(h('line', { x1: 90, y1: 75, x2: 370, y2: 75, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }));
      beam.appendChild(h('rect', { x: 40, y: 30, width: 100, height: 40, rx: 8,
        fill: diff === 0 ? theme('ok-soft', '#E4F6EC') : theme('accent-soft', '#ECE9FF'), stroke: diff === 0 ? C.ok : C.curve, 'stroke-width': 2 }));
      beam.appendChild(h('text', { x: 90, y: 55, 'text-anchor': 'middle', 'font-size': 14,
        'font-family': 'JetBrains Mono, monospace', 'font-weight': 600, fill: theme('ink', '#14161C') }, `2x+5 = ${left}`));
      beam.appendChild(h('rect', { x: 320, y: 30, width: 100, height: 40, rx: 8,
        fill: diff === 0 ? theme('ok-soft', '#E4F6EC') : theme('signal-soft', '#FDF1DF'), stroke: diff === 0 ? C.ok : C.accent, 'stroke-width': 2 }));
      beam.appendChild(h('text', { x: 370, y: 55, 'text-anchor': 'middle', 'font-size': 14,
        'font-family': 'JetBrains Mono, monospace', 'font-weight': 600, fill: theme('ink', '#14161C') }, '15'));
      box.appendChild(beam);
      CZ.dom.clear(out);
      out.appendChild(h('span', { html: diff === 0
        ? `x = <span class="hl">${x}</span> — equilíbrio! É a solução.`
        : `x = ${x} deixa o lado esquerdo ${diff > 0 ? 'pesado demais' : 'leve demais'}` }));
    }

    const el = shell(box, slider('valor de x', 0, 10, 1, x, (v) => { x = v; draw(); }), out);
    draw();
    return el;
  }

  /* ============================ 5. Máquina de função ============================ */
  function maquina() {
    let x = 2;
    const f = (v) => 2 * v + 1;
    const xMin = -3, xMax = 4, yMin = -4, yMax = 9;
    const s = scale(xMin, xMax, yMin, yMax);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      CZ.dom.clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));
      box.appendChild(h('path', { d: pathOf(f, xMin, xMax, s), fill: 'none', stroke: C.curve, 'stroke-width': 2.4 }));
      box.appendChild(h('line', { x1: s.sx(x), y1: s.sy(0), x2: s.sx(x), y2: s.sy(f(x)),
        stroke: C.accent, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
      box.appendChild(h('line', { x1: s.sx(0), y1: s.sy(f(x)), x2: s.sx(x), y2: s.sy(f(x)),
        stroke: C.accent, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
      box.appendChild(h('circle', { cx: s.sx(x), cy: s.sy(f(x)), r: 7, fill: C.accent, stroke: theme('surface', '#fff'), 'stroke-width': 2.5 }));
      CZ.dom.clear(out);
      out.appendChild(h('span', { html: `entra <span class="hl">${x.toFixed(1)}</span> → f(x) = 2x+1 → sai <span class="hl">${f(x).toFixed(1)}</span>` }));
    }

    const el = shell(box, slider('entrada x', -3, 4, 0.5, x, (v) => { x = v; draw(); }, (v) => v.toFixed(1)), out);
    draw();
    return el;
  }

  /* ============================ 6. Reta ax + b ============================ */
  function reta() {
    let a = 2, b = 1;
    const xMin = -4, xMax = 4, yMin = -6, yMax = 8;
    const s = scale(xMin, xMax, yMin, yMax);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const f = (x) => a * x + b;
      CZ.dom.clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));
      box.appendChild(h('path', { d: pathOf(f, xMin, xMax, s), fill: 'none', stroke: C.curve, 'stroke-width': 2.6 }));
      // triângulo da inclinação
      box.appendChild(h('line', { x1: s.sx(0), y1: s.sy(f(0)), x2: s.sx(1), y2: s.sy(f(0)), stroke: C.accent, 'stroke-width': 2 }));
      box.appendChild(h('line', { x1: s.sx(1), y1: s.sy(f(0)), x2: s.sx(1), y2: s.sy(f(1)), stroke: C.accent, 'stroke-width': 2 }));
      box.appendChild(h('circle', { cx: s.sx(0), cy: s.sy(b), r: 6, fill: C.ok, stroke: theme('surface', '#fff'), 'stroke-width': 2.5 }));
      CZ.dom.clear(out);
      out.appendChild(h('span', { html: `f(x) = <span class="hl">${a}</span>x ${b < 0 ? '−' : '+'} <span class="hl">${Math.abs(b)}</span> · anda 1, ${a >= 0 ? 'sobe' : 'desce'} ${Math.abs(a)}` }));
    }

    const el = shell(box,
      slider('inclinação a', -3, 3, 0.5, a, (v) => { a = v; draw(); }, (v) => v.toFixed(1)),
      slider('altura inicial b', -4, 4, 1, b, (v) => { b = v; draw(); }),
      out);
    draw();
    return el;
  }

  /* ============================ 7. Parábola ============================ */
  function parabola() {
    let a = 1, b = -4, c = 3;
    const xMin = -2, xMax = 6, yMin = -6, yMax = 8;
    const s = scale(xMin, xMax, yMin, yMax);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const f = (x) => a * x * x + b * x + c;
      CZ.dom.clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));
      box.appendChild(h('path', { d: pathOf(f, xMin, xMax, s), fill: 'none', stroke: C.curve, 'stroke-width': 2.6 }));
      if (a !== 0) {
        const vx = -b / (2 * a), vy = f(vx);
        if (vx >= xMin && vx <= xMax && vy >= yMin && vy <= yMax) {
          box.appendChild(h('line', { x1: s.sx(xMin), y1: s.sy(vy), x2: s.sx(xMax), y2: s.sy(vy),
            stroke: C.accent, 'stroke-width': 1.4, 'stroke-dasharray': '5 4' }));
          box.appendChild(h('circle', { cx: s.sx(vx), cy: s.sy(vy), r: 7, fill: C.accent, stroke: theme('surface', '#fff'), 'stroke-width': 2.5 }));
        }
        CZ.dom.clear(out);
        out.appendChild(h('span', { html: `vértice em x = <span class="hl">${vx.toFixed(2)}</span> · ${a > 0 ? 'ponto mínimo' : 'ponto máximo'} · inclinação ali = <span class="hl">0</span>` }));
      }
    }

    const el = shell(box,
      slider('a (abertura)', -2, 2, 0.5, a, (v) => { a = v || 0.5; draw(); }, (v) => v.toFixed(1)),
      slider('b', -6, 6, 1, b, (v) => { b = v; draw(); }),
      slider('c', -4, 6, 1, c, (v) => { c = v; draw(); }),
      out);
    draw();
    return el;
  }

  /* ============================ 8. Linear vs exponencial ============================ */
  function expo() {
    let n = 6;
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const xMax = n, yMax = Math.max(20, Math.pow(2, n));
      const s = scale(0, xMax, 0, yMax);
      CZ.dom.clear(box);
      box.appendChild(h('line', { x1: PAD, y1: HT - PAD, x2: W - PAD, y2: HT - PAD, stroke: C.axis, 'stroke-width': 1.4 }));
      box.appendChild(h('line', { x1: PAD, y1: PAD, x2: PAD, y2: HT - PAD, stroke: C.axis, 'stroke-width': 1.4 }));
      box.appendChild(h('path', { d: pathOf((x) => 5 * x, 0, xMax, s), fill: 'none', stroke: C.accent, 'stroke-width': 2.4 }));
      box.appendChild(h('path', { d: pathOf((x) => Math.pow(2, x), 0, xMax, s), fill: 'none', stroke: C.curve, 'stroke-width': 2.6 }));
      box.appendChild(h('text', { x: W - PAD - 4, y: PAD + 12, 'text-anchor': 'end', fill: C.curve,
        'font-size': 12, 'font-family': 'JetBrains Mono, monospace', 'font-weight': 600 }, '2ˣ'));
      box.appendChild(h('text', { x: W - PAD - 4, y: PAD + 28, 'text-anchor': 'end', fill: C.accent,
        'font-size': 12, 'font-family': 'JetBrains Mono, monospace', 'font-weight': 600 }, '5x'));
      CZ.dom.clear(out);
      out.appendChild(h('span', { html: `em x = ${n}: linear = <span class="hl">${5 * n}</span> · exponencial = <span class="hl">${Math.pow(2, n)}</span>` }));
    }

    const el = shell(box, slider('até x =', 2, 12, 1, n, (v) => { n = v; draw(); }), out);
    draw();
    return el;
  }

  /* ============================ 9. Limite ============================ */
  function limite() {
    let t = 20;
    const f = (x) => (x * x - 1) / (x - 1);
    const xMin = -0.5, xMax = 3, yMin = 0, yMax = 4.5;
    const s = scale(xMin, xMax, yMin, yMax);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const d = Math.pow(10, -3 * (t / 100));
      CZ.dom.clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));
      box.appendChild(h('path', { d: pathOf(f, xMin, xMax, s, 1), fill: 'none', stroke: C.curve, 'stroke-width': 2.4 }));
      box.appendChild(h('line', { x1: s.sx(1), y1: PAD, x2: s.sx(1), y2: HT - PAD,
        stroke: C.err, 'stroke-width': 1.2, 'stroke-dasharray': '5 4' }));
      box.appendChild(h('circle', { cx: s.sx(1), cy: s.sy(2), r: 6, fill: theme('surface', '#fff'), stroke: C.err, 'stroke-width': 2.4 }));
      box.appendChild(h('circle', { cx: s.sx(1 - d), cy: s.sy(f(1 - d)), r: 5.5, fill: C.accent, stroke: theme('surface', '#fff'), 'stroke-width': 2 }));
      box.appendChild(h('circle', { cx: s.sx(1 + d), cy: s.sy(f(1 + d)), r: 5.5, fill: C.accent, stroke: theme('surface', '#fff'), 'stroke-width': 2 }));
      CZ.dom.clear(out);
      out.appendChild(h('span', { html:
        `${f(1 - d).toFixed(4)} → <span class="hl">2</span> ← ${f(1 + d).toFixed(4)}` }));
    }

    const el = shell(box, slider('distância até 1', 0, 100, 1, t, (v) => { t = v; draw(); },
        (v) => Math.pow(10, -3 * (v / 100)).toFixed(4)), out);
    draw();
    return el;
  }

  /* ============================ 10. Secante → tangente ============================ */
  function tangente() {
    let x0 = 1, t = 35;
    const f = (x) => x * x;
    const xMin = -0.5, xMax = 3, yMin = -1.5, yMax = 7;
    const s = scale(xMin, xMax, yMin, yMax);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const h2 = Math.pow(10, Math.log10(1.5) - (Math.log10(1.5) + 3) * (t / 100));
      const slope = 2 * x0 + h2, exact = 2 * x0;
      const at = (m, x) => f(x0) + m * (x - x0);
      CZ.dom.clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));
      box.appendChild(h('path', { d: pathOf(f, xMin, xMax, s), fill: 'none', stroke: C.curve, 'stroke-width': 2.4 }));
      box.appendChild(h('line', { x1: s.sx(xMin), y1: s.sy(at(exact, xMin)), x2: s.sx(xMax), y2: s.sy(at(exact, xMax)),
        stroke: C.ink, 'stroke-width': 1, 'stroke-dasharray': '4 4', opacity: .45 }));
      box.appendChild(h('line', { x1: s.sx(xMin), y1: s.sy(at(slope, xMin)), x2: s.sx(xMax), y2: s.sy(at(slope, xMax)),
        stroke: C.accent, 'stroke-width': 2.2 }));
      box.appendChild(h('line', { x1: s.sx(x0), y1: s.sy(f(x0)), x2: s.sx(x0 + h2), y2: s.sy(f(x0)), stroke: C.err, 'stroke-width': 1.4 }));
      box.appendChild(h('line', { x1: s.sx(x0 + h2), y1: s.sy(f(x0)), x2: s.sx(x0 + h2), y2: s.sy(f(x0 + h2)), stroke: C.err, 'stroke-width': 1.4 }));
      box.appendChild(h('circle', { cx: s.sx(x0), cy: s.sy(f(x0)), r: 7, fill: C.curve, stroke: theme('surface', '#fff'), 'stroke-width': 2.5 }));
      box.appendChild(h('circle', { cx: s.sx(x0 + h2), cy: s.sy(f(x0 + h2)), r: 5.5, fill: C.accent, stroke: theme('surface', '#fff'), 'stroke-width': 2.2 }));
      CZ.dom.clear(out);
      out.appendChild(h('span', { html: `inclinação = 2x + h = ${slope.toFixed(4)} → derivada exata <span class="hl">${exact.toFixed(2)}</span>` }));
    }

    const el = shell(box,
      slider('ponto x', 0.2, 2.2, 0.1, x0, (v) => { x0 = v; draw(); }, (v) => v.toFixed(1)),
      slider('distância h', 0, 100, 1, t, (v) => { t = v; draw(); },
        (v) => Math.pow(10, Math.log10(1.5) - (Math.log10(1.5) + 3) * (v / 100)).toFixed(4)),
      out);
    draw();
    return el;
  }

  /* ============================ 11. Soma de Riemann ============================ */
  function riemann() {
    let n = 6, side = 'dir';
    const f = (x) => x * x;
    const xMin = -0.2, xMax = 2.4, yMin = -0.4, yMax = 4.6;
    const s = scale(xMin, xMax, yMin, yMax);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();
    const exact = 8 / 3;

    function draw() {
      const dx = 2 / n;
      let sum = 0;
      CZ.dom.clear(box);
      box.appendChild(gridLayer(xMin, xMax, yMin, yMax, s));
      for (let i = 0; i < n; i++) {
        const xl = i * dx;
        const hgt = f(side === 'dir' ? xl + dx : xl);
        sum += hgt * dx;
        box.appendChild(h('rect', {
          x: s.sx(xl), y: s.sy(hgt),
          width: Math.max(.6, s.sx(xl + dx) - s.sx(xl)),
          height: Math.max(0, s.sy(0) - s.sy(hgt)),
          fill: C.accent, 'fill-opacity': .2, stroke: C.accent, 'stroke-width': .9
        }));
      }
      box.appendChild(h('path', { d: pathOf(f, xMin, xMax, s), fill: 'none', stroke: C.curve, 'stroke-width': 2.4 }));
      CZ.dom.clear(out);
      out.appendChild(h('span', { html:
        `soma = <span class="hl">${sum.toFixed(4)}</span> · exato = 2,6667 · erro = ${Math.abs(sum - exact).toFixed(4)}` }));
    }

    const btnL = h('button.btn.btn-sm.btn-ghost', { onClick: () => { side = 'esq'; sync(); } }, 'por baixo');
    const btnR = h('button.btn.btn-sm.btn-primary', { onClick: () => { side = 'dir'; sync(); } }, 'por cima');
    function sync() {
      btnL.className = 'btn btn-sm ' + (side === 'esq' ? 'btn-primary' : 'btn-ghost');
      btnR.className = 'btn btn-sm ' + (side === 'dir' ? 'btn-primary' : 'btn-ghost');
      draw();
    }

    const el = shell(box,
      slider('retângulos', 1, 60, 1, n, (v) => { n = v; draw(); }),
      h('div.row.gap-10.mt-8', { style: { justifyContent: 'center' } }, btnL, btnR),
      out);
    draw();
    return el;
  }


  /* ============================ 12. Vetores: seta e soma ============================ */

  /** Desenha uma seta de (x0,y0) até (x1,y1) em coordenadas de tela. */
  function arrow(x0, y0, x1, y1, color, width) {
    const g = h('g');
    const dx = x1 - x0, dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    if (len < 1) return g;
    const ux = dx / len, uy = dy / len;
    const headLen = Math.min(11, len * 0.35);
    const bx = x1 - ux * headLen, by = y1 - uy * headLen;
    const px = -uy, py = ux;
    const hw = headLen * 0.45;
    g.appendChild(h('line', { x1: x0, y1: y0, x2: bx, y2: by,
      stroke: color, 'stroke-width': width || 2.4, 'stroke-linecap': 'round' }));
    g.appendChild(h('polygon', {
      points: `${x1},${y1} ${bx + px * hw},${by + py * hw} ${bx - px * hw},${by - py * hw}`,
      fill: color
    }));
    return g;
  }

  function vetorSoma() {
    let ax = 3, ay = 1, bx = 1, by = 3;
    const lim = 6;
    const s = scale(-lim, lim, -lim, lim);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const rx = ax + bx, ry = ay + by;
      CZ.dom.clear(box);
      box.appendChild(gridLayer(-lim, lim, -lim, lim, s));

      // paralelogramo tracejado: mostra de onde a resultante sai
      box.appendChild(h('polygon', {
        points: [[0, 0], [ax, ay], [rx, ry], [bx, by]]
          .map((p) => `${s.sx(p[0])},${s.sy(p[1])}`).join(' '),
        fill: C.curve, 'fill-opacity': .07, stroke: C.ink,
        'stroke-width': 1, 'stroke-dasharray': '4 4', 'stroke-opacity': .5
      }));

      box.appendChild(arrow(s.sx(0), s.sy(0), s.sx(ax), s.sy(ay), C.curve, 2.6));
      box.appendChild(arrow(s.sx(0), s.sy(0), s.sx(bx), s.sy(by), C.accent, 2.6));
      box.appendChild(arrow(s.sx(0), s.sy(0), s.sx(rx), s.sy(ry), C.err, 3.2));

      const mod = Math.hypot(rx, ry);
      const modU = Math.hypot(ax, ay), modV = Math.hypot(bx, by);
      const cosT = (modU && modV) ? (ax * bx + ay * by) / (modU * modV) : 0;
      const ang = Math.round(Math.acos(Math.max(-1, Math.min(1, cosT))) * 180 / Math.PI);

      CZ.dom.clear(out);
      out.appendChild(h('span', { html:
        `u+v = <span class="hl">(${rx}, ${ry})</span> · |u+v| = <span class="hl">${mod.toFixed(2)}</span> · ângulo entre u e v = ${ang}°` }));
    }

    const el = shell(box,
      slider('u — horizontal', -5, 5, 1, ax, (v) => { ax = v; draw(); }),
      slider('u — vertical',   -5, 5, 1, ay, (v) => { ay = v; draw(); }),
      slider('v — horizontal', -5, 5, 1, bx, (v) => { bx = v; draw(); }),
      slider('v — vertical',   -5, 5, 1, by, (v) => { by = v; draw(); }),
      out);
    draw();
    return el;
  }

  /* ============================ 13. Produto escalar e ângulo ============================ */
  function escalarAngulo() {
    let angA = 20, angB = 70, modA = 4, modB = 3;
    const lim = 6;
    const s = scale(-lim, lim, -lim, lim);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const ra = angA * Math.PI / 180, rb = angB * Math.PI / 180;
      const u = [modA * Math.cos(ra), modA * Math.sin(ra)];
      const v = [modB * Math.cos(rb), modB * Math.sin(rb)];
      const dot = u[0] * v[0] + u[1] * v[1];
      const theta = Math.abs(angB - angA) % 360;
      const ang = theta > 180 ? 360 - theta : theta;

      CZ.dom.clear(box);
      box.appendChild(gridLayer(-lim, lim, -lim, lim, s));

      // setor do ângulo entre os dois
      const r = 34;
      const cx = s.sx(0), cy = s.sy(0);
      const a0 = -ra, a1 = -rb;
      const large = Math.abs(angB - angA) > 180 ? 1 : 0;
      const sweep = angB > angA ? 0 : 1;
      box.appendChild(h('path', {
        d: `M ${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A ${r} ${r} 0 ${large} ${sweep} ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}`,
        fill: 'none', stroke: dot >= 0 ? C.ok : C.err, 'stroke-width': 2.4
      }));

      box.appendChild(arrow(cx, cy, s.sx(u[0]), s.sy(u[1]), C.curve, 2.8));
      box.appendChild(arrow(cx, cy, s.sx(v[0]), s.sy(v[1]), C.accent, 2.8));

      const veredito = Math.abs(dot) < 0.01 ? 'perpendiculares'
        : dot > 0 ? 'ângulo agudo' : 'ângulo obtuso';
      CZ.dom.clear(out);
      out.appendChild(h('span', { html:
        `⟨u,v⟩ = <span class="hl">${dot.toFixed(2)}</span> · θ = <span class="hl">${ang}°</span> · ${veredito}` }));
    }

    const el = shell(box,
      slider('direção de u', 0, 360, 5, angA, (v) => { angA = v; draw(); }, (v) => v + '°'),
      slider('direção de v', 0, 360, 5, angB, (v) => { angB = v; draw(); }, (v) => v + '°'),
      slider('|u|', 1, 5, 1, modA, (v) => { modA = v; draw(); }),
      slider('|v|', 1, 5, 1, modB, (v) => { modB = v; draw(); }),
      out);
    draw();
    return el;
  }

  /* ============================ 14. Produto vetorial: área ============================ */
  function vetorialArea() {
    let ax = 4, ay = 1, bx = 1, by = 3;
    const lim = 6;
    const s = scale(-lim, lim, -lim, lim);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const cross = ax * by - ay * bx;   // componente k de u × v em R²
      const area = Math.abs(cross);
      CZ.dom.clear(box);
      box.appendChild(gridLayer(-lim, lim, -lim, lim, s));

      box.appendChild(h('polygon', {
        points: [[0, 0], [ax, ay], [ax + bx, ay + by], [bx, by]]
          .map((p) => `${s.sx(p[0])},${s.sy(p[1])}`).join(' '),
        fill: area < 0.01 ? C.err : C.accent, 'fill-opacity': .22,
        stroke: area < 0.01 ? C.err : C.accent, 'stroke-width': 1.6
      }));
      box.appendChild(arrow(s.sx(0), s.sy(0), s.sx(ax), s.sy(ay), C.curve, 2.6));
      box.appendChild(arrow(s.sx(0), s.sy(0), s.sx(bx), s.sy(by), C.accent, 2.6));

      CZ.dom.clear(out);
      out.appendChild(h('span', { html: area < 0.01
        ? `u × v = <span class="hl">0</span> · vetores paralelos, o paralelogramo achatou`
        : `|u × v| = <span class="hl">${area}</span> = área do paralelogramo · triângulo = ${(area / 2).toFixed(1)}` }));
    }

    const el = shell(box,
      slider('u — horizontal', -5, 5, 1, ax, (v) => { ax = v; draw(); }),
      slider('u — vertical',   -5, 5, 1, ay, (v) => { ay = v; draw(); }),
      slider('v — horizontal', -5, 5, 1, bx, (v) => { bx = v; draw(); }),
      slider('v — vertical',   -5, 5, 1, by, (v) => { by = v; draw(); }),
      out);
    draw();
    return el;
  }

  /* ============================ 15. Combinação linear ============================ */
  function combLinear() {
    let a = 1, b = 1, vx = 1, vy = 2;
    const ux = 2, uy = 1;                 // u fica fixo para reduzir controles
    const alvo = [5, 4];
    const lim = 7;
    const s = scale(-lim, lim, -lim, lim);
    const box = h('svg', { viewBox: `0 0 ${W} ${HT}`, role: 'img' });
    const out = readout();

    function draw() {
      const rx = a * ux + b * vx, ry = a * uy + b * vy;
      const det = ux * vy - uy * vx;
      CZ.dom.clear(box);
      box.appendChild(gridLayer(-lim, lim, -lim, lim, s));

      // quando det = 0 os dois vetores são LD: o alcance colapsa numa reta
      if (Math.abs(det) < 1e-9) {
        const k = 12 / (Math.hypot(ux, uy) || 1);
        box.appendChild(h('line', {
          x1: s.sx(-ux * k), y1: s.sy(-uy * k), x2: s.sx(ux * k), y2: s.sy(uy * k),
          stroke: C.err, 'stroke-width': 2, 'stroke-dasharray': '6 5', 'stroke-opacity': .8
        }));
      }

      box.appendChild(h('circle', { cx: s.sx(alvo[0]), cy: s.sy(alvo[1]), r: 9,
        fill: 'none', stroke: C.ok, 'stroke-width': 2.4, 'stroke-dasharray': '3 3' }));

      box.appendChild(arrow(s.sx(0), s.sy(0), s.sx(ux), s.sy(uy), C.curve, 2.2));
      box.appendChild(arrow(s.sx(0), s.sy(0), s.sx(vx), s.sy(vy), C.accent, 2.2));
      box.appendChild(arrow(s.sx(0), s.sy(0), s.sx(rx), s.sy(ry), C.ink, 3));

      const acertou = Math.abs(rx - alvo[0]) < 0.01 && Math.abs(ry - alvo[1]) < 0.01;
      CZ.dom.clear(out);
      out.appendChild(h('span', { html: Math.abs(det) < 1e-9
        ? `det = <span class="hl">0</span> — u e v são LD. O alcance virou uma reta: o alvo é inalcançável.`
        : acertou
          ? `<span class="hl">${a}u ${b < 0 ? '−' : '+'} ${Math.abs(b)}v = (5, 4)</span> — alvo alcançado!`
          : `${a}u ${b < 0 ? '−' : '+'} ${Math.abs(b)}v = (${rx}, ${ry}) · alvo: (5, 4)` }));
    }

    const el = shell(box,
      slider('coeficiente a', -4, 4, 1, a, (v) => { a = v; draw(); }),
      slider('coeficiente b', -4, 4, 1, b, (v) => { b = v; draw(); }),
      slider('v — horizontal', -4, 4, 1, vx, (v) => { vx = v; draw(); }),
      slider('v — vertical',   -4, 4, 1, vy, (v) => { vy = v; draw(); }),
      out);
    draw();
    return el;
  }

  const BUILDERS = {
    ordemOperacoes, retaNumerica, fracaoBarra, balanca, maquina,
    reta, parabola, expo, limite, tangente, riemann,
    vetorSoma, escalarAngulo, vetorialArea, combLinear
  };

  /** Ponto de entrada usado pelas aulas: CZ.viz.build({type:'tangente'}) */
  function build(spec) {
    if (!spec || !BUILDERS[spec.type]) return null;
    try { return BUILDERS[spec.type](spec.params || {}); }
    catch (err) { console.error('viz falhou:', spec.type, err); return null; }
  }

  /* Os laboratórios (core/labs.js) desenham no mesmo estilo e reaproveitam
     estes utilitários em vez de duplicar escala, grade e slider. */
  const helpers = { W, HT, PAD, C, scale, gridLayer, pathOf, svg, slider, readout, shell };

  CZ.viz = { build, BUILDERS, helpers };
})(window.CZ);
