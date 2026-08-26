/* ==========================================================================
   pages/exam.js — simulado.

   Diferença deliberada em relação à prática livre: aqui não há dica nem
   solução durante a prova. O feedback vem todo no fim, junto com o
   diagnóstico por tópico — que é o que realmente serve depois.

   O relógio existe para dar a sensação de prova, mas não interrompe nada
   quando zera. Encerrar a prova de alguém no meio não ensina; só assusta.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;

  function render(params) {
    const exam = CZ.exams.get(params.examId);
    if (!exam) return h('div.wrap', h('div.card', h('h3', 'Simulado não encontrado')));

    const root = h('div.wrap', h('div.lesson-shell'));
    const shell = root.firstChild;

    let prova = null;
    let i = 0;
    let respostas = [];      // booleanos
    let dadas = [];          // o que a pessoa respondeu, para a revisão
    let inicio = 0;
    let timerId = null;

    /* ---------------- abertura ---------------- */
    function intro() {
      if (timerId) { clearInterval(timerId); timerId = null; }
      const disponivel = CZ.exams.available(exam.id);
      const res = CZ.exams.resultOf(exam.id);
      const previa = CZ.exams.assemble(exam.id);

      clear(shell);
      shell.appendChild(h('div',
        h('button.btn.btn-sm.btn-quiet', { onClick: () => CZ.router.go('/base') }, '← Base curricular'),
        h('p.eyebrow.mt-16', 'Simulado'),
        h('h2', { style: { margin: '10px 0 8px' } }, exam.name),
        h('p.muted', exam.blurb),

        !disponivel
          ? h('div.card.mt-24', { style: { background: 'var(--signal-soft)', border: 0 } },
              h('h4', { style: { color: 'var(--signal)' } }, 'Ainda não há questões suficientes'),
              h('p', { style: { margin: '8px 0 0', fontSize: '14.5px' } },
                'Este simulado sorteia questões das fichas dos tópicos que ele cobre, e ainda faltam fichas neste escopo. Ele liga sozinho conforme o conteúdo for escrito.'))
          : h('div',
              h('div.card.mt-24',
                h('div.row.gap-14.wrapf',
                  h('div.stat', h('b', String(previa.total)), h('span', 'questões')),
                  h('div.stat', h('b', String(exam.minutes)), h('span', 'minutos sugeridos')),
                  h('div.stat', h('b', exam.passing + '%'), h('span', 'para aprovação')),
                  res ? h('div.stat', h('b', res.melhor + '%'), h('span', 'sua melhor nota')) : null),
                previa.total < previa.planejado
                  ? h('p.dim', { style: { fontSize: '13px', marginTop: '14px' } },
                      `A prova planejada tem ${previa.planejado} questões, mas o banco atual permite ${previa.total}. Ela cresce conforme novas fichas são escritas.`)
                  : null),

              h('div.card.mt-16', { style: { background: 'var(--surface-2)', border: 0 } },
                h('h4', 'Como funciona'),
                h('ul.revisao.mt-8',
                  h('li', 'Sem dica e sem solução durante a prova — o feedback vem todo no fim.'),
                  h('li', 'A nota pesa as questões pela dificuldade: acertar um desafio vale mais que acertar um básico.'),
                  h('li', 'O relógio é referência, não guilhotina: quando zera, você continua.'),
                  h('li', 'No fim você recebe a lista de tópicos para revisar, na ordem em que mais te derrubaram.')),
                exam.nota ? h('p', { style: { fontSize: '14.5px', marginTop: '14px' } }, exam.nota) : null),

              h('div.mt-24',
                h('button.btn.btn-primary.btn-block.btn-lg', { onClick: comecar }, 'Começar o simulado')))
      ));
      CZ.dom.scrollTop();
    }

    /* ---------------- prova ---------------- */
    function comecar() {
      prova = CZ.exams.assemble(exam.id);
      if (!prova || !prova.total) return intro();
      i = 0; respostas = []; dadas = [];
      inicio = Date.now();
      questao();
    }

    function relogio() {
      const el = h('span.lbl');
      function tick() {
        const seg = Math.max(0, exam.minutes * 60 - Math.floor((Date.now() - inicio) / 1000));
        const m = Math.floor(seg / 60), s = seg % 60;
        el.textContent = `${m}:${String(s).padStart(2, '0')}`;
        el.dataset.over = seg === 0;
      }
      tick();
      if (timerId) clearInterval(timerId);
      timerId = setInterval(tick, 1000);
      return el;
    }

    function questao() {
      const q = prova.questions[i];
      clear(shell);

      const nodes = [];
      let travado = false;

      const input = q.type === 'input'
        ? h('input.answer-input', { type: 'text', placeholder: 'sua resposta', autocomplete: 'off',
            'aria-label': 'Resposta', onKeydown: (e) => { if (e.key === 'Enter') responder(); } })
        : null;

      function responder(escolha) {
        if (travado) return;
        const dado = q.type === 'choice' ? escolha : (input.value || '').trim();
        if (q.type === 'input' && !dado) { input.focus(); return; }
        travado = true;
        const res = CZ.exercises.check(q, dado);
        respostas.push(res.ok);
        dadas.push(dado);
        avancar();
      }

      shell.appendChild(h('div',
        h('div.diag-progress',
          h('span.lbl', `${i + 1}/${prova.total}`),
          CZ.ui.Bar((i / prova.total) * 100),
          relogio()),

        h('div.card',
          h('div.step-kind', (CZ.sheets.DRILL_LEVELS.find((l) => l.id === q.level) || {}).name || 'Questão'),
          h('div.ex-prompt', { html: q.prompt }),
          q.type === 'choice'
            ? h('div.opts', q.choices.map((c, k) => {
                const b = h('button.opt', { onClick: () => responder(k) },
                  h('span.key', String.fromCharCode(65 + k)), h('span', c));
                nodes.push(b);
                return b;
              }))
            : h('div.answer-row', input,
                h('button.btn.btn-primary', { onClick: () => responder() }, 'Responder')),
          h('div.diag-skip',
            h('button.btn.btn-quiet.btn-sm', {
              onClick: () => { if (travado) return; travado = true; respostas.push(false); dadas.push(null); avancar(); }
            }, 'Pular esta'))),

        h('p.dim.mt-16', { style: { fontSize: '13px', textAlign: 'center' } },
          'Sem dicas durante a prova. A resolução completa aparece no fim.')
      ));

      if (input) input.focus();
      CZ.dom.scrollTop();
    }

    function avancar() {
      i++;
      if (i < prova.total) questao();
      else encerrar();
    }

    /* ---------------- resultado ---------------- */
    function encerrar() {
      if (timerId) { clearInterval(timerId); timerId = null; }
      const { nota, revisar } = CZ.exams.record(exam.id, prova.questions, respostas);
      const acertos = respostas.filter(Boolean).length;
      const passou = nota >= exam.passing;
      const minutos = Math.round((Date.now() - inicio) / 60000);

      clear(shell);

      const revisaoDetalhada = h('div.mt-16');
      let aberta = false;

      shell.appendChild(h('div',
        h('div.card.center',
          h('div', { style: { fontSize: '40px' } }, passou ? '✅' : '📌'),
          h('h2', { style: { margin: '10px 0 4px' } }, nota + '%'),
          h('p.muted', `${acertos} de ${prova.total} questões · ${minutos} min · nota ponderada pela dificuldade`),
          h('div', { style: { maxWidth: '340px', margin: '18px auto 0' } },
            CZ.ui.Bar(nota, passou ? 'ok' : nota >= 50 ? 'warn' : 'err')),
          h('p', { style: { marginTop: '16px', fontSize: '15px' } },
            passou
              ? 'Você passou da linha de corte. O conteúdo desta prova não é mais o que está te segurando.'
              : `A linha de corte é ${exam.passing}%. Não é uma reprovação: é a lista abaixo dizendo exatamente onde apoiar o próximo estudo.`)),

        revisar.length ? h('div.card.mt-16',
          h('h4', 'Revise nesta ordem'),
          h('p.muted', { style: { fontSize: '14px', margin: '8px 0 0' } },
            'Ordenado pelo número de erros. Comece de cima.'),
          h('div.mt-16', revisar.map((r) =>
            h('button.topic-row', { onClick: () => CZ.router.go('/topico/' + r.topic.id) },
              h('div.topic-row-main',
                h('div.topic-row-head',
                  h('span.nm', r.topic.name),
                  h('span.chip.err', `${r.erros} ${r.erros === 1 ? 'erro' : 'erros'}`)),
                h('div.topic-row-goal', r.topic.goal)),
              h('span.topic-row-go', '›'))))
        ) : h('div.card.mt-16', { style: { background: 'var(--ok-soft)', border: 0 } },
            h('h4', { style: { color: 'var(--ok)' } }, 'Nenhum erro'),
            h('p', { style: { margin: '8px 0 0', fontSize: '14.5px' } },
              'Prova limpa. Vale subir para o próximo simulado da trilha.')),

        h('div.mt-16',
          h('button.btn.btn-ghost.btn-block', { onClick: () => {
            aberta = !aberta;
            clear(revisaoDetalhada);
            if (!aberta) return;
            prova.questions.forEach((q, k) => {
              const ok = respostas[k];
              const resp = q.type === 'choice' ? q.choices[q.answer] : q.answer;
              const dada = dadas[k] === null ? 'pulou'
                : q.type === 'choice' ? q.choices[dadas[k]] : dadas[k];
              revisaoDetalhada.appendChild(h('div.card.card-pad-sm.mt-8', { 'data-ok': ok },
                h('div.step-kind', `${k + 1} · ${ok ? 'acertou' : 'errou'}`),
                h('div', { html: q.prompt }),
                h('p.dim', { style: { fontSize: '13.5px', margin: '8px 0 0' } }, `Você respondeu: ${dada}`),
                ok ? null : h('div',
                  h('ol.solution-steps.mt-8', (q.solution || []).map((s) => h('li', s))),
                  h('p', { style: { marginTop: '10px' } }, h('strong', 'Resposta: ' + resp)))));
            });
          } }, 'Ver a correção questão a questão'),
          revisaoDetalhada),

        h('div.row.gap-10.mt-24.wrapf', { style: { justifyContent: 'center' } },
          h('button.btn.btn-ghost', { onClick: intro }, 'Refazer o simulado'),
          h('button.btn.btn-primary', { onClick: () => CZ.router.go('/base') }, 'Voltar à base curricular'))
      ));
      CZ.dom.scrollTop();
    }

    intro();
    return root;
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.exam = render;
})(window.CZ);
