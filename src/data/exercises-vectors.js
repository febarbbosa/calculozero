/* ==========================================================================
   data/exercises-vectors.js — exercícios da trilha de vetores.

   As questões vêm das listas reais da disciplina Física das Variações
   (Prof. Me. Izaias Neri). A origem está anotada em cada item para que dê
   para cruzar com o material da aula.

   Ver exercises.js para o formato e o papel de `traps`.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const EXERCISES = [

    /* ═══════════ Vetores geométricos (Listas 01-A e 01-B) ═══════════ */
    { id: 'vg-g1', topic: 'vetores-geo', type: 'choice',
      prompt: 'Dois vetores têm o mesmo módulo e a mesma direção. Eles são necessariamente iguais?',
      choices: ['Sim, sempre', 'Não — podem ter sentidos opostos', 'Só se estiverem no mesmo lugar', 'Só em R²'],
      answer: 1,
      hints: [
        'Um vetor precisa de três informações para ficar definido. Quantas foram dadas?',
        'Módulo e direção foram dados. Falta uma.',
        'Falta o sentido. Mesma reta, mas apontando para lados contrários.'
      ],
      solution: [
        'Vetor = módulo + direção + sentido',
        'O enunciado garantiu só módulo e direção',
        'v e −v têm mesmo módulo e mesma direção, mas sentidos opostos',
        'Logo não são necessariamente iguais'
      ] },

    { id: 'vg-s1', topic: 'vetores-geo', type: 'choice',
      prompt: 'Sobre os vetores u e −u, é correto afirmar:',
      choices: [
        'Têm direções diferentes',
        'Têm módulos diferentes',
        'Mesma direção, mesmo módulo, sentidos opostos',
        'São o mesmo vetor'
      ],
      answer: 2,
      hints: [
        'O sinal negativo mexe em qual das três características?',
        'Ele não encolhe nem gira a reta.',
        'Só inverte para onde a flecha aponta.'
      ],
      solution: [
        'O sinal não altera o comprimento → mesmo módulo',
        'Não altera a reta de apoio → mesma direção',
        'Inverte a ponta da flecha → sentido oposto'
      ],
      traps: {} },

    { id: 'vg-g2', topic: 'vetores-geo', type: 'input',
      prompt: 'Lista 01-B · Duas forças perpendiculares de 300 N e 400 N agem sobre um gancho. Qual a intensidade da força resultante, em N?',
      answer: '500',
      hints: [
        'Perpendiculares significa 90° entre elas. Isso simplifica muito a conta.',
        'Com 90°, o cosseno some da lei dos cossenos e sobra Pitágoras.',
        'Calcule √(300² + 400²).'
      ],
      solution: [
        'Ângulo de 90° → lei dos cossenos vira Pitágoras',
        '|R| = √(300² + 400²)',
        '= √(90000 + 160000) = √250000',
        '|R| = 500 N'
      ],
      traps: { '700': 'Você somou os módulos direto. Isso só vale quando as forças têm a mesma direção e sentido — aqui elas são perpendiculares.' } },

    { id: 'vg-s2', topic: 'vetores-geo', type: 'input',
      prompt: 'Duas forças de 200 N e 500 N agem no mesmo ponto. Qual o MAIOR valor possível para a resultante, em N?',
      answer: '700',
      hints: [
        'O ângulo entre elas pode ser qualquer um. Qual ângulo ajuda mais?',
        'A resultante é máxima quando as duas puxam para o mesmo lado.',
        'Nesse caso o ângulo é 0° e os módulos simplesmente somam.'
      ],
      solution: [
        'A resultante cresce conforme o ângulo diminui',
        'No caso extremo, ângulo = 0° (mesma direção e sentido)',
        'Aí os módulos somam: 200 + 500 = 700 N'
      ],
      traps: { '300': 'Esse é o MENOR valor possível (sentidos opostos). A pergunta era o maior.' } },

    { id: 'vg-x1', topic: 'vetores-geo', type: 'input',
      prompt: 'As mesmas forças de 200 N e 500 N. Qual o MENOR valor possível para a resultante, em N?',
      answer: '300',
      hints: [
        'Agora queremos que uma atrapalhe a outra ao máximo.',
        'Isso acontece quando elas apontam para lados contrários.',
        'Ângulo de 180°: os módulos se subtraem.'
      ],
      solution: [
        'Resultante mínima ocorre a 180° (sentidos opostos)',
        'Os módulos se subtraem: 500 − 200',
        '= 300 N'
      ] },

    /* ═══════════ Vetores algébricos (Lista 02) ═══════════ */
    { id: 'va-g1', topic: 'vetores-alg', type: 'input',
      prompt: 'Lista 02 · Dados u = (2, −3) e v = (−1, 4), determine 3u + 2v. (responda no formato (a, b))',
      answer: '(4, -1)',
      hints: [
        'Faça uma multiplicação de cada vez, antes de somar qualquer coisa.',
        '3u = (6, −9) e 2v = (−2, 8).',
        'Agora some componente com componente.'
      ],
      solution: [
        '3u = 3·(2, −3) = (6, −9)',
        '2v = 2·(−1, 4) = (−2, 8)',
        'Some: (6 + (−2), −9 + 8)',
        'Resultado: (4, −1)'
      ],
      traps: { '(4, 7)': 'Erro de sinal na segunda componente: −9 + 8 = −1, não 7.' } },

    { id: 'va-s1', topic: 'vetores-alg', type: 'input',
      prompt: 'Lista 02 · Com os mesmos u = (2, −3) e v = (−1, 4), determine −2u + v.',
      answer: '(-5, 10)',
      hints: [
        'Cuidado: o −2 multiplica as duas componentes de u, inclusive a que já é negativa.',
        '−2u = (−4, 6). Note que −2 × (−3) deu +6.',
        'Agora some v = (−1, 4).'
      ],
      solution: [
        '−2u = −2·(2, −3) = (−4, 6)',
        'Menos vezes menos deu positivo na segunda componente',
        'Some v: (−4 + (−1), 6 + 4)',
        'Resultado: (−5, 10)'
      ],
      traps: { '(-5, -10)': 'Na segunda componente, −2 × (−3) = +6, não −6. Sinais iguais dão positivo.' } },

    { id: 'va-g2', topic: 'vetores-alg', type: 'input',
      prompt: 'Lista 03 · Dados os pontos A(4, −1, 2) e B(3, 2, −1), determine o vetor AB.',
      answer: '(-1, 3, -3)',
      hints: [
        'A regra é sempre a mesma: ponta menos origem.',
        'AB = B − A. Cuidado com a ordem — inverter dá o vetor oposto.',
        'Subtraia coordenada por coordenada: (3−4, 2−(−1), −1−2).'
      ],
      solution: [
        'AB = B − A',
        'Primeira: 3 − 4 = −1',
        'Segunda: 2 − (−1) = 2 + 1 = 3',
        'Terceira: −1 − 2 = −3',
        'AB = (−1, 3, −3)'
      ],
      traps: { '(1, -3, 3)': 'Você calculou A − B. A ordem é ponta menos origem: AB = B − A.' } },

    { id: 'va-s2', topic: 'vetores-alg', type: 'input',
      prompt: 'Qual é o módulo do vetor u = (2, −2, 1)?',
      answer: '3',
      hints: [
        'Módulo é Pitágoras estendido para três componentes.',
        '|u| = √(a² + b² + c²). O sinal some ao elevar ao quadrado.',
        'Calcule √(4 + 4 + 1).'
      ],
      solution: [
        '|u| = √(2² + (−2)² + 1²)',
        'Os quadrados eliminam o sinal: √(4 + 4 + 1)',
        '= √9 = 3'
      ],
      traps: { '1': 'Você somou as componentes (2 − 2 + 1). Módulo eleva cada uma ao quadrado antes de somar.' } },

    { id: 'va-x1', topic: 'vetores-alg', type: 'choice',
      prompt: 'Qual é o versor (vetor unitário) de u = (3, 4)?',
      choices: ['(3, 4)', '(0,6 ; 0,8)', '(1, 1)', '(1,5 ; 2)'],
      answer: 1,
      hints: [
        'Versor é o vetor dividido pelo próprio módulo.',
        '|u| = √(9 + 16) = 5.',
        'Divida cada componente por 5.'
      ],
      solution: [
        '|u| = √(3² + 4²) = √25 = 5',
        'û = u / |u| = (3/5, 4/5)',
        '= (0,6 ; 0,8)',
        'Confira: 0,6² + 0,8² = 0,36 + 0,64 = 1 ✓'
      ] },

    /* ═══════════ Produto escalar (Listas 03 e 09) ═══════════ */
    { id: 'pe-g1', topic: 'produto-escalar', type: 'input',
      prompt: 'Lista 03 · Dados u = 3i − 5j + 8k e v = 4i − 2j − 3k, determine ⟨u, v⟩.',
      answer: '-2',
      hints: [
        'Primeiro reescreva em coordenadas: u = (3, −5, 8) e v = (4, −2, −3).',
        'Multiplique as componentes correspondentes e some tudo.',
        '3·4 = 12, (−5)·(−2) = +10, 8·(−3) = −24.'
      ],
      solution: [
        'u = (3, −5, 8) e v = (4, −2, −3)',
        'Primeira: 3 · 4 = 12',
        'Segunda: (−5) · (−2) = +10 (sinais iguais)',
        'Terceira: 8 · (−3) = −24',
        'Some: 12 + 10 − 24 = −2'
      ],
      traps: { '-22': 'Erro de sinal no termo do meio: (−5)·(−2) dá +10, não −10.' } },

    { id: 'pe-s1', topic: 'produto-escalar', type: 'input',
      prompt: 'Lista 03 · Sejam u = (3, 2, 1) e v = (−1, −4, −1). Calcule ⟨u, v⟩.',
      answer: '-12',
      hints: [
        'Multiplique componente a componente e some.',
        '3·(−1), depois 2·(−4), depois 1·(−1).',
        '−3, −8 e −1. Some os três.'
      ],
      solution: [
        '3 · (−1) = −3',
        '2 · (−4) = −8',
        '1 · (−1) = −1',
        'Some: −3 − 8 − 1 = −12',
        'Negativo → o ângulo entre eles é obtuso'
      ] },

    { id: 'pe-g2', topic: 'produto-escalar', type: 'input',
      prompt: 'Para que valor de m os vetores u = (2, m) e v = (3, 6) são perpendiculares?',
      answer: '-1',
      hints: [
        'Existe um teste de uma linha para perpendicularidade.',
        'Dois vetores são perpendiculares quando o produto escalar dá zero.',
        'Monte 2·3 + m·6 = 0 e resolva.'
      ],
      solution: [
        'Perpendiculares ⇔ ⟨u, v⟩ = 0',
        '⟨u, v⟩ = 2·3 + m·6 = 6 + 6m',
        'Iguale a zero: 6 + 6m = 0',
        '6m = −6, logo m = −1'
      ],
      traps: { '1': 'Erro de sinal ao isolar: 6m = −6 dá m = −1.' } },

    { id: 'pe-s2', topic: 'produto-escalar', type: 'input',
      prompt: 'Qual é o ângulo, em graus, entre u = (1, 0) e v = (1, 1)?',
      answer: '45',
      hints: [
        'Use cos θ = ⟨u,v⟩ / (|u|·|v|).',
        '⟨u,v⟩ = 1, |u| = 1 e |v| = √2.',
        'cos θ = 1/√2 ≈ 0,707. Que ângulo tem esse cosseno?'
      ],
      solution: [
        '⟨u, v⟩ = 1·1 + 0·1 = 1',
        '|u| = 1 e |v| = √(1+1) = √2',
        'cos θ = 1 / √2 = √2/2',
        'θ = 45°'
      ],
      traps: { '90': 'A 90° o produto escalar seria zero — aqui ele deu 1, então o ângulo é agudo.' } },

    { id: 'pe-x1', topic: 'produto-escalar', type: 'input',
      prompt: 'Lista 09 · Sejam u = (3, −2) e v = (4, 5). Calcule ⟨u, v⟩.',
      answer: '2',
      hints: ['Produto interno euclidiano é o produto escalar de sempre.', '3·4 e depois (−2)·5.', '12 − 10.'],
      solution: ['3 · 4 = 12', '(−2) · 5 = −10', '12 − 10 = 2'] },

    /* ═══════════ Produto vetorial (Lista 04) ═══════════ */
    { id: 'pv-g1', topic: 'produto-vetorial', type: 'input',
      prompt: 'Lista 04 · Dados u = (3, 1, 2) e v = (−2, 2, 5), determine u × v.',
      answer: '(1, -19, 8)',
      hints: [
        'Monte o determinante com i, j, k na primeira linha, u na segunda e v na terceira.',
        'Lembre que o termo do meio (o j) entra com sinal negativo.',
        'i: (1·5 − 2·2). j: −(3·5 − 2·(−2)). k: (3·2 − 1·(−2)).'
      ],
      solution: [
        'i: (1·5 − 2·2) = 5 − 4 = 1',
        'j: −(3·5 − 2·(−2)) = −(15 + 4) = −19',
        'k: (3·2 − 1·(−2)) = 6 + 2 = 8',
        'u × v = (1, −19, 8)',
        'Confira: ⟨u, u×v⟩ = 3 − 19 + 16 = 0 ✓ perpendicular'
      ],
      traps: { '(1, 19, 8)': 'Faltou o sinal negativo do termo do meio. No determinante, o j sempre entra com sinal trocado.' } },

    { id: 'pv-s1', topic: 'produto-vetorial', type: 'input',
      prompt: 'Lista 04 · Calcule u × v para u = 5i + 4j e v = i + k.',
      answer: '(4, -5, -4)',
      hints: [
        'Reescreva em coordenadas: u = (5, 4, 0) e v = (1, 0, 1). O que não aparece vale zero.',
        'Monte o determinante e abra pela primeira linha.',
        'i: (4·1 − 0·0). j: −(5·1 − 0·1). k: (5·0 − 4·1).'
      ],
      solution: [
        'u = (5, 4, 0) e v = (1, 0, 1)',
        'i: (4·1 − 0·0) = 4',
        'j: −(5·1 − 0·1) = −5',
        'k: (5·0 − 4·1) = −4',
        'u × v = (4, −5, −4)'
      ] },

    { id: 'pv-x1', topic: 'produto-vetorial', type: 'choice',
      prompt: 'Sobre o produto vetorial, é correto afirmar que:',
      choices: [
        'u × v = v × u',
        'u × v = −(v × u)',
        'O resultado é um número',
        'Só existe em R²'
      ],
      answer: 1,
      hints: [
        'Trocar duas linhas de um determinante faz o quê com o resultado?',
        'Troca o sinal.',
        'Como u e v são linhas do determinante, inverter a ordem inverte o vetor.'
      ],
      solution: [
        'u e v ocupam linhas do determinante',
        'Trocar duas linhas inverte o sinal do determinante',
        'Logo u × v = −(v × u): o produto vetorial NÃO é comutativo',
        'E o resultado é um vetor, não um número — isso é o produto escalar'
      ] },

    /* ═══════════ Produto misto (Lista 05) ═══════════ */
    { id: 'pm-g1', topic: 'produto-misto', type: 'input',
      prompt: 'Lista 05 · Calcule o produto misto de u = 2i + 3j + 5k, v = −i + 3j + 3k e w = 4i − 3j + 2k.',
      answer: '27',
      hints: [
        'Produto misto é o determinante 3×3 com os três vetores nas linhas.',
        'Monte: linha 1 = (2,3,5), linha 2 = (−1,3,3), linha 3 = (4,−3,2).',
        'Abra pela primeira linha, lembrando do sinal negativo no termo do meio.'
      ],
      solution: [
        'Monte o determinante com u, v, w nas linhas',
        '2·(3·2 − 3·(−3)) = 2·(6 + 9) = 30',
        '−3·((−1)·2 − 3·4) = −3·(−14) = +42',
        '+5·((−1)·(−3) − 3·4) = 5·(3 − 12) = −45',
        'Some: 30 + 42 − 45 = 27'
      ] },

    { id: 'pm-s1', topic: 'produto-misto', type: 'input',
      prompt: 'Lista 05 · Qual deve ser o valor de m para que u = (2, m, 0), v = (1, −1, 2) e w = (−1, 3, −1) sejam coplanares?',
      answer: '-10',
      hints: [
        'Coplanares significa que o volume da caixa é zero.',
        'Então o produto misto (determinante 3×3) tem que dar zero.',
        'Monte o determinante, ele fica −10 − m. Iguale a zero.'
      ],
      solution: [
        'Coplanares ⇔ produto misto = 0',
        '2·((−1)(−1) − 2·3) = 2·(1 − 6) = −10',
        '−m·(1·(−1) − 2·(−1)) = −m·(−1 + 2) = −m',
        'O terceiro termo tem fator 0, some',
        'Equação: −10 − m = 0, logo m = −10'
      ],
      traps: { '10': 'Erro de sinal ao isolar: de −10 − m = 0 vem m = −10.' } },

    { id: 'pm-x1', topic: 'produto-misto', type: 'choice',
      prompt: 'Se o produto misto de três vetores dá zero, isso significa que eles:',
      choices: [
        'São todos nulos',
        'São perpendiculares entre si',
        'São coplanares (cabem no mesmo plano)',
        'Formam uma base'
      ],
      answer: 2,
      hints: [
        'O produto misto mede o volume do paralelepípedo formado pelos três.',
        'Volume zero significa que a caixa está achatada.',
        'Uma caixa achatada virou uma folha — todos no mesmo plano.'
      ],
      solution: [
        'Produto misto = volume do paralelepípedo',
        'Volume zero → a caixa não tem altura',
        'Os três vetores cabem no mesmo plano: são coplanares',
        'Consequência: eles são LD'
      ] },

    /* ═══════════ Combinação linear, LI/LD e base (Listas 06 e 08) ═══════════ */
    { id: 'ev-g1', topic: 'espaco-vetorial', type: 'choice',
      prompt: 'Lista 06 · Sejam u = (2, −3, 2) e v = (−1, 2, 4). Escreva w = (7, −11, 2) como combinação linear de u e v.',
      choices: ['w = 3u − v', 'w = 2u + v', 'w = u − 3v', 'w não é combinação linear de u e v'],
      answer: 0,
      hints: [
        'Escreva w = a·u + b·v e iguale componente a componente. Vira um sistema.',
        'Da primeira componente: 2a − b = 7. Da terceira: 2a + 4b = 2.',
        'Resolvendo o sistema você acha a = 3 e b = −1.'
      ],
      solution: [
        'w = a·u + b·v gera o sistema:',
        '2a − b = 7 · · · −3a + 2b = −11 · · · 2a + 4b = 2',
        'Da primeira: b = 2a − 7',
        'Na terceira: 2a + 4(2a − 7) = 2 → 10a = 30 → a = 3',
        'Então b = 2·3 − 7 = −1',
        'Confira na equação que sobrou: −9 − 2 = −11 ✓',
        'w = 3u − v'
      ] },

    { id: 'ev-s1', topic: 'espaco-vetorial', type: 'choice',
      prompt: 'Lista 08 · O conjunto S = {(2, 1), (−1, 2)} gera o R²?',
      choices: ['Sim', 'Não', 'Só gera uma reta', 'Faltam vetores'],
      answer: 0,
      hints: [
        'São 2 vetores em R², que é a dimensão certa. Isso libera o teste do determinante.',
        'Monte a matriz com os dois vetores e calcule o determinante.',
        'det = 2·2 − 1·(−1). Se der diferente de zero, gera.'
      ],
      solution: [
        'Monte a matriz: linhas (2, 1) e (−1, 2)',
        'det = 2·2 − 1·(−1) = 4 + 1 = 5',
        'det ≠ 0 → os vetores são LI e geram o R²',
        'Como são LI e geradores, S também é base do R²'
      ] },

    { id: 'ev-g2', topic: 'espaco-vetorial', type: 'choice',
      prompt: 'Lista 08 · O conjunto S = {(−1, 2), (2, −4)} é LI ou LD?',
      choices: ['LI — são independentes', 'LD — um é múltiplo do outro', 'Depende do escalar', 'Não dá para saber'],
      answer: 1,
      hints: [
        'Antes de calcular determinante, compare os dois vetores. Nota alguma relação?',
        'Multiplique o primeiro por −2 e veja no que dá.',
        '−2 · (−1, 2) = (2, −4), que é exatamente o segundo.'
      ],
      solution: [
        'Repare que (2, −4) = −2 · (−1, 2)',
        'Um vetor é múltiplo do outro → são LD',
        'Confirmando pelo determinante: (−1)(−4) − 2·2 = 4 − 4 = 0',
        'Consequência: eles só alcançam a reta que compartilham, não o plano todo'
      ],
      traps: {} },

    { id: 'ev-s2', topic: 'espaco-vetorial', type: 'input',
      prompt: 'Lista 08 · Calcule o determinante da matriz formada por S = {(1, 0, 1), (1, 1, 0), (0, 1, 1)} para verificar se S gera o R³.',
      answer: '2',
      hints: [
        'Monte a matriz 3×3 com cada vetor numa linha.',
        'Abra pela primeira linha: 1·(1·1 − 0·1) − 0·(...) + 1·(1·1 − 1·0).',
        'Os termos dão 1, 0 e 1.'
      ],
      solution: [
        'Matriz: (1,0,1) / (1,1,0) / (0,1,1)',
        '1·(1·1 − 0·1) = 1',
        '−0·(1·1 − 0·0) = 0',
        '+1·(1·1 − 1·0) = 1',
        'det = 1 + 0 + 1 = 2',
        'det ≠ 0 → S é LI, gera o R³ e portanto é base'
      ],
      traps: { '0': 'Determinante zero significaria LD. Refaça a expansão — atenção ao sinal alternado dos termos.' } },

    { id: 'ev-x1', topic: 'espaco-vetorial', type: 'choice',
      prompt: 'Um conjunto de vetores é uma BASE de um espaço quando ele é:',
      choices: [
        'Apenas LI',
        'Apenas gerador',
        'LI e gerador ao mesmo tempo',
        'Formado por vetores unitários'
      ],
      answer: 2,
      hints: [
        'Base precisa de duas garantias ao mesmo tempo.',
        'Uma garante que ninguém sobra. A outra, que ninguém falta.',
        'LI = ninguém sobra. Gerador = alcança tudo.'
      ],
      solution: [
        'LI garante que nenhum vetor é dispensável',
        'Gerador garante que dá para alcançar qualquer vetor do espaço',
        'Base = as duas coisas juntas: o conjunto mínimo que ainda alcança tudo',
        'Vetores unitários não têm nada a ver — base não precisa ser normalizada'
      ] }
  ];

  CZ.exercises.register(EXERCISES);
})(window.CZ);
