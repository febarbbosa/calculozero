/* ==========================================================================
   core/router.js — roteamento por hash.

   Hash em vez de History API porque a plataforma precisa funcionar aberta
   direto do disco (file://), sem servidor.
   Rotas: #/  #/diagnostico  #/painel  #/mapa  #/aula/:lessonId  #/praticar/:topicId
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const routes = [];
  let notFound = null;
  let current = null;

  function on(pattern, handler) {
    const parts = pattern.split('/').filter(Boolean);
    routes.push({ parts, handler, pattern });
  }

  function parse() {
    const raw = (window.location.hash || '#/').replace(/^#/, '');
    return raw.split('/').filter(Boolean);
  }

  function match(segments) {
    for (const r of routes) {
      if (r.parts.length !== segments.length) continue;
      const params = {};
      let ok = true;
      for (let i = 0; i < r.parts.length; i++) {
        const p = r.parts[i];
        if (p.startsWith(':')) params[p.slice(1)] = decodeURIComponent(segments[i]);
        else if (p !== segments[i]) { ok = false; break; }
      }
      if (ok) return { route: r, params };
    }
    return null;
  }

  function resolve() {
    const segments = parse();
    const found = match(segments);
    current = found ? found.route.pattern : null;
    if (found) found.route.handler(found.params);
    else if (notFound) notFound();
    CZ.dom.scrollTop();
  }

  function go(path) {
    const target = path.startsWith('#') ? path : '#' + path;
    if (window.location.hash === target) resolve();
    else window.location.hash = target;
  }

  function start(fallback) {
    notFound = fallback;
    window.addEventListener('hashchange', resolve);
    resolve();
  }

  function currentPattern() { return current; }

  CZ.router = { on, go, start, currentPattern };
})(window.CZ);
