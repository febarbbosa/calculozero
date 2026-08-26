/* ==========================================================================
   core/dom.js — hyperscript minimalista + utilidades de DOM.
   Sem dependências. Namespace global: CZ.dom
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  /* Toda tag que precisa nascer no namespace SVG. Faltar uma aqui não dá
     erro: o elemento é criado como HTML e simplesmente não desenha nada. */
  const SVG_TAGS = new Set([
    'svg', 'g', 'path', 'line', 'circle', 'ellipse', 'rect', 'text', 'tspan',
    'polyline', 'polygon', 'defs', 'marker', 'clipPath', 'mask',
    'linearGradient', 'radialGradient', 'stop', 'use', 'symbol', 'foreignObject'
  ]);

  /**
   * h('div.classe', {props}, ...filhos)
   * Aceita: className, onClick/on*, dataset via data-*, style objeto, html (innerHTML).
   */
  function h(tag, props, ...children) {
    let cls = null;
    const hashIdx = tag.indexOf('.');
    if (hashIdx > -1) {
      cls = tag.slice(hashIdx + 1).split('.').join(' ');
      tag = tag.slice(0, hashIdx);
    }

    const node = SVG_TAGS.has(tag)
      ? document.createElementNS(SVG_NS, tag)
      : document.createElement(tag);

    if (cls) setClass(node, cls);

    if (props && typeof props === 'object' && !Array.isArray(props) && !(props instanceof Node)) {
      for (const key in props) {
        const val = props[key];

        // data-* e aria-* precisam do booleano escrito por extenso:
        // seletores como [data-on="true"] não casam com um atributo vazio.
        if (key.startsWith('data-') || key.startsWith('aria-')) {
          if (val === null || val === undefined) continue;
          node.setAttribute(key, String(val));
          continue;
        }

        if (val === null || val === undefined || val === false) continue;

        if (key === 'className' || key === 'class') {
          setClass(node, (cls ? cls + ' ' : '') + val);
        } else if (key === 'html') {
          node.innerHTML = val;
        } else if (key === 'text') {
          node.textContent = val;
        } else if (key === 'style' && typeof val === 'object') {
          Object.assign(node.style, val);
        } else if (key.startsWith('on') && typeof val === 'function') {
          node.addEventListener(key.slice(2).toLowerCase(), val);
        } else if (key === 'ref' && typeof val === 'function') {
          val(node);
        } else if (node instanceof SVGElement) {
          node.setAttribute(key, val);
        } else if (key in node && key !== 'list' && !key.startsWith('aria') && !key.startsWith('data')) {
          try { node[key] = val; } catch (_) { node.setAttribute(key, val); }
        } else {
          node.setAttribute(key, val === true ? '' : val);
        }
      }
    } else if (props !== null && props !== undefined) {
      children.unshift(props);
    }

    append(node, children);
    return node;
  }

  function setClass(node, val) {
    if (node instanceof SVGElement) node.setAttribute('class', val);
    else node.className = val;
  }

  function append(node, children) {
    for (const child of children.flat(4)) {
      if (child === null || child === undefined || child === false || child === true) continue;
      node.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
    }
  }

  const qs  = (sel, root) => (root || document).querySelector(sel);
  const qsa = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
    return node;
  }

  function mount(node, child) {
    clear(node);
    if (child) node.appendChild(child);
    return node;
  }

  /** Escapa texto para uso seguro em templates com `html:`. */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  function scrollTop() {
    try { window.scrollTo({ top: 0, behavior: 'instant' }); }
    catch (_) { window.scrollTo(0, 0); }
  }

  CZ.dom = { h, qs, qsa, clear, mount, esc, scrollTop };
})(window.CZ);
