/* ==========================================================================
   data/sheets/04-funcoes.js — fichas de Funções.
   Formato e regras em core/sheets.js.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([
    /* ═══════════════════════════════════════════════════════════════
       Função como máquina
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'fn.co.maquina',

      whatIs: `<p>Uma função é uma regra que associa cada entrada a <strong>exatamente uma</strong> saída. Escreve-se <span class="math">f(x)</span>: "o que a máquina devolve quando entra x".</p>
        <p>A exigência é uma só, e é o que define função: a mesma entrada nunca pode produzir duas saídas diferentes.</p>`,

      whyExists: `<p>Sem a noção de função, não há como falar de "o valor de y depende de x" com precisão. E é essa dependência que o Cálculo inteiro estuda: limite pergunta para onde a saída vai, derivada pergunta com que velocidade ela muda, integral pergunta quanto ela acumula.</p>
        <p>A restrição "uma saída só" não é capricho: sem ela, perguntar "quanto vale f em 3?" não teria resposta única, e nenhuma das três perguntas do Cálculo faria sentido.</p>`,

      simple: 'Máquina de número: entra x, sai f(x), sempre pela mesma regra. E a mesma entrada nunca pode dar duas saídas.',

      academic: `<p>Uma função <span class="math">f: A → B</span> é uma relação de <span class="math">A</span> em <span class="math">B</span> tal que, para todo <span class="math">x ∈ A</span>, existe um e apenas um <span class="math">y ∈ B</span> com <span class="math">(x,y) ∈ f</span>.</p>
        <p>O conjunto <span class="math">A</span> é o domínio, <span class="math">B</span> é o contradomínio, e a imagem é o subconjunto de <span class="math">B</span> efetivamente atingido. A unicidade da imagem é o que o teste da reta vertical verifica graficamente.</p>`,

      examples: [
        { level: 'basico', prompt: 'Se f(x) = 3x + 1, quanto vale f(4)?',
          steps: ['Troque todo x por 4', 'f(4) = 3·4 + 1', '= 12 + 1'],
          answer: '13' },
        { level: 'intermediario', prompt: 'Se f(x) = x² − 2x, quanto vale f(−3)?',
          steps: ['Substitua com parênteses: f(−3) = (−3)² − 2(−3)',
                  '(−3)² = 9', '−2(−3) = +6', '9 + 6'],
          answer: '15' },
        { level: 'avancado', prompt: 'Se f(x) = 2x − 5, para que valor de x tem-se f(x) = 11?',
          steps: ['A pergunta inverte a máquina: sabe-se a saída, procura-se a entrada',
                  'Monte a equação: 2x − 5 = 11', '2x = 16'],
          answer: 'x = 8' }
      ],

      application: { area: 'Programação',
        text: 'Uma função em código é exatamente isso: entra argumento, sai valor. Uma função dita "pura" é a que respeita a definição matemática — mesma entrada, mesma saída, sempre. Funções que dependem de estado externo quebram essa garantia, e é por isso que são mais difíceis de testar.' },

      formulas: [
        { f: 'f: A → B, x ↦ f(x)', note: 'Notação formal: domínio, contradomínio e a regra.' },
        { f: 'f(a) = valor da função em x = a', note: 'Substituir é aplicar a máquina.' },
        { f: 'Teste da reta vertical', note: 'Se alguma reta vertical corta o gráfico duas vezes, não é função.' }
      ],

      mistakes: [
        { erro: 'Ler f(x) como "f vezes x"',
          porque: 'Interpretar o parêntese como multiplicação.',
          certo: 'f(x) é notação de aplicação, não produto. f(3) significa "f aplicada a 3".' },
        { erro: 'Substituir negativo sem parênteses: f(−2) = −2² − ...',
          porque: 'Escrever direto e perder o sinal na potência.',
          certo: 'Use parênteses: (−2)² = 4, não −4.' },
        { erro: 'Achar que f(a + b) = f(a) + f(b)',
          porque: 'Tratar f como se distribuísse sobre a soma.',
          certo: 'Só vale para funções lineares sem termo constante. Com f(x) = x²: f(1+2) = 9, mas f(1) + f(2) = 5.' }
      ],

      tip: 'Ao substituir, escreva primeiro a fórmula com parênteses vazios no lugar do x: f( ) = 3( ) + 1. Depois preencha. Esse hábito elimina praticamente todo erro de sinal.',

      drills: {
        basico: [
          { id: 'fn.co.maq#b1', type: 'input', prompt: 'Se f(x) = 5x − 2, quanto vale f(3) ?', answer: '13',
            hints: ['Troque x por 3.', 'f(3) = 5·3 − 2.', '15 − 2.'],
            solution: ['f(3) = 5(3) − 2', '= 15 − 2 = 13'],
            traps: { '15': 'Você esqueceu de subtrair o 2.' } },
          { id: 'fn.co.maq#b2', type: 'input', prompt: 'Se g(x) = x² + 1, quanto vale g(−2) ?', answer: '5',
            hints: ['Substitua com parênteses.', 'g(−2) = (−2)² + 1.', '(−2)² = 4.'],
            solution: ['g(−2) = (−2)² + 1', '(−2)² = 4', '4 + 1 = 5'],
            traps: { '-3': 'Você calculou −2² = −4. Com parênteses, (−2)² = +4.' } },
          { id: 'fn.co.maq#b3', type: 'choice', prompt: 'Qual relação NÃO é função?',
            choices: ['A cada pessoa, sua data de nascimento', 'A cada número, seu dobro',
                      'A cada pessoa, seus filhos', 'A cada número, seu quadrado'], answer: 2,
            hints: ['Função exige uma saída só por entrada.', 'Uma pessoa pode ter zero, um ou vários filhos.',
                    'Isso quebra a unicidade.'],
            solution: ['Data de nascimento: uma só por pessoa ✓', 'Dobro e quadrado: um só valor ✓',
                       'Filhos: pode haver vários — viola a unicidade da imagem'] }
        ],
        intermediario: [
          { id: 'fn.co.maq#i1', type: 'input', prompt: 'Se f(x) = x² − 4x, quanto vale f(−1) ?', answer: '5',
            hints: ['Use parênteses ao substituir.', 'f(−1) = (−1)² − 4(−1).', '1 + 4.'],
            solution: ['f(−1) = (−1)² − 4(−1)', '= 1 + 4 = 5'],
            traps: { '-3': 'Você fez 1 − 4, perdendo o sinal do segundo termo.' } },
          { id: 'fn.co.maq#i2', type: 'input', prompt: 'Se f(x) = 4x + 7 e f(a) = 27, quanto vale a ?', answer: '5',
            hints: ['Monte a equação com a saída conhecida.', '4a + 7 = 27.', '4a = 20.'],
            solution: ['4a + 7 = 27', '4a = 20', 'a = 5'],
            traps: { '115': 'Você calculou f(27) em vez de resolver para a entrada.' } },
          { id: 'fn.co.maq#i3', type: 'input', prompt: 'Se f(x) = 2x + 3, quanto vale f(x + 1) − f(x) ?', answer: '2',
            hints: ['Calcule f(x+1) substituindo x+1 no lugar de x.', 'f(x+1) = 2(x+1) + 3 = 2x + 5.',
                    'Agora subtraia f(x) = 2x + 3.'],
            solution: ['f(x+1) = 2(x+1) + 3 = 2x + 5', 'f(x) = 2x + 3',
                       'Diferença: (2x + 5) − (2x + 3) = 2',
                       'Constante — é exatamente o coeficiente angular'],
            traps: { '1': 'Você calculou a variação de x, não de f.' } }
        ],
        avancado: [
          { id: 'fn.co.maq#a1', type: 'input', prompt: 'Se f(x) = x², quanto vale [f(3) + f(4)] − f(3 + 4) ?', answer: '-24',
            hints: ['Calcule cada parte separadamente.', 'f(3) + f(4) = 9 + 16 = 25.', 'f(7) = 49.'],
            solution: ['f(3) + f(4) = 9 + 16 = 25', 'f(3+4) = f(7) = 49', '25 − 49 = −24',
                       'Mostra que f(a+b) ≠ f(a) + f(b) para f(x) = x²'],
            traps: { '0': 'Só daria zero se a função fosse linear sem termo constante.' } },
          { id: 'fn.co.maq#a2', type: 'input', prompt: 'Se f(x) = 3x − 1, quanto vale [f(x + h) − f(x)]/h ?', answer: '3',
            hints: ['Esse é o quociente que define a derivada.', 'f(x+h) = 3(x+h) − 1 = 3x + 3h − 1.',
                    'Subtraia f(x) e divida por h.'],
            solution: ['f(x+h) = 3x + 3h − 1', 'f(x+h) − f(x) = 3h', '3h/h = 3',
                       'A taxa de variação é constante: é a inclinação da reta'],
            traps: { '3h': 'Faltou dividir por h.' } }
        ],
        desafio: [
          { id: 'fn.co.maq#d1', type: 'input', prompt: 'Se f(x) = x/(x − 1), quanto vale f(f(2)) ?', answer: '2',
            hints: ['Calcule f(2) primeiro.', 'f(2) = 2/(2−1) = 2.', 'Agora aplique f no resultado.'],
            solution: ['f(2) = 2/(2−1) = 2/1 = 2', 'f(f(2)) = f(2) = 2',
                       'O 2 é ponto fixo desta função'],
            traps: { '4': 'Você multiplicou f(2) por 2 em vez de aplicar f de novo.' } }
        ]
      },

      review: [
        'Função é uma regra que dá exatamente uma saída para cada entrada.',
        'f(x) não é multiplicação: é aplicação da regra a x.',
        'Ao substituir valores negativos, use parênteses.',
        'f(a + b) geralmente não é f(a) + f(b).'
      ],

      viz: 'maquina'
    },

    /* ═══════════════════════════════════════════════════════════════
       Domínio, contradomínio e imagem
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'fn.co.dominio',

      whatIs: `<p><strong>Domínio</strong> é o conjunto de tudo que pode entrar na função. <strong>Contradomínio</strong> é onde as saídas moram. <strong>Imagem</strong> é o que efetivamente sai.</p>
        <p>Na prática de prova, "achar o domínio" significa: quais valores de x <em>não</em> quebram a expressão?</p>`,

      whyExists: `<p>Duas coisas quebram uma expressão nos reais: <strong>denominador zero</strong> e <strong>raiz de índice par de número negativo</strong>. Fora isso, quase tudo passa.</p>
        <p>Determinar o domínio é o primeiro passo de qualquer estudo de função — e é obrigatório antes de calcular limite, porque limite só faz sentido em pontos de acumulação do domínio.</p>`,

      simple: 'Domínio é o que pode entrar. Procure denominador que zera e raiz par de negativo — o que sobra é o domínio.',

      academic: `<p>Para uma função real de variável real dada por uma expressão, o <em>domínio máximo</em> é o maior subconjunto de ℝ em que a expressão está definida.</p>
        <p>Condições de existência típicas: <span class="math">g(x) ≠ 0</span> para <span class="math">f/g</span>; <span class="math">g(x) ≥ 0</span> para <span class="math">√g</span> de índice par; <span class="math">g(x) > 0</span> para <span class="math">log g(x)</span>. Quando há mais de uma restrição, o domínio é a interseção delas.</p>`,

      examples: [
        { level: 'basico', prompt: 'Qual o domínio de f(x) = 1/(x − 3)?',
          steps: ['A restrição é o denominador não zerar', 'x − 3 ≠ 0, logo x ≠ 3'],
          answer: 'ℝ − {3}, ou (−∞,3) ∪ (3,+∞)' },
        { level: 'intermediario', prompt: 'Qual o domínio de f(x) = √(x − 5)?',
          steps: ['Raiz de índice par exige radicando não negativo', 'x − 5 ≥ 0', 'x ≥ 5'],
          answer: '[5, +∞)' },
        { level: 'avancado', prompt: 'Qual o domínio de f(x) = √(x + 2)/(x − 1)?',
          steps: ['Duas restrições ao mesmo tempo',
                  'Raiz: x + 2 ≥ 0 → x ≥ −2',
                  'Denominador: x − 1 ≠ 0 → x ≠ 1',
                  'Interseção das duas'],
          answer: '[−2, 1) ∪ (1, +∞)' }
      ],

      application: { area: 'Modelagem',
        text: 'Num modelo de custo por unidade produzida, o domínio matemático pode ser todo ℝ, mas o domínio do problema é ℕ ou [0, capacidade]. Confundir os dois produz respostas como "produza −3 unidades" — matematicamente válidas, fisicamente absurdas.' },

      formulas: [
        { f: 'f/g exige g(x) ≠ 0', note: 'Denominador nunca zera.' },
        { f: '√g (índice par) exige g(x) ≥ 0', note: 'Raiz par de negativo não existe em ℝ.' },
        { f: 'log g exige g(x) > 0', note: 'Estritamente maior: o zero também está fora.' },
        { f: 'Várias restrições → interseção', note: 'Todas precisam valer ao mesmo tempo.' }
      ],

      mistakes: [
        { erro: 'Em √(x − 5), escrever x > 5',
          porque: 'Confundir a condição da raiz com a do logaritmo.',
          certo: 'Raiz aceita zero: x ≥ 5. Só o log exige estritamente maior.' },
        { erro: 'Simplificar (x²−4)/(x−2) para x+2 e concluir domínio ℝ',
          porque: 'Simplificar antes de anotar a restrição.',
          certo: 'A restrição x ≠ 2 vem da expressão original e permanece após simplificar.' },
        { erro: 'Unir as restrições em vez de interseccionar',
          porque: 'Ler "e" como "ou".',
          certo: 'As condições valem simultaneamente: use interseção.' }
      ],

      tip: 'Anote as restrições ANTES de simplificar qualquer coisa. Simplificação apaga o denominador problemático da vista, mas não do domínio.',

      drills: {
        basico: [
          { id: 'fn.co.dom#b1', type: 'input', prompt: 'Qual valor de x NÃO pode entrar em f(x) = 1/(x − 7) ?', answer: '7',
            hints: ['O problema é o denominador zerar.', 'Resolva x − 7 = 0.', 'x = 7 é o valor proibido.'],
            solution: ['Denominador ≠ 0', 'x − 7 = 0 → x = 7', 'Domínio: ℝ − {7}'],
            traps: { '-7': 'Sinal trocado ao resolver x − 7 = 0.' } },
          { id: 'fn.co.dom#b2', type: 'choice', prompt: 'Qual o domínio de f(x) = √(x − 3) ?',
            choices: ['x > 3', 'x ≥ 3', 'x ≠ 3', 'todo ℝ'], answer: 1,
            hints: ['Raiz de índice par exige radicando ≥ 0.', 'x − 3 ≥ 0.', 'Note que o zero é permitido: √0 = 0.'],
            solution: ['x − 3 ≥ 0', 'x ≥ 3', 'O igual entra porque √0 existe'] },
          { id: 'fn.co.dom#b3', type: 'choice', prompt: 'Qual o domínio de f(x) = x² + 5x − 1 ?',
            choices: ['x ≥ 0', 'x ≠ 0', 'Todo ℝ', 'x > 1'], answer: 2,
            hints: ['Há denominador?', 'Há raiz de índice par?', 'Sem nenhuma das duas restrições, tudo entra.'],
            solution: ['Polinômio: sem denominador e sem raiz', 'Nenhuma restrição', 'Domínio: ℝ'] }
        ],
        intermediario: [
          { id: 'fn.co.dom#i1', type: 'input', prompt: 'Em f(x) = 1/(x² − 9), quantos valores reais estão fora do domínio ?', answer: '2',
            hints: ['Iguale o denominador a zero.', 'x² − 9 = 0 é diferença de quadrados.', '(x+3)(x−3) = 0.'],
            solution: ['x² − 9 = 0', '(x + 3)(x − 3) = 0', 'x = −3 ou x = 3', 'Dois valores excluídos'],
            traps: { '1': 'Uma equação do segundo grau com Δ > 0 tem duas raízes.' } },
          { id: 'fn.co.dom#i2', type: 'choice', prompt: 'Qual o domínio de f(x) = √(4 − x) ?',
            choices: ['x ≥ 4', 'x ≤ 4', 'x ≠ 4', 'x > 4'], answer: 1,
            hints: ['Radicando ≥ 0: 4 − x ≥ 0.', 'Isole x: 4 ≥ x.', 'Cuidado com o sentido do sinal.'],
            solution: ['4 − x ≥ 0', '4 ≥ x', 'x ≤ 4'] },
          { id: 'fn.co.dom#i3', type: 'input', prompt: 'Em f(x) = (x² − 1)/(x − 1), qual valor está fora do domínio ?', answer: '1',
            hints: ['Olhe o denominador da expressão ORIGINAL.', 'x − 1 = 0 dá x = 1.',
                    'Mesmo simplificando para x+1, a restrição continua.'],
            solution: ['Denominador: x − 1 ≠ 0 → x ≠ 1',
                       'Simplificando dá x + 1, mas a restrição vem da forma original',
                       'Em x = 1 há um buraco removível no gráfico'],
            traps: { '-1': 'Esse é o zero de x + 1, não do denominador original.' } }
        ],
        avancado: [
          { id: 'fn.co.dom#a1', type: 'choice', prompt: 'Qual o domínio de f(x) = √(x + 3)/(x − 2) ?',
            choices: ['[−3, +∞)', '[−3, 2) ∪ (2, +∞)', '(−3, 2)', 'ℝ − {2}'], answer: 1,
            hints: ['Duas restrições ao mesmo tempo.', 'Raiz: x + 3 ≥ 0 → x ≥ −3.',
                    'Denominador: x ≠ 2. Faça a interseção.'],
            solution: ['Raiz exige x ≥ −3', 'Denominador exige x ≠ 2',
                       'Interseção: x ≥ −3 e x ≠ 2', '[−3, 2) ∪ (2, +∞)'] },
          { id: 'fn.co.dom#a2', type: 'choice', prompt: 'Qual o domínio de f(x) = log(x² − 4) ?',
            choices: ['x > 2', 'x < −2 ou x > 2', 'x ≠ ±2', '−2 < x < 2'], answer: 1,
            hints: ['Logaritmo exige argumento estritamente positivo.', 'x² − 4 > 0.',
                    'Isso é uma inequação-produto: (x+2)(x−2) > 0.'],
            solution: ['x² − 4 > 0', '(x + 2)(x − 2) > 0',
                       'Produto positivo quando os dois fatores têm o mesmo sinal',
                       'x < −2 ou x > 2'],
            traps: {} }
        ],
        desafio: [
          { id: 'fn.co.dom#d1', type: 'choice', prompt: 'Qual o domínio de f(x) = 1/√(9 − x²) ?',
            choices: ['[−3, 3]', '(−3, 3)', 'x ≠ ±3', 'ℝ'], answer: 1,
            hints: ['A raiz está no denominador: ela não pode ser negativa NEM zero.',
                    'Então 9 − x² > 0, com desigualdade estrita.',
                    'Isso dá −3 < x < 3.'],
            solution: ['Raiz exige 9 − x² ≥ 0', 'Denominador exige √(9 − x²) ≠ 0, logo 9 − x² ≠ 0',
                       'Juntando: 9 − x² > 0', 'x² < 9 → −3 < x < 3', 'Intervalo aberto'],
            traps: {} }
        ]
      },

      review: [
        'Domínio é o conjunto de entradas válidas.',
        'Denominador ≠ 0; raiz de índice par ≥ 0; argumento de log > 0.',
        'Com várias restrições, o domínio é a interseção delas.',
        'Anote as restrições antes de simplificar: simplificar não as apaga.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Vértice da parábola
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'fn.qu.vertice',

      whatIs: `<p>O vértice é o ponto de virada da parábola: onde ela para de descer e começa a subir (ou o contrário). Fica em <span class="math">x_v = −b/(2a)</span>, e a altura correspondente é <span class="math">y_v = −Δ/(4a)</span>.</p>
        <p>Se <span class="math">a &gt; 0</span> a parábola abre para cima e o vértice é o <strong>mínimo</strong>. Se <span class="math">a &lt; 0</span>, abre para baixo e o vértice é o <strong>máximo</strong>.</p>`,

      whyExists: `<p>Toda pergunta de "qual o maior lucro", "qual a área máxima", "qual a altura máxima do projétil" é uma pergunta sobre o vértice.</p>
        <p>E há uma ponte direta com Cálculo: o vértice é exatamente o ponto onde a derivada zera. Derivando <span class="math">f(x) = ax² + bx + c</span> obtém-se <span class="math">f′(x) = 2ax + b</span>, e <span class="math">f′(x) = 0</span> dá <span class="math">x = −b/(2a)</span>. A fórmula do vértice é o primeiro resultado de otimização da vida do aluno.</p>`,

      simple: 'O vértice é o ponto de virada. O x dele é −b dividido por 2a. Substitua esse x na função para achar o y.',

      academic: `<p>Completando quadrado, <span class="math">ax² + bx + c = a(x + b/(2a))² + (c − b²/(4a))</span>. Como o quadrado é não negativo, o valor extremo ocorre quando ele zera, isto é, em <span class="math">x = −b/(2a)</span>, e vale <span class="math">c − b²/(4a) = −Δ/(4a)</span>.</p>
        <p>A parábola é simétrica em relação à reta vertical <span class="math">x = −b/(2a)</span>, o que implica que as raízes, quando existem, são equidistantes do vértice.</p>`,

      examples: [
        { level: 'basico', prompt: 'Ache o vértice de f(x) = x² − 6x + 5',
          steps: ['a = 1, b = −6', 'x_v = −(−6)/(2·1) = 3',
                  'y_v = f(3) = 9 − 18 + 5 = −4'],
          answer: '(3, −4), mínimo' },
        { level: 'intermediario', prompt: 'Ache o valor máximo de f(x) = −2x² + 8x − 3',
          steps: ['a = −2 < 0, então há máximo', 'x_v = −8/(2·(−2)) = 2',
                  'f(2) = −8 + 16 − 3 = 5'],
          answer: 'máximo 5, em x = 2' },
        { level: 'avancado', prompt: 'Um retângulo tem perímetro 40. Qual a maior área possível?',
          steps: ['Se um lado é x, o outro é 20 − x', 'Área: A(x) = x(20 − x) = −x² + 20x',
                  'a = −1 < 0 → há máximo', 'x_v = −20/(2·(−1)) = 10',
                  'A(10) = 100'],
          answer: '100 (o quadrado de lado 10)' }
      ],

      application: { area: 'Economia',
        text: 'Receita = preço × quantidade, e a quantidade costuma cair linearmente com o preço. O produto vira uma quadrática com a < 0, e o vértice dá o preço que maximiza a receita — um resultado que a intuição raramente acerta sozinha.' },

      formulas: [
        { f: 'x_v = −b/(2a)', note: 'A abscissa do vértice. Sai de completar quadrado.' },
        { f: 'y_v = −Δ/(4a)', note: 'Ou, mais simples de lembrar: substitua x_v na função.' },
        { f: 'a > 0 → mínimo · a < 0 → máximo', note: 'O sinal de a decide a concavidade.' },
        { f: 'x_v = (x₁ + x₂)/2', note: 'Quando há raízes, o vértice fica na média delas — por simetria.' }
      ],

      mistakes: [
        { erro: 'Escrever x_v = −b/2a e calcular como (−b/2)·a',
          porque: 'Ler a fórmula sem perceber que 2a é o denominador inteiro.',
          certo: 'É −b dividido por (2a). Com a = 3 e b = 12: −12/6 = −2, não −18.' },
        { erro: 'Responder o x_v quando a pergunta pede o valor máximo',
          porque: 'Parar no meio do caminho.',
          certo: 'x_v é onde ocorre; o valor é f(x_v). São perguntas diferentes.' },
        { erro: 'Esquecer o sinal negativo em −b quando b já é negativo',
          porque: 'Não usar parênteses ao substituir.',
          certo: 'Com b = −6: x_v = −(−6)/(2a) = 6/(2a).' }
      ],

      tip: 'Se a parábola tem raízes, o vértice está exatamente no meio delas. Achar as raízes e tirar a média costuma ser mais rápido e menos sujeito a erro de sinal que aplicar a fórmula.',

      drills: {
        basico: [
          { id: 'fn.qu.vert#b1', type: 'input', prompt: 'Qual o x do vértice de f(x) = x² − 8x + 3 ?', answer: '4',
            hints: ['x_v = −b/(2a).', 'a = 1 e b = −8.', '−(−8)/2 = 8/2.'],
            solution: ['a = 1, b = −8', 'x_v = −(−8)/(2·1) = 8/2 = 4'],
            traps: { '-4': 'Sinal trocado: b já era negativo, e −b fica positivo.' } },
          { id: 'fn.qu.vert#b2', type: 'choice', prompt: 'A parábola de f(x) = −3x² + 2x + 1 tem:',
            choices: ['Um mínimo', 'Um máximo', 'Nenhum extremo', 'Dois extremos'], answer: 1,
            hints: ['Olhe o sinal de a.', 'a = −3 é negativo.', 'a negativo abre para baixo.'],
            solution: ['a = −3 < 0', 'Concavidade para baixo', 'O vértice é ponto de máximo'] },
          { id: 'fn.qu.vert#b3', type: 'input', prompt: 'Qual o y do vértice de f(x) = x² − 4x + 7 ?', answer: '3',
            hints: ['Ache primeiro x_v = −(−4)/2 = 2.', 'Agora substitua x = 2 na função.', 'f(2) = 4 − 8 + 7.'],
            solution: ['x_v = 4/2 = 2', 'f(2) = 2² − 4(2) + 7 = 4 − 8 + 7 = 3'],
            traps: { '2': 'Esse é o x do vértice, não o y.' } }
        ],
        intermediario: [
          { id: 'fn.qu.vert#i1', type: 'input', prompt: 'Qual o valor máximo de f(x) = −x² + 6x − 5 ?', answer: '4',
            hints: ['a = −1 < 0, então existe máximo.', 'x_v = −6/(2·(−1)) = 3.', 'Calcule f(3).'],
            solution: ['x_v = −6/(−2) = 3', 'f(3) = −9 + 18 − 5 = 4', 'Máximo: 4'],
            traps: { '3': 'Esse é o x onde o máximo ocorre, não o valor máximo.' } },
          { id: 'fn.qu.vert#i2', type: 'input', prompt: 'As raízes de uma parábola são 2 e 8. Qual o x do vértice ?', answer: '5',
            hints: ['O vértice fica no eixo de simetria.', 'O eixo passa pelo meio das raízes.', '(2 + 8)/2.'],
            solution: ['Por simetria, x_v = (x₁ + x₂)/2', '(2 + 8)/2 = 5'],
            traps: { '10': 'Faltou dividir por 2.', '6': 'Você subtraiu em vez de somar as raízes.' } },
          { id: 'fn.qu.vert#i3', type: 'input', prompt: 'Qual o valor mínimo de f(x) = 2x² − 8x + 1 ?', answer: '-7',
            hints: ['a = 2 > 0, então há mínimo.', 'x_v = 8/4 = 2.', 'f(2) = 8 − 16 + 1.'],
            solution: ['x_v = −(−8)/(2·2) = 8/4 = 2', 'f(2) = 2(4) − 8(2) + 1 = 8 − 16 + 1 = −7'],
            traps: { '2': 'Esse é o x do vértice.', '1': 'Esse é f(0).' } }
        ],
        avancado: [
          { id: 'fn.qu.vert#a1', type: 'input', prompt: 'Um retângulo tem perímetro 36 m. Qual a maior área possível, em m² ?',
            answer: '81',
            hints: ['Se um lado é x, o outro é 18 − x.', 'A(x) = x(18 − x) = −x² + 18x.', 'x_v = 9.'],
            solution: ['Semiperímetro: 18, então lados x e 18 − x',
                       'A(x) = −x² + 18x', 'x_v = −18/(2·(−1)) = 9',
                       'A(9) = 9 × 9 = 81 m²'],
            traps: { '9': 'Esse é o lado, não a área.', '324': 'Você usou o perímetro inteiro como semiperímetro.' } },
          { id: 'fn.qu.vert#a2', type: 'input', prompt: 'Um projétil tem altura h(t) = −5t² + 20t. Qual a altura máxima, em metros ?',
            answer: '20',
            hints: ['a = −5 < 0, então há máximo.', 't_v = −20/(2·(−5)) = 2 s.', 'Calcule h(2).'],
            solution: ['t_v = −20/(−10) = 2 s', 'h(2) = −5(4) + 20(2) = −20 + 40 = 20 m'],
            traps: { '2': 'Esse é o instante do ponto mais alto, não a altura.',
                     '40': 'Você esqueceu de subtrair o termo −5t².' } }
        ],
        desafio: [
          { id: 'fn.qu.vert#d1', type: 'input', prompt: 'Um terreno retangular será cercado com 60 m de tela, mas um dos lados é um muro já existente e não precisa de tela. Qual a maior área possível, em m² ?',
            answer: '450',
            hints: ['Só três lados recebem tela: 2x + y = 60.', 'Então y = 60 − 2x e A = x(60 − 2x).',
                    'A(x) = −2x² + 60x, e x_v = −60/(2·(−2)).'],
            solution: ['Cerca em três lados: 2x + y = 60 → y = 60 − 2x',
                       'A(x) = x(60 − 2x) = −2x² + 60x',
                       'x_v = −60/(−4) = 15', 'y = 60 − 30 = 30',
                       'Área máxima: 15 × 30 = 450 m²'],
            traps: { '225': 'Você tratou como se os quatro lados precisassem de tela.',
                     '900': 'Você usou 60 como semiperímetro.' } }
        ]
      },

      review: [
        'x_v = −b/(2a), e 2a é o denominador inteiro.',
        'y_v sai substituindo x_v na função — mais seguro que decorar −Δ/(4a).',
        'a > 0 dá mínimo; a < 0 dá máximo.',
        'Com raízes conhecidas, o vértice está na média delas.'
      ],

      viz: 'parabola'
    }
  ]);
})(window.CZ);
