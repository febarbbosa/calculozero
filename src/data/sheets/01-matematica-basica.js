/* ==========================================================================
   data/sheets/01-matematica-basica.js — fichas da Matemática Básica.

   Formato em core/sheets.js. Os exercícios moram dentro da própria ficha e
   são publicados no banco geral pelo registro — escrever um tópico novo
   não deve exigir abrir um segundo arquivo.

   Regra de conteúdo: todo item de `mistakes` tem que ser um erro que
   alguém comete de verdade, e todo `traps` tem que corresponder ao que a
   pessoa efetivamente digitaria ao cometê-lo.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([

    /* ═══════════════════════════════════════════════════════════════
       Ordem das operações
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'mb.op.ordem',

      whatIs: `<p>A ordem das operações é a fila oficial que decide o que se resolve primeiro numa expressão com mais de um sinal.</p>
        <p>A fila é: <strong>parênteses</strong> → <strong>potências e raízes</strong> → <strong>multiplicação e divisão</strong> → <strong>soma e subtração</strong>. Dentro de cada degrau, resolve-se da esquerda para a direita.</p>`,

      whyExists: `<p>Sem uma convenção, <span class="math">2 + 3 × 4</span> teria duas respostas defensáveis: 14 e 20. Uma expressão com duas leituras não serve para nada — nem para uma prova, nem para um contrato, nem para um programa de computador.</p>
        <p>A regra não é arbitrária: multiplicação é soma repetida, então ela já é um "bloco" fechado antes da soma solta entrar na conta.</p>`,

      simple: 'Nem toda conta se resolve da esquerda para a direita. Parênteses primeiro, depois potência, depois vezes e dividir, e só no fim mais e menos.',

      academic: `<p>As operações são hierarquizadas pela ordem de composição: a potenciação é multiplicação iterada, a multiplicação é adição iterada. A convenção de precedência preserva essa hierarquia, fazendo com que a operação de nível superior forme um termo único antes de participar da operação de nível inferior.</p>
        <p>Os parênteses são o mecanismo de sobreposição explícita: eles forçam uma subexpressão a ser avaliada como unidade, independentemente da precedência natural. Multiplicação e divisão têm a mesma precedência e são <em>associativas à esquerda</em>, e o mesmo vale para adição e subtração.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule 2 + 3 × 4',
          steps: ['Procure multiplicação ou divisão: existe 3 × 4', 'Resolva: 3 × 4 = 12', 'Agora a soma: 2 + 12'],
          answer: '14' },
        { level: 'intermediario', prompt: 'Calcule 20 − 3 × 2² + 6 ÷ 3',
          steps: ['Potência primeiro: 2² = 4', 'A expressão vira 20 − 3 × 4 + 6 ÷ 3',
                  'Multiplicação e divisão, da esquerda para a direita: 3 × 4 = 12 e 6 ÷ 3 = 2',
                  'Sobra 20 − 12 + 2', 'Soma e subtração da esquerda para a direita: 8 + 2'],
          answer: '10' },
        { level: 'avancado', prompt: 'Calcule 5 − [2 + (8 − 3 × 2)] ÷ 2',
          steps: ['Parêntese mais interno: 3 × 2 = 6, então 8 − 6 = 2',
                  'Colchete: 2 + 2 = 4', 'A expressão vira 5 − 4 ÷ 2',
                  'Divisão antes da subtração: 4 ÷ 2 = 2', 'Por fim: 5 − 2'],
          answer: '3' }
      ],

      application: { area: 'Programação',
        text: 'Toda linguagem de programação implementa uma tabela de precedência de operadores. Em Python, <code>2 + 3 * 4</code> devolve 14 pelo mesmo motivo que na aula de matemática. Quando o programador não tem certeza, ele põe parênteses — e essa é exatamente a recomendação em prova.' },

      formulas: [
        { f: 'P → E → MD → AS', note: 'Parênteses, Expoentes, Multiplicação/Divisão, Adição/Subtração.' },
        { f: 'a − b + c = (a − b) + c', note: 'Soma e subtração empatam: vale a ordem de escrita, da esquerda para a direita.' },
        { f: 'a ÷ b × c = (a ÷ b) × c', note: 'Divisão e multiplicação também empatam. Não multiplique primeiro por hábito.' }
      ],

      mistakes: [
        { erro: 'Resolver 2 + 3 × 4 como 5 × 4 = 20',
          porque: 'Leitura da esquerda para a direita, ignorando a precedência.',
          certo: 'A multiplicação forma um bloco antes: 2 + 12 = 14.' },
        { erro: 'Em 8 ÷ 4 × 2, fazer 4 × 2 primeiro e obter 1',
          porque: 'Supor que multiplicação vem antes de divisão.',
          certo: 'Elas empatam. Da esquerda para a direita: 8 ÷ 4 = 2, depois 2 × 2 = 4.' },
        { erro: 'Em −3², responder 9',
          porque: 'Achar que o sinal faz parte da base.',
          certo: 'A potência age só no 3: −3² = −(3²) = −9. Com parênteses seria (−3)² = 9.' }
      ],

      tip: 'Antes de calcular, circule com o lápis as multiplicações e divisões. O que sobrar entre elas é soma e subtração, e aí a conta não tem como sair de ordem.',

      drills: {
        basico: [
          { id: 'mb.op.ordem#b1', type: 'input', prompt: 'Quanto é 6 + 2 × 5 ?', answer: '16',
            hints: ['Existe multiplicação na linha?', 'Resolva 2 × 5 antes de somar.', '2 × 5 = 10. Agora some 6.'],
            solution: ['Multiplicação primeiro: 2 × 5 = 10', 'Soma: 6 + 10 = 16'],
            traps: { '40': 'Você somou 6 + 2 primeiro. A multiplicação tinha prioridade.' } },
          { id: 'mb.op.ordem#b2', type: 'input', prompt: 'Quanto é (7 − 3) × 5 ?', answer: '20',
            hints: ['Parênteses sempre vêm primeiro.', '7 − 3 = 4.', 'Agora multiplique 4 por 5.'],
            solution: ['Parênteses: 7 − 3 = 4', 'Multiplicação: 4 × 5 = 20'],
            traps: { '-8': 'Você multiplicou 3 × 5 antes de resolver o parêntese.' } },
          { id: 'mb.op.ordem#b3', type: 'input', prompt: 'Quanto é 12 ÷ 4 + 3 × 2 ?', answer: '9',
            hints: ['Duas operações de prioridade alta: uma divisão e uma multiplicação.', 'Resolva as duas antes de somar.', '12 ÷ 4 = 3 e 3 × 2 = 6.'],
            solution: ['Divisão: 12 ÷ 4 = 3', 'Multiplicação: 3 × 2 = 6', 'Soma: 3 + 6 = 9'],
            traps: { '12': 'Você somou 4 + 3 no meio do caminho.' } }
        ],
        intermediario: [
          { id: 'mb.op.ordem#i1', type: 'input', prompt: 'Quanto é 10 − 2 × 3² ?', answer: '-8',
            hints: ['Tem potência. Ela vem antes da multiplicação.', '3² = 9, então a conta vira 10 − 2 × 9.', '2 × 9 = 18. Agora 10 − 18.'],
            solution: ['Potência: 3² = 9', 'Multiplicação: 2 × 9 = 18', 'Subtração: 10 − 18 = −8'],
            traps: { '576': 'Você fez tudo da esquerda para a direita: (10−2)=8, 8×3=24, 24²=576.',
                     '72': 'Você calculou (10 − 2) × 3² = 8 × 9. A subtração não vem primeiro.' } },
          { id: 'mb.op.ordem#i2', type: 'input', prompt: 'Quanto é 18 ÷ 3 × 2 ?', answer: '12',
            hints: ['Divisão e multiplicação têm a mesma prioridade.', 'Quando empatam, vale a ordem de escrita.', '18 ÷ 3 = 6 primeiro.'],
            solution: ['Empate de prioridade: resolve-se da esquerda para a direita', '18 ÷ 3 = 6', '6 × 2 = 12'],
            traps: { '3': 'Você fez 3 × 2 = 6 primeiro e depois 18 ÷ 6. Multiplicação não vem antes de divisão — elas empatam.' } },
          { id: 'mb.op.ordem#i3', type: 'input', prompt: 'Quanto é 4 + 3 × (10 − 2 × 4) ?', answer: '10',
            hints: ['Comece pelo que está dentro do parêntese.', 'Dentro dele ainda há prioridade: 2 × 4 = 8.', 'O parêntese vale 10 − 8 = 2.'],
            solution: ['Dentro do parêntese, multiplicação primeiro: 2 × 4 = 8', 'Parêntese: 10 − 8 = 2', 'Multiplicação: 3 × 2 = 6', 'Soma: 4 + 6 = 10'],
            traps: { '100': 'Você somou 4 + 3 antes de multiplicar.', '28': 'Você fez 10 − 2 = 8 dentro do parêntese, esquecendo o × 4.' } }
        ],
        avancado: [
          { id: 'mb.op.ordem#a1', type: 'input', prompt: 'Quanto é 2 × [15 − (4 + 3 × 2)] ÷ 5 ?', answer: '2',
            hints: ['Vá do parêntese mais interno para fora.', 'Dentro do parêntese: 3 × 2 = 6, então 4 + 6 = 10.', 'O colchete vira 15 − 10 = 5. Sobra 2 × 5 ÷ 5.'],
            solution: ['Parêntese interno: 3 × 2 = 6 e 4 + 6 = 10', 'Colchete: 15 − 10 = 5',
                       'Sobra 2 × 5 ÷ 5', 'Da esquerda para a direita: 2 × 5 = 10, depois 10 ÷ 5 = 2'],
            traps: { '10': 'Você parou antes da divisão final por 5.' } },
          { id: 'mb.op.ordem#a2', type: 'input', prompt: 'Quanto é −2² + (−2)² ?', answer: '0',
            hints: ['Os dois termos parecem iguais, mas não são.', 'Em −2², a potência age só no 2. Em (−2)², ela age no −2 inteiro.',
                    '−2² = −4 e (−2)² = +4.'],
            solution: ['−2² = −(2²) = −4 — o sinal não está dentro da potência',
                       '(−2)² = (−2)×(−2) = +4 — aqui o parêntese incluiu o sinal',
                       'Soma: −4 + 4 = 0'],
            traps: { '8': 'Você tratou os dois como (−2)², obtendo 4 + 4.',
                     '-8': 'Você tratou os dois como −2², obtendo −4 − 4.' } }
        ],
        desafio: [
          { id: 'mb.op.ordem#d1', type: 'input', prompt: 'Quanto é 100 ÷ 5 ÷ 2 × 3 − 2³ ?', answer: '22',
            hints: ['Resolva a potência e depois a fila de divisões e multiplicação.',
                    'Divisões e multiplicação empatam: estritamente da esquerda para a direita.',
                    '100 ÷ 5 = 20, depois 20 ÷ 2 = 10, depois 10 × 3 = 30.'],
            solution: ['Potência: 2³ = 8', 'Fila de mesma prioridade, da esquerda para a direita:',
                       '100 ÷ 5 = 20', '20 ÷ 2 = 10', '10 × 3 = 30', 'Subtração final: 30 − 8 = 22'],
            traps: { '2': 'Você fez 5 ÷ 2 primeiro, agrupando à direita. A associatividade é à esquerda.',
                     '38': 'Você somou o 2³ em vez de subtrair.' } }
        ]
      },

      review: [
        'A fila é parênteses → potências → multiplicação e divisão → soma e subtração.',
        'Quando duas operações empatam em prioridade, vale a ordem de escrita, da esquerda para a direita.',
        'Em −aⁿ a potência age só na base; o sinal fica de fora. Com (−a)ⁿ, o sinal entra.',
        'Na dúvida, parênteses não custam nada e nunca estão errados.'
      ],

      viz: 'ordemOperacoes'
    },

    /* ═══════════════════════════════════════════════════════════════
       Adição e subtração com sinais
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'mb.op.adicao',

      whatIs: `<p>Somar é andar para a direita na reta numérica; subtrair é andar para a esquerda. O sinal de um número diz de que lado do zero ele está; o sinal da operação diz para que lado você anda.</p>`,

      whyExists: `<p>Sem números negativos não dá para representar dívida, temperatura abaixo de zero, deslocamento para trás nem saldo devedor. E, mais adiante, não dá para falar de derivada negativa — que é como se descreve qualquer coisa que está diminuindo.</p>`,

      simple: 'Pense numa régua com o zero no meio. Somar anda para a direita, subtrair anda para a esquerda. Subtrair um número negativo é andar para a direita duas vezes — por isso vira soma.',

      academic: `<p>No conjunto dos inteiros, a subtração é definida como adição do elemento oposto: <span class="math">a − b = a + (−b)</span>. Isso elimina a subtração como operação independente e explica por que <span class="math">a − (−b) = a + b</span>: o oposto de <span class="math">−b</span> é <span class="math">b</span>.</p>
        <p>A adição em ℤ é comutativa, associativa, tem elemento neutro 0 e todo elemento tem oposto — a estrutura que caracteriza um grupo aditivo.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule −7 + 3',
          steps: ['Comece em −7 na reta', 'Somar 3 significa andar 3 casas para a direita', 'De −7, três casas à direita: −6, −5, −4'],
          answer: '−4' },
        { level: 'intermediario', prompt: 'Calcule 8 − (5 − 9)',
          steps: ['Resolva o parêntese: 5 − 9 = −4', 'A conta vira 8 − (−4)', 'Subtrair um negativo é somar: 8 + 4'],
          answer: '12' },
        { level: 'avancado', prompt: 'Calcule −3 − (−7) + (−2) − 4',
          steps: ['Reescreva cada subtração como soma do oposto: −3 + 7 + (−2) + (−4)',
                  'Some os positivos: 7', 'Some os negativos: −3 − 2 − 4 = −9', 'Junte: 7 − 9'],
          answer: '−2' }
      ],

      application: { area: 'Finanças',
        text: 'Um extrato bancário é uma sequência de somas com sinal. Entrada é positiva, saída é negativa, e o saldo é a soma acumulada. Estorno de uma cobrança é literalmente "subtrair um valor negativo" — e o saldo sobe.' },

      formulas: [
        { f: 'a − b = a + (−b)', note: 'Subtração é adição do oposto. É a definição, não um truque.' },
        { f: 'a − (−b) = a + b', note: 'Dois sinais de menos seguidos viram mais.' },
        { f: '−(a + b) = −a − b', note: 'O menos na frente do parêntese distribui sobre todos os termos.' }
      ],

      mistakes: [
        { erro: 'Calcular 5 − (3 − 7) como 5 − 3 − 7 = −5',
          porque: 'Distribuir o menos só no primeiro termo do parêntese.',
          certo: 'O menos distribui em tudo: 5 − 3 + 7 = 9.' },
        { erro: 'Calcular −7 + 3 como −10',
          porque: 'Somar os valores e manter o sinal do maior, sem olhar os sinais.',
          certo: 'Sinais diferentes: subtraia os valores e fique com o sinal do maior. 7 − 3 = 4, sinal negativo: −4.' },
        { erro: 'Achar que −5 é maior que −2 porque 5 > 2',
          porque: 'Comparar módulos em vez de posições.',
          certo: 'Na reta, −5 está mais à esquerda. Logo −5 < −2.' }
      ],

      tip: 'Quando aparecerem dois sinais colados, resolva-os antes de qualquer conta. "− (−" vira "+". "+ (−" vira "−". Só depois calcule.',

      drills: {
        basico: [
          { id: 'mb.op.adicao#b1', type: 'input', prompt: 'Quanto é −9 + 4 ?', answer: '-5',
            hints: ['Os sinais são diferentes.', 'Subtraia os valores: 9 − 4.', 'O resultado fica com o sinal do maior valor, que é o 9 (negativo).'],
            solution: ['Sinais diferentes: subtraia os módulos', '9 − 4 = 5', 'O maior módulo é o do −9, então o sinal é negativo: −5'],
            traps: { '-13': 'Você somou os módulos. Isso só vale quando os dois sinais são iguais.', '5': 'Faltou o sinal negativo.' } },
          { id: 'mb.op.adicao#b2', type: 'input', prompt: 'Quanto é −6 − 5 ?', answer: '-11',
            hints: ['Aqui os dois movimentos vão para o mesmo lado.', 'Começar em −6 e subtrair 5 é andar mais 5 para a esquerda.', 'Some os módulos e mantenha o sinal.'],
            solution: ['Os dois termos são negativos', 'Some os módulos: 6 + 5 = 11', 'Mantenha o sinal: −11'],
            traps: { '-1': 'Você subtraiu os módulos. Como os sinais são iguais, eles se somam.' } },
          { id: 'mb.op.adicao#b3', type: 'input', prompt: 'Quanto é 4 − (−6) ?', answer: '10',
            hints: ['Repare nos dois sinais de menos seguidos.', 'Subtrair um negativo é somar.', 'A conta vira 4 + 6.'],
            solution: ['Subtrair um negativo equivale a somar: 4 − (−6) = 4 + 6', 'Resultado: 10'],
            traps: { '-2': 'Você fez 4 − 6. O segundo menos cancelou o primeiro.' } }
        ],
        intermediario: [
          { id: 'mb.op.adicao#i1', type: 'input', prompt: 'Quanto é 12 − (7 − 15) ?', answer: '20',
            hints: ['Resolva o parêntese primeiro, mesmo que dê negativo.', '7 − 15 = −8.', 'A conta vira 12 − (−8).'],
            solution: ['Parêntese: 7 − 15 = −8', 'Reescreva: 12 − (−8)', 'Dois menos viram mais: 12 + 8 = 20'],
            traps: { '4': 'Você fez 12 − 8, esquecendo que o resultado do parêntese era negativo.',
                     '-10': 'Você distribuiu o menos só no 7: 12 − 7 − 15.' } },
          { id: 'mb.op.adicao#i2', type: 'input', prompt: 'Quanto é −5 + 8 − 11 + 3 ?', answer: '-5',
            hints: ['Separe positivos e negativos.', 'Positivos: 8 + 3 = 11. Negativos: −5 − 11 = −16.', 'Agora junte 11 com −16.'],
            solution: ['Positivos: 8 + 3 = 11', 'Negativos: −5 − 11 = −16', 'Junte: 11 − 16 = −5'],
            traps: { '5': 'Sinal trocado: o total negativo é maior que o positivo.' } }
        ],
        avancado: [
          { id: 'mb.op.adicao#a1', type: 'input', prompt: 'Quanto é −4 − (−9) + (−6) − (−2) ?', answer: '1',
            hints: ['Converta cada subtração em soma do oposto.', 'Fica −4 + 9 − 6 + 2.', 'Positivos: 9 + 2 = 11. Negativos: −4 − 6 = −10.'],
            solution: ['Reescreva: −4 + 9 + (−6) + 2', 'Positivos: 9 + 2 = 11', 'Negativos: −4 − 6 = −10', 'Total: 11 − 10 = 1'],
            traps: { '-21': 'Você somou tudo como negativo, sem converter os "− (−" em soma.' } },
          { id: 'mb.op.adicao#a2', type: 'input', prompt: 'Quanto é 10 − [4 − (6 − 9)] ?', answer: '3',
            hints: ['Comece pelo parêntese mais interno.', '6 − 9 = −3.', 'O colchete vira 4 − (−3) = 7.'],
            solution: ['Parêntese interno: 6 − 9 = −3', 'Colchete: 4 − (−3) = 4 + 3 = 7', 'Final: 10 − 7 = 3'],
            traps: { '9': 'Você fez 4 − 3 = 1 no colchete, tratando o −3 como positivo.' } }
        ],
        desafio: [
          { id: 'mb.op.adicao#d1', type: 'input', prompt: 'Um elevador sai do 3º subsolo, sobe 7 andares, desce 4 e sobe 2. Em que andar ele para? (use número negativo para subsolo, e 0 para o térreo)',
            answer: '2',
            hints: ['3º subsolo é −3.', 'Some os movimentos: +7, depois −4, depois +2.', '−3 + 7 = 4. Continue.'],
            solution: ['Posição inicial: −3', '−3 + 7 = 4', '4 − 4 = 0 (térreo)', '0 + 2 = 2'],
            traps: { '8': 'Você tratou o 3º subsolo como +3.', '5': 'Você esqueceu a descida de 4 andares.' } }
        ]
      },

      review: [
        'Subtrair é somar o oposto: a − b = a + (−b).',
        'Sinais iguais na soma: some os módulos e mantenha o sinal.',
        'Sinais diferentes: subtraia os módulos e use o sinal do maior.',
        'O menos na frente de um parêntese distribui em todos os termos de dentro.'
      ],

      viz: 'retaNumerica'
    },
    /* ═══════════════════════════════════════════════════════════════
       Multiplicação, divisão e a regra de sinais
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'mb.op.multiplicacao',

      whatIs: `<p>Multiplicar é somar a mesma quantidade várias vezes. Dividir é a pergunta inversa: quantas vezes cabe?</p>
        <p>Quando entram sinais, só existem duas regras: <strong>sinais iguais dão positivo, sinais diferentes dão negativo</strong>. Vale igual para multiplicação e para divisão.</p>`,

      whyExists: `<p>A regra de sinais não foi escolhida por gosto. Ela é a única possível se você quiser que a propriedade distributiva continue valendo.</p>
        <p>Veja: <span class="math">(−2)(3 + (−3)) = (−2)(0) = 0</span>. Abrindo pela distributiva: <span class="math">(−2)(3) + (−2)(−3) = −6 + (−2)(−3)</span>. Para o total dar zero, <span class="math">(−2)(−3)</span> é obrigado a valer <span class="math">+6</span>.</p>`,

      simple: 'Sinais iguais dão positivo. Sinais diferentes dão negativo. Só isso — e vale tanto para vezes quanto para dividir.',

      academic: `<p>Em ℤ, a multiplicação distribui sobre a adição. Essa exigência força o produto de dois negativos a ser positivo: sendo <span class="math">b + (−b) = 0</span>, tem-se <span class="math">a·b + a·(−b) = 0</span>, ou seja, <span class="math">a·(−b) = −(a·b)</span>. Aplicando duas vezes, <span class="math">(−a)(−b) = a·b</span>.</p>
        <p>A divisão por zero fica indefinida porque não existe <span class="math">c</span> tal que <span class="math">0·c = a</span> para <span class="math">a ≠ 0</span> — e, para <span class="math">a = 0</span>, qualquer <span class="math">c</span> serviria, o que quebra a unicidade.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule (−4) × 7',
          steps: ['Olhe só os sinais: um negativo e um positivo — diferentes', 'Sinais diferentes → resultado negativo', 'Multiplique os números: 4 × 7 = 28'],
          answer: '−28' },
        { level: 'intermediario', prompt: 'Calcule (−36) ÷ (−4) × (−2)',
          steps: ['Divisão e multiplicação empatam: da esquerda para a direita',
                  '(−36) ÷ (−4): sinais iguais → +9', '9 × (−2): sinais diferentes → −18'],
          answer: '−18' },
        { level: 'avancado', prompt: 'Determine o sinal de (−2)⁵ × (−3)⁴ sem calcular o valor',
          steps: ['(−2)⁵: expoente ímpar em base negativa → negativo',
                  '(−3)⁴: expoente par em base negativa → positivo',
                  'Negativo × positivo → negativo'],
          answer: 'negativo' }
      ],

      application: { area: 'Física',
        text: 'Aceleração e velocidade com sinais opostos significam freada. Se a velocidade é positiva e a aceleração negativa, o produto que aparece nas contas de energia muda de sinal — e é isso que distingue "está acelerando" de "está freando" sem precisar de desenho.' },

      formulas: [
        { f: '(+)(+) = (+)   e   (−)(−) = (+)', note: 'Sinais iguais dão positivo.' },
        { f: '(+)(−) = (−)   e   (−)(+) = (−)', note: 'Sinais diferentes dão negativo.' },
        { f: '(−a)ⁿ = aⁿ se n é par;  −aⁿ se n é ímpar', note: 'A paridade do expoente decide o sinal.' },
        { f: 'a ÷ 0 não existe', note: 'Nenhum número multiplicado por zero devolve a ≠ 0.' }
      ],

      mistakes: [
        { erro: 'Aplicar a regra de sinais na soma: dizer que −3 − 4 = +7',
          porque: 'Confundir "dois menos viram mais" (que vale para subtrair um negativo) com soma de dois negativos.',
          certo: 'Aqui são dois negativos somando: −3 − 4 = −7. A regra de sinais é da multiplicação.' },
        { erro: 'Escrever (−2)⁴ = −16',
          porque: 'Manter o sinal negativo sem contar quantas vezes ele aparece.',
          certo: 'São quatro fatores negativos, e eles se cancelam aos pares: (−2)⁴ = +16.' },
        { erro: 'Dizer que 0 ÷ 5 não existe',
          porque: 'Confundir zero no numerador com zero no denominador.',
          certo: '0 ÷ 5 = 0 sem problema. O que não existe é 5 ÷ 0.' }
      ],

      tip: 'Numa multiplicação longa, conte quantos fatores negativos existem. Quantidade par → resultado positivo. Ímpar → negativo. Isso resolve o sinal antes de você multiplicar qualquer número.',

      drills: {
        basico: [
          { id: 'mb.op.mult#b1', type: 'input', prompt: 'Quanto é (−6) × (−7) ?', answer: '42',
            hints: ['Compare os dois sinais.', 'Os dois são negativos — sinais iguais.', 'Sinais iguais dão positivo. 6 × 7 = 42.'],
            solution: ['Sinais iguais → resultado positivo', '6 × 7 = 42', 'Resultado: +42'],
            traps: { '-42': 'Sinais iguais dão positivo. O negativo só aparece quando os sinais são diferentes.' } },
          { id: 'mb.op.mult#b2', type: 'input', prompt: 'Quanto é 45 ÷ (−9) ?', answer: '-5',
            hints: ['A regra de sinais vale também para divisão.', 'Positivo dividido por negativo: sinais diferentes.', '45 ÷ 9 = 5, com sinal negativo.'],
            solution: ['Sinais diferentes → resultado negativo', '45 ÷ 9 = 5', 'Resultado: −5'],
            traps: { '5': 'Faltou o sinal: os sinais eram diferentes.' } },
          { id: 'mb.op.mult#b3', type: 'choice', prompt: 'Qual dessas operações não tem resultado?',
            choices: ['0 ÷ 7', '7 ÷ 0', '0 × 7', '−7 ÷ 7'], answer: 1,
            hints: ['Divisão por zero e divisão de zero são coisas diferentes.', 'Pense: existe um número que multiplicado por 0 dá 7?', 'Não existe. Por isso 7 ÷ 0 é indefinido.'],
            solution: ['0 ÷ 7 = 0 — sem problema', '0 × 7 = 0 — sem problema', '−7 ÷ 7 = −1 — sem problema',
                       '7 ÷ 0 pediria um número c com 0·c = 7, e nenhum serve'] }
        ],
        intermediario: [
          { id: 'mb.op.mult#i1', type: 'input', prompt: 'Quanto é (−2) × 3 × (−4) ?', answer: '24',
            hints: ['Conte quantos fatores negativos existem.', 'São dois negativos — quantidade par.', 'Par de negativos → positivo. E 2 × 3 × 4 = 24.'],
            solution: ['Dois fatores negativos: quantidade par → resultado positivo', '2 × 3 × 4 = 24', 'Resultado: +24'],
            traps: { '-24': 'Você contou os negativos como se fossem ímpares. Dois negativos se cancelam.' } },
          { id: 'mb.op.mult#i2', type: 'input', prompt: 'Quanto é (−48) ÷ 6 ÷ (−2) ?', answer: '4',
            hints: ['Duas divisões seguidas: da esquerda para a direita.', '(−48) ÷ 6 = −8.', 'Agora (−8) ÷ (−2): sinais iguais.'],
            solution: ['(−48) ÷ 6 = −8 (sinais diferentes)', '(−8) ÷ (−2) = +4 (sinais iguais)'],
            traps: { '-4': 'Sinal trocado no último passo: dois negativos dividindo dão positivo.',
                     '-144': 'Você multiplicou em vez de dividir em algum passo.' } },
          { id: 'mb.op.mult#i3', type: 'choice', prompt: 'Qual é o sinal de (−1)¹⁰¹ ?',
            choices: ['Positivo', 'Negativo', 'Zero', 'Depende'], answer: 1,
            hints: ['Base negativa: quem decide o sinal é o expoente.', 'Expoente par cancela os negativos aos pares; ímpar sobra um.', '101 é ímpar.'],
            solution: ['Base negativa com expoente ímpar', 'Os negativos se cancelam aos pares e sobra um', 'Resultado negativo: −1'] }
        ],
        avancado: [
          { id: 'mb.op.mult#a1', type: 'input', prompt: 'Quanto é (−3)² − (−3)³ ?', answer: '36',
            hints: ['Calcule cada potência separadamente, com atenção ao sinal.', '(−3)² = 9 e (−3)³ = −27.', 'A conta vira 9 − (−27).'],
            solution: ['(−3)² = 9 (expoente par)', '(−3)³ = −27 (expoente ímpar)',
                       '9 − (−27) = 9 + 27 = 36'],
            traps: { '-18': 'Você fez 9 − 27, tratando (−3)³ como positivo.',
                     '18': 'Você somou os módulos das duas potências.' } },
          { id: 'mb.op.mult#a2', type: 'input', prompt: 'Quanto é [(−2) × (−5) − 4] ÷ (−3) ?', answer: '-2',
            hints: ['Resolva o colchete antes de dividir.', '(−2) × (−5) = 10, então o colchete é 10 − 4 = 6.', 'Agora 6 ÷ (−3).'],
            solution: ['(−2) × (−5) = +10', 'Colchete: 10 − 4 = 6', '6 ÷ (−3) = −2'],
            traps: { '2': 'Faltou o sinal: dividir positivo por negativo dá negativo.',
                     '-4.67': 'Você dividiu só uma parte do colchete. A divisão age no resultado inteiro dele.',
                     '4.67': 'Você dividiu antes de fechar o colchete, e ainda perdeu o sinal.' } }
        ],
        desafio: [
          { id: 'mb.op.mult#d1', type: 'input', prompt: 'Quantos fatores negativos, no mínimo, precisam ser trocados de sinal para que (−1)×(−2)×(−3)×(−4)×(−5) fique positivo?',
            answer: '1',
            hints: ['Primeiro: qual é o sinal atual do produto?', 'São cinco fatores negativos — quantidade ímpar, logo o produto é negativo.',
                    'Trocar um único fator de sinal deixa quatro negativos, quantidade par.'],
            solution: ['Cinco fatores negativos: quantidade ímpar → produto negativo',
                       'Trocar o sinal de um fator deixa quatro negativos',
                       'Quatro é par → produto positivo', 'Basta 1 troca'],
            traps: { '5': 'Você trocou todos. Bastava um para mudar a paridade.',
                     '2': 'Trocar dois mantém a paridade ímpar do total de negativos.' } }
        ]
      },

      review: [
        'Sinais iguais dão positivo; sinais diferentes dão negativo — em vezes e em dividir.',
        'A regra de sinais é da multiplicação. Na soma, o que vale é a posição na reta.',
        'Base negativa: expoente par dá positivo, expoente ímpar dá negativo.',
        'Divisão por zero não existe; zero dividido por qualquer número diferente de zero dá zero.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Valor absoluto
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'mb.num.absoluto',

      whatIs: `<p>O valor absoluto de um número é a <strong>distância dele até o zero</strong> na reta numérica. Escreve-se com duas barras: <span class="math">|x|</span>.</p>
        <p>Distância nunca é negativa, então <span class="math">|x| ≥ 0</span> sempre. E <span class="math">|−7| = |7| = 7</span>: os dois estão a sete passos do zero, um para cada lado.</p>`,

      whyExists: `<p>Muitas perguntas se importam com o tamanho do desvio, não com a direção dele. "O erro da medida foi de 2 mm" não muda se foi para mais ou para menos.</p>
        <p>E há um motivo que aparece bem à frente: a definição formal de limite é escrita inteira com módulo. <span class="math">|f(x) − L| &lt; ε</span> significa "f(x) está a menos de ε de distância de L". Quem lê módulo como distância entende limite; quem lê como "tira o sinal", não.</p>`,

      simple: 'Módulo é a distância até o zero. Como distância não tem sinal, o resultado nunca é negativo. |−7| e |7| valem a mesma coisa: 7.',

      academic: `<p>Define-se <span class="math">|x| = x</span> se <span class="math">x ≥ 0</span> e <span class="math">|x| = −x</span> se <span class="math">x &lt; 0</span>. A segunda linha assusta por parecer negativa, mas <span class="math">−x</span> com <span class="math">x</span> negativo é positivo.</p>
        <p>A leitura geométrica generaliza: <span class="math">|x − a|</span> é a distância entre <span class="math">x</span> e <span class="math">a</span> na reta. Daí a desigualdade triangular <span class="math">|x + y| ≤ |x| + |y|</span>, que diz que o caminho direto nunca é mais longo que o desvio.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule |−12| + |5|',
          steps: ['|−12| é a distância de −12 até 0, que é 12', '|5| = 5', 'Some: 12 + 5'],
          answer: '17' },
        { level: 'intermediario', prompt: 'Resolva |x − 3| = 5',
          steps: ['Leia como distância: x está a 5 unidades de 3',
                  'Para a direita: x = 3 + 5 = 8', 'Para a esquerda: x = 3 − 5 = −2'],
          answer: 'x = 8 ou x = −2' },
        { level: 'avancado', prompt: 'Escreva com módulo: "x está a menos de 0,01 de 2"',
          steps: ['Distância entre x e 2 é |x − 2|', 'Menos de 0,01 significa desigualdade estrita',
                  'Isso é exatamente a forma usada na definição de limite'],
          answer: '|x − 2| < 0,01' }
      ],

      application: { area: 'Engenharia e medição',
        text: 'Tolerância de fabricação é escrita com módulo: |medida − nominal| ≤ tolerância. A peça passa se o desvio, para qualquer lado, couber na faixa. É a mesma estrutura da definição de limite, com nomes diferentes.' },

      formulas: [
        { f: '|x| = x se x ≥ 0;  |x| = −x se x < 0', note: 'A definição por casos. O −x da segunda linha é positivo.' },
        { f: '|x − a| = distância entre x e a', note: 'A leitura que faz tudo o resto ficar fácil.' },
        { f: '|x·y| = |x|·|y|', note: 'O módulo distribui sobre produto e quociente.' },
        { f: '|x + y| ≤ |x| + |y|', note: 'Desigualdade triangular: o caminho direto nunca é o mais longo.' },
        { f: '√(x²) = |x|', note: 'Não é x. A raiz quadrada devolve sempre o valor não negativo.' }
      ],

      mistakes: [
        { erro: 'Escrever √(x²) = x',
          porque: 'Cancelar a raiz com o quadrado por hábito.',
          certo: '√(x²) = |x|. Com x = −3: √9 = 3, e não −3.' },
        { erro: 'Achar que |x| = −x é impossível porque "dá negativo"',
          porque: 'Ler −x como um número negativo, esquecendo que x já era negativo.',
          certo: 'Com x = −5, −x = 5. A fórmula está certa.' },
        { erro: 'Distribuir o módulo sobre a soma: |a + b| = |a| + |b|',
          porque: 'Aplicar à soma uma propriedade que só vale para produto.',
          certo: 'Com a = 3 e b = −3: |0| = 0, mas |3| + |−3| = 6. Vale só ≤.' }
      ],

      tip: 'Sempre que aparecer módulo numa equação ou inequação, traduza para distância antes de calcular. "|x − 4| < 2" vira "x está a menos de 2 de distância de 4", ou seja, entre 2 e 6 — e você resolveu sem abrir caso nenhum.',

      drills: {
        basico: [
          { id: 'mb.num.abs#b1', type: 'input', prompt: 'Quanto é |−15| ?', answer: '15',
            hints: ['Módulo é distância até o zero.', 'A distância de −15 até 0 é 15.', 'Distância nunca é negativa.'],
            solution: ['|−15| é a distância entre −15 e 0', 'Essa distância é 15'],
            traps: { '-15': 'Módulo nunca devolve resultado negativo.' } },
          { id: 'mb.num.abs#b2', type: 'input', prompt: 'Quanto é |3 − 10| ?', answer: '7',
            hints: ['Resolva o que está dentro das barras primeiro.', '3 − 10 = −7.', 'Agora tome o módulo de −7.'],
            solution: ['Dentro das barras: 3 − 10 = −7', '|−7| = 7'],
            traps: { '-7': 'Você parou antes de aplicar o módulo.', '13': 'Você somou em vez de subtrair dentro das barras.' } },
          { id: 'mb.num.abs#b3', type: 'choice', prompt: 'Qual afirmação é sempre verdadeira?',
            choices: ['|x| = x', '|x| ≥ 0', '|x| > 0', '|x| = −x'], answer: 1,
            hints: ['Teste cada uma com x negativo e com x = 0.', 'Com x = −4: |x| = 4, então |x| = x é falsa.', 'Com x = 0 o módulo é 0, então "> 0" também falha.'],
            solution: ['|x| = x falha para x negativo', '|x| > 0 falha para x = 0', '|x| = −x falha para x positivo',
                       '|x| ≥ 0 vale sempre: distância nunca é negativa'] }
        ],
        intermediario: [
          { id: 'mb.num.abs#i1', type: 'input', prompt: 'Resolva |x| = 6. Responda os dois valores separados por vírgula, do menor para o maior.',
            answer: '-6,6', accept: ['-6, 6', '−6,6'],
            hints: ['Quais números estão a 6 de distância do zero?', 'Um para cada lado.', 'São −6 e 6.'],
            solution: ['|x| = 6 significa distância 6 até o zero', 'Para a direita: x = 6', 'Para a esquerda: x = −6'],
            traps: { '6': 'Faltou a solução negativa: módulo abre dois casos.' } },
          { id: 'mb.num.abs#i2', type: 'input', prompt: 'Quanto é √((−9)²) ?', answer: '9',
            hints: ['Calcule primeiro o que está sob a raiz.', '(−9)² = 81.', '√81 = 9 — e note que não é −9.'],
            solution: ['(−9)² = 81', '√81 = 9', 'Confirma a regra √(x²) = |x|'],
            traps: { '-9': 'A raiz quadrada devolve sempre o valor não negativo: √(x²) = |x|, não x.' } },
          { id: 'mb.num.abs#i3', type: 'choice', prompt: 'A desigualdade |x − 5| < 3 corresponde a qual intervalo?',
            choices: ['(2, 8)', '(−8, −2)', '(−3, 3)', '(5, 8)'], answer: 0,
            hints: ['Leia como distância: x está a menos de 3 de 5.', 'Ande 3 para cada lado a partir de 5.', '5 − 3 = 2 e 5 + 3 = 8.'],
            solution: ['|x − 5| < 3 significa distância menor que 3 até o 5',
                       'Limite à esquerda: 5 − 3 = 2', 'Limite à direita: 5 + 3 = 8',
                       'Como a desigualdade é estrita, o intervalo é aberto: (2, 8)'] }
        ],
        avancado: [
          { id: 'mb.num.abs#a1', type: 'input', prompt: 'Resolva |2x − 4| = 10. Responda os dois valores separados por vírgula, do menor para o maior.',
            answer: '-3,7', accept: ['-3, 7', '−3,7'],
            hints: ['Abra os dois casos: o de dentro pode valer 10 ou −10.', 'Caso 1: 2x − 4 = 10.', 'Caso 2: 2x − 4 = −10.'],
            solution: ['Caso 1: 2x − 4 = 10 → 2x = 14 → x = 7',
                       'Caso 2: 2x − 4 = −10 → 2x = −6 → x = −3',
                       'Confira: |2(7)−4| = |10| = 10 ✓ e |2(−3)−4| = |−10| = 10 ✓'],
            traps: { '7': 'Você resolveu só o caso positivo.', '3,7': 'No caso negativo, 2x = −6 dá x = −3, não 3.' } },
          { id: 'mb.num.abs#a2', type: 'choice', prompt: 'Se |a + b| = |a| + |b|, o que se pode afirmar sobre a e b?',
            choices: ['São iguais', 'Têm o mesmo sinal (ou algum é zero)', 'Têm sinais opostos', 'Nada se pode afirmar'],
            answer: 1,
            hints: ['A desigualdade triangular vira igualdade só num caso especial.', 'Teste com 3 e 5, depois com 3 e −5.',
                    'Com sinais opostos há cancelamento dentro do módulo, e a soma diminui.'],
            solution: ['Com a e b de mesmo sinal, nada se cancela: |3+5| = 8 = |3|+|5|',
                       'Com sinais opostos há cancelamento: |3−5| = 2, mas |3|+|−5| = 8',
                       'A igualdade vale exatamente quando não há cancelamento'] }
        ],
        desafio: [
          { id: 'mb.num.abs#d1', type: 'input', prompt: 'Quantas soluções inteiras tem a inequação |x − 2| ≤ 3 ?',
            answer: '7',
            hints: ['Traduza para distância: x está a no máximo 3 de 2.', 'Isso dá o intervalo fechado de −1 até 5.', 'Conte os inteiros de −1 a 5, incluindo as pontas.'],
            solution: ['|x − 2| ≤ 3 significa −1 ≤ x ≤ 5',
                       'Inteiros no intervalo: −1, 0, 1, 2, 3, 4, 5', 'São 7 valores'],
            traps: { '6': 'Você esqueceu de contar uma das pontas — a desigualdade é ≤, então elas entram.',
                     '5': 'Você contou só de 1 a 5, esquecendo 0 e −1.' } }
        ]
      },

      review: [
        'Módulo é distância até o zero, e por isso nunca é negativo.',
        '|x − a| é a distância entre x e a — a leitura que resolve equação e inequação sem decorar caso.',
        '√(x²) = |x|, e não x.',
        'O módulo distribui sobre produto e quociente, mas não sobre soma: vale apenas |x + y| ≤ |x| + |y|.'
      ]
    },
    /* ═══════════════════════════════════════════════════════════════
       O que uma fração é
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'mb.fr.conceito',

      whatIs: `<p>Uma fração é uma divisão que ainda não foi feita. Em <span class="math">3/4</span>, o número de baixo (denominador) diz <strong>em quantas partes o inteiro foi cortado</strong>, e o de cima (numerador) diz <strong>quantas partes você pegou</strong>.</p>
        <p>E <span class="math">3/4</span> é literalmente "3 dividido por 4", que dá 0,75. As duas leituras são a mesma coisa.</p>`,

      whyExists: `<p>Nem toda divisão fecha em número inteiro. Sem fração, "dividir 3 pizzas entre 4 pessoas" não tem resposta.</p>
        <p>E existe um motivo direto para Cálculo: toda derivada nasce de uma fração — variação dividida por variação, <span class="math">Δy/Δx</span>. Quem não enxerga fração como divisão não enxerga derivada como taxa.</p>`,

      simple: 'O número de baixo é o tamanho do corte. O de cima é quantos pedaços você pegou. Quanto maior o número de baixo, menor cada pedaço.',

      academic: `<p>Um número racional é um par ordenado <span class="math">(a, b)</span> com <span class="math">b ≠ 0</span>, sob a relação de equivalência <span class="math">(a,b) ~ (c,d) ⟺ ad = bc</span>. É por isso que <span class="math">1/2</span> e <span class="math">2/4</span> representam o mesmo número: são representantes da mesma classe.</p>
        <p>A exigência <span class="math">b ≠ 0</span> não é convenção: o denominador é o divisor, e a divisão por zero não está definida.</p>`,

      examples: [
        { level: 'basico', prompt: 'Que fração da figura está pintada, se um retângulo foi cortado em 8 partes iguais e 5 estão pintadas?',
          steps: ['Total de partes: 8 → denominador', 'Partes pintadas: 5 → numerador'],
          answer: '5/8' },
        { level: 'intermediario', prompt: 'Qual é maior: 2/3 ou 3/5 ?',
          steps: ['Não dá para comparar direto: os cortes têm tamanhos diferentes',
                  'Denominador comum: o MMC de 3 e 5 é 15',
                  '2/3 = 10/15 e 3/5 = 9/15', 'Com pedaços do mesmo tamanho, compare os numeradores: 10 > 9'],
          answer: '2/3' },
        { level: 'avancado', prompt: 'Escreva 0,375 como fração irredutível',
          steps: ['0,375 = 375/1000 (três casas decimais → mil)',
                  'Divida em cima e embaixo por 125: 375 ÷ 125 = 3 e 1000 ÷ 125 = 8'],
          answer: '3/8' }
      ],

      application: { area: 'Computação',
        text: 'Ponto flutuante guarda frações binárias. É por isso que 0,1 + 0,2 não dá exatamente 0,3 em quase toda linguagem: 1/10 não tem representação finita na base 2, do mesmo jeito que 1/3 não tem na base 10.' },

      formulas: [
        { f: 'a/b = a ÷ b', note: 'Fração é uma divisão pendente. É a leitura mais útil.' },
        { f: 'b ≠ 0', note: 'O denominador é o divisor, e dividir por zero não existe.' },
        { f: 'a/b = (a·k)/(b·k)', note: 'Multiplicar em cima e embaixo pelo mesmo número não muda o valor.' },
        { f: 'a/b < c/d  ⟺  a·d < c·b  (com b, d > 0)', note: 'Multiplicação cruzada para comparar.' }
      ],

      mistakes: [
        { erro: 'Achar que 1/8 é maior que 1/4 porque 8 > 4',
          porque: 'Comparar denominadores como se fossem quantidades.',
          certo: 'O denominador é o tamanho do corte: cortar em 8 dá pedaços menores. 1/8 < 1/4.' },
        { erro: 'Escrever 5/0 como "zero" ou "infinito"',
          porque: 'Tratar divisão por zero como se tivesse resposta.',
          certo: 'Não existe. É indefinido, não é um número.' },
        { erro: 'Comparar 3/7 e 4/9 pela diferença entre numerador e denominador',
          porque: 'Procurar um atalho que não existe.',
          certo: 'Use denominador comum ou multiplicação cruzada: 3·9 = 27 e 4·7 = 28, logo 3/7 < 4/9.' }
      ],

      tip: 'Antes de qualquer conta, compare a fração com 1/2 e com 1. Isso pega erro grosseiro na hora: se o numerador é mais que a metade do denominador, a fração passa de 1/2.',

      drills: {
        basico: [
          { id: 'mb.fr.conceito#b1', type: 'choice', prompt: 'Qual é maior: 1/3 ou 1/5 ?',
            choices: ['1/3', '1/5', 'São iguais'], answer: 0,
            hints: ['Os numeradores são iguais: 1 pedaço em cada caso.', 'Quem decide é o tamanho do pedaço.', 'Cortar em 3 dá pedaços maiores que cortar em 5.'],
            solution: ['Mesmo numerador: um pedaço em cada', 'Denominador menor → corte maior', '1/3 > 1/5'] },
          { id: 'mb.fr.conceito#b2', type: 'input', prompt: 'Escreva 3/4 na forma decimal.', answer: '0.75', accept: ['0,75', '.75'],
            hints: ['Fração é divisão.', 'Faça 3 ÷ 4.', 'Três dividido por quatro dá 0,75.'],
            solution: ['3/4 significa 3 ÷ 4', '3 ÷ 4 = 0,75'],
            traps: { '1.33': 'Você dividiu ao contrário: 4 ÷ 3.' } },
          { id: 'mb.fr.conceito#b3', type: 'choice', prompt: 'Qual dessas frações é maior que 1?',
            choices: ['3/5', '7/8', '9/7', '1/2'], answer: 2,
            hints: ['Uma fração passa de 1 quando o numerador é maior que o denominador.', 'Procure a que tem o número de cima maior.', '9 > 7.'],
            solution: ['Fração maior que 1 ⟺ numerador > denominador', '9/7 tem 9 > 7', 'As outras têm numerador menor que o denominador'] }
        ],
        intermediario: [
          { id: 'mb.fr.conceito#i1', type: 'choice', prompt: 'Qual é maior: 5/8 ou 7/12 ?',
            choices: ['5/8', '7/12', 'São iguais'], answer: 0,
            hints: ['Ache um denominador comum. O MMC de 8 e 12 é 24.', '5/8 = 15/24.', '7/12 = 14/24. Agora compare.'],
            solution: ['MMC(8, 12) = 24', '5/8 = 15/24', '7/12 = 14/24', '15 > 14, então 5/8 é maior'] },
          { id: 'mb.fr.conceito#i2', type: 'input', prompt: 'Escreva 0,8 como fração irredutível (formato: a/b).', answer: '4/5',
            hints: ['0,8 tem uma casa decimal, então o denominador é 10.', '0,8 = 8/10.', 'Simplifique dividindo os dois por 2.'],
            solution: ['0,8 = 8/10', 'MDC(8,10) = 2', '8÷2 / 10÷2 = 4/5'],
            traps: { '8/10': 'Correto em valor, mas ainda dá para simplificar: divida os dois por 2.' } }
        ],
        avancado: [
          { id: 'mb.fr.conceito#a1', type: 'input', prompt: 'Qual fração está exatamente entre 1/4 e 1/2 ? (formato: a/b, irredutível)',
            answer: '3/8',
            hints: ['O ponto médio de dois números é a média deles.', 'Média = (1/4 + 1/2) ÷ 2.', '1/4 + 1/2 = 3/4. Agora divida por 2.'],
            solution: ['Iguale os denominadores: 1/4 + 2/4 = 3/4', 'Divida por 2: (3/4) ÷ 2 = 3/8',
                       'Confira: 1/4 = 2/8, 3/8, 1/2 = 4/8 — o do meio é 3/8'],
            traps: { '2/6': 'Você somou numeradores e denominadores. Isso não é média nem soma de frações.' } },
          { id: 'mb.fr.conceito#a2', type: 'input', prompt: 'Escreva a dízima 0,333... como fração irredutível.', answer: '1/3',
            hints: ['Chame o número de x e monte uma equação.', 'x = 0,333... então 10x = 3,333...', 'Subtraia: 10x − x = 3.'],
            solution: ['Seja x = 0,333...', '10x = 3,333...', '10x − x = 3,333... − 0,333... = 3', '9x = 3, logo x = 3/9 = 1/3'],
            traps: { '3/10': 'Isso é 0,3 exato, não a dízima infinita.' } }
        ],
        desafio: [
          { id: 'mb.fr.conceito#d1', type: 'input', prompt: 'Escreva 0,2727... (com "27" repetindo) como fração irredutível.',
            answer: '3/11',
            hints: ['O período tem duas casas, então multiplique por 100.', 'x = 0,2727... e 100x = 27,2727...', 'Subtraia e resolva 99x = 27.'],
            solution: ['Seja x = 0,2727...', '100x = 27,2727...', '100x − x = 27, logo 99x = 27',
                       'x = 27/99', 'MDC(27,99) = 9 → x = 3/11'],
            traps: { '27/99': 'Valor certo, mas ainda simplifica: divida os dois por 9.',
                     '27/100': 'Isso é 0,27 exato. A dízima infinita dá outro valor.' } }
        ]
      },

      review: [
        'Fração é divisão pendente: a/b é a ÷ b.',
        'Denominador maior significa pedaço menor.',
        'Multiplicar numerador e denominador pelo mesmo número não altera o valor.',
        'Para comparar, iguale os denominadores ou use multiplicação cruzada.'
      ],

      viz: 'fracaoBarra'
    },

    /* ═══════════════════════════════════════════════════════════════
       Adição e subtração de frações
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'mb.fr.soma',

      whatIs: `<p>Para somar frações é preciso que os pedaços tenham o mesmo tamanho. Com denominadores iguais, soma-se apenas os numeradores. Com denominadores diferentes, primeiro se iguala — normalmente pelo MMC.</p>`,

      whyExists: `<p>Somar <span class="math">1/2 + 1/3</span> pedindo "2 pedaços de 5" não faz sentido: os pedaços têm tamanhos diferentes. Igualar denominadores é reescrever tudo na mesma unidade, exatamente como somar metros com centímetros exige converter antes.</p>
        <p>Em Cálculo isso volta o tempo todo: somar frações algébricas é o passo obrigatório antes de simplificar um limite ou montar uma integral por frações parciais.</p>`,

      simple: 'Só dá para somar pedaços do mesmo tamanho. Iguale os denominadores, some só os de cima, e simplifique no fim.',

      academic: `<p>A soma em ℚ é definida por <span class="math">a/b + c/d = (ad + cb)/(bd)</span>. O produto <span class="math">bd</span> sempre serve como denominador comum, mas o MMC produz números menores e reduz o trabalho de simplificação.</p>
        <p>A operação é comutativa e associativa, tem 0 como neutro e todo elemento tem oposto — o que faz de (ℚ, +) um grupo abeliano.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule 2/7 + 3/7',
          steps: ['Os denominadores já são iguais', 'Some só os numeradores: 2 + 3 = 5', 'O denominador não muda'],
          answer: '5/7' },
        { level: 'intermediario', prompt: 'Calcule 1/3 + 1/6',
          steps: ['MMC(3, 6) = 6', '1/3 = 2/6 (multipliquei os dois por 2)', '2/6 + 1/6 = 3/6', 'Simplifique: 3/6 = 1/2'],
          answer: '1/2' },
        { level: 'avancado', prompt: 'Calcule 5/6 − 3/4 + 1/12',
          steps: ['MMC(6, 4, 12) = 12', '5/6 = 10/12, 3/4 = 9/12, 1/12 fica', '10/12 − 9/12 + 1/12 = 2/12', 'Simplifique: 2/12 = 1/6'],
          answer: '1/6' }
      ],

      application: { area: 'Obra e receita',
        text: 'Somar 3/4 de xícara com 2/3 de xícara exige denominador comum antes de saber se cabe num copo de 1,5 xícara. É a mesma conta de igualar unidades que aparece em qualquer medição.' },

      formulas: [
        { f: 'a/c + b/c = (a + b)/c', note: 'Denominadores iguais: some só os numeradores.' },
        { f: 'a/b + c/d = (ad + cb)/(bd)', note: 'Fórmula geral. Funciona sempre, mas gera números maiores que o MMC.' },
        { f: 'MMC como denominador comum', note: 'Menor denominador comum → menos simplificação no fim.' }
      ],

      mistakes: [
        { erro: 'Somar em cima e embaixo: 1/3 + 1/6 = 2/9',
          porque: 'Aplicar à soma a regra que só vale para multiplicação.',
          certo: 'Iguale primeiro: 2/6 + 1/6 = 3/6 = 1/2. Só o numerador soma.' },
        { erro: 'Igualar denominadores mas esquecer de ajustar o numerador',
          porque: 'Trocar só o número de baixo, como se o valor não mudasse.',
          certo: 'Se o denominador foi multiplicado por 2, o numerador também tem de ser.' },
        { erro: 'Na subtração, esquecer que o menos afeta a fração inteira',
          porque: 'Distribuir o sinal só sobre parte da expressão.',
          certo: 'Em a/b − (c + d)/b, o menos vale para c e para d.' }
      ],

      tip: 'Antes de somar, estime: 1/3 + 1/6 tem que dar algo perto de 0,5. Se sua resposta der 2/9 ≈ 0,22, você já sabe que errou sem precisar conferir a conta.',

      drills: {
        basico: [
          { id: 'mb.fr.soma#b1', type: 'input', prompt: 'Quanto é 3/8 + 2/8 ? (formato: a/b)', answer: '5/8',
            hints: ['Os denominadores já são iguais.', 'Some só os numeradores.', '3 + 2 = 5, e o 8 fica.'],
            solution: ['Denominadores iguais', '3 + 2 = 5', 'Resultado: 5/8'],
            traps: { '5/16': 'Você somou também os denominadores. Eles ficam como estão.' } },
          { id: 'mb.fr.soma#b2', type: 'input', prompt: 'Quanto é 1/2 + 1/4 ? (formato: a/b, irredutível)', answer: '3/4',
            hints: ['4 já é múltiplo de 2.', 'Converta 1/2 para quartos: 1/2 = 2/4.', 'Agora some 2/4 + 1/4.'],
            solution: ['MMC(2,4) = 4', '1/2 = 2/4', '2/4 + 1/4 = 3/4'],
            traps: { '2/6': 'Você somou numeradores e denominadores.' } },
          { id: 'mb.fr.soma#b3', type: 'input', prompt: 'Quanto é 5/9 − 2/9 ? (formato: a/b, irredutível)', answer: '1/3', accept: ['3/9'],
            hints: ['Denominadores iguais: subtraia só os numeradores.', '5 − 2 = 3, dando 3/9.', 'Simplifique 3/9.'],
            solution: ['5 − 2 = 3, então 3/9', 'MDC(3,9) = 3', '3/9 = 1/3'] }
        ],
        intermediario: [
          { id: 'mb.fr.soma#i1', type: 'input', prompt: 'Quanto é 2/3 + 1/4 ? (formato: a/b)', answer: '11/12',
            hints: ['MMC(3,4) = 12.', '2/3 = 8/12 e 1/4 = 3/12.', 'Some os numeradores.'],
            solution: ['MMC(3,4) = 12', '2/3 = 8/12', '1/4 = 3/12', '8/12 + 3/12 = 11/12'],
            traps: { '3/7': 'Você somou em cima e embaixo.' } },
          { id: 'mb.fr.soma#i2', type: 'input', prompt: 'Quanto é 3/4 − 5/6 ? (formato: a/b, pode ser negativo)', answer: '-1/12',
            hints: ['MMC(4,6) = 12.', '3/4 = 9/12 e 5/6 = 10/12.', '9 − 10 = −1.'],
            solution: ['MMC(4,6) = 12', '3/4 = 9/12', '5/6 = 10/12', '9/12 − 10/12 = −1/12'],
            traps: { '1/12': 'Sinal trocado: 5/6 é maior que 3/4, então o resultado é negativo.',
                     '-2/2': 'Você subtraiu numeradores e denominadores separadamente.' } },
          { id: 'mb.fr.soma#i3', type: 'input', prompt: 'Quanto é 2 + 1/3 ? (formato: a/b)', answer: '7/3',
            hints: ['Todo inteiro pode virar fração: 2 = 2/1.', 'Iguale ao denominador 3: 2 = 6/3.', 'Agora some 6/3 + 1/3.'],
            solution: ['2 = 6/3', '6/3 + 1/3 = 7/3'],
            traps: { '3/3': 'Você somou 2 com 1 e ignorou o denominador.', '2/3': 'Você trocou o inteiro pelo numerador.' } }
        ],
        avancado: [
          { id: 'mb.fr.soma#a1', type: 'input', prompt: 'Quanto é 1/2 + 1/3 + 1/6 ? (responda como número inteiro se der inteiro)',
            answer: '1',
            hints: ['MMC(2,3,6) = 6.', '1/2 = 3/6, 1/3 = 2/6, 1/6 = 1/6.', '3 + 2 + 1 = 6, e 6/6 = ?'],
            solution: ['MMC = 6', '3/6 + 2/6 + 1/6 = 6/6', '6/6 = 1'],
            traps: { '3/11': 'Você somou numeradores e denominadores.' } },
          { id: 'mb.fr.soma#a2', type: 'input', prompt: 'Um tanque está com 3/5 da capacidade. Retiram-se 1/4 da capacidade total. Que fração do tanque sobra?',
            answer: '7/20',
            hints: ['A conta é 3/5 − 1/4.', 'MMC(5,4) = 20.', '3/5 = 12/20 e 1/4 = 5/20.'],
            solution: ['Sobra = 3/5 − 1/4', 'MMC(5,4) = 20', '12/20 − 5/20 = 7/20'],
            traps: { '2/1': 'Você subtraiu numeradores e denominadores separadamente.',
                     '11/20': 'Você somou em vez de subtrair.' } }
        ],
        desafio: [
          { id: 'mb.fr.soma#d1', type: 'input', prompt: 'Quanto é 1/2 + 1/6 + 1/12 + 1/20 ? (formato: a/b, irredutível)',
            answer: '4/5', accept: ['48/60', '0.8'],
            hints: ['Repare no padrão dos denominadores: 1·2, 2·3, 3·4, 4·5.',
                    'Cada termo pode virar uma diferença: 1/(n(n+1)) = 1/n − 1/(n+1).',
                    'Escritos assim, os termos do meio se cancelam e sobram só as pontas.'],
            solution: ['1/2 = 1/1 − 1/2', '1/6 = 1/2 − 1/3', '1/12 = 1/3 − 1/4', '1/20 = 1/4 − 1/5',
                       'Somando tudo, cada termo do meio aparece uma vez somando e outra subtraindo',
                       'Sobram as pontas: 1/1 − 1/5 = 4/5',
                       'Conferindo pelo MMC 60: 30/60 + 10/60 + 5/60 + 3/60 = 48/60 = 4/5'],
            traps: { '4/40': 'Você somou numeradores e denominadores.',
                     '1/2': 'Você parou no primeiro termo.',
                     '48/60': 'Valor certo, mas ainda simplifica: divida os dois por 12.' } }
        ]
      },

      review: [
        'Denominadores iguais: some só os numeradores.',
        'Denominadores diferentes: iguale pelo MMC antes de somar.',
        'Ao trocar o denominador, o numerador tem de ser ajustado na mesma proporção.',
        'Nunca some numerador com numerador e denominador com denominador.'
      ],

      viz: 'fracaoBarra'
    },
    /* ═══════════════════════════════════════════════════════════════
       Porcentagem básica
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'mb.pc.basica',

      whatIs: `<p>Por cento quer dizer <strong>por cem</strong>. <span class="math">30%</span> é a fração <span class="math">30/100</span>, que é o decimal <span class="math">0,3</span>.</p>
        <p>Calcular "30% de 400" é multiplicar: <span class="math">0,3 × 400 = 120</span>. Porcentagem não é uma operação nova — é multiplicação com o número escrito de outro jeito.</p>`,

      whyExists: `<p>Comparar valores absolutos engana. Uma loja que perdeu R$ 10 mil e outra que perdeu R$ 10 mil não estão na mesma situação se uma fatura R$ 50 mil e a outra R$ 5 milhões.</p>
        <p>A porcentagem existe para comparar em relação ao todo, colocando quantidades de tamanhos diferentes na mesma régua.</p>`,

      simple: 'Por cento é "dividido por cem". Troque o % por uma divisão por 100 e a conta vira uma multiplicação comum.',

      academic: `<p>Formalmente, <span class="math">p% de x = (p/100)·x</span>. A operação é uma aplicação linear em <span class="math">x</span>, o que garante que porcentagens do mesmo referencial se somam: <span class="math">20% de x + 30% de x = 50% de x</span>.</p>
        <p>O que não se soma são porcentagens de referenciais diferentes — e é aí que quase todo erro acontece.</p>`,

      examples: [
        { level: 'basico', prompt: 'Quanto é 25% de 80?',
          steps: ['25% = 25/100 = 0,25', 'Multiplique: 0,25 × 80'],
          answer: '20' },
        { level: 'intermediario', prompt: '18 é quantos por cento de 60?',
          steps: ['A pergunta é: 18 representa que fração de 60?', '18/60 = 0,3', 'Converta para porcentagem: 0,3 × 100'],
          answer: '30%' },
        { level: 'avancado', prompt: '15% de um valor é 45. Qual é o valor?',
          steps: ['Chame o valor de x: 0,15·x = 45', 'Isole x: x = 45 ÷ 0,15'],
          answer: '300' }
      ],

      application: { area: 'Finanças pessoais',
        text: 'Juros de cartão anunciados como "13% ao mês" viram 0,13 na conta. Aplicar isso doze vezes seguidas não dá 156% ao ano — dá cerca de 335%, porque o efeito é multiplicativo. É a diferença entre somar e compor.' },

      formulas: [
        { f: 'p% = p/100', note: 'Converter é dividir por cem. Sempre.' },
        { f: 'p% de x = (p/100)·x', note: 'A conta é sempre uma multiplicação.' },
        { f: 'parte/todo × 100 = porcentagem', note: 'Para descobrir que porcentagem uma parte representa.' },
        { f: 'x = parte ÷ (p/100)', note: 'Para achar o todo a partir da parte e da porcentagem.' }
      ],

      mistakes: [
        { erro: 'Responder "30" para "30% de 400"',
          porque: 'Confundir o percentual com o valor que ele representa.',
          certo: '30% é a taxa; o valor é 0,3 × 400 = 120.' },
        { erro: 'Somar porcentagens de bases diferentes',
          porque: 'Tratar % como número absoluto.',
          certo: '10% de 200 (=20) mais 10% de 500 (=50) dá 70, e não "20%" de coisa alguma.' },
        { erro: 'Achar o valor original dividindo pela mesma porcentagem que foi somada',
          porque: 'Supor que a operação inversa usa o mesmo número.',
          certo: 'Se subiu 20%, o valor final é 1,2·x. Para voltar, divida por 1,2 — não subtraia 20%.' }
      ],

      tip: 'Troque "% de" por "× 0,__" antes de qualquer coisa. "40% de 250" vira "0,4 × 250", e aí é só conta. Esse único hábito elimina a maioria dos erros de porcentagem.',

      drills: {
        basico: [
          { id: 'mb.pc.basica#b1', type: 'input', prompt: 'Quanto é 20% de 350 ?', answer: '70',
            hints: ['Converta 20% para decimal.', '20% = 0,2.', 'Multiplique 0,2 × 350.'],
            solution: ['20% = 20/100 = 0,2', '0,2 × 350 = 70'],
            traps: { '20': 'Esse é o percentual, não o valor. Falta aplicar sobre 350.' } },
          { id: 'mb.pc.basica#b2', type: 'input', prompt: 'Quanto é 5% de 60 ?', answer: '3',
            hints: ['5% = 0,05.', 'Multiplique 0,05 × 60.', 'Ou: 10% de 60 é 6, então 5% é a metade.'],
            solution: ['5% = 0,05', '0,05 × 60 = 3'],
            traps: { '30': 'Você usou 50% em vez de 5%: uma casa decimal a mais.' } },
          { id: 'mb.pc.basica#b3', type: 'input', prompt: '15 é quantos por cento de 50 ? (responda só o número)', answer: '30',
            hints: ['Divida a parte pelo todo.', '15 ÷ 50 = 0,3.', 'Multiplique por 100.'],
            solution: ['15/50 = 0,3', '0,3 × 100 = 30%'],
            traps: { '3.33': 'Você dividiu ao contrário: 50 ÷ 15.' } }
        ],
        intermediario: [
          { id: 'mb.pc.basica#i1', type: 'input', prompt: '12% de um valor é 96. Qual é o valor?', answer: '800',
            hints: ['Monte a equação: 0,12·x = 96.', 'Isole x dividindo por 0,12.', '96 ÷ 0,12 = ?'],
            solution: ['0,12·x = 96', 'x = 96 ÷ 0,12', 'x = 800'],
            traps: { '11.52': 'Você calculou 12% de 96 em vez de resolver para o todo.' } },
          { id: 'mb.pc.basica#i2', type: 'input', prompt: 'Um produto de R$ 240 tem 35% de desconto. Quanto se paga?', answer: '156',
            hints: ['Pagar com 35% de desconto é pagar 65%.', '65% = 0,65.', '0,65 × 240 = ?'],
            solution: ['Desconto de 35% → paga-se 65%', '0,65 × 240 = 156'],
            traps: { '84': 'Isso é o valor do desconto, não o que se paga.',
                     '205': 'Você calculou 35% e subtraiu errado; confira 240 − 84.' } },
          { id: 'mb.pc.basica#i3', type: 'input', prompt: 'Numa turma de 40 alunos, 28 passaram. Qual a porcentagem de aprovação? (só o número)',
            answer: '70',
            hints: ['Divida aprovados pelo total.', '28 ÷ 40 = 0,7.', 'Multiplique por 100.'],
            solution: ['28/40 = 0,7', '0,7 × 100 = 70%'],
            traps: { '12': 'Isso é o número de reprovados, não a porcentagem.' } }
        ],
        avancado: [
          { id: 'mb.pc.basica#a1', type: 'input', prompt: 'Um valor foi aumentado em 25% e ficou R$ 500. Qual era o valor original?',
            answer: '400',
            hints: ['Aumentar 25% é multiplicar por 1,25.', 'Então 1,25·x = 500.', 'Divida 500 por 1,25.'],
            solution: ['Aumento de 25% → fator 1,25', '1,25·x = 500', 'x = 500 ÷ 1,25 = 400'],
            traps: { '375': 'Você tirou 25% de 500. Não é o mesmo que desfazer um aumento de 25%.',
                     '625': 'Você aumentou de novo em vez de voltar.' } },
          { id: 'mb.pc.basica#a2', type: 'input', prompt: 'Numa loja, 60% dos produtos são importados e, destes, 25% estão em promoção. Que porcentagem do total de produtos é importada e está em promoção? (só o número)',
            answer: '15',
            hints: ['São porcentagens encadeadas: 25% de 60%.', 'Multiplique os fatores: 0,25 × 0,6.', '0,15 = 15%.'],
            solution: ['Importados: 0,6 do total', 'Destes, em promoção: 0,25', '0,25 × 0,6 = 0,15 = 15%'],
            traps: { '85': 'Você somou as porcentagens. Elas se multiplicam quando são encadeadas.',
                     '35': 'Você subtraiu uma da outra.' } }
        ],
        desafio: [
          { id: 'mb.pc.basica#d1', type: 'input', prompt: 'Um produto sofre aumento de 20% e, no mês seguinte, desconto de 20%. Em relação ao preço inicial, o preço final é qual porcentagem? (só o número)',
            answer: '96',
            hints: ['Não volta ao inicial — o desconto incide sobre o valor já aumentado.',
                    'Multiplique os fatores: 1,20 × 0,80.', '1,2 × 0,8 = 0,96.'],
            solution: ['Aumento: fator 1,20', 'Desconto: fator 0,80', 'Combinado: 1,20 × 0,80 = 0,96',
                       'O preço final é 96% do inicial — uma queda de 4%'],
            traps: { '100': 'A intuição diz que volta ao mesmo, mas as bases são diferentes: o desconto incide sobre um valor maior.',
                     '104': 'Você somou os efeitos em vez de multiplicar os fatores.' } }
        ]
      },

      review: [
        'Por cento é dividido por cem: p% = p/100.',
        '"p% de x" é sempre a multiplicação (p/100)·x.',
        'Para descobrir a porcentagem: parte ÷ todo × 100.',
        'Porcentagens só se somam quando têm o mesmo referencial. Encadeadas, elas se multiplicam.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Variação percentual
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'mb.pc.variacao',

      whatIs: `<p>Variação percentual mede o quanto algo mudou <strong>em relação ao valor de onde partiu</strong>:</p>
        <p><span class="math">variação = (final − inicial) / inicial</span>, e multiplica-se por 100 para virar porcentagem.</p>
        <p>O sinal importa: positivo é aumento, negativo é queda.</p>`,

      whyExists: `<p>"Subiu R$ 5" não diz quase nada. Sobre R$ 10, é o dobro. Sobre R$ 5.000, é ruído. A variação percentual normaliza pela origem e permite comparar mudanças de escalas diferentes.</p>
        <p>É também o primeiro parente da derivada: taxa de variação relativa. A derivada faz a mesma pergunta, mas num intervalo que encolhe a zero.</p>`,

      simple: 'Pegue o quanto mudou e divida pelo valor de onde partiu. Nunca pelo valor final, e nunca pela diferença.',

      academic: `<p>A variação relativa é <span class="math">Δx/x₀</span>, adimensional por construção. Em séries longas prefere-se a variação logarítmica <span class="math">ln(x₁/x₀)</span>, porque ela é aditiva no tempo e simétrica: uma alta seguida de uma queda equivalente devolve zero, o que não acontece com a variação simples.</p>
        <p>Distinção obrigatória: <em>ponto percentual</em> é diferença absoluta entre duas taxas; <em>variação percentual</em> é diferença relativa. Passar de 5% para 7% é +2 pontos percentuais e +40% de variação.</p>`,

      examples: [
        { level: 'basico', prompt: 'Um preço passou de R$ 80 para R$ 100. Qual a variação percentual?',
          steps: ['Variação absoluta: 100 − 80 = 20', 'Divida pelo inicial: 20/80 = 0,25', 'Em porcentagem: 25%'],
          answer: '+25%' },
        { level: 'intermediario', prompt: 'Um valor caiu de 250 para 200. Qual a variação percentual?',
          steps: ['Variação: 200 − 250 = −50', 'Divida pelo inicial: −50/250 = −0,2', 'Em porcentagem: −20%'],
          answer: '−20%' },
        { level: 'avancado', prompt: 'A taxa de desemprego passou de 8% para 10%. Descreva a mudança das duas formas corretas.',
          steps: ['Diferença absoluta entre taxas: 10 − 8 = 2 pontos percentuais',
                  'Variação relativa: (10 − 8)/8 = 0,25 = 25%',
                  'As duas afirmações estão certas e dizem coisas diferentes'],
          answer: '+2 pontos percentuais, ou +25% de variação' }
      ],

      application: { area: 'Jornalismo de dados',
        text: 'Manchetes trocam "pontos percentuais" por "por cento" o tempo todo. Uma taxa que vai de 2% para 3% subiu 1 ponto percentual — e 50%. Escolher a segunda forma sem avisar é tecnicamente correto e deliberadamente enganoso.' },

      formulas: [
        { f: 'variação = (final − inicial) / inicial', note: 'Sempre dividindo pelo ponto de partida.' },
        { f: 'final = inicial × (1 + i)', note: 'Com i em decimal. Negativo para queda.' },
        { f: 'inicial = final ÷ (1 + i)', note: 'Para desfazer uma variação, divide-se pelo fator.' },
        { f: 'ponto percentual ≠ porcentagem', note: 'Um é diferença de taxas; o outro, variação relativa.' }
      ],

      mistakes: [
        { erro: 'Dividir pelo valor final em vez do inicial',
          porque: 'Pegar o número que está mais à mão no enunciado.',
          certo: 'A referência é sempre de onde se partiu: (final − inicial)/inicial.' },
        { erro: 'Dizer que passar de 8% para 10% é "um aumento de 2%"',
          porque: 'Confundir ponto percentual com variação relativa.',
          certo: 'São 2 pontos percentuais, o que corresponde a um aumento de 25%.' },
        { erro: 'Achar que uma queda de 50% é desfeita por uma alta de 50%',
          porque: 'Supor simetria onde a base mudou.',
          certo: 'De 100 para 50 e depois +50% dá 75. Para voltar a 100 é preciso +100%.' }
      ],

      tip: 'Escreva a variação como fator antes de calcular: aumento de 15% é ×1,15, queda de 15% é ×0,85. Trabalhando com fatores, encadear variações vira multiplicação — e o erro de somar porcentagens desaparece.',

      drills: {
        basico: [
          { id: 'mb.pc.var#b1', type: 'input', prompt: 'Um valor passou de 40 para 50. Qual a variação percentual? (só o número, positivo)',
            answer: '25',
            hints: ['Calcule primeiro a variação absoluta.', '50 − 40 = 10.', 'Divida por 40, o valor inicial.'],
            solution: ['Variação: 50 − 40 = 10', '10/40 = 0,25', '0,25 × 100 = 25%'],
            traps: { '20': 'Você dividiu por 50, o valor final. A referência é o inicial.',
                     '10': 'Isso é a variação absoluta, não a percentual.' } },
          { id: 'mb.pc.var#b2', type: 'input', prompt: 'Um valor caiu de 200 para 150. Qual a variação percentual? (só o número, sem sinal)',
            answer: '25',
            hints: ['Variação: 150 − 200 = −50.', 'Divida por 200.', '50/200 = 0,25.'],
            solution: ['Variação: −50', '−50/200 = −0,25', 'Queda de 25%'],
            traps: { '33.33': 'Você dividiu por 150, o valor final.' } },
          { id: 'mb.pc.var#b3', type: 'choice', prompt: 'Uma taxa foi de 4% para 6%. Qual afirmação está correta?',
            choices: ['Aumentou 2%', 'Aumentou 2 pontos percentuais', 'Aumentou 200%', 'Aumentou 6%'],
            answer: 1,
            hints: ['Diferença entre duas taxas se mede em pontos percentuais.', 'A variação relativa seria (6−4)/4 = 50%.', 'Só uma das opções usa a unidade certa.'],
            solution: ['A diferença absoluta entre taxas é 2 pontos percentuais',
                       'A variação relativa é (6−4)/4 = 50%',
                       '"Aumentou 2%" está errado: confunde ponto percentual com porcentagem'] }
        ],
        intermediario: [
          { id: 'mb.pc.var#i1', type: 'input', prompt: 'Um salário de R$ 3.000 sobe 8%. Qual o novo valor?', answer: '3240',
            hints: ['Aumentar 8% é multiplicar por 1,08.', '3000 × 1,08.', 'Ou: 8% de 3000 é 240, e some.'],
            solution: ['Fator de aumento: 1,08', '3000 × 1,08 = 3240'],
            traps: { '240': 'Isso é o aumento, não o novo salário.' } },
          { id: 'mb.pc.var#i2', type: 'input', prompt: 'Após uma queda de 20%, um valor ficou em 480. Qual era o valor original?',
            answer: '600',
            hints: ['Queda de 20% é multiplicar por 0,8.', '0,8·x = 480.', 'Divida 480 por 0,8.'],
            solution: ['Fator de queda: 0,80', '0,80·x = 480', 'x = 480 ÷ 0,8 = 600'],
            traps: { '576': 'Você tirou mais 20% de 480 em vez de desfazer a queda.',
                     '96': 'Você calculou 20% de 480.' } }
        ],
        avancado: [
          { id: 'mb.pc.var#a1', type: 'input', prompt: 'Um valor sobe 10% e depois sobe mais 10%. Qual a variação percentual total? (só o número)',
            answer: '21',
            hints: ['Não são 20%: a segunda alta incide sobre o valor já maior.',
                    'Multiplique os fatores: 1,1 × 1,1.', '1,21 significa +21%.'],
            solution: ['Fatores: 1,10 e 1,10', '1,10 × 1,10 = 1,21', 'Variação total: +21%'],
            traps: { '20': 'Porcentagens encadeadas não se somam: elas se multiplicam como fatores.' } },
          { id: 'mb.pc.var#a2', type: 'input', prompt: 'Um valor cai 50%. De quantos por cento ele precisa subir para voltar ao original? (só o número)',
            answer: '100',
            hints: ['Suponha que valia 100 e caiu para 50.', 'De 50 para 100, quanto variou em relação a 50?',
                    '(100 − 50)/50 = 1.'],
            solution: ['De 100 cai para 50', 'Para voltar: (100 − 50)/50 = 1 = 100%',
                       'A assimetria vem da base ter mudado'],
            traps: { '50': 'A base mudou: subir 50% sobre 50 dá 75, não 100.' } }
        ],
        desafio: [
          { id: 'mb.pc.var#d1', type: 'input', prompt: 'Um produto sobe 25%, cai 20% e sobe 10%. Qual a variação percentual acumulada? (só o número, com sinal se negativo)',
            answer: '10',
            hints: ['Transforme cada mudança em fator: 1,25 · 0,80 · 1,10.',
                    '1,25 × 0,80 = 1,00.', 'Falta multiplicar por 1,10.'],
            solution: ['Fatores: 1,25 · 0,80 · 1,10', '1,25 × 0,80 = 1,00', '1,00 × 1,10 = 1,10',
                       'Variação acumulada: +10%'],
            traps: { '15': 'Você somou +25 − 20 + 10. Variações encadeadas se multiplicam.' } }
        ]
      },

      review: [
        'Variação percentual é (final − inicial) dividido pelo inicial.',
        'Trabalhe com fatores: +i vira ×(1+i), −i vira ×(1−i).',
        'Variações encadeadas se multiplicam, nunca se somam.',
        'Ponto percentual é diferença entre taxas; porcentagem é variação relativa.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Potência e propriedades
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'mb.pot.conceito',

      whatIs: `<p>Potência é multiplicação repetida: <span class="math">a^n</span> significa multiplicar <span class="math">a</span> por si mesmo <span class="math">n</span> vezes. O <span class="math">a</span> é a <strong>base</strong>, o <span class="math">n</span> é o <strong>expoente</strong>.</p>
        <p>Todas as propriedades saem dessa definição — nenhuma precisa ser decorada.</p>`,

      whyExists: `<p>Escrever <span class="math">2×2×2×2×2×2×2×2×2×2</span> é impraticável, e <span class="math">2^10</span> não é só mais curto: ele torna visível a estrutura. É a notação que permite falar de crescimento exponencial, de complexidade de algoritmo e de escala.</p>
        <p>Sem fluência aqui, a regra da potência da derivada (<span class="math">x^n → n·x^(n−1)</span>) vira símbolo sem significado.</p>`,

      simple: 'Expoente conta quantas vezes a base se multiplica. Mesma base multiplicando: some os expoentes. Dividindo: subtraia.',

      academic: `<p>Para <span class="math">n ∈ ℕ*</span>, define-se <span class="math">a^n</span> recursivamente: <span class="math">a^1 = a</span> e <span class="math">a^(n+1) = a^n · a</span>. As propriedades operatórias seguem por indução.</p>
        <p>A extensão para expoentes zero, negativos e racionais é feita <em>preservando</em> a propriedade <span class="math">a^m · a^n = a^(m+n)</span>. É esse critério que obriga <span class="math">a^0 = 1</span> e <span class="math">a^(−n) = 1/a^n</span> — não há escolha depois que se decide manter a regra.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule 2³ × 2⁴',
          steps: ['Mesma base multiplicando: somam-se os expoentes', '3 + 4 = 7', 'Resultado: 2⁷ = 128'],
          answer: '2⁷ = 128' },
        { level: 'intermediario', prompt: 'Simplifique (x³)⁴ ÷ x⁵',
          steps: ['Potência de potência: multiplicam-se os expoentes → x¹²',
                  'Divisão de mesma base: subtraem-se os expoentes', '12 − 5 = 7'],
          answer: 'x⁷' },
        { level: 'avancado', prompt: 'Simplifique (2a²b³)³ ÷ (4a³b²)',
          steps: ['Distribua o expoente 3: 2³·a⁶·b⁹ = 8a⁶b⁹',
                  'Divida: 8/4 = 2', 'a⁶ ÷ a³ = a³ e b⁹ ÷ b² = b⁷'],
          answer: '2a³b⁷' }
      ],

      application: { area: 'Computação',
        text: 'Um algoritmo O(2ⁿ) dobra de custo a cada elemento novo. Com n = 40 já são mais de um trilhão de operações. É a diferença entre um programa que roda e um que nunca termina — e ela está inteiramente na posição do n.' },

      formulas: [
        { f: 'aᵐ · aⁿ = a^(m+n)', note: 'Mesma base multiplicando: some os expoentes.' },
        { f: 'aᵐ ÷ aⁿ = a^(m−n)', note: 'Mesma base dividindo: subtraia.' },
        { f: '(aᵐ)ⁿ = a^(m·n)', note: 'Potência de potência: multiplique.' },
        { f: '(a·b)ⁿ = aⁿ · bⁿ', note: 'O expoente distribui sobre produto e quociente.' },
        { f: '(a+b)ⁿ ≠ aⁿ + bⁿ', note: 'E nunca sobre soma. É o erro mais comum de todos.' }
      ],

      mistakes: [
        { erro: 'Escrever 2³ × 2⁴ = 4⁷',
          porque: 'Multiplicar as bases junto com os expoentes.',
          certo: 'A base não muda: 2³ × 2⁴ = 2⁷.' },
        { erro: 'Escrever (a + b)² = a² + b²',
          porque: 'Distribuir o expoente sobre a soma.',
          certo: '(a + b)² = a² + 2ab + b². Teste com 3 e 4: 49 ≠ 9 + 16.' },
        { erro: 'Confundir (2a)³ com 2a³',
          porque: 'Não perceber que o parêntese inclui o coeficiente.',
          certo: '(2a)³ = 8a³. Sem parêntese, o expoente age só no a.' }
      ],

      tip: 'Antes de aplicar propriedade, confira se as bases são realmente iguais. 2³ × 8² parece não simplificar — mas 8 = 2³, então vira 2³ × 2⁶ = 2⁹.',

      drills: {
        basico: [
          { id: 'mb.pot.conceito#b1', type: 'input', prompt: 'Simplifique 3² × 3⁵ na forma 3^n. Responda o expoente n.', answer: '7',
            hints: ['Mesma base multiplicando.', 'Some os expoentes.', '2 + 5 = 7.'],
            solution: ['Mesma base: somam-se os expoentes', '2 + 5 = 7', 'Resultado: 3⁷'],
            traps: { '10': 'Você multiplicou os expoentes. Isso é a regra da potência de potência.' } },
          { id: 'mb.pot.conceito#b2', type: 'input', prompt: 'Simplifique x⁸ ÷ x³ na forma x^n. Responda o expoente n.', answer: '5',
            hints: ['Mesma base dividindo.', 'Subtraia os expoentes.', '8 − 3 = 5.'],
            solution: ['Divisão de mesma base: subtraem-se os expoentes', '8 − 3 = 5', 'Resultado: x⁵'],
            traps: { '2.67': 'Você dividiu os expoentes em vez de subtrair.' } },
          { id: 'mb.pot.conceito#b3', type: 'input', prompt: 'Calcule (5²)³ na forma 5^n. Responda o expoente n.', answer: '6',
            hints: ['Potência de potência.', 'Multiplique os expoentes.', '2 × 3 = 6.'],
            solution: ['(aᵐ)ⁿ = a^(m·n)', '2 × 3 = 6', 'Resultado: 5⁶'],
            traps: { '5': 'Você somou os expoentes. Some só quando as potências se multiplicam.' } }
        ],
        intermediario: [
          { id: 'mb.pot.conceito#i1', type: 'input', prompt: 'Simplifique (2x³)⁴. (formato: coeficiente e potência, ex: 8x^5)',
            answer: '16x^12', accept: ['16x¹²', '16 x^12'],
            hints: ['O expoente distribui sobre o produto, inclusive sobre o 2.', '2⁴ = 16.', '(x³)⁴ = x¹².'],
            solution: ['(2x³)⁴ = 2⁴ · (x³)⁴', '2⁴ = 16', '(x³)⁴ = x^(3·4) = x¹²', 'Resultado: 16x¹²'],
            traps: { '2x^12': 'Você não elevou o coeficiente: o expoente age em tudo dentro do parêntese.',
                     '16x^7': 'Você somou 3 + 4. Potência de potência multiplica.' } },
          { id: 'mb.pot.conceito#i2', type: 'input', prompt: 'Simplifique 2³ × 8² na forma 2^n. Responda o expoente n.', answer: '9',
            hints: ['As bases parecem diferentes. Alguma delas pode virar potência da outra?', '8 = 2³.', '8² = (2³)² = 2⁶.'],
            solution: ['8 = 2³, então 8² = (2³)² = 2⁶', '2³ × 2⁶ = 2⁹'],
            traps: { '5': 'Você somou 3 + 2 sem converter as bases para a mesma.' } }
        ],
        avancado: [
          { id: 'mb.pot.conceito#a1', type: 'input', prompt: 'Simplifique (a⁵b²)³ ÷ (a³b⁴). (formato: a^m b^n, ex: a^2b^3)',
            answer: 'a^12b^2', accept: ['a¹²b²', 'a^12 b^2'],
            hints: ['Distribua o expoente 3 primeiro.', '(a⁵b²)³ = a¹⁵b⁶.', 'Agora subtraia os expoentes na divisão.'],
            solution: ['(a⁵b²)³ = a^(5·3) · b^(2·3) = a¹⁵b⁶', 'a¹⁵ ÷ a³ = a¹²', 'b⁶ ÷ b⁴ = b²', 'Resultado: a¹²b²'],
            traps: { 'a^5b^2': 'Você aplicou a divisão antes de distribuir o expoente externo.' } },
          { id: 'mb.pot.conceito#a2', type: 'choice', prompt: 'Qual expressão é igual a (a + b)² ?',
            choices: ['a² + b²', 'a² + 2ab + b²', 'a² − 2ab + b²', '2a + 2b'], answer: 1,
            hints: ['Expoente não distribui sobre soma.', 'Abra: (a+b)(a+b).', 'Multiplicando termo a termo aparece um termo do meio.'],
            solution: ['(a+b)² = (a+b)(a+b)', '= a² + ab + ba + b²', '= a² + 2ab + b²',
                       'Teste com a=3 e b=4: 49 = 9 + 24 + 16 ✓'] }
        ],
        desafio: [
          { id: 'mb.pot.conceito#d1', type: 'input', prompt: 'Qual é o algarismo das unidades de 7¹⁰⁰ ?', answer: '1',
            hints: ['Calcule as primeiras potências e procure um ciclo nas unidades.',
                    '7¹ termina em 7, 7² em 9, 7³ em 3, 7⁴ em 1, 7⁵ em 7 — o ciclo tem tamanho 4.',
                    'Divida 100 por 4 e olhe o resto.'],
            solution: ['Unidades de 7ⁿ: 7, 9, 3, 1, e repete a cada 4',
                       '100 ÷ 4 = 25 com resto 0', 'Resto 0 corresponde ao quarto do ciclo: 1'],
            traps: { '7': 'Resto 0 cai no último elemento do ciclo, não no primeiro.',
                     '9': 'Esse seria o caso de resto 2.' } }
        ]
      },

      review: [
        'Mesma base: multiplicando soma expoentes, dividindo subtrai.',
        'Potência de potência multiplica os expoentes.',
        'O expoente distribui sobre produto e quociente — nunca sobre soma.',
        'Antes de aplicar propriedade, veja se dá para escrever tudo na mesma base.'
      ]
    }
  ]);
})(window.CZ);
