/* ==========================================================================
   data/sheets/08-probabilidade.js — fichas de Probabilidade.
   Formato e regras em core/sheets.js.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([
    /* ═══════════════════════════════════════════════════════════════
       Probabilidade teórica
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'pb.fu.teorica',

      whatIs: `<p>Quando todos os resultados de um experimento são igualmente prováveis, a probabilidade de um evento é:</p>
        <p><span class="math">P(A) = casos favoráveis / casos possíveis</span></p>
        <p>O resultado é sempre um número entre 0 e 1. Zero significa impossível; um, certo.</p>`,

      whyExists: `<p>Antes de contar frequências, é possível prever quanto algo <em>deveria</em> acontecer — desde que a estrutura do experimento seja conhecida.</p>
        <p>A hipótese de equiprobabilidade é forte e precisa ser verificada: ela vale para dado honesto e baralho embaralhado, mas não vale para "vai chover ou não vai chover" nem para "o avião cai ou não cai". Aplicá-la sem checar produz a maioria dos erros grosseiros em probabilidade.</p>`,

      simple: 'Conte quantos resultados servem, conte quantos existem no total, e divida. Mas só vale se todos os resultados tiverem a mesma chance.',

      academic: `<p>Num espaço amostral finito <span class="math">Ω</span> com resultados equiprováveis, define-se <span class="math">P(A) = |A|/|Ω|</span>. Essa é a probabilidade clássica ou de Laplace.</p>
        <p>Os axiomas de Kolmogorov generalizam: <span class="math">P(A) ≥ 0</span>, <span class="math">P(Ω) = 1</span>, e para eventos disjuntos <span class="math">P(A ∪ B) = P(A) + P(B)</span>. A definição clássica é um caso particular que satisfaz os três.</p>`,

      examples: [
        { level: 'basico', prompt: 'Qual a probabilidade de sair um número par ao lançar um dado?',
          steps: ['Casos possíveis: 1, 2, 3, 4, 5, 6 → 6',
                  'Casos favoráveis: 2, 4, 6 → 3', 'P = 3/6'],
          answer: '1/2 = 50%' },
        { level: 'intermediario', prompt: 'Numa urna com 5 bolas vermelhas e 3 azuis, qual a probabilidade de tirar uma azul?',
          steps: ['Total: 5 + 3 = 8', 'Favoráveis: 3'],
          answer: '3/8 = 37,5%' },
        { level: 'avancado', prompt: 'Ao lançar dois dados, qual a probabilidade de a soma ser 7?',
          steps: ['Casos possíveis: 6 × 6 = 36 pares ordenados',
                  'Somas 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 casos',
                  'P = 6/36'],
          answer: '1/6 ≈ 16,7%' }
      ],

      application: { area: 'Controle de qualidade',
        text: 'Num lote de 1000 peças com 20 defeituosas, a chance de uma peça sorteada ser defeituosa é 2%. Se a amostragem for feita sem embaralhar o lote, porém, a equiprobabilidade se perde — e o número deixa de valer.' },

      formulas: [
        { f: 'P(A) = |A| / |Ω|', note: 'Casos favoráveis sobre possíveis. Exige equiprobabilidade.' },
        { f: '0 ≤ P(A) ≤ 1', note: 'Nenhuma probabilidade é negativa nem passa de 1.' },
        { f: 'P(Ω) = 1 e P(∅) = 0', note: 'Evento certo e evento impossível.' },
        { f: 'P(Aᶜ) = 1 − P(A)', note: 'O complementar. Frequentemente é o caminho mais curto.' }
      ],

      mistakes: [
        { erro: 'Ao lançar dois dados, dizer que há 11 casos possíveis (as somas de 2 a 12)',
          porque: 'Contar os resultados agregados em vez dos pares ordenados.',
          certo: 'São 36 pares equiprováveis. As somas não são equiprováveis: 7 sai seis vezes mais que 2.' },
        { erro: 'Somar probabilidades de eventos que podem ocorrer juntos',
          porque: 'Aplicar a regra da soma sem verificar exclusão mútua.',
          certo: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Só sem interseção a subtração é dispensável.' },
        { erro: 'Dar uma probabilidade maior que 1',
          porque: 'Erro aritmético não conferido.',
          certo: 'Se o resultado passou de 1, o denominador está errado ou houve dupla contagem.' }
      ],

      tip: 'Antes de dividir, escreva o espaço amostral com clareza — de preferência listando alguns elementos. A maior parte dos erros de probabilidade está na contagem, não na divisão.',

      drills: {
        basico: [
          { id: 'pb.fu.teo#b1', type: 'input', prompt: 'Ao lançar um dado, qual a probabilidade de sair 5 ? Responda como fração a/b.',
            answer: '1/6',
            hints: ['Quantos resultados possíveis existem?', 'Seis faces.', 'Só uma delas é o 5.'],
            solution: ['Casos possíveis: 6', 'Casos favoráveis: 1', 'P = 1/6'],
            traps: { '5/6': 'Você usou o número da face como quantidade de casos favoráveis.' } },
          { id: 'pb.fu.teo#b2', type: 'input', prompt: 'Numa urna com 4 bolas brancas e 6 pretas, qual a probabilidade de tirar branca? Responda como fração irredutível a/b.',
            answer: '2/5', accept: ['4/10', '0.4'],
            hints: ['Total de bolas: 4 + 6.', 'Favoráveis: 4.', '4/10 simplifica.'],
            solution: ['Total: 10', 'Favoráveis: 4', 'P = 4/10 = 2/5'],
            traps: { '4/6': 'Você usou as pretas como total em vez de somar tudo.' } },
          { id: 'pb.fu.teo#b3', type: 'choice', prompt: 'Uma probabilidade pode valer 1,3 ?',
            choices: ['Sim, se o evento for muito provável', 'Não, probabilidade fica entre 0 e 1',
                      'Sim, em porcentagem', 'Depende do experimento'], answer: 1,
            hints: ['Probabilidade é uma razão entre favoráveis e possíveis.', 'Favoráveis nunca passam do total.',
                    'Logo a razão nunca passa de 1.'],
            solution: ['Casos favoráveis ⊆ casos possíveis', 'A razão é no máximo 1',
                       'Valor acima de 1 indica erro de contagem'] }
        ],
        intermediario: [
          { id: 'pb.fu.teo#i1', type: 'input', prompt: 'Ao lançar dois dados, quantos resultados possíveis existem?', answer: '36',
            hints: ['Cada dado tem 6 faces.', 'Os dados são distinguíveis: (1,2) é diferente de (2,1).',
                    '6 × 6.'],
            solution: ['Primeiro dado: 6 possibilidades', 'Segundo dado: 6 possibilidades',
                       'Princípio multiplicativo: 6 × 6 = 36'],
            traps: { '12': 'Você somou em vez de multiplicar.',
                     '11': 'Isso é o número de somas distintas, que não são equiprováveis.' } },
          { id: 'pb.fu.teo#i2', type: 'input', prompt: 'Ao lançar dois dados, qual a probabilidade de a soma ser 7? Responda como fração irredutível a/b.',
            answer: '1/6', accept: ['6/36'],
            hints: ['Liste os pares que somam 7.', '(1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — seis pares.',
                    'Divida por 36.'],
            solution: ['Pares com soma 7: 6', 'Total: 36', 'P = 6/36 = 1/6'],
            traps: { '1/11': 'Você tratou as 11 somas possíveis como equiprováveis.' } },
          { id: 'pb.fu.teo#i3', type: 'input', prompt: 'Num baralho de 52 cartas, qual a probabilidade de tirar uma carta de copas? Responda como fração irredutível a/b.',
            answer: '1/4', accept: ['13/52', '0.25'],
            hints: ['Quantas cartas de copas existem?', 'São 13, uma de cada valor.', '13/52.'],
            solution: ['Copas: 13 cartas', 'Total: 52', 'P = 13/52 = 1/4'] }
        ],
        avancado: [
          { id: 'pb.fu.teo#a1', type: 'input', prompt: 'Ao lançar três moedas, qual a probabilidade de sair pelo menos uma cara? Responda como fração a/b.',
            answer: '7/8',
            hints: ['Use o complementar: o oposto de "pelo menos uma cara" é "nenhuma cara".',
                    'Nenhuma cara é coroa nas três: 1 caso em 8.', 'P = 1 − 1/8.'],
            solution: ['Total de resultados: 2³ = 8',
                       'Complementar: nenhuma cara = (K,K,K) → 1 caso',
                       'P(nenhuma) = 1/8', 'P(pelo menos uma) = 1 − 1/8 = 7/8'],
            traps: { '3/8': 'Isso seria exatamente uma cara.',
                     '1/8': 'Isso é o complementar, não o evento pedido.' } },
          { id: 'pb.fu.teo#a2', type: 'input', prompt: 'Numa urna com 5 bolas numeradas de 1 a 5, tira-se uma. Qual a probabilidade de sair um número primo? Responda como fração a/b.',
            answer: '3/5',
            hints: ['Quais números de 1 a 5 são primos?', '2, 3 e 5. Cuidado: 1 não é primo.',
                    'Três favoráveis em cinco.'],
            solution: ['Primos entre 1 e 5: 2, 3, 5 → três', 'O 1 não é primo', 'P = 3/5'],
            traps: { '4/5': 'Você contou o 1 como primo.' } }
        ],
        desafio: [
          { id: 'pb.fu.teo#d1', type: 'input', prompt: 'Ao lançar dois dados, qual a probabilidade de a soma ser maior que 9? Responda como fração irredutível a/b.',
            answer: '1/6', accept: ['6/36'],
            hints: ['Some maior que 9 significa 10, 11 ou 12.',
                    'Soma 10: (4,6),(5,5),(6,4) → 3. Soma 11: (5,6),(6,5) → 2. Soma 12: (6,6) → 1.',
                    'Total de favoráveis: 6.'],
            solution: ['Soma 10: 3 pares', 'Soma 11: 2 pares', 'Soma 12: 1 par',
                       'Favoráveis: 3 + 2 + 1 = 6', 'P = 6/36 = 1/6'],
            traps: { '1/12': 'Você contou apenas a soma 12 ou dividiu errado.',
                     '3/36': 'Você contou só a soma 10.' } }
        ]
      },

      review: [
        'P(A) = favoráveis/possíveis, válido só sob equiprobabilidade.',
        'Toda probabilidade fica entre 0 e 1.',
        'Ao lançar dois dados, o espaço tem 36 pares — as somas não são equiprováveis.',
        'Para "pelo menos um", o complementar costuma ser muito mais curto.'
      ],

      lab: 'labProbabilidade'
    },

    /* ═══════════════════════════════════════════════════════════════
       Combinações
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'pb.ct.combinacoes',

      whatIs: `<p>Combinação conta de quantos jeitos se pode <strong>escolher</strong> <span class="math">p</span> elementos entre <span class="math">n</span>, quando a ordem <em>não</em> importa:</p>
        <p><span class="math">C(n,p) = n! / [p!(n − p)!]</span></p>
        <p>A divisão por <span class="math">p!</span> é o que remove as repetições: cada grupo foi contado <span class="math">p!</span> vezes no arranjo.</p>`,

      whyExists: `<p>Muitas situações se importam com <em>quem</em> foi escolhido, não com a ordem: uma comissão de três pessoas, uma mão de pôquer, os números de uma loteria.</p>
        <p>Usar arranjo nesses casos infla a contagem pelo fator <span class="math">p!</span>. O teste é sempre o mesmo: trocar a ordem dos escolhidos muda o resultado? Se não muda, é combinação.</p>`,

      simple: 'Combinação é escolher sem se importar com a ordem. É o arranjo dividido por p!, porque cada grupo foi contado uma vez para cada ordem possível.',

      academic: `<p>O número de subconjuntos de tamanho <span class="math">p</span> de um conjunto de <span class="math">n</span> elementos é <span class="math">C(n,p) = n!/[p!(n−p)!]</span>, também denotado <span class="math">\\binom{n}{p}</span>.</p>
        <p>Propriedades: <span class="math">C(n,p) = C(n, n−p)</span> (escolher quem entra equivale a escolher quem fica de fora); <span class="math">C(n,0) = C(n,n) = 1</span>; e a relação de Stifel <span class="math">C(n,p) = C(n−1,p−1) + C(n−1,p)</span>, que gera o triângulo de Pascal. A soma de uma linha do triângulo é <span class="math">2ⁿ</span>, o total de subconjuntos.</p>`,

      examples: [
        { level: 'basico', prompt: 'De quantos modos escolher 2 pessoas entre 5?',
          steps: ['A ordem não importa: é combinação',
                  'C(5,2) = 5!/(2!·3!)', '= (5×4)/(2×1)'],
          answer: '10' },
        { level: 'intermediario', prompt: 'Quantas comissões de 3 pessoas podem ser formadas com 8 candidatos?',
          steps: ['Comissão não tem ordem: combinação',
                  'C(8,3) = 8!/(3!·5!)', '= (8×7×6)/(3×2×1) = 336/6'],
          answer: '56' },
        { level: 'avancado', prompt: 'Numa turma de 10 pessoas, quantos grupos de 4 incluem obrigatoriamente a Ana?',
          steps: ['A Ana está fixa: sobram 3 vagas',
                  'Restam 9 candidatos para 3 vagas',
                  'C(9,3) = (9×8×7)/6'],
          answer: '84' }
      ],

      application: { area: 'Computação',
        text: 'Testar todas as combinações de p parâmetros entre n possíveis é C(n,p) casos. Com n = 30 e p = 15, são mais de 155 milhões — e é por isso que busca exaustiva em espaço combinatório não escala.' },

      formulas: [
        { f: 'C(n,p) = n! / [p!(n−p)!]', note: 'A ordem não importa.' },
        { f: 'A(n,p) = n! / (n−p)!', note: 'Arranjo: a ordem importa. C = A/p!.' },
        { f: 'C(n,p) = C(n, n−p)', note: 'Escolher p para entrar é o mesmo que escolher n−p para ficar de fora.' },
        { f: 'C(n,0) = C(n,n) = 1', note: 'Um único jeito de escolher nenhum ou todos.' },
        { f: 'Σ C(n,p) = 2ⁿ', note: 'Total de subconjuntos de um conjunto de n elementos.' }
      ],

      mistakes: [
        { erro: 'Usar arranjo para formar uma comissão',
          porque: 'Não perguntar se a ordem muda o resultado.',
          certo: 'Comissão {Ana, Bruno} é a mesma que {Bruno, Ana}. Use combinação.' },
        { erro: 'Usar combinação para uma senha de dígitos distintos',
          porque: 'Mesmo erro ao contrário.',
          certo: 'Senha 1234 é diferente de 4321. Ali a ordem importa: arranjo.' },
        { erro: 'Calcular C(10,3) expandindo 10! inteiro',
          porque: 'Não cancelar o fatorial do denominador.',
          certo: 'C(10,3) = (10×9×8)/(3×2×1). Basta descer p fatores do numerador.' }
      ],

      tip: 'Para calcular C(n,p) rápido, escreva p fatores decrescentes a partir de n em cima e p! embaixo. C(9,3) = (9·8·7)/(3·2·1) = 84. Nunca expanda o fatorial completo.',

      drills: {
        basico: [
          { id: 'pb.ct.comb#b1', type: 'input', prompt: 'Quanto vale C(5,2) ?', answer: '10',
            hints: ['C(n,p) = n!/[p!(n−p)!].', 'Atalho: (5×4)/(2×1).', '20/2.'],
            solution: ['C(5,2) = (5×4)/(2×1)', '= 20/2 = 10'],
            traps: { '20': 'Você calculou o arranjo A(5,2), sem dividir por 2!.' } },
          { id: 'pb.ct.comb#b2', type: 'input', prompt: 'Quanto vale C(6,6) ?', answer: '1',
            hints: ['Escolher todos os 6 entre 6.', 'Há quantos jeitos de fazer isso?', 'Um só.'],
            solution: ['C(n,n) = 1', 'Só existe um jeito de escolher todo mundo'],
            traps: { '6': 'Escolher todos os elementos dá um único grupo.' } },
          { id: 'pb.ct.comb#b3', type: 'choice', prompt: 'Formar uma senha de 4 dígitos distintos é problema de:',
            choices: ['Combinação', 'Arranjo', 'Permutação circular', 'Nenhum dos dois'], answer: 1,
            hints: ['Trocar a ordem dos dígitos muda a senha?', 'Sim: 1234 ≠ 4321.',
                    'Quando a ordem importa, é arranjo.'],
            solution: ['A ordem dos dígitos altera a senha', 'Logo é arranjo, não combinação'] }
        ],
        intermediario: [
          { id: 'pb.ct.comb#i1', type: 'input', prompt: 'Quantas comissões de 3 pessoas podem ser formadas com 7 candidatos?', answer: '35',
            hints: ['Comissão não tem ordem: combinação.', 'C(7,3) = (7×6×5)/(3×2×1).', '210/6.'],
            solution: ['C(7,3) = (7×6×5)/(3×2×1)', '= 210/6 = 35'],
            traps: { '210': 'Você calculou o arranjo: faltou dividir por 3!.' } },
          { id: 'pb.ct.comb#i2', type: 'input', prompt: 'Quanto vale C(10,8) ?', answer: '45',
            hints: ['Use a simetria: C(10,8) = C(10,2).', 'Isso é bem mais fácil de calcular.',
                    '(10×9)/2.'],
            solution: ['C(10,8) = C(10,2) por simetria', '= (10×9)/(2×1) = 45'],
            traps: { '90': 'Faltou dividir por 2!.' } },
          { id: 'pb.ct.comb#i3', type: 'input', prompt: 'Quantos subconjuntos tem um conjunto de 5 elementos?', answer: '32',
            hints: ['Cada elemento pode entrar ou não entrar.', 'São 2 escolhas por elemento.', '2⁵.'],
            solution: ['Cada elemento: entra ou não entra', '2⁵ = 32',
                       'Inclui o conjunto vazio e o conjunto todo'],
            traps: { '25': 'Você calculou 5², não 2⁵.',
                     '31': 'Você excluiu o conjunto vazio, que também é subconjunto.' } }
        ],
        avancado: [
          { id: 'pb.ct.comb#a1', type: 'input', prompt: 'De um grupo de 6 homens e 4 mulheres, quantas comissões de 3 pessoas têm exatamente 2 homens?',
            answer: '60',
            hints: ['Escolha 2 homens entre 6 e 1 mulher entre 4.', 'C(6,2) = 15 e C(4,1) = 4.',
                    'Multiplique: as escolhas são independentes.'],
            solution: ['Homens: C(6,2) = 15', 'Mulheres: C(4,1) = 4',
                       'Princípio multiplicativo: 15 × 4 = 60'],
            traps: { '19': 'Você somou em vez de multiplicar.',
                     '120': 'Você usou arranjo em alguma das escolhas.' } },
          { id: 'pb.ct.comb#a2', type: 'input', prompt: 'Numa loteria escolhem-se 6 números entre 60. Qual a probabilidade de acertar todos, escrita como 1 em quantos? (responda o denominador)',
            answer: '50063860',
            hints: ['O total de jogos é C(60,6).', 'C(60,6) = (60·59·58·57·56·55)/720.',
                    'O resultado passa de 50 milhões.'],
            solution: ['C(60,6) = (60×59×58×57×56×55)/(6×5×4×3×2×1)',
                       'Numerador: 36 045 979 200', 'Denominador: 720',
                       '= 50 063 860 jogos possíveis', 'P = 1/50 063 860'],
            traps: { '60': 'Isso é o total de números, não de jogos.' } }
        ],
        desafio: [
          { id: 'pb.ct.comb#d1', type: 'input', prompt: 'Quantas diagonais tem um polígono de 12 lados?',
            answer: '54',
            hints: ['Cada par de vértices define um segmento: C(12,2).',
                    'C(12,2) = 66, mas 12 desses segmentos são lados.',
                    'Diagonais = 66 − 12.'],
            solution: ['Segmentos entre vértices: C(12,2) = (12×11)/2 = 66',
                       'Desses, 12 são lados do polígono',
                       'Diagonais: 66 − 12 = 54'],
            traps: { '66': 'Faltou descontar os 12 lados.',
                     '12': 'Isso é o número de lados.' } }
        ]
      },

      review: [
        'Combinação escolhe sem ordem; arranjo escolhe com ordem.',
        'C(n,p) = A(n,p)/p! — a divisão remove as repetições de ordem.',
        'C(n,p) = C(n, n−p): escolher quem entra é escolher quem fica de fora.',
        'Calcule descendo p fatores no numerador; nunca expanda o fatorial inteiro.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Teorema de Bayes
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'pb.cd.bayes',

      whatIs: `<p>O teorema de Bayes inverte o condicionamento. Sabendo <span class="math">P(B|A)</span>, ele devolve <span class="math">P(A|B)</span>:</p>
        <p><span class="math">P(A|B) = P(B|A)·P(A) / P(B)</span></p>
        <p>É a ferramenta para atualizar uma crença diante de nova evidência.</p>`,

      whyExists: `<p>Quase sempre se conhece a probabilidade na direção "causa → efeito" — um teste detecta 99% dos doentes — mas a pergunta que interessa é a inversa: "dado que o teste deu positivo, qual a chance de eu estar doente?".</p>
        <p>A intuição responde "99%", e erra feio. Quando a doença é rara, a maioria dos positivos é falso positivo, porque há muito mais pessoas saudáveis sendo testadas. Bayes é o que corrige essa leitura — e é por isso que ele aparece em diagnóstico médico, filtro de spam e justiça criminal.</p>`,

      simple: 'Bayes vira a pergunta do avesso. Ele leva em conta quão comum a causa era antes da evidência — e é exatamente isso que a intuição esquece.',

      academic: `<p>Sendo <span class="math">{B₁,…,Bₙ}</span> uma partição de <span class="math">Ω</span>, o teorema da probabilidade total dá <span class="math">P(A) = Σ P(A|Bᵢ)P(Bᵢ)</span>. Bayes segue da definição de probabilidade condicional aplicada nos dois sentidos:</p>
        <p><span class="math">P(Bⱼ|A) = P(A|Bⱼ)P(Bⱼ) / Σ P(A|Bᵢ)P(Bᵢ)</span></p>
        <p>Vocabulário: <span class="math">P(Bⱼ)</span> é a <em>priori</em>, <span class="math">P(A|Bⱼ)</span> é a verossimilhança, <span class="math">P(Bⱼ|A)</span> é a <em>posteriori</em>. A falácia da taxa-base consiste em ignorar a priori.</p>`,

      examples: [
        { level: 'basico', prompt: 'P(A) = 0,3, P(B|A) = 0,8 e P(B) = 0,4. Calcule P(A|B).',
          steps: ['P(A|B) = P(B|A)·P(A)/P(B)', '= (0,8 × 0,3)/0,4', '= 0,24/0,4'],
          answer: '0,6' },
        { level: 'intermediario', prompt: 'Duas máquinas produzem peças: A faz 60% com 2% de defeito, B faz 40% com 5%. Uma peça defeituosa foi encontrada. Qual a chance de ter vindo de A?',
          steps: ['P(def) = 0,6(0,02) + 0,4(0,05) = 0,012 + 0,020 = 0,032',
                  'P(A|def) = 0,012/0,032'],
          answer: '0,375 = 37,5%' },
        { level: 'avancado', prompt: 'Uma doença atinge 1% da população. O teste acerta 99% dos doentes e dá 5% de falso positivo. Um teste deu positivo. Qual a chance real de estar doente?',
          steps: ['P(pos) = 0,01(0,99) + 0,99(0,05) = 0,0099 + 0,0495 = 0,0594',
                  'P(doente|pos) = 0,0099/0,0594'],
          answer: 'aproximadamente 16,7%' }
      ],

      application: { area: 'Medicina e triagem',
        text: 'É por isso que exames de rastreamento em população geral são seguidos de um segundo teste confirmatório. Com doença rara, mesmo um teste muito bom produz maioria de falsos positivos — e tratar com base no primeiro resultado seria erro sistemático.' },

      formulas: [
        { f: 'P(A|B) = P(B|A)·P(A) / P(B)', note: 'A forma compacta.' },
        { f: 'P(B) = P(B|A)P(A) + P(B|Aᶜ)P(Aᶜ)', note: 'Probabilidade total: o denominador quase sempre precisa ser montado.' },
        { f: 'P(A|B) = P(A ∩ B)/P(B)', note: 'A definição de onde tudo sai.' },
        { f: 'priori × verossimilhança → posteriori', note: 'O vocabulário da atualização de crença.' }
      ],

      mistakes: [
        { erro: 'Confundir P(positivo|doente) com P(doente|positivo)',
          porque: 'Ler os dois como "a precisão do teste".',
          certo: 'São grandezas diferentes. A segunda depende de quão rara é a doença.' },
        { erro: 'Ignorar a taxa-base',
          porque: 'Focar só na precisão do teste.',
          certo: 'Com prevalência de 1%, a maioria dos positivos vem dos 99% de saudáveis, mesmo com 5% de falso positivo.' },
        { erro: 'Usar P(B) sem calcular pela probabilidade total',
          porque: 'Supor que P(B) está dado quando não está.',
          certo: 'Quase sempre é preciso montar P(B) somando os caminhos que levam a B.' }
      ],

      tip: 'Traduza o problema para números absolutos numa população de 10.000. "1% doente" vira 100 doentes e 9.900 saudáveis; conte os positivos de cada grupo e divida. O resultado é o mesmo e a intuição para de brigar.',

      drills: {
        basico: [
          { id: 'pb.cd.bay#b1', type: 'input', prompt: 'Se P(B|A) = 0,6, P(A) = 0,5 e P(B) = 0,3, quanto vale P(A|B) ?',
            answer: '1',
            hints: ['P(A|B) = P(B|A)P(A)/P(B).', '(0,6 × 0,5) = 0,3.', '0,3/0,3.'],
            solution: ['P(A|B) = (0,6 × 0,5)/0,3', '= 0,3/0,3 = 1'],
            traps: { '0.3': 'Você parou no numerador.' } },
          { id: 'pb.cd.bay#b2', type: 'choice', prompt: 'P(doente|teste positivo) é a mesma coisa que P(teste positivo|doente) ?',
            choices: ['Sim, sempre', 'Não, e a diferença depende de quão comum é a doença',
                      'Sim, se o teste for bom', 'Só quando a probabilidade é 50%'], answer: 1,
            hints: ['Inverter o condicionamento muda o significado.', 'Bayes existe justamente para converter uma na outra.',
                    'A prevalência entra na conta.'],
            solution: ['São condicionamentos opostos',
                       'P(pos|doente) mede o teste; P(doente|pos) mede o paciente',
                       'A conversão depende da prevalência (a priori)'] },
          { id: 'pb.cd.bay#b3', type: 'input', prompt: 'Numa população de 1000 pessoas, 50 têm certa condição. Qual a probabilidade a priori de uma pessoa sorteada ter a condição? (decimal)',
            answer: '0.05', accept: ['0,05', '5%'],
            hints: ['Priori é a proporção antes de qualquer evidência.', '50 em 1000.', '50/1000.'],
            solution: ['P(condição) = 50/1000 = 0,05'],
            traps: { '50': 'A pergunta pede a probabilidade, não a quantidade.' } }
        ],
        intermediario: [
          { id: 'pb.cd.bay#i1', type: 'input', prompt: 'Máquina A faz 70% das peças com 3% de defeito; máquina B faz 30% com 6%. Qual a probabilidade de uma peça qualquer sair defeituosa? (decimal com 4 casas)',
            answer: '0.039', accept: ['0,039', '0.0390'],
            hints: ['Use probabilidade total.', 'P = 0,7(0,03) + 0,3(0,06).', '0,021 + 0,018.'],
            solution: ['P(def) = P(def|A)P(A) + P(def|B)P(B)',
                       '= 0,03(0,7) + 0,06(0,3)', '= 0,021 + 0,018 = 0,039'],
            traps: { '0.09': 'Você somou as taxas de defeito sem ponderar pela produção.' } },
          { id: 'pb.cd.bay#i2', type: 'input', prompt: 'Com os dados do exercício anterior, dado que a peça é defeituosa, qual a probabilidade de ter vindo da máquina A? (decimal com 3 casas)',
            answer: '0.538', accept: ['0,538', '0.54', '0,54'],
            hints: ['P(A|def) = P(def|A)P(A)/P(def).', 'Numerador: 0,021.', 'Divida por 0,039.'],
            solution: ['P(A|def) = 0,021/0,039', '≈ 0,538 ou 53,8%'],
            traps: { '0.7': 'Essa é a priori, antes da evidência do defeito.',
                     '0.03': 'Essa é a taxa de defeito da máquina A.' } }
        ],
        avancado: [
          { id: 'pb.cd.bay#a1', type: 'input', prompt: 'Doença atinge 2% da população. Teste detecta 95% dos doentes e tem 10% de falso positivo. Qual a probabilidade de estar doente dado um positivo? (decimal com 3 casas)',
            answer: '0.162', accept: ['0,162', '0.16', '0,16'],
            hints: ['P(pos) = 0,02(0,95) + 0,98(0,10).', '= 0,019 + 0,098 = 0,117.',
                    'P(doente|pos) = 0,019/0,117.'],
            solution: ['P(pos) = 0,02(0,95) + 0,98(0,10)', '= 0,019 + 0,098 = 0,117',
                       'P(doente|pos) = 0,019/0,117 ≈ 0,162',
                       'Ou seja: cerca de 16% — bem menos que os 95% que a intuição sugere'],
            traps: { '0.95': 'Essa é a sensibilidade do teste, não a chance de estar doente.',
                     '0.02': 'Essa é a priori, antes do resultado do teste.' } },
          { id: 'pb.cd.bay#a2', type: 'input', prompt: 'Numa população de 10.000, 100 têm a doença. O teste dá positivo em 99 dos doentes e em 495 dos saudáveis. Quantos positivos há no total?',
            answer: '594',
            hints: ['Some os positivos dos dois grupos.', '99 + 495.', 'Esse é o denominador de Bayes.'],
            solution: ['Positivos entre doentes: 99', 'Positivos entre saudáveis: 495',
                       'Total: 594', 'P(doente|pos) = 99/594 ≈ 16,7%'],
            traps: { '99': 'Faltou somar os falsos positivos.' } }
        ],
        desafio: [
          { id: 'pb.cd.bay#d1', type: 'input', prompt: 'Um e-mail contém a palavra "promoção". 80% dos spams a contêm, contra 5% dos e-mails legítimos. Se 30% dos e-mails são spam, qual a probabilidade de um e-mail com essa palavra ser spam? (decimal com 3 casas)',
            answer: '0.873', accept: ['0,873', '0.87', '0,87'],
            hints: ['P(palavra) = 0,3(0,8) + 0,7(0,05).', '= 0,24 + 0,035 = 0,275.',
                    'P(spam|palavra) = 0,24/0,275.'],
            solution: ['P(palavra) = 0,8(0,3) + 0,05(0,7)', '= 0,24 + 0,035 = 0,275',
                       'P(spam|palavra) = 0,24/0,275 ≈ 0,873',
                       'É exatamente assim que um filtro bayesiano de spam decide'],
            traps: { '0.8': 'Essa é P(palavra|spam), o condicionamento invertido.',
                     '0.3': 'Essa é a priori de spam.' } }
        ]
      },

      review: [
        'Bayes inverte o condicionamento: de P(B|A) para P(A|B).',
        'O denominador quase sempre precisa ser montado por probabilidade total.',
        'Ignorar a taxa-base é a falácia mais cara em diagnóstico e triagem.',
        'Traduzir para contagens numa população de 10.000 torna o resultado intuitivo.'
      ]
    }
  ]);
})(window.CZ);
