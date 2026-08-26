/* ==========================================================================
   core/storage.js — camada de persistência com adaptadores intercambiáveis.

   Escolhe automaticamente o melhor backend disponível:
     1. window.storage  → ambiente sandbox (chave/valor assíncrono)
     2. localStorage    → navegador comum / arquivo local
     3. memória         → fallback: funciona, mas não sobrevive ao reload

   A API é sempre assíncrona, para que trocar por um backend HTTP no futuro
   (ver README → "Próximos passos") não exija mudar nenhum chamador.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const memory = new Map();

  function pickBackend() {
    if (typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function') {
      return 'sandbox';
    }
    try {
      const probe = '__cz_probe__';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      return 'local';
    } catch (_) {
      return 'memory';
    }
  }

  const backend = pickBackend();

  async function get(key) {
    try {
      if (backend === 'sandbox') {
        const res = await window.storage.get(key, false);
        return res && res.value ? JSON.parse(res.value) : null;
      }
      if (backend === 'local') {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      }
      return memory.has(key) ? JSON.parse(memory.get(key)) : null;
    } catch (_) {
      return null;
    }
  }

  async function set(key, value) {
    const raw = JSON.stringify(value);
    try {
      if (backend === 'sandbox') { await window.storage.set(key, raw, false); return true; }
      if (backend === 'local')   { window.localStorage.setItem(key, raw);     return true; }
      memory.set(key, raw);
      return true;
    } catch (_) {
      memory.set(key, raw); // último recurso: mantém a sessão viva
      return false;
    }
  }

  async function remove(key) {
    try {
      if (backend === 'sandbox') { await window.storage.delete(key, false); return true; }
      if (backend === 'local')   { window.localStorage.removeItem(key);     return true; }
      memory.delete(key);
      return true;
    } catch (_) {
      memory.delete(key);
      return false;
    }
  }

  CZ.storage = { get, set, remove, backend };
})(window.CZ);
