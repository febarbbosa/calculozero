/* ==========================================================================
   components/celebrate.js — retorno visual de acerto e de conquista.

   Por que existe: o intervalo entre "respondi" e "descobri se acertei" é o
   momento de maior atenção de toda a sessão. Aproveitar esse instante com
   um retorno claro e imediato é o que faz a pessoa querer o próximo.

   Duas regras que este arquivo respeita:
   1. Comemoração é proporcional. Acertar um básico ganha um brilho; fechar
      um tópico ganha confete. Comemorar tudo igual não comemora nada.
   2. Erro nunca é punido visualmente. Sem vermelho piscando, sem vida
      perdida. O retorno de erro é firme e curto, e vem com o caminho.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;

  const CORES = ['var(--accent)', 'var(--d2)', 'var(--d5)', 'var(--signal)', 'var(--d3)', 'var(--d7)'];

  const reduzido = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Camada única para tudo que voa na tela. */
  let palco = null;
  function getPalco() {
    if (!palco || !palco.isConnected) {
      palco = h('div.palco', { 'aria-hidden': 'true' });
      document.body.appendChild(palco);
    }
    return palco;
  }

  /**
   * Confete. Reservado para o que custou esforço: fechar um nível, dominar
   * um tópico, passar num simulado.
   */
  function confete(quantidade) {
    if (reduzido()) return;
    const n = quantidade || 40;
    const p = getPalco();
    for (let i = 0; i < n; i++) {
      const esq = Math.random() * 100;
      const atraso = Math.random() * 0.35;
      const dur = 1.6 + Math.random() * 1.2;
      const giro = (Math.random() * 720 - 360).toFixed(0);
      const largura = 6 + Math.random() * 6;
      const peca = h('i.confete', {
        style: {
          left: esq + 'vw',
          width: largura + 'px',
          height: (largura * (0.6 + Math.random())) + 'px',
          background: CORES[i % CORES.length],
          borderRadius: Math.random() > 0.6 ? '50%' : '2px',
          animationDelay: atraso + 's',
          animationDuration: dur + 's',
          '--giro': giro + 'deg'
        }
      });
      p.appendChild(peca);
      setTimeout(() => peca.remove(), (dur + atraso) * 1000 + 200);
    }
  }

  /** Número que sobe e some — usado para XP ganho. */
  function pontos(texto, alvo) {
    if (reduzido()) return;
    const p = getPalco();
    const bolha = h('span.pontos-voando', texto);
    if (alvo && alvo.getBoundingClientRect) {
      const r = alvo.getBoundingClientRect();
      bolha.style.left = (r.left + r.width / 2) + 'px';
      bolha.style.top = (r.top) + 'px';
    } else {
      bolha.style.left = '50%';
      bolha.style.top = '55%';
    }
    p.appendChild(bolha);
    setTimeout(() => bolha.remove(), 1400);
  }

  /**
   * Faixa de retorno logo abaixo do exercício. Substitui o `.feedback`
   * quando o mascote está envolvido: mesma informação, com quem falando.
   */
  function faixa(certo, opts) {
    opts = opts || {};
    const grupo = certo
      ? (opts.usouDica ? 'acertoComDica' : 'acerto')
      : (opts.repetido ? 'erroRepetido' : 'erro');

    return h('div.faixa', { 'data-ok': certo },
      CZ.mascote.draw(certo ? 'feliz' : 'apoio', { tamanho: 52 }),
      h('div.faixa-txt',
        h('b', certo ? 'Certo' : 'Ainda não'),
        h('span', opts.texto || CZ.mascote.fala(grupo))),
      opts.acao || null);
  }

  /**
   * Tela cheia de conquista. Só para marcos: tópico dominado, nível fechado,
   * simulado aprovado, sequência batida.
   */
  function marco(opts) {
    const back = h('div.marco-back', {
      onClick: (e) => { if (e.target === back) fechar(); }
    });
    function fechar() { back.classList.add('saindo'); setTimeout(() => back.remove(), 220); }

    const caixa = h('div.marco',
      CZ.mascote.draw(opts.expr || 'comemora', { tamanho: 132 }),
      h('p.marco-eyebrow', opts.eyebrow || 'Conquista'),
      h('h2', opts.titulo),
      opts.sub ? h('p.marco-sub', opts.sub) : null,
      opts.detalhes ? h('div.marco-detalhes', opts.detalhes.map((d) =>
        h('div.marco-item', h('b', d.valor), h('span', d.rotulo)))) : null,
      h('button.btn.btn-primary.btn-block.btn-lg.mt-24', {
        onClick: () => { fechar(); if (opts.onFechar) opts.onFechar(); }
      }, opts.botao || 'Continuar')
    );

    back.appendChild(caixa);
    document.body.appendChild(back);
    confete(opts.confete === false ? 0 : 60);
    setTimeout(() => { const b = caixa.querySelector('button'); if (b) b.focus(); }, 120);
    return { fechar };
  }

  /** Toast com o mascote, para conquistas menores. */
  function toastZero(texto, expr) {
    const wrap = document.querySelector('.toast-wrap') ||
      document.body.appendChild(h('div.toast-wrap'));
    const t = h('div.toast.toast-zero',
      CZ.mascote.draw(expr || 'feliz', { tamanho: 34, animar: false }),
      h('span', texto));
    wrap.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 2600);
    setTimeout(() => t.remove(), 3000);
  }

  CZ.celebrate = { confete, pontos, faixa, marco, toastZero };
})(window.CZ);
