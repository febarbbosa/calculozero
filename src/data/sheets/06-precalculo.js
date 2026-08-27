/* ==========================================================================
   data/sheets/06-precalculo.js — fichas de Pré-Cálculo.
   Formato e regras em core/sheets.js.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([
    /* ═══════════════════════════════════════════════════════════════
       Comparação de crescimento
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'pc.lm.crescimento',

      whatIs: `<p>Funções diferentes crescem em ritmos incomparáveis. Para valores grandes de <span class="math">x</span>, a ordem é sempre esta:</p>
        <p><span class="math">ln x &lt; x &lt; x² &lt; x³ &lt; 2ˣ &lt; x!</span></p>
        <p>"Menor" aqui significa: por mais que a da esquerda comece na frente, a da direita a ultrapassa e nunca mais é alcançada.</p>`,

      whyExists: `<p>Quando <span class="math">x → ∞</span>, só o termo de crescimento dominante importa: todos os outros viram ruído. Isso simplifica limites no infinito a olhar um termo só.</p>
        <p>E é o mesmo raciocínio da análise de algoritmos: um algoritmo <span class="math">O(n²)</span> perde para um <span class="math">O(n log n)</span> para <span class="math">n</span> grande, ainda que seja mais rápido para <span class="math">n</span> pequeno. A pergunta nunca é "qual é mais rápido agora", é "quem vence quando cresce".</p>`,

      simple: 'Log cresce devagaríssimo, polinômio cresce firme, exponencial dispara. Para x grande, quem cresce mais rápido domina tudo.',

      academic: `<p>Diz-se que <span class="math">g</span> domina <span class="math">f</span> quando <span class="math">lim_{x→∞} f(x)/g(x) = 0</span>. Sob essa relação vale a hierarquia:</p>
        <p><span class="math">1 ≺ ln x ≺ x^ε ≺ x^k ≺ a^x ≺ x! ≺ x^x</span>, para <span class="math">0 &lt; ε &lt; k</span> e <span class="math">a &gt; 1</span>.</p>
        <p>Duas consequências práticas: qualquer exponencial de base maior que 1 vence qualquer polinômio; e qualquer potência positiva de <span class="math">x</span>, por menor que seja o expoente, vence o logaritmo. É a base formal da notação O grande.</p>`,

      examples: [
        { level: 'basico', prompt: 'Qual cresce mais rápido para x grande: x² ou 2ˣ ?',
          steps: ['Para x = 4: x² = 16 e 2ˣ = 16 — empatam',
                  'Para x = 10: 100 contra 1024',
                  'Para x = 20: 400 contra mais de um milhão'],
          answer: '2ˣ, e por uma margem que só cresce' },
        { level: 'intermediario', prompt: 'Calcule lim (x→∞) de (3x² + 5x)/(x² − 1)',
          steps: ['Os graus do numerador e do denominador são iguais',
                  'Divida tudo pelo maior grau, x²',
                  '(3 + 5/x)/(1 − 1/x²)', 'Os termos com 1/x vão a zero'],
          answer: '3 — a razão dos coeficientes líderes' },
        { level: 'avancado', prompt: 'Calcule lim (x→∞) de (ln x)/x',
          steps: ['Numerador e denominador crescem sem parar',
                  'Mas x domina ln x na hierarquia',
                  'O denominador cresce muito mais rápido'],
          answer: '0' }
      ],

      application: { area: 'Computação',
        text: 'Busca binária é O(log n): dobrar a base de dados custa uma comparação a mais. Busca linear é O(n): dobrar a base dobra o tempo. Com um bilhão de registros, a primeira faz 30 comparações e a segunda faz um bilhão — a mesma diferença que a hierarquia descreve.' },

      formulas: [
        { f: 'ln x ≺ x^ε ≺ x^k ≺ aˣ ≺ x! ', note: 'A hierarquia. ≺ significa "cresce mais devagar que".' },
        { f: 'lim f/g = 0 ⟺ g domina f', note: 'A definição formal de dominância.' },
        { f: 'Racional: compare os graus', note: 'Grau maior embaixo → 0; iguais → razão dos líderes; maior em cima → ±∞.' },
        { f: 'Exponencial vence qualquer polinômio', note: 'Mesmo x¹⁰⁰⁰ perde para 1,001ˣ no longo prazo.' }
      ],

      mistakes: [
        { erro: 'Concluir que x¹⁰⁰ cresce mais que 2ˣ porque o expoente é maior',
          porque: 'Comparar o número no expoente em vez do lugar onde o x está.',
          certo: 'Em x¹⁰⁰ o x é a base; em 2ˣ o x é o expoente. Exponencial sempre vence.' },
        { erro: 'Achar que ln x tende a um limite finito',
          porque: 'Confundir "cresce devagar" com "para de crescer".',
          certo: 'ln x → ∞. Devagar, mas sem parar.' },
        { erro: 'Comparar funções pelos valores em x pequeno',
          porque: 'Testar com x = 2 ou 3 e generalizar.',
          certo: 'A hierarquia vale no infinito. Para x pequeno a ordem pode ser outra.' }
      ],

      tip: 'Em limite no infinito de função racional, não expanda nada: olhe só o termo de maior grau em cima e embaixo. Grau maior embaixo dá zero, graus iguais dão a razão dos coeficientes, grau maior em cima dá infinito.',

      drills: {
        basico: [
          { id: 'pc.lm.cres#b1', type: 'choice', prompt: 'Qual função cresce mais rápido para x grande ?',
            choices: ['ln x', 'x', 'x²', '2ˣ'], answer: 3,
            hints: ['A hierarquia vai de log até exponencial.', 'Exponencial está no fim da lista.',
                    '2ˣ vence todas as outras.'],
            solution: ['Hierarquia: ln x ≺ x ≺ x² ≺ 2ˣ', 'A exponencial domina todas'] },
          { id: 'pc.lm.cres#b2', type: 'input', prompt: 'Calcule lim (x→∞) de (2x + 3)/x.', answer: '2',
            hints: ['Divida numerador e denominador por x.', '(2 + 3/x)/1.', '3/x tende a zero.'],
            solution: ['Divida tudo por x: (2 + 3/x)/1', '3/x → 0', 'Limite: 2'],
            traps: { '5': 'Você somou os coeficientes.' } },
          { id: 'pc.lm.cres#b3', type: 'input', prompt: 'Calcule lim (x→∞) de 1/x².', answer: '0',
            hints: ['O denominador cresce sem parar.', 'O numerador é fixo.', 'A fração encolhe.'],
            solution: ['x² → ∞ enquanto o numerador fica em 1', '1/x² → 0'],
            traps: { '1': 'O denominador cresce; a fração vai a zero.' } }
        ],
        intermediario: [
          { id: 'pc.lm.cres#i1', type: 'input', prompt: 'Calcule lim (x→∞) de (5x² − 3)/(2x² + x).', answer: '2.5',
            accept: ['2,5', '5/2'],
            hints: ['Graus iguais no numerador e no denominador.', 'O limite é a razão dos coeficientes líderes.',
                    '5/2.'],
            solution: ['Grau 2 em cima e embaixo', 'Divida tudo por x²: (5 − 3/x²)/(2 + 1/x)',
                       'Os termos com 1/x vão a zero', 'Limite: 5/2 = 2,5'],
            traps: { '0': 'Isso valeria se o grau de baixo fosse maior.' } },
          { id: 'pc.lm.cres#i2', type: 'input', prompt: 'Calcule lim (x→∞) de (3x + 1)/(x² + 5).', answer: '0',
            hints: ['Compare os graus: 1 em cima, 2 embaixo.', 'O denominador cresce mais rápido.',
                    'A fração encolhe a zero.'],
            solution: ['Grau do denominador (2) é maior que o do numerador (1)',
                       'O denominador domina', 'Limite: 0'],
            traps: { '3': 'Isso valeria se os graus fossem iguais.' } },
          { id: 'pc.lm.cres#i3', type: 'choice', prompt: 'Um algoritmo O(n log n) e outro O(n²). Para n muito grande, qual é melhor ?',
            choices: ['O(n²)', 'O(n log n)', 'São equivalentes', 'Depende do computador'], answer: 1,
            hints: ['Compare n·log n com n·n.', 'Isso reduz a comparar log n com n.',
                    'log n cresce muito mais devagar.'],
            solution: ['n log n vs n²  ⟺  log n vs n', 'log n ≺ n na hierarquia',
                       'O(n log n) é melhor para n grande'] }
        ],
        avancado: [
          { id: 'pc.lm.cres#a1', type: 'input', prompt: 'Calcule lim (x→∞) de (x³ + 2x)/(4x² − 1). Responda "infinito" se divergir.',
            answer: 'infinito', accept: ['∞', 'inf', '+infinito'],
            hints: ['Grau 3 em cima, grau 2 embaixo.', 'O numerador domina.',
                    'A fração cresce sem parar.'],
            solution: ['Grau do numerador (3) maior que o do denominador (2)',
                       'Dividindo por x²: (x + 2/x)/(4 − 1/x²) → x/4',
                       'Limite: +∞'],
            traps: { '0': 'Isso valeria se o grau maior estivesse embaixo.',
                     '0.25': 'A razão dos coeficientes só vale com graus iguais.' } },
          { id: 'pc.lm.cres#a2', type: 'choice', prompt: 'Qual afirmação é verdadeira ?',
            choices: ['x¹⁰⁰ cresce mais que 1,5ˣ para x grande',
                      '1,5ˣ cresce mais que x¹⁰⁰ para x grande',
                      'As duas crescem igual', 'ln x cresce mais que x^0,001'],
            answer: 1,
            hints: ['Onde está o x em cada expressão?', 'Em x¹⁰⁰ ele é a base; em 1,5ˣ é o expoente.',
                    'Exponencial de base maior que 1 vence qualquer polinômio.'],
            solution: ['Qualquer aˣ com a > 1 domina qualquer x^k',
                       'O expoente 100 apenas atrasa o cruzamento, não o impede',
                       'E x^0,001 domina ln x, por menor que seja o expoente'] }
        ],
        desafio: [
          { id: 'pc.lm.cres#d1', type: 'input', prompt: 'Calcule lim (x→∞) de (√(x² + 1))/x.', answer: '1',
            hints: ['Coloque x² em evidência dentro da raiz.', '√(x²(1 + 1/x²)) = x·√(1 + 1/x²) para x > 0.',
                    'Divida por x: √(1 + 1/x²).'],
            solution: ['√(x² + 1) = √(x²(1 + 1/x²)) = |x|·√(1 + 1/x²)',
                       'Para x → +∞, |x| = x',
                       'A fração vira √(1 + 1/x²)', '1/x² → 0, então o limite é √1 = 1'],
            traps: { '0': 'Numerador e denominador crescem no mesmo ritmo; não vai a zero.',
                     'infinito': 'A raiz de x² cresce como x, não mais que x.' } }
        ]
      },

      review: [
        'Hierarquia: ln x ≺ x^k ≺ aˣ ≺ x!  para x grande.',
        'Exponencial vence qualquer polinômio, por maior que seja o expoente.',
        'Em função racional no infinito, compare só os graus.',
        'É o mesmo raciocínio da notação O grande em análise de algoritmos.'
      ]
    }
  ]);
})(window.CZ);
