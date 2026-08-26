/* ==========================================================================
   data/sheets/05-trigonometria.js — fichas de Trigonometria.
   Formato e regras em core/sheets.js.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([
    /* ═══════════════════════════════════════════════════════════════
       Radiano
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'tg.fu.radianos',

      whatIs: `<p>Um radiano é o ângulo central que "abre" um arco de comprimento igual ao raio. Como a circunferência inteira mede <span class="math">2πr</span>, a volta completa tem <span class="math">2π</span> radianos.</p>
        <p>Daí a conversão: <span class="math">360° = 2π rad</span>, ou <span class="math">180° = π rad</span>.</p>`,

      whyExists: `<p>O grau é arbitrário: 360 vem da Babilônia, não da matemática. O radiano é uma razão entre dois comprimentos — arco dividido por raio — e por isso é adimensional.</p>
        <p>Isso tem uma consequência concreta: <span class="math">lim_{x→0} sen(x)/x = 1</span> só vale em radianos. Em graus o limite daria <span class="math">π/180</span>, e a derivada do seno deixaria de ser o cosseno. Todo o Cálculo trigonométrico depende dessa escolha.</p>`,

      simple: 'Radiano mede o ângulo pelo tamanho do arco em relação ao raio. Meia volta é π rad, volta inteira é 2π. Para converter, use 180° = π.',

      academic: `<p>Define-se <span class="math">θ = s/r</span>, onde <span class="math">s</span> é o comprimento do arco e <span class="math">r</span> o raio. Como é razão entre grandezas de mesma dimensão, o radiano é adimensional — tecnicamente uma unidade derivada de valor 1.</p>
        <p>Essa adimensionalidade é o que permite escrever a série <span class="math">sen x = x − x³/3! + x⁵/5! − …</span>, em que <span class="math">x</span> aparece somado a potências de si mesmo. Com graus, os termos teriam dimensões incompatíveis.</p>`,

      examples: [
        { level: 'basico', prompt: 'Converta 90° para radianos',
          steps: ['Use 180° = π rad', 'Regra de três: 90/180 = x/π', 'x = π/2'],
          answer: 'π/2 rad' },
        { level: 'intermediario', prompt: 'Converta 5π/6 rad para graus',
          steps: ['Substitua π por 180°', '5(180°)/6', '= 900°/6'],
          answer: '150°' },
        { level: 'avancado', prompt: 'Um arco de 12 cm está numa circunferência de raio 4 cm. Qual o ângulo central em radianos?',
          steps: ['θ = s/r, direto da definição', 'θ = 12/4'],
          answer: '3 rad (aproximadamente 172°)' }
      ],

      application: { area: 'Computação gráfica',
        text: 'Todas as funções trigonométricas de bibliotecas padrão — Math.sin em JavaScript, math.sin em Python — recebem radianos. Passar graus sem converter é um dos bugs mais comuns em animação e rotação, e ele não gera erro: gera movimento errado.' },

      formulas: [
        { f: 'θ = s/r', note: 'A definição: arco dividido por raio. Por isso é adimensional.' },
        { f: '180° = π rad', note: 'A relação que resolve qualquer conversão por regra de três.' },
        { f: 'graus → rad: multiplique por π/180', note: '' },
        { f: 'rad → graus: multiplique por 180/π', note: '' },
        { f: 's = r·θ (θ em radianos)', note: 'Comprimento de arco. Só funciona com radianos.' }
      ],

      mistakes: [
        { erro: 'Usar a calculadora em graus ao resolver limite ou derivada',
          porque: 'Não trocar o modo antes de calcular.',
          certo: 'Cálculo trabalha em radianos. Em graus, sen(0,001) dá ≈ 0,0000175, e o limite fundamental não aparece.' },
        { erro: 'Converter 45° como 45·180/π',
          porque: 'Aplicar a conversão no sentido errado.',
          certo: 'De graus para radianos multiplica-se por π/180: 45π/180 = π/4.' },
        { erro: 'Usar s = r·θ com θ em graus',
          porque: 'Aplicar a fórmula sem verificar a unidade.',
          certo: 'A fórmula sai da própria definição do radiano; em graus é preciso converter antes.' }
      ],

      tip: 'Guarde só quatro referências: π/6 = 30°, π/4 = 45°, π/3 = 60°, π/2 = 90°. Com elas e a relação 180° = π, qualquer conversão sai por proporção sem decorar tabela.',

      drills: {
        basico: [
          { id: 'tg.fu.rad#b1', type: 'choice', prompt: 'Quanto vale 180° em radianos?',
            choices: ['π/2', 'π', '2π', 'π/4'], answer: 1,
            hints: ['A volta completa é 2π.', 'Meia volta é a metade disso.', '2π ÷ 2 = π.'],
            solution: ['Volta completa: 360° = 2π rad', 'Metade: 180° = π rad'] },
          { id: 'tg.fu.rad#b2', type: 'choice', prompt: 'Quanto vale 60° em radianos?',
            choices: ['π/6', 'π/4', 'π/3', 'π/2'], answer: 2,
            hints: ['60 é um terço de 180.', 'E 180° = π.', 'Logo 60° = π/3.'],
            solution: ['60/180 = 1/3', '180° = π rad', '60° = π/3 rad'] },
          { id: 'tg.fu.rad#b3', type: 'input', prompt: 'Converta π/4 rad para graus. Responda só o número.', answer: '45',
            hints: ['Troque π por 180°.', '180/4.', '= 45.'],
            solution: ['π/4 → 180°/4', '= 45°'],
            traps: { '90': 'Isso é π/2.' } }
        ],
        intermediario: [
          { id: 'tg.fu.rad#i1', type: 'input', prompt: 'Converta 210° para radianos. Escreva na forma a*pi/b, respondendo a e b separados por vírgula.',
            answer: '7,6', accept: ['7, 6'],
            hints: ['Multiplique por π/180.', '210/180 simplifica.', 'Divida os dois por 30: 7/6.'],
            solution: ['210 × π/180 = 210π/180', 'MDC(210,180) = 30', '= 7π/6'],
            traps: { '210,180': 'Correto em valor, mas não simplificado.' } },
          { id: 'tg.fu.rad#i2', type: 'input', prompt: 'Converta 3π/2 rad para graus. Responda só o número.', answer: '270',
            hints: ['Troque π por 180.', '3(180)/2.', '540/2.'],
            solution: ['3π/2 → 3(180°)/2', '= 540°/2 = 270°'],
            traps: { '135': 'Você dividiu por 2 antes de multiplicar por 3, ou usou π/2 no lugar de 3π/2.' } },
          { id: 'tg.fu.rad#i3', type: 'input', prompt: 'Um arco de 15 cm numa circunferência de raio 5 cm corresponde a quantos radianos?',
            answer: '3',
            hints: ['Use θ = s/r.', '15 dividido por 5.', 'A resposta é adimensional.'],
            solution: ['θ = s/r', 'θ = 15/5 = 3 rad'],
            traps: { '75': 'Você multiplicou em vez de dividir.' } }
        ],
        avancado: [
          { id: 'tg.fu.rad#a1', type: 'input', prompt: 'Qual o comprimento do arco de uma circunferência de raio 6 cm correspondente a um ângulo de π/3 rad?',
            answer: '2pi', accept: ['2π', '6.28', '6,28'],
            hints: ['Use s = r·θ.', 's = 6 × π/3.', '6/3 = 2.'],
            solution: ['s = r·θ', 's = 6 · (π/3)', 's = 2π cm ≈ 6,28 cm'],
            traps: { '18.85': 'Isso seria o arco de π rad, ou você usou o diâmetro.' } },
          { id: 'tg.fu.rad#a2', type: 'choice', prompt: 'Por que o Cálculo exige radianos nas funções trigonométricas?',
            choices: ['Porque radiano é mais preciso', 'Porque lim sen(x)/x = 1 só vale em radianos',
                      'Porque graus não existem em matemática', 'Por convenção histórica'], answer: 1,
            hints: ['Pense na derivada do seno.', 'Ela sai do limite fundamental.',
                    'Em graus, esse limite daria π/180 em vez de 1.'],
            solution: ['A derivada de sen(x) vem de lim sen(h)/h = 1',
                       'Esse limite só vale com h em radianos',
                       'Em graus a derivada do seno seria (π/180)cos(x)'] }
        ],
        desafio: [
          { id: 'tg.fu.rad#d1', type: 'input', prompt: 'Um setor circular de raio 10 cm tem área 50 cm². Qual o ângulo central em radianos?',
            answer: '1',
            hints: ['Área do setor: A = (1/2)r²θ, com θ em radianos.',
                    '50 = (1/2)(100)θ.', '50 = 50θ.'],
            solution: ['A = (1/2)r²θ', '50 = (1/2)(10²)θ', '50 = 50θ', 'θ = 1 rad'],
            traps: { '0.5': 'Você esqueceu o fator 1/2 ou dividiu duas vezes.',
                     '57.3': 'Isso é 1 rad convertido em graus; a pergunta pede radianos.' } }
        ]
      },

      review: [
        'Radiano é arco dividido por raio — uma razão, por isso adimensional.',
        '180° = π rad resolve qualquer conversão por proporção.',
        's = r·θ e A = (1/2)r²θ só valem com θ em radianos.',
        'Todo o Cálculo trigonométrico pressupõe radianos.'
      ],

      lab: 'labTrig'
    },

    /* ═══════════════════════════════════════════════════════════════
       Seno, cosseno e tangente no triângulo retângulo
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'tg.tr.razoes',

      whatIs: `<p>Num triângulo retângulo, fixado um dos ângulos agudos:</p>
        <ul>
          <li><span class="math">sen θ = cateto oposto / hipotenusa</span></li>
          <li><span class="math">cos θ = cateto adjacente / hipotenusa</span></li>
          <li><span class="math">tan θ = cateto oposto / cateto adjacente</span></li>
        </ul>
        <p>O ponto que costuma passar despercebido: essas razões dependem <em>só do ângulo</em>, não do tamanho do triângulo.</p>`,

      whyExists: `<p>Triângulos com os mesmos ângulos são semelhantes, e em figuras semelhantes as razões entre lados correspondentes são iguais. Isso significa que "cateto oposto sobre hipotenusa" é uma característica do ângulo, não do desenho.</p>
        <p>É essa independência que torna possível tabelar valores e medir alturas inacessíveis: basta o ângulo e uma distância conhecida.</p>`,

      simple: 'Seno é oposto sobre hipotenusa, cosseno é adjacente sobre hipotenusa, tangente é oposto sobre adjacente. O que é "oposto" muda conforme o ângulo que você escolhe.',

      academic: `<p>Pelo caso AA de semelhança, dois triângulos retângulos com um ângulo agudo congruente são semelhantes, o que garante a proporcionalidade dos lados correspondentes. Assim as razões trigonométricas ficam bem definidas como funções do ângulo.</p>
        <p>Da identidade de Pitágoras, <span class="math">sen²θ + cos²θ = 1</span>, e da definição, <span class="math">tan θ = sen θ / cos θ</span>. Para ângulos fora de <span class="math">(0°, 90°)</span> a definição é estendida pelo círculo trigonométrico.</p>`,

      examples: [
        { level: 'basico', prompt: 'Num triângulo retângulo, o cateto oposto a θ mede 3 e a hipotenusa mede 5. Quanto vale sen θ?',
          steps: ['sen = oposto/hipotenusa', '3/5'],
          answer: '0,6' },
        { level: 'intermediario', prompt: 'Uma rampa sobe 2 m ao longo de 10 m de comprimento horizontal. Qual a tangente do ângulo de inclinação?',
          steps: ['A subida é o cateto oposto; o avanço horizontal é o adjacente',
                  'tan θ = 2/10'],
          answer: '0,2' },
        { level: 'avancado', prompt: 'De um ponto no chão, a 30 m de um prédio, o topo é visto sob 60°. Qual a altura? (tan 60° = √3 ≈ 1,73)',
          steps: ['A altura é o cateto oposto; os 30 m são o adjacente',
                  'tan 60° = h/30', 'h = 30·√3'],
          answer: 'aproximadamente 51,96 m' }
      ],

      application: { area: 'Engenharia',
        text: 'Decompor uma força inclinada em componentes horizontal e vertical é aplicar cosseno e seno ao ângulo com a horizontal. Toda análise de estruturas começa por essa decomposição — e o erro de trocar seno por cosseno inverte o resultado inteiro.' },

      formulas: [
        { f: 'sen θ = cat. oposto / hipotenusa', note: '' },
        { f: 'cos θ = cat. adjacente / hipotenusa', note: '' },
        { f: 'tan θ = cat. oposto / cat. adjacente = sen θ / cos θ', note: '' },
        { f: 'sen²θ + cos²θ = 1', note: 'Pitágoras dividido pelo quadrado da hipotenusa.' },
        { f: 'sen 30° = 1/2 · sen 45° = √2/2 · sen 60° = √3/2', note: 'Os notáveis. O cosseno é a lista ao contrário.' }
      ],

      mistakes: [
        { erro: 'Trocar oposto por adjacente ao mudar de ângulo',
          porque: 'Fixar os lados no desenho em vez de fixá-los no ângulo escolhido.',
          certo: 'O cateto oposto a um ângulo agudo é adjacente ao outro. Marque o ângulo antes de nomear os lados.' },
        { erro: 'Usar seno onde o problema pede tangente',
          porque: 'Não conferir se o lado conhecido é a hipotenusa ou o outro cateto.',
          certo: 'Se os dois lados envolvidos são catetos, a razão é tangente.' },
        { erro: 'Calcular com a calculadora em radianos ao usar graus',
          porque: 'Modo errado na calculadora.',
          certo: 'Confira o modo. sen(30) em radianos dá −0,988; em graus, 0,5.' }
      ],

      tip: 'Antes de escolher a razão, marque o ângulo no desenho e escreva ao lado de cada lado: "hip", "op" ou "adj". A razão certa fica óbvia e o erro de troca desaparece.',

      drills: {
        basico: [
          { id: 'tg.tr.raz#b1', type: 'input', prompt: 'Num triângulo retângulo, o cateto oposto a θ mede 6 e a hipotenusa mede 10. Quanto vale sen θ? (decimal)',
            answer: '0.6', accept: ['0,6', '3/5'],
            hints: ['Seno é oposto sobre hipotenusa.', '6/10.', 'Simplifique.'],
            solution: ['sen θ = oposto/hipotenusa', '= 6/10 = 0,6'],
            traps: { '1.67': 'Você dividiu ao contrário: hipotenusa sobre oposto.' } },
          { id: 'tg.tr.raz#b2', type: 'input', prompt: 'Os catetos de um triângulo retângulo medem 3 e 4. Quanto vale a tangente do ângulo oposto ao cateto 3? (decimal)',
            answer: '0.75', accept: ['0,75', '3/4'],
            hints: ['Tangente é oposto sobre adjacente.', 'O oposto é 3, o adjacente é 4.', '3/4.'],
            solution: ['tan θ = oposto/adjacente', '= 3/4 = 0,75'],
            traps: { '1.33': 'Você usou o outro ângulo: 4/3.',
                     '0.6': 'Isso é o seno (3/5), não a tangente.' } },
          { id: 'tg.tr.raz#b3', type: 'choice', prompt: 'Quanto vale sen 30° ?',
            choices: ['1/2', '√2/2', '√3/2', '1'], answer: 0,
            hints: ['É o menor dos três valores notáveis de seno.', 'Vem do triângulo equilátero cortado ao meio.',
                    'O cateto oposto a 30° é metade da hipotenusa.'],
            solution: ['No equilátero cortado ao meio, o lado oposto a 30° é metade da hipotenusa',
                       'sen 30° = 1/2'] }
        ],
        intermediario: [
          { id: 'tg.tr.raz#i1', type: 'input', prompt: 'Se sen θ = 0,8 e θ é agudo, quanto vale cos θ? (decimal)',
            answer: '0.6', accept: ['0,6', '3/5'],
            hints: ['Use sen²θ + cos²θ = 1.', '0,64 + cos²θ = 1.', 'cos²θ = 0,36.'],
            solution: ['sen²θ + cos²θ = 1', '0,8² = 0,64', 'cos²θ = 1 − 0,64 = 0,36',
                       'cos θ = 0,6 (positivo, pois θ é agudo)'],
            traps: { '0.2': 'Você subtraiu 0,8 de 1 sem elevar ao quadrado.' } },
          { id: 'tg.tr.raz#i2', type: 'input', prompt: 'Uma escada de 5 m encostada na parede forma 60° com o chão. A que altura ela toca a parede? (use sen 60° ≈ 0,87; responda com uma casa decimal)',
            answer: '4.35', accept: ['4,35', '4.3', '4,3'],
            hints: ['A altura é o cateto oposto ao ângulo de 60°.', 'A escada é a hipotenusa.',
                    'altura = 5 × sen 60°.'],
            solution: ['A altura é o cateto oposto a 60°', 'sen 60° = altura/5',
                       'altura = 5 × 0,87 = 4,35 m'],
            traps: { '2.5': 'Você usou cosseno: esse é o afastamento da parede.' } },
          { id: 'tg.tr.raz#i3', type: 'input', prompt: 'Quanto vale tan 45° ?', answer: '1',
            hints: ['Em 45° o triângulo é isósceles.', 'Os dois catetos são iguais.', 'Razão entre iguais.'],
            solution: ['Com 45°, os catetos são iguais', 'tan 45° = cateto/cateto = 1'] }
        ],
        avancado: [
          { id: 'tg.tr.raz#a1', type: 'input', prompt: 'De um ponto a 40 m de um prédio, o topo é visto sob 45°. Qual a altura do prédio, em metros?',
            answer: '40',
            hints: ['tan 45° = 1.', 'tan θ = altura/distância.', '1 = h/40.'],
            solution: ['tan 45° = h/40', 'tan 45° = 1', 'h = 40 m'],
            traps: { '28.3': 'Você usou seno em vez de tangente.' } },
          { id: 'tg.tr.raz#a2', type: 'input', prompt: 'Uma força de 100 N faz 30° com a horizontal. Qual a componente horizontal, em N? (use cos 30° ≈ 0,87)',
            answer: '87',
            hints: ['A componente horizontal é adjacente ao ângulo.', 'Adjacente pede cosseno.',
                    '100 × 0,87.'],
            solution: ['Componente horizontal = F·cos θ', '= 100 × 0,87 = 87 N'],
            traps: { '50': 'Isso é a componente vertical: 100 × sen 30°.' } }
        ],
        desafio: [
          { id: 'tg.tr.raz#d1', type: 'input', prompt: 'De um ponto, o topo de uma torre é visto sob 30°. Avançando 20 m em direção à torre, passa a ser visto sob 60°. Qual a altura da torre, em metros? (use √3 ≈ 1,73; uma casa decimal)',
            answer: '17.3', accept: ['17,3', '17.32', '17,32'],
            hints: ['Chame a altura de h e a distância final de d.',
                    'tan 60° = h/d e tan 30° = h/(d + 20).',
                    'De tan 60° = √3: d = h/√3. Substitua na segunda.'],
            solution: ['tan 60° = h/d → d = h/√3',
                       'tan 30° = h/(d + 20) → 1/√3 = h/(d + 20)',
                       'd + 20 = h√3 → h/√3 + 20 = h√3',
                       'Multiplique por √3: h + 20√3 = 3h → 2h = 20√3',
                       'h = 10√3 ≈ 17,3 m'],
            traps: { '20': 'Esse é o deslocamento, não a altura.',
                     '34.6': 'Você esqueceu de dividir por 2 no último passo.' } }
        ]
      },

      review: [
        'Seno é oposto/hipotenusa, cosseno é adjacente/hipotenusa, tangente é oposto/adjacente.',
        'As razões dependem só do ângulo, por semelhança de triângulos.',
        'Marque o ângulo antes de nomear os lados — "oposto" muda conforme o ângulo.',
        'sen²θ + cos²θ = 1 relaciona as duas primeiras.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Círculo trigonométrico
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'tg.ci.definicao',

      whatIs: `<p>Na circunferência de raio 1 centrada na origem, marque o ponto <span class="math">P</span> obtido girando o ângulo <span class="math">θ</span> a partir do eixo x. Então:</p>
        <p><span class="math">P = (cos θ, sen θ)</span></p>
        <p>Cosseno é a abscissa, seno é a ordenada. Essa definição vale para <strong>qualquer</strong> ângulo — inclusive obtuso, maior que uma volta ou negativo.</p>`,

      whyExists: `<p>A definição por triângulo retângulo só alcança ângulos entre 0° e 90°: não existe triângulo retângulo com ângulo de 120°. Mas fenômenos periódicos precisam de todos os ângulos.</p>
        <p>O círculo estende a definição sem contradizer a anterior — no primeiro quadrante, as coordenadas do ponto são exatamente as razões do triângulo com hipotenusa 1. E é essa extensão que transforma seno de razão em <em>função</em>.</p>`,

      simple: 'Gire um ponto na circunferência de raio 1. A coordenada horizontal dele é o cosseno; a vertical é o seno. Vale para qualquer ângulo.',

      academic: `<p>Para <span class="math">θ ∈ ℝ</span>, define-se <span class="math">(cos θ, sen θ)</span> como as coordenadas do ponto obtido percorrendo, sobre a circunferência unitária, um arco de comprimento <span class="math">|θ|</span> a partir de <span class="math">(1,0)</span> — no sentido anti-horário se <span class="math">θ &gt; 0</span>.</p>
        <p>A identidade <span class="math">sen²θ + cos²θ = 1</span> é imediata: é a equação da circunferência unitária <span class="math">x² + y² = 1</span> aplicada ao ponto. A periodicidade <span class="math">2π</span> segue de o ponto retornar após uma volta.</p>`,

      examples: [
        { level: 'basico', prompt: 'Qual é o ponto correspondente a θ = 0 no círculo trigonométrico?',
          steps: ['Sem giro, o ponto está em (1, 0)', 'Logo cos 0 = 1 e sen 0 = 0'],
          answer: '(1, 0)' },
        { level: 'intermediario', prompt: 'Determine o sinal de sen 210° e cos 210°',
          steps: ['210° está no terceiro quadrante',
                  'No terceiro quadrante, x e y são ambos negativos',
                  'Logo os dois são negativos'],
          answer: 'sen 210° < 0 e cos 210° < 0' },
        { level: 'avancado', prompt: 'Calcule cos 120° reduzindo ao primeiro quadrante',
          steps: ['120° está no segundo quadrante, onde o cosseno é negativo',
                  'O ângulo de referência é 180° − 120° = 60°',
                  'cos 60° = 1/2', 'Aplicando o sinal do quadrante'],
          answer: '−1/2' }
      ],

      application: { area: 'Processamento de sinais',
        text: 'Um sinal senoidal é a projeção de um ponto girando a velocidade constante. Amplitude é o raio, frequência é a velocidade de giro, fase é onde o ponto começa. Toda a análise de Fourier parte dessa leitura.' },

      formulas: [
        { f: 'P = (cos θ, sen θ) na circunferência de raio 1', note: 'A definição geral.' },
        { f: 'sen²θ + cos²θ = 1', note: 'É a equação da circunferência aplicada ao ponto.' },
        { f: '1º quadrante: (+,+) · 2º: (−,+) · 3º: (−,−) · 4º: (+,−)', note: 'Sinais de (cos, sen) por quadrante.' },
        { f: 'sen(θ + 2π) = sen θ', note: 'Periodicidade: após uma volta, o ponto se repete.' },
        { f: 'sen(−θ) = −sen θ e cos(−θ) = cos θ', note: 'Seno é ímpar, cosseno é par.' }
      ],

      mistakes: [
        { erro: 'Trocar seno com cosseno no círculo',
          porque: 'Não fixar a ordem do par ordenado.',
          certo: 'Coordenada é (x, y) = (cos, sen). Cosseno vem primeiro, como o x.' },
        { erro: 'Achar que sen 150° = sen 30° e cos 150° = cos 30°',
          porque: 'Reduzir ao primeiro quadrante sem aplicar o sinal.',
          certo: 'O seno mantém: sen 150° = 1/2. O cosseno inverte: cos 150° = −√3/2.' },
        { erro: 'Achar que ângulos maiores que 360° não têm seno',
          porque: 'Pensar em ângulo como abertura de figura, não como giro.',
          certo: 'O ponto simplesmente dá mais de uma volta: sen 400° = sen 40°.' }
      ],

      tip: 'Desenhe o círculo, marque o quadrante e determine o SINAL antes de calcular o valor. Reduzir ao primeiro quadrante dá o número; o quadrante dá o sinal. Separar as duas coisas elimina quase todo erro.',

      drills: {
        basico: [
          { id: 'tg.ci.def#b1', type: 'input', prompt: 'Quanto vale cos 0 ?', answer: '1',
            hints: ['O ponto está em (1, 0).', 'Cosseno é a coordenada x.', 'x = 1.'],
            solution: ['Sem giro, P = (1, 0)', 'cos 0 = 1'],
            traps: { '0': 'Isso é sen 0. Cosseno é a coordenada horizontal.' } },
          { id: 'tg.ci.def#b2', type: 'input', prompt: 'Quanto vale sen 90° ?', answer: '1',
            hints: ['A 90° o ponto está no topo do círculo.', 'P = (0, 1).', 'Seno é a coordenada y.'],
            solution: ['A 90°, P = (0, 1)', 'sen 90° = 1'],
            traps: { '0': 'Isso é cos 90°.' } },
          { id: 'tg.ci.def#b3', type: 'choice', prompt: 'Em qual quadrante o seno é positivo e o cosseno é negativo?',
            choices: ['Primeiro', 'Segundo', 'Terceiro', 'Quarto'], answer: 1,
            hints: ['Seno positivo significa y acima do eixo.', 'Cosseno negativo significa x à esquerda.',
                    'Acima e à esquerda é o segundo quadrante.'],
            solution: ['sen > 0 → y > 0 (metade de cima)', 'cos < 0 → x < 0 (metade da esquerda)',
                       'Interseção: segundo quadrante'] }
        ],
        intermediario: [
          { id: 'tg.ci.def#i1', type: 'choice', prompt: 'Qual o sinal de cos 200° ?',
            choices: ['Positivo', 'Negativo', 'Zero', 'Não existe'], answer: 1,
            hints: ['200° está entre 180° e 270°.', 'Isso é o terceiro quadrante.',
                    'No terceiro quadrante, x e y são negativos.'],
            solution: ['200° está no terceiro quadrante', 'Lá, cos < 0 e sen < 0', 'cos 200° é negativo'] },
          { id: 'tg.ci.def#i2', type: 'input', prompt: 'Se sen θ = 0,6 e θ está no segundo quadrante, quanto vale cos θ? (decimal com sinal)',
            answer: '-0.8', accept: ['-0,8', '−0.8'],
            hints: ['Use sen²θ + cos²θ = 1.', 'cos²θ = 1 − 0,36 = 0,64, então |cos θ| = 0,8.',
                    'No segundo quadrante o cosseno é negativo.'],
            solution: ['cos²θ = 1 − 0,6² = 0,64', '|cos θ| = 0,8',
                       'Segundo quadrante → cosseno negativo', 'cos θ = −0,8'],
            traps: { '0.8': 'Faltou o sinal do quadrante.' } },
          { id: 'tg.ci.def#i3', type: 'choice', prompt: 'Quanto vale sen 150° ?',
            choices: ['1/2', '−1/2', '√3/2', '−√3/2'], answer: 0,
            hints: ['150° está no segundo quadrante, onde o seno é positivo.',
                    'Ângulo de referência: 180° − 150° = 30°.', 'sen 30° = 1/2.'],
            solution: ['Segundo quadrante: seno positivo', 'Referência: 30°',
                       'sen 30° = 1/2', 'sen 150° = 1/2'] }
        ],
        avancado: [
          { id: 'tg.ci.def#a1', type: 'choice', prompt: 'Quanto vale cos 240° ?',
            choices: ['1/2', '−1/2', '√3/2', '−√3/2'], answer: 1,
            hints: ['240° está no terceiro quadrante: cosseno negativo.',
                    'Referência: 240° − 180° = 60°.', 'cos 60° = 1/2.'],
            solution: ['Terceiro quadrante: cos < 0', 'Referência: 60°', 'cos 60° = 1/2',
                       'cos 240° = −1/2'] },
          { id: 'tg.ci.def#a2', type: 'input', prompt: 'Quanto vale sen 400° ? Responda em termos do ângulo equivalente na primeira volta: sen de quantos graus?',
            answer: '40',
            hints: ['400° passa de uma volta completa.', 'Subtraia 360°.', '400 − 360 = 40.'],
            solution: ['400° = 360° + 40°', 'Após uma volta o ponto se repete', 'sen 400° = sen 40°'],
            traps: { '400': 'Reduza à primeira volta subtraindo 360°.' } }
        ],
        desafio: [
          { id: 'tg.ci.def#d1', type: 'input', prompt: 'Quantas soluções tem a equação sen x = 0,5 no intervalo [0°, 360°] ?',
            answer: '2',
            hints: ['Trace a reta horizontal y = 0,5 no círculo.', 'Ela cruza a circunferência em dois pontos.',
                    'Os ângulos são 30° e 150°.'],
            solution: ['sen x = 0,5 significa ordenada 0,5',
                       'A reta y = 0,5 corta a circunferência em dois pontos',
                       'x = 30° (1º quadrante) e x = 150° (2º quadrante)', 'Duas soluções'],
            traps: { '1': 'O seno positivo ocorre em dois quadrantes: primeiro e segundo.',
                     '4': 'Isso valeria para sen²x = 0,25, que admite valores negativos também.' } }
        ]
      },

      review: [
        'No círculo de raio 1, o ponto do ângulo θ é (cos θ, sen θ).',
        'A definição vale para qualquer ângulo, inclusive negativo ou maior que uma volta.',
        'Reduza ao primeiro quadrante para o valor e use o quadrante para o sinal.',
        'sen²θ + cos²θ = 1 é a equação da circunferência unitária.'
      ],

      lab: 'labTrig'
    }
  ]);
})(window.CZ);
