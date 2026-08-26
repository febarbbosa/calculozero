/* ==========================================================================
   data/sheets/03-geometria.js — fichas de Geometria.
   Formato e regras em core/sheets.js.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([
    /* ════════════════════════════════════════════════════════════════
       Teorema de Pitágoras
       ════════════════════════════════════════════════════════════════ */
    {
      topic: 'ge.tri.pitagoras',

      whatIs: `<p>Num triângulo retângulo, o quadrado da hipotenusa é a soma dos quadrados dos catetos:</p>
        <p><span class="math">a² = b² + c²</span></p>
        <p>A hipotenusa é sempre o lado oposto ao ângulo reto — e sempre o maior dos três.</p>`,

      whyExists: `<p>É o teorema que mais se disfarça em matemática. Ele reaparece como:</p>
        <ul>
          <li><strong>distância entre pontos</strong>: <span class="math">d = √(Δx² + Δy²)</span></li>
          <li><strong>módulo de um vetor</strong>: <span class="math">|v| = √(a² + b² + c²)</span></li>
          <li><strong>identidade trigonométrica</strong>: <span class="math">sen²θ + cos²θ = 1</span></li>
          <li><strong>comprimento de arco</strong> em Cálculo, dentro da integral</li>
        </ul>
        <p>Aprender Pitágoras uma vez economiza aprender quatro fórmulas separadas depois.</p>`,

      simple: 'Some os quadrados dos dois lados menores e você tem o quadrado do maior. Só vale em triângulo retângulo.',

      academic: `<p>A demonstração por semelhança traça a altura relativa à hipotenusa, dividindo o triângulo em dois semelhantes ao original. Das relações métricas <span class="math">b² = a·m</span> e <span class="math">c² = a·n</span>, com <span class="math">m + n = a</span>, segue <span class="math">b² + c² = a(m+n) = a²</span>.</p>
        <p>A recíproca também vale: se <span class="math">a² = b² + c²</span>, o triângulo é retângulo. É o que permite verificar perpendicularidade só com medidas de comprimento — método usado em construção civil há milênios.</p>`,

      examples: [
        { level: 'basico', prompt: 'Catetos 3 e 4. Qual a hipotenusa?',
          steps: ['a² = 3² + 4²', '= 9 + 16 = 25', 'a = √25'],
          answer: '5' },
        { level: 'intermediario', prompt: 'Hipotenusa 13 e um cateto 5. Qual o outro cateto?',
          steps: ['13² = 5² + c²', '169 = 25 + c²', 'c² = 144'],
          answer: '12' },
        { level: 'avancado', prompt: 'Qual a distância entre os pontos A(1,2) e B(4,6)?',
          steps: ['Δx = 4 − 1 = 3 e Δy = 6 − 2 = 4',
                  'Esses são os catetos de um triângulo retângulo',
                  'd = √(3² + 4²) = √25'],
          answer: '5' }
      ],

      application: { area: 'Construção',
        text: 'O esquadro 3-4-5 é a recíproca aplicada: se um triângulo mede 3, 4 e 5, o ângulo entre os lados menores é reto. Pedreiros usam isso para garantir canto de 90° sem nenhum instrumento de ângulo.' },

      formulas: [
        { f: 'a² = b² + c²', note: 'a é a hipotenusa, sempre o lado oposto ao ângulo reto.' },
        { f: 'd = √[(x₂−x₁)² + (y₂−y₁)²]', note: 'Distância entre pontos: Pitágoras disfarçado.' },
        { f: '|v| = √(a² + b² + c²)', note: 'Módulo de vetor: Pitágoras em três dimensões.' },
        { f: 'Ternos: (3,4,5), (5,12,13), (8,15,17)', note: 'Trios de inteiros que satisfazem o teorema.' },
        { f: 'Recíproca: a² = b² + c² ⟹ retângulo', note: 'Permite testar perpendicularidade só com réguas.' }
      ],

      mistakes: [
        { erro: 'Somar os quadrados quando um dos dados é a hipotenusa',
          porque: 'Aplicar a fórmula sem identificar qual lado é qual.',
          certo: 'Se a hipotenusa é conhecida, é subtração: c² = a² − b².' },
        { erro: 'Esquecer de tirar a raiz no final',
          porque: 'Parar no valor de a².',
          certo: 'a² = 25 significa a = 5. A pergunta pede o lado, não o quadrado dele.' },
        { erro: 'Usar Pitágoras em triângulo não retângulo',
          porque: 'Aplicar por reflexo.',
          certo: 'Sem ângulo reto, use a lei dos cossenos — Pitágoras é o caso particular dela com cos 90° = 0.' }
      ],

      tip: 'A hipotenusa é sempre o maior lado. Se sua resposta der uma hipotenusa menor que algum cateto, o erro está na identificação dos lados, não na conta.',

      drills: {
        basico: [
          { id: 'ge.tri.pit#b1', type: 'input', prompt: 'Catetos 6 e 8. Qual a hipotenusa ?', answer: '10',
            hints: ['a² = 6² + 8².', '36 + 64 = 100.', 'Tire a raiz.'],
            solution: ['a² = 36 + 64 = 100', 'a = 10'],
            traps: { '100': 'Faltou tirar a raiz quadrada.', '14': 'Você somou os lados em vez dos quadrados.' } },
          { id: 'ge.tri.pit#b2', type: 'input', prompt: 'Hipotenusa 10 e um cateto 6. Qual o outro cateto ?', answer: '8',
            hints: ['Aqui a hipotenusa é conhecida: é subtração.', 'c² = 100 − 36.', 'c² = 64.'],
            solution: ['10² = 6² + c²', '100 = 36 + c²', 'c² = 64', 'c = 8'],
            traps: { '11.66': 'Você somou os quadrados; com a hipotenusa dada, subtrai-se.' } },
          { id: 'ge.tri.pit#b3', type: 'choice', prompt: 'Um triângulo tem lados 5, 12 e 13. Ele é retângulo ?',
            choices: ['Sim', 'Não', 'Depende dos ângulos', 'Faltam dados'], answer: 0,
            hints: ['Use a recíproca: teste se o quadrado do maior é a soma dos outros.',
                    '13² = 169.', '5² + 12² = 25 + 144 = 169.'],
            solution: ['Maior lado: 13, então 13² = 169', '5² + 12² = 25 + 144 = 169',
                       'São iguais → pela recíproca, é retângulo'] }
        ],
        intermediario: [
          { id: 'ge.tri.pit#i1', type: 'input', prompt: 'Qual a diagonal de um quadrado de lado 5 ? (use √2 ≈ 1,41; duas casas decimais)',
            answer: '7.07', accept: ['7,07', '7.05', '7,05', '5raiz2'],
            hints: ['A diagonal divide o quadrado em dois triângulos retângulos.',
                    'Os catetos são os lados: d² = 25 + 25 = 50.', 'd = √50 = 5√2.'],
            solution: ['d² = 5² + 5² = 50', 'd = √50 = 5√2', '≈ 5 × 1,41 = 7,07'],
            traps: { '10': 'Você somou os lados em vez dos quadrados.' } },
          { id: 'ge.tri.pit#i2', type: 'input', prompt: 'Qual a distância entre A(0,0) e B(5,12) ?', answer: '13',
            hints: ['Δx = 5 e Δy = 12.', 'd = √(25 + 144).', '√169.'],
            solution: ['Δx = 5, Δy = 12', 'd = √(5² + 12²) = √169 = 13'],
            traps: { '17': 'Você somou as coordenadas em vez dos quadrados.' } },
          { id: 'ge.tri.pit#i3', type: 'input', prompt: 'Uma escada de 5 m tem a base a 3 m da parede. A que altura ela encosta ?',
            answer: '4',
            hints: ['A escada é a hipotenusa.', 'h² = 25 − 9.', 'h² = 16.'],
            solution: ['5² = 3² + h²', '25 = 9 + h²', 'h² = 16', 'h = 4 m'],
            traps: { '5.83': 'Você somou os quadrados; a escada é a hipotenusa, então subtrai-se.' } }
        ],
        avancado: [
          { id: 'ge.tri.pit#a1', type: 'input', prompt: 'Qual o módulo do vetor v = (2, 3, 6) ?', answer: '7',
            hints: ['Pitágoras em três dimensões.', '|v| = √(4 + 9 + 36).', '√49.'],
            solution: ['|v| = √(2² + 3² + 6²)', '= √(4 + 9 + 36) = √49 = 7'],
            traps: { '11': 'Você somou as componentes em vez dos quadrados.' } },
          { id: 'ge.tri.pit#a2', type: 'input', prompt: 'Uma caixa mede 3 × 4 × 12. Qual a diagonal interna dela ?', answer: '13',
            hints: ['Primeiro a diagonal da base: √(9 + 16) = 5.',
                    'Agora Pitágoras com essa diagonal e a altura.', '√(25 + 144).'],
            solution: ['Diagonal da base: √(3² + 4²) = 5',
                       'Diagonal interna: √(5² + 12²) = √169 = 13',
                       'Ou direto: √(3² + 4² + 12²) = √169'],
            traps: { '19': 'Você somou as três medidas.' } }
        ],
        desafio: [
          { id: 'ge.tri.pit#d1', type: 'input', prompt: 'Num triângulo retângulo, a altura relativa à hipotenusa vale 12 e divide a hipotenusa em segmentos de 9 e 16. Qual o perímetro do triângulo ?',
            answer: '60',
            hints: ['A hipotenusa é 9 + 16 = 25.',
                    'Os catetos saem das relações métricas: b² = 25·9 e c² = 25·16.',
                    'b = 15 e c = 20.'],
            solution: ['Hipotenusa: 9 + 16 = 25',
                       'b² = a·m = 25 × 9 = 225 → b = 15',
                       'c² = a·n = 25 × 16 = 400 → c = 20',
                       'Confira: 15² + 20² = 225 + 400 = 625 = 25² ✓',
                       'Perímetro: 15 + 20 + 25 = 60'],
            traps: { '37': 'Você somou apenas a altura e os segmentos.',
                     '25': 'Isso é só a hipotenusa.' } }
        ]
      },

      review: [
        'a² = b² + c², com a hipotenusa sempre oposta ao ângulo reto e sempre a maior.',
        'Com a hipotenusa dada, a conta vira subtração.',
        'Distância entre pontos e módulo de vetor são Pitágoras disfarçado.',
        'A recíproca permite testar se um ângulo é reto só com medidas de comprimento.'
      ]
    },

    /* ════════════════════════════════════════════════════════════════
       Equação da reta
       ════════════════════════════════════════════════════════════════ */
    {
      topic: 'ge.an.reta',

      whatIs: `<p>A forma reduzida da equação da reta é <span class="math">y = mx + n</span>, onde:</p>
        <ul>
          <li><span class="math">m</span> é o <strong>coeficiente angular</strong>: quanto y sobe para cada unidade que x avança</li>
          <li><span class="math">n</span> é o <strong>coeficiente linear</strong>: onde a reta corta o eixo y</li>
        </ul>
        <p>Com dois pontos, <span class="math">m = (y₂ − y₁)/(x₂ − x₁)</span>.</p>`,

      whyExists: `<p>A reta é o modelo mais simples de relação entre duas grandezas, e é o único em que a taxa de variação é constante. Por isso ela é a primeira aproximação de tudo.</p>
        <p>É exatamente essa ideia que o Cálculo retoma: a derivada é o coeficiente angular da reta tangente, e a aproximação linear substitui localmente qualquer função por uma reta. Quem entende <span class="math">m</span> como "subida sobre avanço" entende derivada antes de ver a definição.</p>`,

      simple: 'm diz a inclinação: quanto sobe para cada passo à direita. n diz onde a reta cruza o eixo y. Com dois pontos, m é a variação de y dividida pela de x.',

      academic: `<p>Toda reta não vertical no plano é o gráfico de <span class="math">y = mx + n</span>. A forma geral <span class="math">ax + by + c = 0</span> inclui também as verticais, para as quais <span class="math">b = 0</span> e o coeficiente angular não existe.</p>
        <p>A equação por ponto e inclinação, <span class="math">y − y₀ = m(x − x₀)</span>, é a mais útil na prática, e é exatamente a forma da reta tangente em Cálculo.</p>
        <p>Duas retas são paralelas quando <span class="math">m₁ = m₂</span> e perpendiculares quando <span class="math">m₁·m₂ = −1</span>.</p>`,

      examples: [
        { level: 'basico', prompt: 'Qual o coeficiente angular da reta que passa por (1,2) e (3,8)?',
          steps: ['m = (y₂ − y₁)/(x₂ − x₁)', '= (8 − 2)/(3 − 1)', '= 6/2'],
          answer: 'm = 3' },
        { level: 'intermediario', prompt: 'Escreva a equação da reta que passa por (2,5) com m = 4',
          steps: ['Use y − y₀ = m(x − x₀)', 'y − 5 = 4(x − 2)', 'y = 4x − 8 + 5'],
          answer: 'y = 4x − 3' },
        { level: 'avancado', prompt: 'Qual a equação da reta perpendicular a y = 2x + 1 passando por (4,3)?',
          steps: ['Perpendicular exige m₁·m₂ = −1', 'Com m₁ = 2, m₂ = −1/2',
                  'y − 3 = −(1/2)(x − 4)', 'y = −x/2 + 2 + 3'],
          answer: 'y = −x/2 + 5' }
      ],

      application: { area: 'Economia',
        text: 'Um plano de celular com mensalidade fixa e cobrança por minuto é uma reta: n é a mensalidade, m é o preço por minuto. Comparar dois planos é achar onde as retas se cruzam — o ponto de equilíbrio a partir do qual o outro plano compensa.' },

      formulas: [
        { f: 'y = mx + n', note: 'Forma reduzida: m é a inclinação, n é onde corta o eixo y.' },
        { f: 'm = Δy/Δx = (y₂−y₁)/(x₂−x₁)', note: 'Subida sobre avanço.' },
        { f: 'y − y₀ = m(x − x₀)', note: 'Ponto e inclinação. É a forma da reta tangente em Cálculo.' },
        { f: 'ax + by + c = 0', note: 'Forma geral. Inclui as retas verticais.' },
        { f: 'Paralelas: m₁ = m₂ · Perpendiculares: m₁·m₂ = −1', note: '' }
      ],

      mistakes: [
        { erro: 'Calcular m como Δx/Δy',
          porque: 'Inverter a razão.',
          certo: 'É a variação de y sobre a variação de x: subida sobre avanço.' },
        { erro: 'Errar o sinal ao distribuir em y − y₀ = m(x − x₀)',
          porque: 'Não abrir o parêntese com cuidado.',
          certo: 'Com y − 5 = 4(x − 2): y = 4x − 8 + 5 = 4x − 3.' },
        { erro: 'Dizer que reta vertical tem m = 0',
          porque: 'Confundir vertical com horizontal.',
          certo: 'Horizontal tem m = 0. Vertical tem Δx = 0, e o coeficiente angular não existe.' }
      ],

      tip: 'Depois de achar a equação, teste com um dos pontos dados. Se ele não satisfizer, o erro é quase sempre de sinal na distribuição — e você o encontra em dez segundos.',

      drills: {
        basico: [
          { id: 'ge.an.reta#b1', type: 'input', prompt: 'Qual o coeficiente angular da reta por (0,1) e (2,7) ?', answer: '3',
            hints: ['m = Δy/Δx.', '(7 − 1)/(2 − 0).', '6/2.'],
            solution: ['m = (7 − 1)/(2 − 0)', '= 6/2 = 3'],
            traps: { '0.33': 'Você inverteu: calculou Δx/Δy.' } },
          { id: 'ge.an.reta#b2', type: 'input', prompt: 'Na reta y = 5x − 2, onde ela corta o eixo y ? Responda o valor de y.',
            answer: '-2',
            hints: ['O eixo y é onde x = 0.', 'Substitua x = 0.', 'y = 5(0) − 2.'],
            solution: ['Em x = 0: y = 5(0) − 2 = −2', 'É o coeficiente linear n'],
            traps: { '5': 'Esse é o coeficiente angular.' } },
          { id: 'ge.an.reta#b3', type: 'choice', prompt: 'Uma reta com m = 0 é:',
            choices: ['Vertical', 'Horizontal', 'Inclinada para cima', 'Inclinada para baixo'], answer: 1,
            hints: ['m = 0 significa Δy = 0.', 'Y não muda quando x avança.', 'Isso é uma reta horizontal.'],
            solution: ['m = 0 → Δy = 0 para qualquer Δx', 'O y é constante: reta horizontal'] }
        ],
        intermediario: [
          { id: 'ge.an.reta#i1', type: 'input', prompt: 'Qual a equação da reta por (1,4) com m = 2 ? Escreva na forma y = ax + b, respondendo a e b separados por vírgula.',
            answer: '2,2', accept: ['2, 2'],
            hints: ['Use y − y₀ = m(x − x₀).', 'y − 4 = 2(x − 1).', 'y = 2x − 2 + 4.'],
            solution: ['y − 4 = 2(x − 1)', 'y = 2x − 2 + 4', 'y = 2x + 2'],
            traps: { '2,-2': 'Você esqueceu de somar o 4 ao final.' } },
          { id: 'ge.an.reta#i2', type: 'input', prompt: 'Qual o coeficiente angular de uma reta perpendicular a y = 4x + 7 ? Responda como fração a/b com sinal.',
            answer: '-1/4', accept: ['−1/4', '-0.25'],
            hints: ['Perpendiculares têm m₁·m₂ = −1.', '4·m₂ = −1.', 'm₂ = −1/4.'],
            solution: ['m₁ = 4', 'm₁·m₂ = −1 → 4m₂ = −1', 'm₂ = −1/4'],
            traps: { '4': 'Isso é paralela, não perpendicular.',
                     '-4': 'O perpendicular é o inverso com sinal trocado, não só o sinal trocado.' } },
          { id: 'ge.an.reta#i3', type: 'input', prompt: 'Qual a equação da reta por (2,3) e (4,11) ? Responda a e b de y = ax + b, separados por vírgula.',
            answer: '4,-5', accept: ['4, -5', '4,−5'],
            hints: ['Primeiro m = (11−3)/(4−2) = 4.', 'Agora y − 3 = 4(x − 2).', 'y = 4x − 8 + 3.'],
            solution: ['m = (11 − 3)/(4 − 2) = 8/2 = 4', 'y − 3 = 4(x − 2)',
                       'y = 4x − 8 + 3 = 4x − 5'],
            traps: { '4,3': 'Você usou o y do ponto direto como coeficiente linear.' } }
        ],
        avancado: [
          { id: 'ge.an.reta#a1', type: 'input', prompt: 'Em que ponto as retas y = 2x + 1 e y = −x + 7 se cruzam ? Responda x e y separados por vírgula.',
            answer: '2,5', accept: ['2, 5'],
            hints: ['No cruzamento os dois y são iguais.', '2x + 1 = −x + 7.', '3x = 6.'],
            solution: ['2x + 1 = −x + 7', '3x = 6 → x = 2', 'y = 2(2) + 1 = 5', 'Ponto: (2, 5)'],
            traps: { '2,3': 'Você substituiu x na equação errada ou errou a conta de y.' } },
          { id: 'ge.an.reta#a2', type: 'input', prompt: 'Um plano cobra R$ 30 fixos mais R$ 0,50 por minuto. Quantos minutos custam R$ 55 ?',
            answer: '50',
            hints: ['A relação é y = 0,5x + 30.', '55 = 0,5x + 30.', '0,5x = 25.'],
            solution: ['Custo: y = 0,5x + 30', '55 = 0,5x + 30', '0,5x = 25', 'x = 50 minutos'],
            traps: { '110': 'Você esqueceu de descontar a mensalidade antes de dividir.' } }
        ],
        desafio: [
          { id: 'ge.an.reta#d1', type: 'input', prompt: 'Plano A: R$ 40 fixos + R$ 0,20/min. Plano B: R$ 20 fixos + R$ 0,60/min. A partir de quantos minutos o plano A fica mais barato ?',
            answer: '50',
            hints: ['Iguale os custos: 40 + 0,2x = 20 + 0,6x.', '20 = 0,4x.', 'Acima desse ponto A compensa.'],
            solution: ['40 + 0,2x = 20 + 0,6x', '40 − 20 = 0,6x − 0,2x', '20 = 0,4x',
                       'x = 50 minutos', 'Acima de 50 minutos o plano A sai mais barato'],
            traps: { '20': 'Essa é a diferença entre as mensalidades, não o ponto de equilíbrio.',
                     '100': 'Você dividiu 40 por 0,4 em vez de 20.' } }
        ]
      },

      review: [
        'y = mx + n: m é a inclinação, n é onde corta o eixo y.',
        'm = Δy/Δx — subida sobre avanço, nunca o inverso.',
        'A forma y − y₀ = m(x − x₀) é a mesma da reta tangente em Cálculo.',
        'Paralelas têm m igual; perpendiculares têm produto de m igual a −1.'
      ],

      viz: 'reta'
    }
  ]);
})(window.CZ);
