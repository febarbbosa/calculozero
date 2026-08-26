/* ==========================================================================
   data/exercises.js — banco de exercícios.

   Cada item traz:
     hints    · 3 níveis, do empurrão leve até quase a resposta
     solution · o raciocínio completo, mostrado só depois da tentativa
     traps    · erros previsíveis → diagnóstico específico
                (é isso que permite dizer "você somou antes de multiplicar"
                 em vez de "resposta errada")
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const EXERCISES = [

    /* ---------------- Aritmética ---------------- */
    { id: 'ar-g1', topic: 'aritmetica', type: 'input',
      prompt: 'Quanto é 10 − 2 × 3 ?',
      answer: '4',
      hints: [
        'Antes de calcular, procure: existe multiplicação nessa linha?',
        'Multiplicação vem antes de subtração. Resolva 2 × 3 primeiro.',
        '2 × 3 = 6. Agora faça 10 − 6.'
      ],
      solution: ['Identifique a multiplicação: 2 × 3', 'Resolva: 2 × 3 = 6', 'Agora a subtração: 10 − 6 = 4'],
      traps: { '24': 'Você fez 10 − 2 = 8 e depois 8 × 3. A multiplicação tinha prioridade sobre a subtração.' } },

    { id: 'ar-s1', topic: 'aritmetica', type: 'input',
      prompt: 'Quanto é (4 + 2) × 3 − 5 ?',
      answer: '13',
      hints: [
        'Tem parênteses. Eles sempre vão primeiro.',
        'Resolva (4 + 2) = 6. A conta vira 6 × 3 − 5.',
        '6 × 3 = 18. Falta subtrair 5.'
      ],
      solution: ['Parênteses primeiro: 4 + 2 = 6', 'Multiplicação: 6 × 3 = 18', 'Subtração: 18 − 5 = 13'],
      traps: { '18': 'Você parou no 6 × 3 e esqueceu de subtrair o 5.', '1': 'Você fez 3 − 5 antes de multiplicar.' } },

    { id: 'ar-g2', topic: 'aritmetica', type: 'input',
      prompt: 'Quanto é (−3) × (−4) ?',
      answer: '12',
      hints: [
        'Olhe só para os sinais primeiro. Eles são iguais ou diferentes?',
        'Os dois são negativos — sinais iguais.',
        'Sinais iguais dão resultado positivo. E 3 × 4 = 12.'
      ],
      solution: ['Sinais iguais (menos e menos) → resultado positivo', 'Multiplique os números: 3 × 4 = 12', 'Resultado: +12'],
      traps: { '-12': 'Sinais iguais dão positivo. Negativo só aparece quando os sinais são diferentes.' } },

    { id: 'ar-s2', topic: 'aritmetica', type: 'input',
      prompt: 'Quanto é 8 − (5 − 9) ?',
      answer: '12',
      hints: [
        'Comece pelo parêntese, mesmo que ele dê negativo.',
        '5 − 9 = −4. A conta vira 8 − (−4).',
        'Subtrair um negativo é somar.'
      ],
      solution: ['Parêntese: 5 − 9 = −4', 'Reescreva: 8 − (−4)', 'Dois sinais de menos viram mais: 8 + 4 = 12'],
      traps: { '4': 'Você fez 8 − 4. Mas o resultado do parêntese era −4, e subtrair um negativo vira soma.' } },

    { id: 'ar-x1', topic: 'aritmetica', type: 'input',
      prompt: '30% de 400 é quanto?',
      answer: '120',
      hints: ['Porcentagem é uma fração de 100.', '30% = 30/100 = 0,3.', 'Multiplique 0,3 × 400.'],
      solution: ['Converta: 30% = 0,3', 'Multiplique: 0,3 × 400', 'Resultado: 120'],
      traps: { '30': 'Esse é o percentual, não o valor. Você precisa aplicar sobre 400.' } },

    /* ---------------- Frações ---------------- */
    { id: 'fr-g1', topic: 'fracoes', type: 'choice',
      prompt: 'Qual é maior: 3/4 ou 5/8 ?',
      choices: ['3/4', '5/8', 'São iguais'], answer: 0,
      hints: [
        'Não dá para comparar direto: os pedaços têm tamanhos diferentes.',
        'Transforme as duas para o mesmo denominador. 8 serve bem.',
        '3/4 vira 6/8. Agora compare 6/8 com 5/8.'
      ],
      solution: ['Denominador comum: 8', 'Converta 3/4 → 6/8 (multiplicou tudo por 2)', '6/8 > 5/8, então 3/4 é maior'] },

    { id: 'fr-s1', topic: 'fracoes', type: 'input',
      prompt: 'Quanto é 1/3 + 1/6 ? (responda como fração simplificada, ex: 3/4)',
      answer: '1/2', accept: ['3/6', '0.5'],
      hints: [
        'Os denominadores são diferentes. Iguale primeiro.',
        '6 já é múltiplo de 3. Converta 1/3 para sextos.',
        '1/3 = 2/6. Agora some 2/6 + 1/6.'
      ],
      solution: ['Denominador comum: 6', '1/3 = 2/6', '2/6 + 1/6 = 3/6', 'Simplifique: 3/6 = 1/2'],
      traps: { '2/9': 'Você somou em cima e embaixo. Isso não funciona: some só os numeradores, depois de igualar os denominadores.' } },

    { id: 'fr-g2', topic: 'fracoes', type: 'input',
      prompt: 'Quanto é 2/3 × 3/4 ? (fração simplificada)',
      answer: '1/2', accept: ['6/12', '0.5'],
      hints: [
        'Multiplicar é mais fácil que somar: não precisa igualar nada.',
        'Multiplique numerador com numerador, denominador com denominador.',
        '2×3 = 6 e 3×4 = 12. Agora simplifique 6/12.'
      ],
      solution: ['Numeradores: 2 × 3 = 6', 'Denominadores: 3 × 4 = 12', 'Fica 6/12', 'Simplifique dividindo por 6: 1/2'] },

    { id: 'fr-s2', topic: 'fracoes', type: 'input',
      prompt: 'Quanto é (1/2) ÷ (1/4) ?',
      answer: '2', accept: ['2/1'],
      hints: [
        'Dividir fração tem um truque: inverta a segunda.',
        '(1/2) ÷ (1/4) vira (1/2) × (4/1).',
        'Agora é só multiplicar: 1×4 e 2×1.'
      ],
      solution: ['Inverta a segunda fração: 1/4 → 4/1', 'Troque divisão por multiplicação: (1/2) × (4/1)', 'Multiplique: 4/2 = 2'],
      traps: { '1/8': 'Você multiplicou direto em vez de inverter a segunda fração antes.' } },

    /* ---------------- Álgebra ---------------- */
    { id: 'al-g1', topic: 'algebra', type: 'input',
      prompt: 'Resolva: 3x − 7 = 14. Quanto vale x?',
      answer: '7',
      hints: [
        'O objetivo é deixar o x sozinho. O que está atrapalhando primeiro?',
        'O −7 está solto. Some 7 dos dois lados.',
        'Você chega em 3x = 21. Falta dividir.'
      ],
      solution: ['Some 7 dos dois lados: 3x = 21', 'Divida os dois lados por 3: x = 7', 'Confira: 3×7 − 7 = 14 ✓'],
      traps: { '21': 'Você chegou em 3x = 21 e parou. Falta dividir por 3.' } },

    { id: 'al-s1', topic: 'algebra', type: 'input',
      prompt: 'Resolva: 2(x + 3) = 16. Quanto vale x?',
      answer: '5',
      hints: [
        'Você pode abrir o parêntese, ou dividir os dois lados por 2. O segundo é mais rápido.',
        'Dividindo por 2: x + 3 = 8.',
        'Agora tire o 3.'
      ],
      solution: ['Divida os dois lados por 2: x + 3 = 8', 'Subtraia 3 dos dois lados: x = 5', 'Confira: 2(5+3) = 16 ✓'],
      traps: { '11': 'Você fez 16 − 3 − 2 ou algo parecido. Trate o parêntese inteiro primeiro.' } },

    { id: 'al-g2', topic: 'algebra', type: 'choice',
      prompt: 'Qual é o resultado de (x + 4)² ?',
      choices: ['x² + 16', 'x² + 8x + 16', 'x² + 4x + 16', 'x² + 8x + 8'], answer: 1,
      hints: [
        '(x+4)² significa (x+4)(x+4). Não é elevar cada pedaço.',
        'Use (a+b)² = a² + 2ab + b².',
        'Aqui a = x e b = 4. O termo do meio é 2 · x · 4.'
      ],
      solution: ['Aplique (a+b)² = a² + 2ab + b²', 'a² = x²', '2ab = 2·x·4 = 8x', 'b² = 16', 'Junte: x² + 8x + 16'] },

    { id: 'al-s2', topic: 'algebra', type: 'choice',
      prompt: 'x² − 25 é o mesmo que:',
      choices: ['(x − 5)²', '(x − 5)(x + 5)', '(x − 25)(x + 1)', 'Não dá para fatorar'], answer: 1,
      hints: [
        'Repare que os dois termos são quadrados perfeitos: x² e 25 = 5².',
        'Isso é diferença de quadrados.',
        'a² − b² = (a − b)(a + b), com a = x e b = 5.'
      ],
      solution: ['Reconheça: x² − 25 = x² − 5²', 'Aplique a² − b² = (a−b)(a+b)', 'Resultado: (x − 5)(x + 5)'] },

    /* ---------------- Funções ---------------- */
    { id: 'fu-g1', topic: 'funcoes', type: 'input',
      prompt: 'Se f(x) = 4x − 3, quanto vale f(2) ?',
      answer: '5',
      hints: [
        'f(2) quer dizer: coloque 2 no lugar de x.',
        'A conta vira 4 · 2 − 3.',
        '4 × 2 = 8. Agora subtraia 3.'
      ],
      solution: ['Substitua x por 2: f(2) = 4·2 − 3', 'Multiplique: 8 − 3', 'Resultado: 5'],
      traps: { '8': 'Você multiplicou mas esqueceu de subtrair o 3.', '42': 'f(2) não é f vezes 2 — é a função aplicada em 2.' } },

    { id: 'fu-s1', topic: 'funcoes', type: 'input',
      prompt: 'Se g(x) = x² + 1, quanto vale g(−3) ?',
      answer: '10',
      hints: [
        'Substitua x por −3, mantendo o parêntese: (−3)².',
        'Cuidado com o sinal: (−3)² = 9, não −9.',
        'Agora some 1.'
      ],
      solution: ['Substitua: g(−3) = (−3)² + 1', 'Negativo ao quadrado fica positivo: 9 + 1', 'Resultado: 10'],
      traps: { '-8': 'Você calculou −(3²) em vez de (−3)². O parêntese muda tudo: menos vezes menos dá mais.' } },

    { id: 'fu-g2', topic: 'funcoes', type: 'input',
      prompt: 'Qual é a inclinação da reta que passa por (2, 3) e (5, 12) ?',
      answer: '3',
      hints: [
        'Inclinação é subida dividida por avanço.',
        'Subida: 12 − 3. Avanço: 5 − 2.',
        'Divida 9 por 3.'
      ],
      solution: ['Subida: 12 − 3 = 9', 'Avanço: 5 − 2 = 3', 'Inclinação: 9 / 3 = 3'],
      traps: { '9': 'Essa é só a subida. Falta dividir pelo avanço.' } },

    { id: 'fu-s2', topic: 'funcoes', type: 'choice',
      prompt: 'Na função f(x) = −2x + 7, o gráfico:',
      choices: ['Sobe da esquerda para a direita', 'Desce da esquerda para a direita', 'É horizontal', 'É uma parábola'], answer: 1,
      hints: [
        'Olhe só para o número que multiplica o x.',
        'Ele é −2, ou seja, negativo.',
        'Inclinação negativa significa que a cada passo para a direita, o valor cai.'
      ],
      solution: ['A inclinação é o coeficiente do x: −2', 'Inclinação negativa → a reta desce', 'O 7 só desloca a reta para cima, não muda a direção'] },

    { id: 'fu-g3', topic: 'funcoes', type: 'input',
      prompt: 'Qual é o valor de x no vértice de f(x) = x² − 6x + 5 ?',
      answer: '3',
      hints: [
        'Use a fórmula do vértice: x = −b / (2a).',
        'Aqui a = 1 e b = −6.',
        'Cuidado: −(−6) vira +6. Divida por 2·1.'
      ],
      solution: ['Identifique: a = 1, b = −6', 'x = −b/(2a) = −(−6)/(2·1)', 'x = 6/2 = 3'],
      traps: { '-3': 'Erro de sinal: como b já é −6, o −b vira +6.' } },

    { id: 'fu-s3', topic: 'funcoes', type: 'choice',
      prompt: 'A parábola de f(x) = −x² + 4 tem:',
      choices: ['Ponto mínimo', 'Ponto máximo', 'Nenhum dos dois', 'Dois vértices'], answer: 1,
      hints: [
        'O sinal do a decide o formato.',
        'Aqui a = −1, negativo.',
        'a negativo abre a boca para baixo.'
      ],
      solution: ['a = −1, que é negativo', 'a negativo → boca para baixo', 'Boca para baixo tem ponto máximo (o topo)'] },

    /* ---------------- Pré-Cálculo ---------------- */
    { id: 'pc-g1', topic: 'precalculo', type: 'input',
      prompt: 'Escreva 3⁴ · 3² como uma única potência de 3. (responda só o expoente)',
      answer: '6',
      hints: [
        'A base é a mesma nos dois. Isso libera uma regra.',
        'Mesma base multiplicando: some os expoentes.',
        '4 + 2 = ?'
      ],
      solution: ['Mesma base (3) em multiplicação', 'Regra: xᵃ · xᵇ = xᵃ⁺ᵇ', 'Some: 4 + 2 = 6, logo 3⁶'],
      traps: { '8': 'Você multiplicou os expoentes. Multiplicar expoentes só vale em potência de potência.' } },

    { id: 'pc-s1', topic: 'precalculo', type: 'choice',
      prompt: 'Como reescrever 1/x⁵ usando expoente negativo?',
      choices: ['x⁵', 'x⁻⁵', '−x⁵', '5x⁻¹'], answer: 1,
      hints: [
        'Existe uma regra que troca fração por expoente negativo.',
        'x⁻ᵃ = 1/xᵃ.',
        'Leia essa regra ao contrário.'
      ],
      solution: ['A regra é x⁻ᵃ = 1/xᵃ', 'Lendo ao contrário: 1/x⁵ = x⁻⁵', 'É assim que você vai derivar frações sem sofrer'] },

    { id: 'pc-g2', topic: 'precalculo', type: 'input',
      prompt: 'Quanto vale log₅ 125 ?',
      answer: '3',
      hints: [
        'Traduza: "5 elevado a quanto dá 125?"',
        'Vá multiplicando: 5, 25, 125.',
        'Quantas vezes você multiplicou?'
      ],
      solution: ['Pergunta: 5 elevado a quanto dá 125?', '5¹ = 5, 5² = 25, 5³ = 125', 'Resposta: 3'] },

    { id: 'pc-s2', topic: 'precalculo', type: 'input',
      prompt: 'Quanto vale log₂ 32 ?',
      answer: '5',
      hints: ['"2 elevado a quanto dá 32?"', 'Vá dobrando: 2, 4, 8, 16, 32.', 'Conte os passos.'],
      solution: ['2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32', 'Resposta: 5'],
      traps: { '16': 'Isso é 2⁴. O log pergunta o expoente, não o resultado anterior.' } },

    /* ---------------- Limites ---------------- */
    { id: 'li-g1', topic: 'limites', type: 'input',
      prompt: 'Quanto é lim (x→3) de (2x + 1) ?',
      answer: '7',
      hints: [
        'Essa função é bem-comportada em x = 3 — não tem divisão por zero nem buraco.',
        'Quando não há problema, o limite é só substituir.',
        'Calcule 2·3 + 1.'
      ],
      solution: ['A função é contínua em x = 3', 'Substitua direto: 2·3 + 1', 'Resultado: 7'] },

    { id: 'li-s1', topic: 'limites', type: 'input',
      prompt: 'Quanto é lim (x→2) de (x² − 4)/(x − 2) ?',
      answer: '4',
      hints: [
        'Tente substituir primeiro. O que acontece?',
        'Dá 0/0 — isso é aviso para fatorar, não a resposta.',
        'x² − 4 é diferença de quadrados: (x−2)(x+2). Corte o (x−2).'
      ],
      solution: [
        'Substituindo dá 0/0 — indeterminado',
        'Fatore o numerador: x² − 4 = (x−2)(x+2)',
        'Corte o (x−2) de cima e de baixo, sobra x + 2',
        'Agora substitua: 2 + 2 = 4'
      ],
      traps: { '0': '0/0 não é zero — é indeterminação. Significa que dá para simplificar antes.' } },

    { id: 'li-x1', topic: 'limites', type: 'choice',
      prompt: 'Se f(x) tende a 3 pela esquerda e a 7 pela direita quando x→1, então lim(x→1) f(x):',
      choices: ['É 3', 'É 7', 'É 5', 'Não existe'], answer: 3,
      hints: ['O limite exige acordo entre os dois lados.', 'Aqui os lados discordam.', 'Quando discordam, não há um valor único para onde apontar.'],
      solution: ['Limite pela esquerda: 3', 'Limite pela direita: 7', 'Os laterais são diferentes → o limite não existe'] },

    /* ---------------- Derivadas ---------------- */
    { id: 'de-g1', topic: 'derivadas', type: 'input',
      prompt: 'Qual a derivada de f(x) = x⁵ ? (responda no formato 5x^4)',
      answer: '5x^4', accept: ['5x⁴', '5*x^4', '5x4'],
      hints: [
        'Use a regra da potência.',
        '(xⁿ)′ = n · xⁿ⁻¹: desce o expoente e diminui um.',
        'O 5 desce multiplicando, e o expoente vira 4.'
      ],
      solution: ['Regra da potência: (xⁿ)′ = n·xⁿ⁻¹', 'n = 5, então desce o 5', 'Expoente novo: 5 − 1 = 4', 'Resultado: 5x⁴'],
      traps: { '5x^5': 'Você desceu o expoente mas esqueceu de diminuir um dele.' } },

    { id: 'de-s1', topic: 'derivadas', type: 'input',
      prompt: 'Qual a derivada de f(x) = 4x³ + 2 ? (formato: 12x^2)',
      answer: '12x^2', accept: ['12x²', '12*x^2', '12x2'],
      hints: [
        'Derive termo por termo.',
        'Em 4x³ o 4 fica e a potência dá 3x². Multiplique.',
        'A constante 2 vira zero.'
      ],
      solution: ['Termo 4x³: mantenha o 4, derive x³ → 3x²', '4 · 3x² = 12x²', 'Termo 2: constante → derivada 0', 'Resultado: 12x²'],
      traps: { '12x^2+2': 'A constante 2 vira zero ao derivar, não permanece.', '12x^3': 'Faltou diminuir um do expoente.' } },

    { id: 'de-g2', topic: 'derivadas', type: 'input',
      prompt: 'Qual a derivada de f(x) = 7 ?',
      answer: '0',
      hints: [
        'Derivada mede variação. Uma constante varia?',
        'O gráfico de f(x) = 7 é uma reta horizontal.',
        'Reta horizontal tem inclinação zero.'
      ],
      solution: ['f(x) = 7 é uma reta horizontal', 'Reta horizontal não sobe nem desce', 'Inclinação = 0, logo f′(x) = 0'],
      traps: { '7': 'Constante não se mantém na derivada — ela zera, porque não varia.' } },

    { id: 'de-s2', topic: 'derivadas', type: 'input',
      prompt: 'Se f(x) = x², qual é a inclinação da curva em x = 3 ?',
      answer: '6',
      hints: [
        'Primeiro derive, depois substitua.',
        'A derivada de x² é 2x.',
        'Agora calcule 2 · 3.'
      ],
      solution: ['Derive: f′(x) = 2x', 'Substitua x = 3: f′(3) = 2·3', 'Inclinação = 6'],
      traps: { '9': 'Isso é f(3), a altura da curva. A pergunta era a inclinação, que vem de f′(3).' } },

    { id: 'de-g3', topic: 'derivadas', type: 'input',
      prompt: 'Em que valor de x a função f(x) = x² − 8x tem seu ponto mínimo?',
      answer: '4',
      hints: [
        'No mínimo, a inclinação é zero. Então derive e iguale a zero.',
        'f′(x) = 2x − 8.',
        'Resolva 2x − 8 = 0.'
      ],
      solution: ['Derive: f′(x) = 2x − 8', 'Iguale a zero: 2x − 8 = 0', 'Resolva: 2x = 8, x = 4', 'Como a > 0, a parábola abre para cima → é mínimo'],
      traps: { '8': 'Você resolveu 2x = 8 mas esqueceu de dividir por 2.', '0': 'Zero é o valor da derivada no ponto, não o valor de x.' } },

    { id: 'de-s3', topic: 'derivadas', type: 'choice',
      prompt: 'Se f′(x) é negativa num intervalo, nesse trecho a função está:',
      choices: ['Subindo', 'Descendo', 'Parada', 'Oscilando'], answer: 1,
      hints: ['Derivada é inclinação.', 'Inclinação negativa é uma rampa para baixo.', 'Rampa para baixo significa que os valores caem.'],
      solution: ['f′ é a inclinação da curva', 'Inclinação negativa = rampa descendo', 'Logo a função está decrescendo nesse intervalo'] },

    /* ---------------- Integrais ---------------- */
    { id: 'in-g1', topic: 'integrais', type: 'choice',
      prompt: 'Aumentar o número de retângulos numa soma de Riemann faz o quê com o erro?',
      choices: ['Aumenta o erro', 'Diminui o erro', 'Não muda nada', 'Torna o cálculo impossível'], answer: 1,
      hints: ['Pense em cobrir uma curva com blocos.', 'Blocos largos deixam muito espaço sobrando ou faltando.', 'Blocos finos acompanham melhor o contorno da curva.'],
      solution: ['Retângulos largos não acompanham a curva', 'Retângulos finos se ajustam melhor ao contorno', 'Mais retângulos → menos sobra → menos erro'] },

    { id: 'in-s1', topic: 'integrais', type: 'input',
      prompt: 'Qual é a integral de x³ ? (formato: x^4/4, sem o +C)',
      answer: 'x^4/4', accept: ['x⁴/4', 'x^4 / 4', '(x^4)/4', 'x4/4'],
      hints: [
        'Integrar é o contrário de derivar.',
        'Se derivar desce o expoente, integrar sobe: ∫xⁿ dx = xⁿ⁺¹/(n+1).',
        'n = 3, então o novo expoente é 4. Divida por 4.'
      ],
      solution: ['Regra: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C', 'n = 3 → novo expoente 4', 'Divida por 4: x⁴/4', 'Confira derivando: (x⁴/4)′ = 4x³/4 = x³ ✓'],
      traps: { '3x^2': 'Isso é a derivada de x³. A integral vai no sentido contrário.' } },

    { id: 'in-g2', topic: 'integrais', type: 'input',
      prompt: 'Qual função tem derivada igual a 3x² ?',
      answer: 'x^3', accept: ['x³', 'x3', 'x^3+c', 'x³+c'],
      hints: [
        'Pergunte: de quem 3x² é derivada?',
        'A regra da potência desce o expoente. Aqui o 3 é o expoente que desceu.',
        'Se o 3 desceu, o expoente original era 3.'
      ],
      solution: ['A derivada de xⁿ é n·xⁿ⁻¹', 'Aqui n = 3 desceu e o expoente virou 2', 'Logo a função original era x³', 'Confira: (x³)′ = 3x² ✓'] },

    { id: 'in-s2', topic: 'integrais', type: 'input',
      prompt: 'Calcule ∫₀¹ 2x dx. (área sob a reta 2x, de 0 até 1)',
      answer: '1',
      hints: [
        'Primeiro ache a antiderivada de 2x.',
        'A antiderivada de 2x é x². Agora aplique F(1) − F(0).',
        '1² − 0² = ?'
      ],
      solution: ['Antiderivada de 2x é x²', 'Aplique nos limites: F(1) − F(0)', '1² − 0² = 1 − 0', 'Resultado: 1'],
      traps: { '2': 'Você aplicou a função original em vez da antiderivada.' } }
  ];

  let byId = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));
  const byTopic = (topicId) => EXERCISES.filter((e) => e.topic === topicId);

  /** Registra exercícios de outro módulo de conteúdo. Ver lessons.register. */
  function register(extra) {
    extra.forEach((e) => EXERCISES.push(e));
    byId = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));
    CZ.exercises.byId = byId;
  }

  /** Troca os vários tipos de traço por hífen simples. Listas em PDF usam U+2212. */
  function dashes(str) {
    return String(str).replace(/[−–—‐‑]/g, '-');
  }

  /**
   * Tenta ler a resposta como um vetor: "(4, -1)", "4;-1", "[1 -19 8]".
   * Devolve um array de números, ou null se não parecer um vetor.
   * Existe porque a normalização de texto troca vírgula por ponto (para aceitar
   * "0,5" como "0.5"), o que destruiria a vírgula separadora de componentes.
   */
  function parseTuple(raw) {
    const cleaned = dashes(raw).replace(/[()\[\]{}<>⟨⟩]/g, ' ').trim();
    const parts = cleaned.split(/[;,\s]+/).filter(Boolean);
    if (parts.length < 2) return null;
    const nums = parts.map((p) => Number(p.replace(',', '.')));
    return nums.every((n) => Number.isFinite(n)) ? nums : null;
  }

  /** Normaliza a resposta digitada para comparação tolerante. */
  function normalize(raw) {
    return dashes(raw)
      .toLowerCase().trim()
      .replace(/\s+/g, '')
      .replace(/,/g, '.')
      .replace(/·|×|\*/g, '')
      .replace(/⁰/g, '^0').replace(/¹/g, '^1').replace(/²/g, '^2')
      .replace(/³/g, '^3').replace(/⁴/g, '^4').replace(/⁵/g, '^5')
      .replace(/[()]/g, '')
      .replace(/\+c$/, '');
  }

  /** Confere a resposta e devolve também o diagnóstico do erro, se houver. */
  function check(exercise, given) {
    if (exercise.type === 'choice') {
      const ok = Number(given) === exercise.answer;
      return { ok, trap: null };
    }
    const candidates = [exercise.answer, ...(exercise.accept || [])];

    // Caminho vetorial: compara número a número, então "(4,-1)", "4; -1" e
    // "( 4 , −1 )" contam todos como a mesma resposta.
    const expectedTuple = parseTuple(exercise.answer);
    if (expectedTuple) {
      const givenTuple = parseTuple(given);
      if (givenTuple && givenTuple.length === expectedTuple.length &&
          givenTuple.every((n, i) => Math.abs(n - expectedTuple[i]) < 1e-6)) {
        return { ok: true, trap: null };
      }
    }

    const g = normalize(given);
    const pool = candidates.map(normalize);
    if (pool.includes(g)) return { ok: true, trap: null };

    let trap = null;
    if (exercise.traps) {
      const givenTuple = parseTuple(given);
      for (const key in exercise.traps) {
        const keyTuple = parseTuple(key);
        const tupleHit = keyTuple && givenTuple && keyTuple.length === givenTuple.length &&
          keyTuple.every((n, i) => Math.abs(n - givenTuple[i]) < 1e-6);
        if (tupleHit || normalize(key) === g) { trap = exercise.traps[key]; break; }
      }
    }
    return { ok: false, trap };
  }

  CZ.exercises = { EXERCISES, byId, byTopic, register, check, normalize, parseTuple };
})(window.CZ);
