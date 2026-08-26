/* ==========================================================================
   data/sheets/02-algebra.js — fichas de Álgebra.
   Formato e regras em core/sheets.js.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([
    /* ═══════════════════════════════════════════════════════════════
       Equação do primeiro grau
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'al.eq.primeiro',

      whatIs: `<p>Uma equação é uma igualdade com um número escondido. Resolver é descobrir qual valor da letra torna a igualdade verdadeira.</p>
        <p>O método é um só: fazer a mesma coisa nos dois lados até que a letra fique sozinha.</p>`,

      whyExists: `<p>Quase todo problema aplicado chega na mesma forma: você conhece a relação entre as grandezas e falta uma delas. Equação é a linguagem para escrever "não sei este número, mas sei o que ele satisfaz".</p>
        <p>E é a técnica que sustenta tudo depois: achar raiz de função, resolver limite indeterminado, isolar dy/dx em derivação implícita — tudo é isolar incógnita.</p>`,

      simple: 'Pense numa balança equilibrada. O que você fizer de um lado tem de fazer do outro, ou ela desequilibra. Vá tirando o que atrapalha até a letra ficar sozinha.',

      academic: `<p>Uma equação do primeiro grau em ℝ tem a forma <span class="math">ax + b = 0</span> com <span class="math">a ≠ 0</span>, e solução única <span class="math">x = −b/a</span>.</p>
        <p>O método de resolução aplica operações que preservam o conjunto solução: somar o mesmo valor aos dois membros e multiplicar os dois membros por um valor não nulo. A restrição "não nulo" é o que impede a criação de soluções falsas ao multiplicar por uma expressão que pode zerar.</p>
        <p>Quando <span class="math">a = 0</span>, a equação degenera: se <span class="math">b = 0</span>, todo real é solução; se <span class="math">b ≠ 0</span>, não há solução.</p>`,

      examples: [
        { level: 'basico', prompt: 'Resolva 2x + 5 = 15',
          steps: ['Tire o 5 dos dois lados: 2x = 10', 'Divida os dois lados por 2: x = 5', 'Confira: 2(5) + 5 = 15 ✓'],
          answer: 'x = 5' },
        { level: 'intermediario', prompt: 'Resolva 3(x − 2) = x + 8',
          steps: ['Abra o parêntese: 3x − 6 = x + 8',
                  'Junte os x de um lado: 3x − x = 8 + 6', '2x = 14', 'x = 7'],
          answer: 'x = 7' },
        { level: 'avancado', prompt: 'Resolva (x + 1)/3 − (x − 2)/4 = 1',
          steps: ['MMC dos denominadores: 12. Multiplique a equação toda por 12',
                  '4(x + 1) − 3(x − 2) = 12', '4x + 4 − 3x + 6 = 12',
                  'x + 10 = 12', 'x = 2'],
          answer: 'x = 2' }
      ],

      application: { area: 'Engenharia da Computação',
        text: 'Dimensionar um buffer é resolver uma equação: taxa de entrada × tempo = capacidade + taxa de saída × tempo. Isolar o tempo diz em quanto o buffer estoura. A conta é do primeiro grau; o que vale é montá-la certo.' },

      formulas: [
        { f: 'ax + b = c  →  x = (c − b)/a', note: 'Com a ≠ 0. Tire o b, depois divida pelo a.' },
        { f: 'Somar o mesmo nos dois lados preserva a igualdade', note: 'É o que autoriza "passar para o outro lado".' },
        { f: 'Multiplicar os dois lados por k ≠ 0 preserva a igualdade', note: 'O k = 0 é proibido: transformaria tudo em 0 = 0.' }
      ],

      mistakes: [
        { erro: 'Em 3(x − 2) = 12, escrever 3x − 2 = 12',
          porque: 'Distribuir o 3 só no primeiro termo.',
          certo: 'O fator multiplica tudo dentro: 3x − 6 = 12.' },
        { erro: 'Em −2x = 8, responder x = 4',
          porque: 'Ignorar o sinal do coeficiente ao dividir.',
          certo: 'Divida por −2: x = −4.' },
        { erro: 'Passar um termo para o outro lado sem trocar a operação',
          porque: 'Decorar "passa para o outro lado" sem entender que é somar o oposto.',
          certo: 'Se estava somando, passa subtraindo. Se multiplicava, passa dividindo.' }
      ],

      tip: 'Sempre substitua a resposta na equação original. Leva cinco segundos e pega qualquer erro de sinal — inclusive em prova, onde não há gabarito para conferir.',

      drills: {
        basico: [
          { id: 'al.eq.pri#b1', type: 'input', prompt: 'Resolva 3x + 7 = 22. Responda só o valor de x.', answer: '5',
            hints: ['Comece tirando o 7 dos dois lados.', '3x = 15.', 'Agora divida por 3.'],
            solution: ['3x + 7 = 22', '3x = 22 − 7 = 15', 'x = 15/3 = 5', 'Confira: 3(5)+7 = 22 ✓'],
            traps: { '9.67': 'Você dividiu 22 por 3 antes de tirar o 7.' } },
          { id: 'al.eq.pri#b2', type: 'input', prompt: 'Resolva 5x = −35. Responda só o valor de x.', answer: '-7',
            hints: ['Divida os dois lados por 5.', '−35 ÷ 5.', 'Sinais diferentes dão negativo.'],
            solution: ['5x = −35', 'x = −35/5', 'x = −7'],
            traps: { '7': 'Faltou o sinal: o resultado da divisão é negativo.' } },
          { id: 'al.eq.pri#b3', type: 'input', prompt: 'Resolva x/4 = 9. Responda só o valor de x.', answer: '36',
            hints: ['O x está sendo dividido por 4.', 'A operação inversa é multiplicar.', 'Multiplique os dois lados por 4.'],
            solution: ['x/4 = 9', 'Multiplique os dois lados por 4', 'x = 36'],
            traps: { '2.25': 'Você dividiu 9 por 4. A operação inversa da divisão é a multiplicação.' } }
        ],
        intermediario: [
          { id: 'al.eq.pri#i1', type: 'input', prompt: 'Resolva 4x − 3 = 2x + 9. Responda só o valor de x.', answer: '6',
            hints: ['Junte os x de um lado e os números do outro.', '4x − 2x = 9 + 3.', '2x = 12.'],
            solution: ['4x − 3 = 2x + 9', '4x − 2x = 9 + 3', '2x = 12', 'x = 6'],
            traps: { '2': 'Você somou os x em vez de subtrair ao juntá-los.' } },
          { id: 'al.eq.pri#i2', type: 'input', prompt: 'Resolva 2(x + 3) = 5x − 6. Responda só o valor de x.', answer: '4',
            hints: ['Abra o parêntese antes de qualquer coisa.', '2x + 6 = 5x − 6.', 'Junte: 6 + 6 = 5x − 2x.'],
            solution: ['2(x+3) = 5x − 6', '2x + 6 = 5x − 6', '6 + 6 = 5x − 2x', '12 = 3x', 'x = 4'],
            traps: { '0': 'Você escreveu 2x + 3 no lugar de 2x + 6: o fator multiplica os dois termos.' } },
          { id: 'al.eq.pri#i3', type: 'input', prompt: 'Resolva x/2 + x/3 = 10. Responda só o valor de x.', answer: '12',
            hints: ['Multiplique a equação inteira pelo MMC dos denominadores.', 'MMC(2,3) = 6.', '3x + 2x = 60.'],
            solution: ['Multiplique tudo por 6', '3x + 2x = 60', '5x = 60', 'x = 12'],
            traps: { '20': 'Você somou x/2 + x/3 como se desse x, esquecendo o denominador comum.' } }
        ],
        avancado: [
          { id: 'al.eq.pri#a1', type: 'input', prompt: 'Resolva (2x − 1)/3 = (x + 4)/2. Responda só o valor de x.', answer: '14',
            hints: ['Multiplicação cruzada, ou multiplique tudo pelo MMC 6.', '2(2x − 1) = 3(x + 4).', '4x − 2 = 3x + 12.'],
            solution: ['Multiplique os dois lados por 6', '2(2x − 1) = 3(x + 4)', '4x − 2 = 3x + 12',
                       '4x − 3x = 12 + 2', 'x = 14'],
            traps: { '10': 'Você distribuiu o 3 só no x: 3(x+4) = 3x + 12, não 3x + 4.' } },
          { id: 'al.eq.pri#a2', type: 'input', prompt: 'Na fórmula v = v₀ + a·t, isole t. Escreva a expressão (use / para divisão).',
            answer: '(v-v0)/a', accept: ['(v−v0)/a', '(v-v_0)/a', 'v-v0/a'],
            hints: ['Comece isolando o termo que contém t.', 'v − v₀ = a·t.', 'Agora divida os dois lados por a.'],
            solution: ['v = v₀ + a·t', 'v − v₀ = a·t', 't = (v − v₀)/a', 'Vale para a ≠ 0'] }
        ],
        desafio: [
          { id: 'al.eq.pri#d1', type: 'input', prompt: 'Um pai tem 40 anos e o filho, 10. Daqui a quantos anos a idade do pai será o dobro da do filho?',
            answer: '20',
            hints: ['Chame de x o número de anos que passam.', 'Daqui a x anos: pai = 40 + x, filho = 10 + x.',
                    'Monte a equação 40 + x = 2(10 + x).'],
            solution: ['Daqui a x anos: pai 40 + x, filho 10 + x',
                       'Condição: 40 + x = 2(10 + x)', '40 + x = 20 + 2x',
                       '40 − 20 = 2x − x', 'x = 20'],
            traps: { '10': 'Você comparou as idades atuais em vez de montar a equação com x.',
                     '30': 'Você resolveu 40 + x = 2·10 + x, esquecendo de somar x dentro do parêntese.' } }
        ]
      },

      review: [
        'Resolver é isolar a incógnita fazendo a mesma operação nos dois lados.',
        'Abra parênteses antes de juntar termos, e cuidado com o fator negativo.',
        'Com frações, multiplique a equação inteira pelo MMC dos denominadores.',
        'Sempre confira substituindo a resposta na equação original.'
      ],

      viz: 'balanca'
    },

    /* ═══════════════════════════════════════════════════════════════
       Produtos notáveis: quadrado da soma
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'al.prod.quadradoSoma',

      whatIs: `<p>O quadrado da soma é o padrão que aparece quando você eleva um binômio ao quadrado:</p>
        <p><span class="math">(a + b)² = a² + 2ab + b²</span></p>
        <p>Repare no termo do meio. Ele existe porque, ao multiplicar <span class="math">(a+b)(a+b)</span>, os produtos cruzados <span class="math">ab</span> e <span class="math">ba</span> aparecem duas vezes.</p>`,

      whyExists: `<p>Não é um truque para economizar tempo — é o reconhecimento de um padrão que aparece o tempo todo. Quem reconhece <span class="math">x² + 6x + 9</span> como <span class="math">(x + 3)²</span> resolve em um passo o que outro resolve em cinco.</p>
        <p>E é o que permite completar quadrado, que por sua vez dá o vértice da parábola, resolve integrais com raiz e transforma a equação da circunferência da forma geral para a reduzida.</p>`,

      simple: 'Quadrado do primeiro, mais duas vezes o primeiro pelo segundo, mais quadrado do segundo. O termo do meio é o que todo mundo esquece.',

      academic: `<p>A identidade é consequência direta da distributividade: <span class="math">(a+b)(a+b) = a(a+b) + b(a+b) = a² + ab + ba + b²</span>. Como a multiplicação é comutativa em ℝ, <span class="math">ab = ba</span> e os termos se juntam em <span class="math">2ab</span>.</p>
        <p>Geometricamente, um quadrado de lado <span class="math">a + b</span> se decompõe em um quadrado de área <span class="math">a²</span>, um de área <span class="math">b²</span> e dois retângulos de área <span class="math">ab</span> — o que torna a identidade visível sem álgebra.</p>`,

      examples: [
        { level: 'basico', prompt: 'Expanda (x + 4)²',
          steps: ['Quadrado do primeiro: x²', 'Duas vezes o produto: 2·x·4 = 8x', 'Quadrado do segundo: 4² = 16'],
          answer: 'x² + 8x + 16' },
        { level: 'intermediario', prompt: 'Expanda (3x + 2y)²',
          steps: ['Quadrado do primeiro: (3x)² = 9x²',
                  'Duas vezes o produto: 2·(3x)·(2y) = 12xy', 'Quadrado do segundo: (2y)² = 4y²'],
          answer: '9x² + 12xy + 4y²' },
        { level: 'avancado', prompt: 'Calcule 102² de cabeça usando o produto notável',
          steps: ['Escreva 102 como 100 + 2', '(100 + 2)² = 100² + 2·100·2 + 2²',
                  '= 10000 + 400 + 4'],
          answer: '10404' }
      ],

      application: { area: 'Estatística',
        text: 'A fórmula prática da variância, Var(X) = E(X²) − [E(X)]², sai de expandir (X − μ)². Sem o produto notável, a dedução não fecha — e a fórmula vira algo a decorar em vez de algo a entender.' },

      formulas: [
        { f: '(a + b)² = a² + 2ab + b²', note: 'O termo do meio vem do produto cruzado, que aparece duas vezes.' },
        { f: '(a − b)² = a² − 2ab + b²', note: 'Mesmo padrão; só o termo do meio troca de sinal.' },
        { f: 'a² + 2ab + b² = (a + b)²', note: 'Lido ao contrário, é fatoração de trinômio quadrado perfeito.' }
      ],

      mistakes: [
        { erro: 'Escrever (a + b)² = a² + b²',
          porque: 'Distribuir o expoente sobre a soma.',
          certo: 'Falta o 2ab. Teste com 3 e 4: 49 ≠ 9 + 16.' },
        { erro: 'Em (3x + 2)², escrever 3x² em vez de 9x²',
          porque: 'Elevar só a letra, deixando o coeficiente de fora.',
          certo: '(3x)² = 3²·x² = 9x².' },
        { erro: 'Em (a − b)², deixar o último termo negativo',
          porque: 'Arrastar o sinal para o quadrado.',
          certo: '(−b)² é positivo. O resultado é a² − 2ab + b².' }
      ],

      tip: 'Sempre que vir um trinômio, teste se ele é quadrado perfeito: o primeiro e o último são quadrados? O do meio é o dobro do produto das raízes deles? Se sim, você acabou de fatorar em um passo.',

      drills: {
        basico: [
          { id: 'al.prod.qs#b1', type: 'input', prompt: 'Expanda (x + 5)². Escreva na forma x^2 + bx + c.',
            answer: 'x^2+10x+25', accept: ['x²+10x+25', 'x^2 + 10x + 25'],
            hints: ['Quadrado do primeiro, dobro do produto, quadrado do segundo.', '2·x·5 = 10x.', '5² = 25.'],
            solution: ['x² (quadrado do primeiro)', '2·x·5 = 10x (dobro do produto)', '5² = 25', 'x² + 10x + 25'],
            traps: { 'x^2+25': 'Faltou o termo do meio 10x.' } },
          { id: 'al.prod.qs#b2', type: 'input', prompt: 'Expanda (x − 3)². Escreva na forma x^2 + bx + c (b pode ser negativo).',
            answer: 'x^2-6x+9', accept: ['x²-6x+9', 'x^2 - 6x + 9', 'x^2−6x+9'],
            hints: ['Mesmo padrão, com o termo do meio negativo.', '2·x·3 = 6x, com sinal menos.', '(−3)² = +9.'],
            solution: ['x²', '−2·x·3 = −6x', '(−3)² = +9', 'x² − 6x + 9'],
            traps: { 'x^2-6x-9': 'O último termo é o quadrado de −3, e quadrado é sempre positivo.' } },
          { id: 'al.prod.qs#b3', type: 'choice', prompt: 'Qual trinômio é um quadrado perfeito?',
            choices: ['x² + 4x + 4', 'x² + 4x + 8', 'x² + 5x + 4', 'x² + 4x − 4'], answer: 0,
            hints: ['Teste: o primeiro e o último são quadrados?', 'Em x² + 4x + 4: √(x²) = x e √4 = 2.', 'O do meio deveria ser 2·x·2 = 4x. Confere?'],
            solution: ['x² + 4x + 4: raízes x e 2', 'Dobro do produto: 2·x·2 = 4x ✓', 'Logo é (x + 2)²'] }
        ],
        intermediario: [
          { id: 'al.prod.qs#i1', type: 'input', prompt: 'Expanda (2x + 3)². Escreva na forma ax^2 + bx + c.',
            answer: '4x^2+12x+9', accept: ['4x²+12x+9', '4x^2 + 12x + 9'],
            hints: ['O coeficiente também vai ao quadrado.', '(2x)² = 4x².', '2·(2x)·3 = 12x.'],
            solution: ['(2x)² = 4x²', '2·(2x)·(3) = 12x', '3² = 9', '4x² + 12x + 9'],
            traps: { '2x^2+12x+9': 'O 2 também é elevado ao quadrado: (2x)² = 4x².',
                     '4x^2+6x+9': 'O termo do meio é o DOBRO do produto: 2·2x·3 = 12x.' } },
          { id: 'al.prod.qs#i2', type: 'input', prompt: 'Fatore x² + 12x + 36 na forma (x + k)^2. Responda só o valor de k.',
            answer: '6',
            hints: ['O último termo é o quadrado de quem?', '36 = 6².', 'Confira o meio: 2·x·6 = 12x ✓'],
            solution: ['√36 = 6', 'Verificação do meio: 2·x·6 = 12x ✓', 'Logo x² + 12x + 36 = (x + 6)²'],
            traps: { '36': 'Você respondeu o termo constante, não a raiz dele.',
                     '12': 'Esse é o coeficiente do meio, que vale o dobro de k.' } }
        ],
        avancado: [
          { id: 'al.prod.qs#a1', type: 'input', prompt: 'Calcule 98² usando produto notável. Responda o número.',
            answer: '9604',
            hints: ['Escreva 98 como 100 − 2.', '(100 − 2)² = 100² − 2·100·2 + 2².', '10000 − 400 + 4.'],
            solution: ['98 = 100 − 2', '(100−2)² = 10000 − 400 + 4', '= 9604'],
            traps: { '9600': 'Você esqueceu o último termo, 2² = 4.',
                     '10404': 'Isso é 102². O sinal do termo do meio é negativo aqui.' } },
          { id: 'al.prod.qs#a2', type: 'input', prompt: 'Se a + b = 7 e ab = 10, quanto vale a² + b² ?',
            answer: '29',
            hints: ['Comece de (a + b)² = a² + 2ab + b².', '7² = a² + b² + 2(10).', '49 = a² + b² + 20.'],
            solution: ['(a+b)² = a² + 2ab + b²', '49 = a² + b² + 2(10)', '49 = a² + b² + 20',
                       'a² + b² = 29'],
            traps: { '49': 'Isso é (a+b)², que inclui o termo 2ab.',
                     '39': 'Você subtraiu ab em vez de 2ab.' } }
        ],
        desafio: [
          { id: 'al.prod.qs#d1', type: 'input', prompt: 'Se x + 1/x = 4, quanto vale x² + 1/x² ?',
            answer: '14',
            hints: ['Eleve os dois lados ao quadrado.', '(x + 1/x)² = x² + 2·x·(1/x) + 1/x².',
                    'O termo do meio simplifica: 2·x·(1/x) = 2.'],
            solution: ['(x + 1/x)² = 16', 'x² + 2·x·(1/x) + 1/x² = 16', 'x² + 2 + 1/x² = 16',
                       'x² + 1/x² = 14'],
            traps: { '16': 'Isso é o quadrado da soma inteira; falta descontar o termo do meio.',
                     '18': 'Você somou 2 em vez de subtrair.' } }
        ]
      },

      review: [
        '(a + b)² = a² + 2ab + b². O termo do meio é o dobro do produto.',
        '(a − b)² só troca o sinal do meio; o último termo continua positivo.',
        'Ao elevar (ka)², o coeficiente k também vai ao quadrado.',
        'Lida ao contrário, a identidade fatora trinômios quadrados perfeitos.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Produto da soma pela diferença
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'al.prod.diferenca',

      whatIs: `<p>Quando você multiplica uma soma pela diferença dos mesmos dois termos, o termo do meio se cancela:</p>
        <p><span class="math">(a + b)(a − b) = a² − b²</span></p>
        <p>É o único produto notável que <em>simplifica</em> em vez de expandir — e por isso é o mais útil de todos.</p>`,

      whyExists: `<p>Este é, disparado, o padrão que mais resolve problema em Cálculo. Ele aparece em três lugares:</p>
        <ul>
          <li><strong>Limites 0/0</strong>: <span class="math">(x² − 4)/(x − 2)</span> vira <span class="math">(x+2)(x−2)/(x−2)</span> e cancela.</li>
          <li><strong>Racionalização</strong>: multiplicar por <span class="math">(√a + b)</span> mata a raiz do denominador.</li>
          <li><strong>Fatoração rápida</strong>: reconhecer <span class="math">a² − b²</span> economiza toda a fórmula de Bhaskara.</li>
        </ul>`,

      simple: 'Soma vezes diferença dos mesmos termos dá quadrado menos quadrado. O termo do meio some porque um cancela o outro.',

      academic: `<p>Expandindo: <span class="math">(a+b)(a−b) = a² − ab + ba − b²</span>. Como <span class="math">ab = ba</span>, os termos centrais se anulam, restando <span class="math">a² − b²</span>.</p>
        <p>A recíproca — fatorar <span class="math">a² − b²</span> — vale em qualquer corpo. Já <span class="math">a² + b²</span> é irredutível sobre ℝ, mas fatora sobre ℂ como <span class="math">(a + bi)(a − bi)</span>.</p>`,

      examples: [
        { level: 'basico', prompt: 'Expanda (x + 6)(x − 6)',
          steps: ['Reconheça o padrão: soma vezes diferença dos mesmos termos',
                  'O resultado é quadrado do primeiro menos quadrado do segundo', 'x² − 36'],
          answer: 'x² − 36' },
        { level: 'intermediario', prompt: 'Fatore 9x² − 25',
          steps: ['9x² é quadrado de 3x; 25 é quadrado de 5',
                  'É diferença de quadrados: (3x)² − 5²'],
          answer: '(3x + 5)(3x − 5)' },
        { level: 'avancado', prompt: 'Calcule o limite de (x² − 9)/(x − 3) quando x tende a 3',
          steps: ['Substituindo direto dá 0/0 — indeterminado',
                  'Fatore o numerador: x² − 9 = (x+3)(x−3)',
                  'Cancele o (x−3): sobra x + 3',
                  'Agora substitua: 3 + 3'],
          answer: '6' }
      ],

      application: { area: 'Cálculo',
        text: 'Praticamente toda indeterminação 0/0 de função racional em prova se resolve fatorando por diferença de quadrados e cancelando. Quem reconhece o padrão em dois segundos ganha o tempo que vai precisar nas outras questões.' },

      formulas: [
        { f: '(a + b)(a − b) = a² − b²', note: 'Expandindo. Os termos do meio se cancelam.' },
        { f: 'a² − b² = (a + b)(a − b)', note: 'Fatorando. É a leitura que mais serve.' },
        { f: 'a² + b² não fatora em ℝ', note: 'Soma de quadrados é irredutível sobre os reais.' },
        { f: '(√a − b)(√a + b) = a − b²', note: 'A racionalização por conjugado é este mesmo padrão.' }
      ],

      mistakes: [
        { erro: 'Fatorar x² + 16 como (x + 4)(x − 4)',
          porque: 'Aplicar o padrão à soma em vez da diferença.',
          certo: '(x+4)(x−4) = x² − 16. Soma de quadrados não fatora em ℝ.' },
        { erro: 'Não reconhecer 4x² − 49 como diferença de quadrados',
          porque: 'Procurar só termos "puros" como x² e números redondos.',
          certo: '4x² = (2x)² e 49 = 7². Fatora em (2x + 7)(2x − 7).' },
        { erro: 'Cancelar (x − 3) sem notar que o limite é justamente em x = 3',
          porque: 'Confundir simplificar a expressão com avaliar a função.',
          certo: 'O cancelamento vale para x ≠ 3, e é exatamente o que o limite pede — ele nunca toca o ponto.' }
      ],

      tip: 'Diante de uma indeterminação 0/0 com polinômios, a primeira coisa a testar é diferença de quadrados. Resolve mais casos que qualquer outra técnica, e leva menos tempo.',

      drills: {
        basico: [
          { id: 'al.prod.dif#b1', type: 'input', prompt: 'Expanda (x + 7)(x − 7). Escreva na forma x^2 - c.',
            answer: 'x^2-49', accept: ['x²-49', 'x^2 - 49', 'x^2−49'],
            hints: ['Soma vezes diferença dos mesmos termos.', 'Quadrado do primeiro menos quadrado do segundo.', '7² = 49.'],
            solution: ['Padrão (a+b)(a−b) = a² − b²', 'a = x, b = 7', 'x² − 49'],
            traps: { 'x^2+49': 'O padrão devolve MENOS o quadrado do segundo.',
                     'x^2-14x-49': 'Aqui não existe termo do meio: ele se cancela.' } },
          { id: 'al.prod.dif#b2', type: 'input', prompt: 'Fatore x² − 64. Escreva na forma (x+a)(x-a) usando só o número a.',
            answer: '8',
            hints: ['64 é o quadrado de quem?', '8² = 64.', 'Logo x² − 64 = (x+8)(x−8).'],
            solution: ['x² − 64 é diferença de quadrados', '64 = 8²', 'x² − 64 = (x + 8)(x − 8)'],
            traps: { '64': 'Você respondeu o número, não a raiz dele.' } },
          { id: 'al.prod.dif#b3', type: 'choice', prompt: 'Qual dessas expressões NÃO fatora nos reais?',
            choices: ['x² − 1', '4x² − 9', 'x² + 25', 'x² − 2'], answer: 2,
            hints: ['O padrão exige uma subtração entre os quadrados.', 'x² + 25 é uma soma.', 'Soma de quadrados é irredutível em ℝ.'],
            solution: ['x² − 1 = (x+1)(x−1)', '4x² − 9 = (2x+3)(2x−3)', 'x² − 2 = (x+√2)(x−√2)',
                       'x² + 25 é soma de quadrados: não fatora nos reais'] }
        ],
        intermediario: [
          { id: 'al.prod.dif#i1', type: 'input', prompt: 'Fatore 25x² − 16. Escreva na forma (ax+b)(ax-b), respondendo a e b separados por vírgula.',
            answer: '5,4',
            hints: ['25x² é o quadrado de quem?', '25x² = (5x)² e 16 = 4².', 'Logo (5x + 4)(5x − 4).'],
            solution: ['25x² = (5x)²', '16 = 4²', '25x² − 16 = (5x + 4)(5x − 4)'],
            traps: { '25,16': 'Você respondeu os números originais em vez das raízes deles.' } },
          { id: 'al.prod.dif#i2', type: 'input', prompt: 'Simplifique (x² − 16)/(x + 4), para x ≠ −4. Escreva a expressão resultante.',
            answer: 'x-4', accept: ['x−4', 'x - 4'],
            hints: ['Fatore o numerador.', 'x² − 16 = (x+4)(x−4).', 'Cancele o fator comum com o denominador.'],
            solution: ['x² − 16 = (x + 4)(x − 4)', '(x+4)(x−4)/(x+4)', 'Cancela o (x+4): sobra x − 4'],
            traps: { 'x+4': 'Você cancelou o fator errado.', 'x-16': 'Não dá para cancelar termo dentro de soma: só fator inteiro.' } },
          { id: 'al.prod.dif#i3', type: 'input', prompt: 'Calcule 51 × 49 usando produto notável. Responda o número.',
            answer: '2499',
            hints: ['Escreva como (50 + 1)(50 − 1).', 'Isso é 50² − 1².', '2500 − 1.'],
            solution: ['51 × 49 = (50+1)(50−1)', '= 50² − 1²', '= 2500 − 1 = 2499'],
            traps: { '2500': 'Faltou subtrair 1² no fim.' } }
        ],
        avancado: [
          { id: 'al.prod.dif#a1', type: 'input', prompt: 'Calcule o limite de (x² − 25)/(x − 5) quando x tende a 5.', answer: '10',
            hints: ['Substituir direto dá 0/0.', 'Fatore: x² − 25 = (x+5)(x−5).', 'Cancele e substitua x = 5 no que sobrou.'],
            solution: ['Substituição direta dá 0/0 — indeterminado',
                       'x² − 25 = (x + 5)(x − 5)',
                       'Cancele (x − 5), válido para x ≠ 5', 'Sobra x + 5', 'Substituindo: 5 + 5 = 10'],
            traps: { '0': 'Você parou na indeterminação. 0/0 não é zero: é sinal de que falta fatorar.',
                     '5': 'Você substituiu antes de cancelar corretamente.' } },
          { id: 'al.prod.dif#a2', type: 'input', prompt: 'Fatore completamente x⁴ − 16. Quantos fatores reais aparecem na fatoração completa?',
            answer: '3',
            hints: ['x⁴ − 16 é diferença de quadrados: (x²)² − 4².', 'Isso dá (x² + 4)(x² − 4).',
                    'O segundo fator ainda fatora; o primeiro é soma de quadrados e não fatora em ℝ.'],
            solution: ['x⁴ − 16 = (x² + 4)(x² − 4)', 'x² − 4 = (x + 2)(x − 2)',
                       'x² + 4 é soma de quadrados: irredutível em ℝ',
                       'Fatoração completa: (x² + 4)(x + 2)(x − 2) — três fatores'],
            traps: { '4': 'Você fatorou x² + 4, que não fatora nos reais.',
                     '2': 'Você parou no primeiro passo, sem fatorar x² − 4.' } }
        ],
        desafio: [
          { id: 'al.prod.dif#d1', type: 'input', prompt: 'Racionalize o denominador de 1/(√5 − 2) e responda a expressão resultante (use raiz5 para √5).',
            answer: 'raiz5+2', accept: ['√5+2', 'raiz5 + 2', 'sqrt5+2', '√5 + 2'],
            hints: ['Multiplique numerador e denominador pelo conjugado √5 + 2.',
                    'O denominador vira (√5)² − 2² = 5 − 4.', 'Isso dá 1, então o denominador desaparece.'],
            solution: ['Multiplique em cima e embaixo por (√5 + 2)',
                       'Denominador: (√5 − 2)(√5 + 2) = 5 − 4 = 1',
                       'Numerador: 1·(√5 + 2) = √5 + 2', 'Resultado: √5 + 2'],
            traps: { 'raiz5-2': 'Você multiplicou pelo mesmo termo, não pelo conjugado — a raiz continuaria lá.' } }
        ]
      },

      review: [
        '(a + b)(a − b) = a² − b². O termo do meio se cancela.',
        'Lido ao contrário, fatora qualquer diferença de quadrados.',
        'Soma de quadrados não fatora nos reais.',
        'É a técnica que mais resolve limite 0/0 e racionalização por conjugado.'
      ]
    },
    /* ═══════════════════════════════════════════════════════════════
       Fator comum em evidência
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'al.fat.comum',

      whatIs: `<p>Fatorar por fator comum é a distributiva ao contrário: em vez de abrir <span class="math">a(b + c)</span> em <span class="math">ab + ac</span>, você reconhece <span class="math">ab + ac</span> e escreve <span class="math">a(b + c)</span>.</p>
        <p>O fator que sai é o maior pedaço que aparece em <em>todos</em> os termos: o MDC dos coeficientes e a menor potência de cada letra presente em todos.</p>`,

      whyExists: `<p>Soma não simplifica; produto simplifica. Enquanto uma expressão for soma, você não pode cancelar nada dentro de uma fração. Transformá-la em produto é o que libera o cancelamento.</p>
        <p>É também o primeiro passo de qualquer fatoração: antes de tentar trinômio, diferença de quadrados ou agrupamento, tire o fator comum. Isso encolhe os números e muitas vezes revela o padrão escondido.</p>`,

      simple: 'Procure o que se repete em todos os termos e coloque para fora do parêntese. Depois confira aplicando a distributiva de volta.',

      academic: `<p>Dada a soma <span class="math">Σ aᵢ</span>, fatorar por fator comum é escrever <span class="math">d · Σ (aᵢ/d)</span>, onde <span class="math">d</span> é um divisor comum a todos os termos. A fatoração é dita <em>completa por fator comum</em> quando <span class="math">d</span> é o máximo divisor comum, isto é, quando os termos restantes não têm mais divisor comum não trivial.</p>
        <p>Para a parte literal, o fator comum leva cada variável elevada ao <em>menor</em> expoente com que ela aparece em todos os termos.</p>`,

      examples: [
        { level: 'basico', prompt: 'Fatore 6x + 9',
          steps: ['MDC(6, 9) = 3', 'Coloque 3 em evidência: 3(2x + 3)',
                  'Confira: 3·2x = 6x e 3·3 = 9 ✓'],
          answer: '3(2x + 3)' },
        { level: 'intermediario', prompt: 'Fatore 12x³ − 8x²',
          steps: ['MDC(12, 8) = 4', 'Menor potência de x presente nos dois: x²',
                  'Fator comum: 4x²', '12x³ ÷ 4x² = 3x e 8x² ÷ 4x² = 2'],
          answer: '4x²(3x − 2)' },
        { level: 'avancado', prompt: 'Fatore 2x(x − 5) + 7(x − 5)',
          steps: ['O fator comum aqui não é um número: é o parêntese (x − 5)',
                  'Coloque (x − 5) em evidência'],
          answer: '(x − 5)(2x + 7)' }
      ],

      application: { area: 'Cálculo',
        text: 'Ao derivar por regra do produto ou da cadeia, o resultado quase sempre sai como soma com um fator repetido. Fatorar esse fator é o que permite achar os pontos críticos: resolver f′(x) = 0 exige produto igualado a zero, nunca soma.' },

      formulas: [
        { f: 'ab + ac = a(b + c)', note: 'A distributiva lida da direita para a esquerda.' },
        { f: 'Fator numérico: MDC dos coeficientes', note: 'Para a fatoração ficar completa.' },
        { f: 'Fator literal: menor expoente presente em todos', note: 'x³ e x² têm em comum x², não x³.' },
        { f: 'O fator comum pode ser uma expressão inteira', note: 'Como (x − 5) em 2x(x−5) + 7(x−5).' }
      ],

      mistakes: [
        { erro: 'Em 5x + 5, escrever 5(x)',
          porque: 'Esquecer que o segundo termo deixa 1, não zero, ao sair o fator.',
          certo: '5x + 5 = 5(x + 1). Conferindo: 5·1 = 5 ✓' },
        { erro: 'Em 12x³ − 8x², colocar x³ em evidência',
          porque: 'Pegar a maior potência em vez da menor.',
          certo: 'O fator comum leva a menor potência: x². O outro termo não tem x³.' },
        { erro: 'Cancelar termo dentro de soma: (3x + 6)/3 = x + 6',
          porque: 'Cancelar o 3 só no primeiro termo.',
          certo: 'Fatore antes: 3(x + 2)/3 = x + 2.' }
      ],

      tip: 'Depois de fatorar, sempre reabra pela distributiva mentalmente. Se não voltar exatamente à expressão original, algum termo perdeu ou ganhou fator no caminho.',

      drills: {
        basico: [
          { id: 'al.fat.com#b1', type: 'input', prompt: 'Fatore 8x + 12. Escreva na forma a(bx + c).',
            answer: '4(2x+3)', accept: ['4(2x + 3)'],
            hints: ['Qual é o maior número que divide 8 e 12?', 'MDC(8,12) = 4.', '8 ÷ 4 = 2 e 12 ÷ 4 = 3.'],
            solution: ['MDC(8, 12) = 4', '8x ÷ 4 = 2x', '12 ÷ 4 = 3', 'Resultado: 4(2x + 3)'],
            traps: { '2(4x+6)': 'Está correto em valor, mas incompleto: 4x e 6 ainda têm fator comum 2.' } },
          { id: 'al.fat.com#b2', type: 'input', prompt: 'Fatore 7x + 7. Escreva na forma a(x + c).',
            answer: '7(x+1)', accept: ['7(x + 1)'],
            hints: ['O fator comum é 7.', 'O primeiro termo deixa x.', 'E o segundo deixa 1, não zero.'],
            solution: ['Fator comum: 7', '7x ÷ 7 = x', '7 ÷ 7 = 1', 'Resultado: 7(x + 1)'],
            traps: { '7(x)': 'O segundo termo deixa 1 ao sair o 7, não desaparece.' } },
          { id: 'al.fat.com#b3', type: 'input', prompt: 'Fatore x² + 5x. Escreva na forma x(x + c).',
            answer: 'x(x+5)', accept: ['x(x + 5)'],
            hints: ['O que aparece nos dois termos?', 'Os dois têm x.', 'x² ÷ x = x e 5x ÷ x = 5.'],
            solution: ['Fator comum: x', 'x² ÷ x = x', '5x ÷ x = 5', 'Resultado: x(x + 5)'] }
        ],
        intermediario: [
          { id: 'al.fat.com#i1', type: 'input', prompt: 'Fatore 15x⁴ − 10x². Escreva na forma ax^n(bx^m - c).',
            answer: '5x^2(3x^2-2)', accept: ['5x²(3x²-2)', '5x^2(3x^2 - 2)'],
            hints: ['MDC(15,10) = 5.', 'A menor potência de x presente nos dois é x².',
                    '15x⁴ ÷ 5x² = 3x² e 10x² ÷ 5x² = 2.'],
            solution: ['MDC(15,10) = 5', 'Menor potência comum: x²', 'Fator: 5x²',
                       '15x⁴ ÷ 5x² = 3x²', '10x² ÷ 5x² = 2', 'Resultado: 5x²(3x² − 2)'],
            traps: { '5x^4(3-2x^2)': 'Você usou a maior potência. O fator comum leva a menor.' } },
          { id: 'al.fat.com#i2', type: 'input', prompt: 'Fatore 3a(x + 2) − 5(x + 2). Escreva na forma (x+2)(...).',
            answer: '(x+2)(3a-5)', accept: ['(x+2)(3a - 5)', '(x + 2)(3a − 5)'],
            hints: ['O que se repete nos dois termos?', 'O parêntese (x + 2) aparece nos dois.',
                    'Coloque-o em evidência e veja o que sobra.'],
            solution: ['Fator comum: (x + 2)', 'Primeiro termo deixa 3a', 'Segundo deixa −5',
                       'Resultado: (x + 2)(3a − 5)'] }
        ],
        avancado: [
          { id: 'al.fat.com#a1', type: 'input', prompt: 'Simplifique (6x² + 9x)/(3x), para x ≠ 0. Escreva a expressão resultante.',
            answer: '2x+3', accept: ['2x + 3'],
            hints: ['Fatore o numerador antes de cancelar.', '6x² + 9x = 3x(2x + 3).',
                    'Agora o 3x cancela com o denominador.'],
            solution: ['6x² + 9x = 3x(2x + 3)', '3x(2x+3)/(3x)', 'Cancela 3x: sobra 2x + 3'],
            traps: { '2x+9x': 'Você cancelou só no primeiro termo. Só dá para cancelar fator do produto inteiro.',
                     '6x+9': 'Você cancelou apenas o x, esquecendo o 3.' } },
          { id: 'al.fat.com#a2', type: 'input', prompt: 'Resolva 2x² − 8x = 0 fatorando. Responda as duas raízes separadas por vírgula, da menor para a maior.',
            answer: '0,4', accept: ['0, 4'],
            hints: ['Não use Bhaskara: fatore o fator comum.', '2x(x − 4) = 0.',
                    'Produto igual a zero: algum fator tem de ser zero.'],
            solution: ['2x² − 8x = 2x(x − 4)', '2x(x − 4) = 0',
                       'Ou 2x = 0 → x = 0', 'Ou x − 4 = 0 → x = 4'],
            traps: { '4': 'Faltou a raiz x = 0, que vem do fator 2x.',
                     '2,4': 'O fator 2x zera em x = 0, não em x = 2.' } }
        ],
        desafio: [
          { id: 'al.fat.com#d1', type: 'input', prompt: 'Fatore completamente 4x³ − 36x. Quantos fatores aparecem, contando o número que sai em evidência?',
            answer: '3',
            hints: ['Comece pelo fator comum: 4x.', 'Sobra 4x(x² − 9).', 'x² − 9 ainda fatora como diferença de quadrados.'],
            solution: ['Fator comum: 4x → 4x(x² − 9)',
                       'x² − 9 = (x + 3)(x − 3)',
                       'Fatoração completa: 4x(x + 3)(x − 3)',
                       'São três fatores: 4x, (x+3) e (x−3)'],
            traps: { '2': 'Você parou em 4x(x² − 9), sem fatorar a diferença de quadrados.' } }
        ]
      },

      review: [
        'Fatorar por fator comum é aplicar a distributiva de trás para frente.',
        'O fator numérico é o MDC; o literal leva a menor potência presente em todos os termos.',
        'Um termo que "some" ao sair o fator na verdade deixa 1.',
        'Fatore sempre antes de tentar cancelar dentro de uma fração.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Equação do segundo grau
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'al.eq.segundo',

      whatIs: `<p>Uma equação do segundo grau tem a forma <span class="math">ax² + bx + c = 0</span> com <span class="math">a ≠ 0</span>. Diferente da equação do primeiro grau, ela pode ter duas soluções, uma ou nenhuma nos reais.</p>
        <p>Quem decide isso é o <strong>discriminante</strong> <span class="math">Δ = b² − 4ac</span>, e a fórmula resolutiva é <span class="math">x = (−b ± √Δ)/(2a)</span>.</p>`,

      whyExists: `<p>Qualquer situação em que uma grandeza depende do quadrado de outra cai aqui: área em função do lado, altura de um projétil em função do tempo, custo com termo quadrático.</p>
        <p>E em Cálculo ela reaparece o tempo todo: as raízes de <span class="math">f′(x) = 0</span> quando <span class="math">f</span> é cúbica, os pontos onde uma parábola cruza o eixo, a fatoração do denominador em frações parciais.</p>`,

      simple: 'Identifique a, b e c. Calcule Δ = b² − 4ac. Se Δ for negativo, não há raiz real. Se não, aplique x = (−b ± √Δ)/(2a) e você tem as duas.',

      academic: `<p>A fórmula resolutiva sai de completar quadrado. Partindo de <span class="math">ax² + bx + c = 0</span>, divide-se por <span class="math">a</span>, completa-se o quadrado em <span class="math">x + b/(2a)</span> e isola-se, chegando a <span class="math">x = (−b ± √(b² − 4ac))/(2a)</span>.</p>
        <p>As relações de Girard seguem da forma fatorada <span class="math">a(x − x₁)(x − x₂)</span>: <span class="math">x₁ + x₂ = −b/a</span> e <span class="math">x₁·x₂ = c/a</span>. Elas permitem achar raízes por inspeção quando os números são simples.</p>`,

      examples: [
        { level: 'basico', prompt: 'Resolva x² − 5x + 6 = 0',
          steps: ['a = 1, b = −5, c = 6', 'Δ = (−5)² − 4(1)(6) = 25 − 24 = 1',
                  'x = (5 ± 1)/2', 'x₁ = 3 e x₂ = 2'],
          answer: 'x = 2 ou x = 3' },
        { level: 'intermediario', prompt: 'Resolva 2x² + 3x − 2 = 0',
          steps: ['a = 2, b = 3, c = −2', 'Δ = 9 − 4(2)(−2) = 9 + 16 = 25',
                  'x = (−3 ± 5)/4', 'x₁ = 2/4 = 0,5 e x₂ = −8/4 = −2'],
          answer: 'x = 0,5 ou x = −2' },
        { level: 'avancado', prompt: 'Para que valores de k a equação x² + kx + 9 = 0 tem raiz dupla?',
          steps: ['Raiz dupla significa Δ = 0', 'Δ = k² − 4(1)(9) = k² − 36',
                  'k² − 36 = 0 → k² = 36', 'k = 6 ou k = −6'],
          answer: 'k = 6 ou k = −6' }
      ],

      application: { area: 'Física',
        text: 'A altura de um projétil é h(t) = h₀ + v₀t − 4,9t². Perguntar quando ele toca o chão é resolver h(t) = 0 — uma equação do segundo grau. O Δ negativo teria um significado físico claro: o objeto nunca chega àquela altura.' },

      formulas: [
        { f: 'Δ = b² − 4ac', note: 'O discriminante decide quantas raízes reais existem.' },
        { f: 'x = (−b ± √Δ)/(2a)', note: 'A fórmula resolutiva. Note que o 2a divide TUDO, não só a raiz.' },
        { f: 'Δ > 0: duas raízes · Δ = 0: uma · Δ < 0: nenhuma real', note: 'A leitura direta do discriminante.' },
        { f: 'x₁ + x₂ = −b/a  e  x₁·x₂ = c/a', note: 'Soma e produto. Resolve de cabeça quando os números são simples.' }
      ],

      mistakes: [
        { erro: 'Calcular Δ como b² − 4ac esquecendo o sinal de c quando c é negativo',
          porque: 'Somar em vez de subtrair um negativo.',
          certo: 'Com c = −2 e a = 2: −4(2)(−2) = +16. O Δ aumenta.' },
        { erro: 'Dividir só a raiz por 2a: x = −b ± √Δ/(2a)',
          porque: 'Ler a fórmula sem perceber que a barra abrange todo o numerador.',
          certo: 'O 2a divide o numerador inteiro: (−b ± √Δ)/(2a).' },
        { erro: 'Usar a fórmula em 3x² − 12x = 0',
          porque: 'Aplicar Bhaskara por reflexo, mesmo quando não é necessário.',
          certo: 'Sem termo independente, fatore: 3x(x − 4) = 0 dá x = 0 ou x = 4 em um passo.' }
      ],

      tip: 'Antes da fórmula, tente soma e produto. Em x² − 5x + 6, procure dois números que somem 5 e multipliquem 6: são 2 e 3. Você acabou de resolver sem calcular Δ.',

      drills: {
        basico: [
          { id: 'al.eq.seg#b1', type: 'input', prompt: 'Na equação x² − 7x + 10 = 0, quanto vale Δ ?', answer: '9',
            hints: ['Identifique a = 1, b = −7, c = 10.', 'Δ = b² − 4ac.', '49 − 40.'],
            solution: ['a = 1, b = −7, c = 10', 'Δ = (−7)² − 4(1)(10)', 'Δ = 49 − 40 = 9'],
            traps: { '89': 'Você somou 4ac em vez de subtrair.', '-9': 'Sinal trocado: 49 é maior que 40.' } },
          { id: 'al.eq.seg#b2', type: 'input', prompt: 'Resolva x² − 5x + 6 = 0. Responda as duas raízes separadas por vírgula, da menor para a maior.',
            answer: '2,3', accept: ['2, 3'],
            hints: ['Procure dois números que somem 5 e multipliquem 6.', 'São 2 e 3.', 'Confira: 2+3=5 e 2·3=6.'],
            solution: ['Soma = 5 e produto = 6', 'Os números são 2 e 3', 'x² − 5x + 6 = (x−2)(x−3)', 'Raízes: 2 e 3'],
            traps: { '-2,-3': 'Sinal trocado: com b negativo e c positivo, as raízes são positivas.' } },
          { id: 'al.eq.seg#b3', type: 'choice', prompt: 'Se Δ < 0, o que se conclui?',
            choices: ['Duas raízes reais', 'Uma raiz real', 'Nenhuma raiz real', 'Infinitas raízes'], answer: 2,
            hints: ['Δ aparece dentro de uma raiz quadrada.', 'Raiz quadrada de negativo não existe nos reais.', 'Logo não há solução real.'],
            solution: ['A fórmula tem √Δ', 'Com Δ < 0, a raiz não existe em ℝ',
                       'Nenhuma raiz real — a parábola não cruza o eixo x'] }
        ],
        intermediario: [
          { id: 'al.eq.seg#i1', type: 'input', prompt: 'Resolva 2x² − 7x + 3 = 0. Responda as duas raízes separadas por vírgula, da menor para a maior (use 0.5 para meio).',
            answer: '0.5,3', accept: ['0,5,3', '0.5, 3', '1/2,3'],
            hints: ['a = 2, b = −7, c = 3.', 'Δ = 49 − 24 = 25, e √25 = 5.', 'x = (7 ± 5)/4.'],
            solution: ['Δ = (−7)² − 4(2)(3) = 49 − 24 = 25', 'x = (7 ± 5)/4',
                       'x₁ = 12/4 = 3', 'x₂ = 2/4 = 0,5'],
            traps: { '3,12': 'Você esqueceu de dividir por 2a = 4.' } },
          { id: 'al.eq.seg#i2', type: 'input', prompt: 'Resolva x² − 6x + 9 = 0. Responda o valor da raiz.',
            answer: '3',
            hints: ['Calcule Δ primeiro.', 'Δ = 36 − 36 = 0.', 'Com Δ = 0 há uma única raiz: x = −b/(2a).'],
            solution: ['Δ = 36 − 36 = 0', 'Raiz dupla: x = 6/2 = 3',
                       'Repare que x² − 6x + 9 = (x − 3)²'],
            traps: { '3,3': 'É uma raiz só, de multiplicidade dois.' } },
          { id: 'al.eq.seg#i3', type: 'input', prompt: 'Resolva 3x² − 12x = 0 sem usar a fórmula. Responda as duas raízes separadas por vírgula, da menor para a maior.',
            answer: '0,4', accept: ['0, 4'],
            hints: ['Não tem termo independente: fatore.', '3x(x − 4) = 0.', 'Produto zero: um dos fatores zera.'],
            solution: ['3x² − 12x = 3x(x − 4)', '3x = 0 → x = 0', 'x − 4 = 0 → x = 4'],
            traps: { '4': 'Faltou a raiz x = 0.' } }
        ],
        avancado: [
          { id: 'al.eq.seg#a1', type: 'input', prompt: 'Para que valor de k a equação x² + 6x + k = 0 tem raiz dupla?', answer: '9',
            hints: ['Raiz dupla significa Δ = 0.', 'Δ = 36 − 4k.', 'Resolva 36 − 4k = 0.'],
            solution: ['Δ = 6² − 4(1)(k) = 36 − 4k', 'Raiz dupla → Δ = 0', '36 − 4k = 0', 'k = 9'],
            traps: { '6': 'Você respondeu o coeficiente b.', '-9': 'Sinal trocado ao isolar k.' } },
          { id: 'al.eq.seg#a2', type: 'input', prompt: 'Se as raízes de x² + bx + 12 = 0 são 3 e 4, quanto vale b ?', answer: '-7',
            hints: ['Use soma e produto.', 'A soma das raízes é −b/a = −b.', '3 + 4 = 7, então −b = 7.'],
            solution: ['Produto: 3·4 = 12 ✓ (confere com c/a)', 'Soma: 3 + 4 = 7',
                       'Soma = −b/a = −b, então −b = 7', 'b = −7'],
            traps: { '7': 'A soma vale −b/a, então b é o oposto da soma.' } }
        ],
        desafio: [
          { id: 'al.eq.seg#d1', type: 'input', prompt: 'Um retângulo tem perímetro 26 e área 40. Qual é o maior dos lados?',
            answer: '8',
            hints: ['Se os lados são x e y: 2(x+y) = 26 e xy = 40.', 'Então x + y = 13 e xy = 40.',
                    'Procure dois números com soma 13 e produto 40 — ou monte x² − 13x + 40 = 0.'],
            solution: ['Perímetro: x + y = 13', 'Área: xy = 40',
                       'Os lados são raízes de t² − 13t + 40 = 0',
                       'Δ = 169 − 160 = 9, √9 = 3', 't = (13 ± 3)/2 → 8 e 5',
                       'O maior lado é 8'],
            traps: { '5': 'Esse é o menor lado.', '13': 'Isso é a soma dos dois lados, não um lado.' } }
        ]
      },

      review: [
        'Δ = b² − 4ac decide quantas raízes reais existem: duas, uma ou nenhuma.',
        'Na fórmula, o 2a divide o numerador inteiro, não apenas a raiz.',
        'Sem termo independente, fatore em vez de usar a fórmula.',
        'Soma = −b/a e produto = c/a resolvem de cabeça quando os números são simples.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Completar quadrado
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'al.fat.completar',

      whatIs: `<p>Completar quadrado é reescrever <span class="math">ax² + bx + c</span> na forma <span class="math">a(x − h)² + k</span>, forçando o aparecimento de um trinômio quadrado perfeito.</p>
        <p>A técnica: pegue metade do coeficiente de <span class="math">x</span>, eleve ao quadrado, e some e subtraia esse valor — somar e subtrair a mesma coisa não altera a expressão.</p>`,

      whyExists: `<p>A forma <span class="math">a(x − h)² + k</span> entrega o vértice de graça: ele está em <span class="math">(h, k)</span>. Sem ela, achar máximo ou mínimo exige fórmula decorada.</p>
        <p>E ela é a chave em três outros lugares: a dedução da fórmula de Bhaskara, a conversão da equação geral da circunferência para a reduzida, e a preparação de integrais com <span class="math">√(x² + bx + c)</span> para substituição trigonométrica.</p>`,

      simple: 'Metade do número que acompanha o x, elevado ao quadrado. Some e subtraia isso. O que sobra vira um quadrado perfeito mais uma constante.',

      academic: `<p>Para <span class="math">x² + bx</span>, o termo que completa é <span class="math">(b/2)²</span>, pois <span class="math">x² + bx + (b/2)² = (x + b/2)²</span>. Compensa-se subtraindo o mesmo valor para preservar a igualdade.</p>
        <p>Com <span class="math">a ≠ 1</span>, fatora-se <span class="math">a</span> dos dois primeiros termos antes: <span class="math">a(x² + (b/a)x) + c</span>. O vértice resulta em <span class="math">h = −b/(2a)</span> e <span class="math">k = c − b²/(4a)</span>, que é exatamente <span class="math">−Δ/(4a)</span>.</p>`,

      examples: [
        { level: 'basico', prompt: 'Complete o quadrado em x² + 6x',
          steps: ['Metade de 6 é 3', '3² = 9', 'x² + 6x + 9 − 9 = (x + 3)² − 9'],
          answer: '(x + 3)² − 9' },
        { level: 'intermediario', prompt: 'Escreva x² − 8x + 21 na forma (x − h)² + k',
          steps: ['Metade de −8 é −4', '(−4)² = 16',
                  'x² − 8x + 16 − 16 + 21', '(x − 4)² + 5'],
          answer: '(x − 4)² + 5' },
        { level: 'avancado', prompt: 'Escreva 2x² + 12x + 7 na forma a(x − h)² + k',
          steps: ['Fatore o 2 dos dois primeiros: 2(x² + 6x) + 7',
                  'Dentro: metade de 6 é 3, e 3² = 9',
                  '2(x² + 6x + 9 − 9) + 7 = 2(x + 3)² − 18 + 7'],
          answer: '2(x + 3)² − 11' }
      ],

      application: { area: 'Otimização',
        text: 'Escrever a função lucro como −a(x − h)² + k mostra imediatamente que o lucro máximo é k, atingido em x = h. É o mesmo resultado que a derivada dá, obtido sem Cálculo — e serve de conferência quando você já tem a derivada.' },

      formulas: [
        { f: 'x² + bx + (b/2)² = (x + b/2)²', note: 'O termo que completa é o quadrado da metade de b.' },
        { f: 'x² + bx + c = (x + b/2)² + c − (b/2)²', note: 'Some e subtraia o mesmo valor.' },
        { f: 'a(x − h)² + k tem vértice em (h, k)', note: 'A razão de existir da forma canônica.' },
        { f: 'h = −b/(2a)  e  k = −Δ/(4a)', note: 'As coordenadas do vértice, que saem da forma canônica.' }
      ],

      mistakes: [
        { erro: 'Somar (b/2)² sem subtrair',
          porque: 'Tratar a expressão como equação, onde daria para somar dos dois lados.',
          certo: 'Numa expressão não há "outro lado": some e subtraia o mesmo valor.' },
        { erro: 'Com a ≠ 1, esquecer que o valor subtraído também é multiplicado por a',
          porque: 'Tirar o número de dentro do parêntese sem aplicar o fator.',
          certo: 'Em 2(x² + 6x + 9 − 9), o −9 sai como −18.' },
        { erro: 'Escrever (x + 3)² − 9 como (x + 3)² + 9 ao converter',
          porque: 'Perder o sinal ao mover o termo de compensação.',
          certo: 'Confira expandindo: (x+3)² − 9 = x² + 6x + 9 − 9 = x² + 6x ✓' }
      ],

      tip: 'Depois de completar, expanda de volta mentalmente. Se não voltar à expressão original, o erro está quase sempre no sinal ou no fator que ficou fora do parêntese.',

      drills: {
        basico: [
          { id: 'al.fat.cq#b1', type: 'input', prompt: 'Que valor completa o quadrado em x² + 10x + ___ ?', answer: '25',
            hints: ['Pegue a metade do coeficiente de x.', 'Metade de 10 é 5.', 'Eleve ao quadrado.'],
            solution: ['Coeficiente de x: 10', 'Metade: 5', '5² = 25', 'x² + 10x + 25 = (x + 5)²'],
            traps: { '5': 'Esse é o valor da metade, mas falta elevar ao quadrado.',
                     '100': 'Você elevou o 10 ao quadrado sem dividir por 2 antes.' } },
          { id: 'al.fat.cq#b2', type: 'input', prompt: 'Escreva x² + 4x na forma (x + h)² + k. Responda h e k separados por vírgula.',
            answer: '2,-4', accept: ['2, -4', '2,−4'],
            hints: ['Metade de 4 é 2, e 2² = 4.', 'x² + 4x + 4 − 4.', 'Isso é (x + 2)² − 4.'],
            solution: ['Metade de 4 é 2', 'Some e subtraia 2² = 4', 'x² + 4x + 4 − 4 = (x + 2)² − 4', 'h = 2, k = −4'],
            traps: { '2,4': 'O termo de compensação entra subtraindo.' } },
          { id: 'al.fat.cq#b3', type: 'input', prompt: 'Que valor completa o quadrado em x² − 6x + ___ ?', answer: '9',
            hints: ['Metade de −6 é −3.', '(−3)² = 9.', 'Quadrado é sempre positivo.'],
            solution: ['Metade de −6 é −3', '(−3)² = 9', 'x² − 6x + 9 = (x − 3)²'],
            traps: { '-9': 'Quadrado de número negativo é positivo.' } }
        ],
        intermediario: [
          { id: 'al.fat.cq#i1', type: 'input', prompt: 'Escreva x² − 10x + 30 na forma (x − h)² + k. Responda h e k separados por vírgula.',
            answer: '5,5', accept: ['5, 5'],
            hints: ['Metade de −10 é −5, e (−5)² = 25.', 'x² − 10x + 25 − 25 + 30.', '(x − 5)² + 5.'],
            solution: ['Metade de −10: −5', '(−5)² = 25', 'x² − 10x + 25 − 25 + 30', '(x − 5)² + 5', 'h = 5, k = 5'],
            traps: { '5,30': 'Você esqueceu de descontar os 25 usados para completar.' } },
          { id: 'al.fat.cq#i2', type: 'input', prompt: 'A parábola y = x² − 8x + 20 tem vértice em qual ponto? Responda x e y separados por vírgula.',
            answer: '4,4', accept: ['4, 4'],
            hints: ['Complete o quadrado: metade de −8 é −4, e 16 completa.', 'y = (x − 4)² − 16 + 20 = (x − 4)² + 4.',
                    'Na forma a(x−h)² + k, o vértice é (h, k).'],
            solution: ['x² − 8x + 16 − 16 + 20', 'y = (x − 4)² + 4', 'Vértice: (4, 4)'],
            traps: { '-4,4': 'Na forma (x − h)², o h é 4, não −4.' } }
        ],
        avancado: [
          { id: 'al.fat.cq#a1', type: 'input', prompt: 'Escreva 3x² + 12x + 5 na forma a(x + h)² + k. Responda a, h e k separados por vírgula.',
            answer: '3,2,-7', accept: ['3, 2, -7', '3,2,−7'],
            hints: ['Fatore o 3 dos dois primeiros termos: 3(x² + 4x) + 5.',
                    'Dentro: metade de 4 é 2, e 2² = 4.',
                    '3(x² + 4x + 4 − 4) + 5 = 3(x+2)² − 12 + 5.'],
            solution: ['3(x² + 4x) + 5', 'Completa dentro com 4: 3(x² + 4x + 4 − 4) + 5',
                       '3(x + 2)² − 3·4 + 5', '3(x + 2)² − 12 + 5 = 3(x + 2)² − 7',
                       'a = 3, h = 2, k = −7'],
            traps: { '3,2,1': 'Você não multiplicou o −4 pelo fator 3 ao tirá-lo do parêntese.' } },
          { id: 'al.fat.cq#a2', type: 'input', prompt: 'Qual é o valor mínimo de f(x) = x² − 6x + 11 ?', answer: '2',
            hints: ['Complete o quadrado.', 'f(x) = (x − 3)² + 2.', 'O quadrado nunca é negativo, então o menor valor é quando ele vale zero.'],
            solution: ['x² − 6x + 9 − 9 + 11', 'f(x) = (x − 3)² + 2',
                       '(x − 3)² ≥ 0 sempre, com mínimo 0 em x = 3',
                       'Valor mínimo: 2'],
            traps: { '3': 'Esse é o x onde o mínimo ocorre, não o valor mínimo.',
                     '11': 'Esse é f(0), não o mínimo.' } }
        ],
        desafio: [
          { id: 'al.fat.cq#d1', type: 'input', prompt: 'A equação x² + y² − 6x + 4y − 12 = 0 é uma circunferência. Qual é o raio?',
            answer: '5',
            hints: ['Complete o quadrado separadamente em x e em y.',
                    'x² − 6x vira (x−3)² − 9; y² + 4y vira (y+2)² − 4.',
                    '(x−3)² + (y+2)² − 9 − 4 − 12 = 0.'],
            solution: ['x² − 6x = (x − 3)² − 9', 'y² + 4y = (y + 2)² − 4',
                       '(x−3)² + (y+2)² − 9 − 4 − 12 = 0',
                       '(x−3)² + (y+2)² = 25', 'Raio = √25 = 5'],
            traps: { '25': 'Isso é r², não o raio.', '12': 'Esse é o termo independente da forma geral.' } }
        ]
      },

      review: [
        'O termo que completa é o quadrado da metade do coeficiente de x.',
        'Some e subtraia o mesmo valor: a expressão não pode mudar de valor.',
        'Com a ≠ 1, fatore o a antes e lembre que a compensação também é multiplicada por ele.',
        'A forma a(x − h)² + k entrega o vértice direto em (h, k).'
      ]
    }
  ]);
})(window.CZ);
