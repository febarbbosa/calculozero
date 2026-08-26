/* ==========================================================================
   data/sheets/12-algebra-linear.js — fichas de Álgebra Linear.
   Formato e regras em core/sheets.js.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([
    /* ════════════════════════════════════════════════════════════════
       Determinante
       ════════════════════════════════════════════════════════════════ */
    {
      topic: 'la.mt.determinante',

      whatIs: `<p>O determinante é um número extraído de uma matriz quadrada. Para <span class="math">2×2</span>:</p>
        <p><span class="math">det [a b; c d] = ad − bc</span></p>
        <p>Geometricamente, ele é o <strong>fator pelo qual a área muda</strong> quando a matriz é aplicada como transformação. Determinante zero significa que a área colapsou.</p>`,

      whyExists: `<p>Um único número responde três perguntas ao mesmo tempo: o sistema tem solução única? a matriz tem inversa? os vetores são linearmente independentes?</p>
        <p>As três são a mesma pergunta vista de ângulos diferentes, e a resposta é sempre "sim se <span class="math">det ≠ 0</span>". Quando o determinante zera, a transformação achatou o espaço numa dimensão menor — e informação foi perdida de forma irreversível.</p>`,

      simple: 'Para 2×2: multiplique a diagonal principal, subtraia a secundária. Zero significa que os vetores são paralelos e o espaço colapsou.',

      academic: `<p>O determinante é a única função <span class="math">n</span>-linear alternada nas colunas com <span class="math">det(I) = 1</span>. Para <span class="math">3×3</span> pode ser calculado por Sarrus ou por expansão de Laplace em cofatores.</p>
        <p>Propriedades: <span class="math">det(AB) = det(A)det(B)</span>; trocar duas linhas inverte o sinal; multiplicar uma linha por <span class="math">k</span> multiplica o determinante por <span class="math">k</span>; somar múltiplo de uma linha a outra não altera nada — é o que torna o escalonamento um método válido de cálculo.</p>
        <p><span class="math">det(A) ≠ 0 ⟺ A invertível ⟺ posto máximo ⟺ colunas LI</span>.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule det [3 2; 1 4]',
          steps: ['Diagonal principal: 3 × 4 = 12', 'Diagonal secundária: 2 × 1 = 2', '12 − 2'],
          answer: '10' },
        { level: 'intermediario', prompt: 'Os vetores (2,1) e (−1,2) formam base do R²?',
          steps: ['Monte a matriz com eles: [2 −1; 1 2]',
                  'det = 2(2) − (−1)(1) = 4 + 1 = 5',
                  'Determinante diferente de zero'],
          answer: 'Sim, det = 5 ≠ 0, então são LI e geram o R²' },
        { level: 'avancado', prompt: 'Para que valor de m os vetores (2,m) e (1,3) são LD?',
          steps: ['LD significa determinante zero',
                  'det = 2(3) − m(1) = 6 − m',
                  '6 − m = 0'],
          answer: 'm = 6' }
      ],

      application: { area: 'Computação gráfica',
        text: 'A matriz de uma transformação 2D tem determinante igual ao fator de escala de área. Determinante negativo significa que a orientação foi invertida — o objeto foi espelhado. Determinante zero significa que a projeção achatou tudo numa reta, e nenhuma inversa pode desfazer isso.' },

      formulas: [
        { f: 'det [a b; c d] = ad − bc', note: 'Principal menos secundária.' },
        { f: 'Sarrus (3×3): repita as duas primeiras colunas', note: 'Some as três diagonais descendentes, subtraia as três ascendentes.' },
        { f: 'det(A) ≠ 0 ⟺ A invertível', note: 'A equivalência que faz o determinante ser tão usado.' },
        { f: 'det(AB) = det(A)·det(B)', note: 'Os fatores de escala se multiplicam.' },
        { f: 'det = 0 ⟺ vetores LD', note: 'O espaço colapsou numa dimensão menor.' }
      ],

      mistakes: [
        { erro: 'Somar as diagonais em vez de subtrair',
          porque: 'Confundir com a regra de outra operação.',
          certo: 'É sempre principal MENOS secundária: ad − bc.' },
        { erro: 'Usar Sarrus em matriz 4×4',
          porque: 'Generalizar a regra além do caso em que ela vale.',
          certo: 'Sarrus só funciona para 3×3. Acima disso, use Laplace ou escalonamento.' },
        { erro: 'Calcular determinante de matriz não quadrada',
          porque: 'Não conferir a ordem antes.',
          certo: 'Determinante só existe para matrizes quadradas.' }
      ],

      tip: 'Antes de calcular, olhe se alguma linha é múltipla de outra. Se for, o determinante é zero e você já terminou — sem fazer conta nenhuma.',

      drills: {
        basico: [
          { id: 'la.mt.det#b1', type: 'input', prompt: 'Calcule det [5 3; 2 4].', answer: '14',
            hints: ['Principal menos secundária.', '5 × 4 = 20 e 3 × 2 = 6.', '20 − 6.'],
            solution: ['Principal: 5 × 4 = 20', 'Secundária: 3 × 2 = 6', 'det = 20 − 6 = 14'],
            traps: { '26': 'Você somou as diagonais em vez de subtrair.' } },
          { id: 'la.mt.det#b2', type: 'input', prompt: 'Calcule det [2 4; 1 2].', answer: '0',
            hints: ['2 × 2 = 4 e 4 × 1 = 4.', '4 − 4.', 'Repare que a primeira linha é o dobro da segunda.'],
            solution: ['Principal: 4', 'Secundária: 4', 'det = 0',
                       'Faz sentido: a linha 1 é o dobro da linha 2, então são LD'],
            traps: { '8': 'Você somou as diagonais.' } },
          { id: 'la.mt.det#b3', type: 'choice', prompt: 'Se det(A) = 0, o que se conclui ?',
            choices: ['A tem inversa', 'A não tem inversa', 'A é a matriz identidade', 'A é quadrada de ordem 2'],
            answer: 1,
            hints: ['A inversa envolve dividir pelo determinante.', 'Divisão por zero não existe.',
                    'Logo a inversa não existe.'],
            solution: ['A inversa é (1/det)·adj(A)', 'Com det = 0 a expressão não existe',
                       'A matriz é singular: não tem inversa'] }
        ],
        intermediario: [
          { id: 'la.mt.det#i1', type: 'input', prompt: 'Os vetores (3,1) e (6,2) são LI ou LD? Responda LI ou LD.',
            answer: 'LD', accept: ['ld'],
            hints: ['Monte a matriz e calcule o determinante.', 'det = 3(2) − 1(6) = 0.',
                    'Ou repare que (6,2) = 2·(3,1).'],
            solution: ['det [3 6; 1 2] = 3(2) − 6(1) = 0',
                       'Determinante zero → LD',
                       'De fato (6,2) é o dobro de (3,1)'],
            traps: { 'LI': 'Determinante zero significa dependência linear.' } },
          { id: 'la.mt.det#i2', type: 'input', prompt: 'Para que valor de k a matriz [k 2; 3 6] tem determinante zero ?', answer: '1',
            hints: ['det = 6k − 6.', 'Iguale a zero.', '6k = 6.'],
            solution: ['det = k(6) − 2(3) = 6k − 6', '6k − 6 = 0', 'k = 1'],
            traps: { '6': 'Faltou dividir por 6 ao isolar k.' } },
          { id: 'la.mt.det#i3', type: 'input', prompt: 'Se det(A) = 3 e det(B) = 4, quanto vale det(AB) ?', answer: '12',
            hints: ['Existe uma propriedade para o produto.', 'det(AB) = det(A)·det(B).', '3 × 4.'],
            solution: ['det(AB) = det(A)·det(B)', '= 3 × 4 = 12'],
            traps: { '7': 'A propriedade é multiplicativa, não aditiva.' } }
        ],
        avancado: [
          { id: 'la.mt.det#a1', type: 'input', prompt: 'O conjunto S = {(1,0,1), (1,1,0), (0,1,1)} gera o R³? Responda SIM ou NAO.',
            answer: 'SIM', accept: ['sim', 'S'],
            hints: ['Monte a matriz 3×3 com os vetores nas linhas e calcule o determinante.',
                    'Por Sarrus: 1(1·1 − 0·1) − 0(1·1 − 0·0) + 1(1·1 − 1·0).',
                    'O resultado é 2, diferente de zero.'],
            solution: ['Matriz: [1 0 1; 1 1 0; 0 1 1]',
                       'Expandindo pela primeira linha: 1(1−0) − 0(1−0) + 1(1−0) = 1 + 1 = 2',
                       'det = 2 ≠ 0 → LI e gerador → é base do R³'],
            traps: { 'NAO': 'Determinante 2 ≠ 0 garante que geram o espaço.' } },
          { id: 'la.mt.det#a2', type: 'input', prompt: 'Para que valor de m os vetores (2,m,0), (1,−1,2) e (−1,3,−1) são coplanares ?',
            answer: '-10',
            hints: ['Coplanares significa produto misto (determinante 3×3) igual a zero.',
                    'Expandindo pela primeira linha: 2[(−1)(−1) − 2(3)] − m[1(−1) − 2(−1)] + 0.',
                    '2(1 − 6) − m(−1 + 2) = −10 − m.'],
            solution: ['Coplanares ⟺ det = 0',
                       '2[(−1)(−1) − (2)(3)] − m[(1)(−1) − (2)(−1)] + 0[…]',
                       '= 2(1 − 6) − m(−1 + 2) = −10 − m',
                       '−10 − m = 0 → m = −10'],
            traps: { '10': 'Sinal trocado ao isolar m.' } }
        ],
        desafio: [
          { id: 'la.mt.det#d1', type: 'input', prompt: 'Se A é 3×3 com det(A) = 5, quanto vale det(2A) ?', answer: '40',
            hints: ['Multiplicar a matriz inteira por 2 multiplica CADA linha por 2.',
                    'Cada linha multiplicada por k multiplica o determinante por k.',
                    'São 3 linhas: fator 2³.'],
            solution: ['det(kA) = kⁿ·det(A), com n a ordem da matriz',
                       'n = 3, k = 2 → 2³ = 8', 'det(2A) = 8 × 5 = 40'],
            traps: { '10': 'Você multiplicou por 2 só uma vez; cada uma das 3 linhas contribui com um fator.',
                     '5': 'Multiplicar a matriz altera o determinante.' } }
        ]
      },

      review: [
        'det 2×2 é principal menos secundária: ad − bc.',
        'det ≠ 0 equivale a: tem inversa, sistema com solução única, vetores LI.',
        'det = 0 significa colapso de dimensão — informação perdida.',
        'Linha múltipla de outra zera o determinante sem precisar calcular.'
      ]
    },

    /* ════════════════════════════════════════════════════════════════
       Escalonamento
       ════════════════════════════════════════════════════════════════ */
    {
      topic: 'la.si.escalonamento',

      whatIs: `<p>Escalonar é aplicar operações elementares às linhas de uma matriz até deixá-la em forma triangular — zeros abaixo da diagonal.</p>
        <p>As operações permitidas são três: <strong>trocar duas linhas</strong>, <strong>multiplicar uma linha por número não nulo</strong> e <strong>somar a uma linha um múltiplo de outra</strong>. Nenhuma delas altera o conjunto solução.</p>`,

      whyExists: `<p>Substituição funciona bem em sistemas 2×2 e vira um pesadelo em 4×4. Escalonamento é um <em>algoritmo</em>: sempre os mesmos passos, sem depender de enxergar o atalho.</p>
        <p>É por isso que ele é o que roda por dentro de qualquer biblioteca numérica. Resolver <span class="math">Ax = b</span> em NumPy é eliminação gaussiana com pivoteamento — o mesmo procedimento feito à mão, com cuidados extras de estabilidade numérica.</p>`,

      simple: 'Vá zerando o que está abaixo da diagonal, uma coluna por vez. No fim, a última linha entrega uma incógnita direto, e você volta substituindo para cima.',

      academic: `<p>As três operações elementares correspondem à multiplicação à esquerda por matrizes elementares invertíveis, o que garante que o sistema resultante é equivalente ao original.</p>
        <p>Na forma escalonada, o número de linhas não nulas é o <em>posto</em>. Comparando o posto da matriz dos coeficientes com o da matriz aumentada, classifica-se o sistema: postos diferentes ⟹ incompatível; postos iguais e menores que o número de incógnitas ⟹ infinitas soluções; postos iguais ao número de incógnitas ⟹ solução única.</p>
        <p>A complexidade é <span class="math">O(n³)</span>. O pivoteamento parcial — trocar linhas para usar o maior pivô disponível — é essencial para estabilidade em ponto flutuante.</p>`,

      examples: [
        { level: 'basico', prompt: 'Escalone o sistema x + y = 5, 2x − y = 1',
          steps: ['Matriz aumentada: [1 1 | 5; 2 −1 | 1]',
                  'L2 ← L2 − 2·L1: [1 1 | 5; 0 −3 | −9]',
                  'Da segunda linha: −3y = −9 → y = 3',
                  'Substituindo: x + 3 = 5 → x = 2'],
          answer: 'x = 2, y = 3' },
        { level: 'intermediario', prompt: 'O que significa chegar a uma linha 0 0 | 5 ?',
          steps: ['Essa linha diz 0x + 0y = 5',
                  'Nenhum valor de x e y satisfaz isso'],
          answer: 'Sistema impossível: não há solução' },
        { level: 'avancado', prompt: 'O que significa chegar a uma linha 0 0 | 0 ?',
          steps: ['A linha diz 0 = 0, o que é verdade sempre',
                  'Ela não acrescenta restrição: uma equação era redundante',
                  'Sobram menos equações que incógnitas'],
          answer: 'Sistema possível e indeterminado: infinitas soluções' }
      ],

      application: { area: 'Ciência de Dados',
        text: 'Regressão linear múltipla resolve as equações normais, um sistema linear. Quando duas variáveis explicativas são quase colineares, o sistema fica quase singular e a solução vira instável — pequenas mudanças nos dados produzem coeficientes completamente diferentes. É multicolinearidade vista pelo lado do escalonamento.' },

      formulas: [
        { f: 'Lᵢ ↔ Lⱼ', note: 'Trocar duas linhas. Muda o sinal do determinante.' },
        { f: 'Lᵢ ← k·Lᵢ, com k ≠ 0', note: 'Multiplicar uma linha. Multiplica o determinante por k.' },
        { f: 'Lᵢ ← Lᵢ + k·Lⱼ', note: 'A operação principal. Não altera o determinante.' },
        { f: 'posto(A) = posto(A|b) = n ⟹ solução única', note: 'Critério de classificação.' },
        { f: 'Linha 0…0 | c com c ≠ 0 ⟹ impossível', note: 'A linha afirma 0 = c.' }
      ],

      mistakes: [
        { erro: 'Esquecer de aplicar a operação no termo independente',
          porque: 'Trabalhar só com a parte dos coeficientes.',
          certo: 'A matriz aumentada inclui a coluna de b. Toda operação vale para a linha inteira.' },
        { erro: 'Multiplicar uma linha por zero',
          porque: 'Tentar zerar uma linha inteira de uma vez.',
          certo: 'Multiplicar por zero destrói informação e muda o sistema. O k tem de ser não nulo.' },
        { erro: 'Ler linha 0 0 | 0 como sistema impossível',
          porque: 'Confundir os dois casos degenerados.',
          certo: '0 = 0 é verdade e indica redundância: infinitas soluções. Impossível é 0 = c com c ≠ 0.' }
      ],

      tip: 'Escreva a matriz aumentada com uma barra separando os coeficientes do termo independente, e anote a operação ao lado de cada linha modificada. Conferir depois fica trivial, e é onde o erro costuma estar.',

      drills: {
        basico: [
          { id: 'la.si.esc#b1', type: 'choice', prompt: 'Qual destas NÃO é operação elementar válida ?',
            choices: ['Trocar duas linhas', 'Multiplicar uma linha por 3',
                      'Multiplicar uma linha por 0', 'Somar a L2 o dobro de L1'], answer: 2,
            hints: ['As operações precisam ser reversíveis.', 'Multiplicar por zero apaga a linha.',
                    'Não há como desfazer isso.'],
            solution: ['As três operações válidas são reversíveis',
                       'Multiplicar por 0 zera a linha e destrói informação',
                       'Ela alteraria o conjunto solução'] },
          { id: 'la.si.esc#b2', type: 'input', prompt: 'No sistema x + y = 5 e 2x − y = 1, aplicando L2 ← L2 − 2·L1, qual o novo coeficiente de y na L2 ?',
            answer: '-3',
            hints: ['Coeficiente de y em L2: −1. Em L1: 1.', '−1 − 2(1).', '= −3.'],
            solution: ['L2 antes: coeficiente de y é −1', 'L1: coeficiente de y é 1',
                       'Novo: −1 − 2(1) = −3'],
            traps: { '1': 'Você não aplicou a operação nesse coeficiente.' } },
          { id: 'la.si.esc#b3', type: 'choice', prompt: 'Chegar à linha 0 0 0 | 7 significa:',
            choices: ['Solução única', 'Infinitas soluções', 'Sistema impossível', 'Erro de conta'],
            answer: 2,
            hints: ['Traduza a linha em equação.', '0x + 0y + 0z = 7.', 'Isso é falso para qualquer valor.'],
            solution: ['A linha afirma 0 = 7', 'Nenhum valor das incógnitas satisfaz',
                       'Sistema incompatível: sem solução'] }
        ],
        intermediario: [
          { id: 'la.si.esc#i1', type: 'input', prompt: 'Resolva por escalonamento: x + 2y = 8 e 3x − y = 3. Responda x e y separados por vírgula.',
            answer: '2,3', accept: ['2, 3'],
            hints: ['L2 ← L2 − 3·L1 elimina o x.', 'Fica −7y = −21.', 'y = 3, e depois substitua em L1.'],
            solution: ['L2 ← L2 − 3L1: (3−3)x + (−1−6)y = 3 − 24',
                       '−7y = −21 → y = 3', 'x + 2(3) = 8 → x = 2'],
            traps: { '3,2': 'Você inverteu x com y.' } },
          { id: 'la.si.esc#i2', type: 'choice', prompt: 'Um sistema 3×3 escalonado termina em 0 0 0 | 0. O que se conclui ?',
            choices: ['Solução única', 'Infinitas soluções', 'Impossível', 'Nada se conclui'], answer: 1,
            hints: ['A linha 0 = 0 é sempre verdadeira.', 'Ela não restringe nada.',
                    'Sobram menos equações úteis que incógnitas.'],
            solution: ['A linha é redundante: não acrescenta restrição',
                       'Restam 2 equações úteis para 3 incógnitas',
                       'Sistema possível e indeterminado: infinitas soluções'] },
          { id: 'la.si.esc#i3', type: 'input', prompt: 'Um sistema 3×3 escalonado tem posto 3 na matriz dos coeficientes e posto 3 na aumentada. Quantas soluções ele tem ?',
            answer: '1',
            hints: ['Postos iguais significa compatível.', 'Posto igual ao número de incógnitas significa determinado.',
                    'Determinado significa uma solução.'],
            solution: ['posto(A) = posto(A|b) → compatível',
                       'posto = número de incógnitas (3) → determinado', 'Solução única'],
            traps: { '0': 'Postos iguais garantem que existe solução.',
                     '3': 'Três é o número de incógnitas, não de soluções.' } }
        ],
        avancado: [
          { id: 'la.si.esc#a1', type: 'input', prompt: 'Resolva: x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2. Responda x, y e z separados por vírgula.',
            answer: '1,2,3', accept: ['1, 2, 3'],
            hints: ['L2 ← L2 − 2L1 e L3 ← L3 − L1.',
                    'Isso dá −3y − z = −9 e y − 2z = −4.',
                    'Resolva o sistema 2×2 restante e volte.'],
            solution: ['L2 ← L2 − 2L1: −3y − z = −9',
                       'L3 ← L3 − L1: y − 2z = −4',
                       'Da segunda: y = 2z − 4. Substituindo: −3(2z−4) − z = −9',
                       '−6z + 12 − z = −9 → −7z = −21 → z = 3',
                       'y = 2(3) − 4 = 2', 'x = 6 − 2 − 3 = 1'],
            traps: { '3,2,1': 'Ordem invertida: confira qual valor pertence a cada incógnita.' } },
          { id: 'la.si.esc#a2', type: 'input', prompt: 'Para que valor de k o sistema x + 2y = 3 e 2x + ky = 6 tem infinitas soluções ?',
            answer: '4',
            hints: ['Infinitas soluções exigem que a segunda equação seja múltipla da primeira.',
                    'A segunda é o dobro da primeira nos termos conhecidos: 2 = 2(1) e 6 = 2(3).',
                    'Então k tem de ser 2 × 2.'],
            solution: ['Para ser redundante, L2 = 2·L1',
                       'Coeficiente de x: 2 = 2(1) ✓', 'Termo independente: 6 = 2(3) ✓',
                       'Coeficiente de y: k = 2(2) = 4'],
            traps: { '2': 'Esse é o fator de proporção, não o valor de k.' } }
        ],
        desafio: [
          { id: 'la.si.esc#d1', type: 'input', prompt: 'Para que valor de k o sistema x + 2y = 3 e 2x + ky = 7 é impossível ?',
            answer: '4',
            hints: ['Impossível exige coeficientes proporcionais mas termos independentes não.',
                    'Com k = 4, a segunda equação seria 2x + 4y = 7.',
                    'Mas o dobro da primeira daria 2x + 4y = 6 — contradição.'],
            solution: ['Com k = 4: L2 é 2x + 4y = 7',
                       '2·L1 seria 2x + 4y = 6',
                       'As duas afirmam valores diferentes para a mesma expressão',
                       'Escalonando aparece 0 = 1: impossível'],
            traps: { '2': 'Esse valor daria um sistema com solução única.' } }
        ]
      },

      review: [
        'Três operações elementares: trocar linhas, multiplicar por k ≠ 0, somar múltiplo de outra.',
        'Trabalhe sempre com a matriz aumentada — o termo independente entra em toda operação.',
        'Linha 0…0 | c com c ≠ 0 significa impossível; linha toda zero significa redundância.',
        'Compare os postos para classificar o sistema sem resolver.'
      ]
    }
  ]);
})(window.CZ);
