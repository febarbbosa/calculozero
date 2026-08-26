/* ==========================================================================
   data/sheets/07-calculo1.js — fichas de Cálculo I.
   Formato e regras em core/sheets.js.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([
    /* ═══════════════════════════════════════════════════════════════
       Conceito de limite
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'c1.li.conceito',

      whatIs: `<p>O limite de <span class="math">f(x)</span> quando <span class="math">x</span> tende a <span class="math">a</span> é o valor para o qual a função <em>aponta</em> quando <span class="math">x</span> se aproxima de <span class="math">a</span> — sem nunca chegar lá.</p>
        <p>O detalhe que muda tudo: <strong>o valor de f em a é irrelevante</strong>. A função pode nem existir nesse ponto e o limite existir mesmo assim.</p>`,

      whyExists: `<p>Duas perguntas centrais não podem ser respondidas por substituição direta. "Qual a velocidade neste instante exato?" exige dividir por um intervalo de tempo que vai a zero. "Qual a área sob a curva?" exige somar retângulos cuja largura vai a zero.</p>
        <p>Nos dois casos a substituição direta dá <span class="math">0/0</span>, que não é número. O limite é a ferramenta que atravessa esse impasse: em vez de chegar ao ponto proibido, chega-se arbitrariamente perto e observa-se para onde o valor converge.</p>`,

      simple: 'Chegue perto sem tocar e veja para onde o valor vai. Se os dois lados apontam para o mesmo lugar, esse lugar é o limite — não importa o que aconteça exatamente no ponto.',

      academic: `<p>Diz-se que <span class="math">lim_{x→a} f(x) = L</span> quando, para todo <span class="math">ε &gt; 0</span>, existe <span class="math">δ &gt; 0</span> tal que <span class="math">0 &lt; |x − a| &lt; δ ⟹ |f(x) − L| &lt; ε</span>.</p>
        <p>A condição <span class="math">0 &lt; |x − a|</span> é a formalização de "sem tocar": o ponto <span class="math">a</span> fica explicitamente excluído. É por isso que <span class="math">f(a)</span> não interfere no limite, e por isso que módulo lido como distância é pré-requisito real deste tópico.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule lim (x→2) de (3x + 1)',
          steps: ['A função é contínua em x = 2', 'Nesse caso o limite é a própria substituição',
                  '3(2) + 1'],
          answer: '7' },
        { level: 'intermediario', prompt: 'Calcule lim (x→1) de (x² − 1)/(x − 1)',
          steps: ['Substituição direta dá 0/0 — indeterminado',
                  'Fatore: x² − 1 = (x+1)(x−1)',
                  'Cancele (x−1), o que vale porque x ≠ 1',
                  'Sobra x + 1, e agora substitua'],
          answer: '2' },
        { level: 'avancado', prompt: 'A função f(x) = (x²−1)/(x−1) existe em x = 1?',
          steps: ['Em x = 1 o denominador zera, então f(1) não existe',
                  'Mas o limite quando x → 1 vale 2',
                  'O gráfico tem um buraco em (1, 2)'],
          answer: 'Não existe f(1), mas o limite existe e vale 2' }
      ],

      application: { area: 'Física',
        text: 'Velocidade média é Δs/Δt. Velocidade instantânea exige Δt = 0, o que daria 0/0. O velocímetro do carro mostra o limite dessa razão quando o intervalo encolhe — não uma média sobre nenhum intervalo real.' },

      formulas: [
        { f: 'lim_{x→a} f(x) = L', note: 'Lê-se: quando x se aproxima de a, f(x) se aproxima de L.' },
        { f: 'f contínua em a ⟹ lim = f(a)', note: 'Só nesse caso a substituição direta resolve.' },
        { f: '0/0 é indeterminação, não resposta', note: 'É um aviso de que falta manipular a expressão.' },
        { f: '∀ε>0 ∃δ>0: 0<|x−a|<δ ⟹ |f(x)−L|<ε', note: 'A definição formal. O 0 < |x−a| exclui o ponto.' }
      ],

      mistakes: [
        { erro: 'Responder 0/0 como se fosse zero ou um',
          porque: 'Tratar a indeterminação como resultado.',
          certo: '0/0 não é número. É sinal de que a expressão precisa ser fatorada, racionalizada ou simplificada.' },
        { erro: 'Dizer que o limite não existe porque f(a) não existe',
          porque: 'Confundir valor da função com limite.',
          certo: 'São independentes. O limite ignora o ponto por definição.' },
        { erro: 'Substituir direto sem verificar se dá indeterminação',
          porque: 'Aplicar o atalho da continuidade sem checar a hipótese.',
          certo: 'Substitua primeiro para diagnosticar. Se der número, acabou. Se der 0/0, comece a trabalhar.' }
      ],

      tip: 'Sempre substitua primeiro — não para responder, mas para diagnosticar. Deu número, o limite é esse. Deu 0/0, você acabou de descobrir que precisa fatorar. Deu k/0 com k ≠ 0, é assíntota vertical.',

      drills: {
        basico: [
          { id: 'c1.li.conc#b1', type: 'input', prompt: 'Calcule lim (x→3) de (2x + 4).', answer: '10',
            hints: ['A função é um polinômio, contínua em toda parte.', 'Basta substituir.', '2(3) + 4.'],
            solution: ['Polinômio é contínuo', 'Substituição direta: 2(3) + 4 = 10'],
            traps: { '6': 'Você esqueceu de somar o 4.' } },
          { id: 'c1.li.conc#b2', type: 'input', prompt: 'Calcule lim (x→0) de (x² + 5).', answer: '5',
            hints: ['Substitua x = 0.', '0² = 0.', '0 + 5.'],
            solution: ['Substituição direta: 0² + 5 = 5'],
            traps: { '0': 'Você zerou a expressão inteira; o termo constante permanece.' } },
          { id: 'c1.li.conc#b3', type: 'choice', prompt: 'Se f(2) não existe, o que se conclui sobre lim (x→2) f(x) ?',
            choices: ['Também não existe', 'Vale zero', 'Pode existir mesmo assim', 'Vale infinito'], answer: 2,
            hints: ['O limite olha a vizinhança, não o ponto.', 'A definição exclui x = a explicitamente.',
                    'Buraco removível é exatamente esse caso.'],
            solution: ['O limite não depende de f(a)',
                       'Exemplo: (x²−4)/(x−2) não existe em 2, mas tem limite 4',
                       'Logo o limite pode existir mesmo sem f(a)'] }
        ],
        intermediario: [
          { id: 'c1.li.conc#i1', type: 'input', prompt: 'Calcule lim (x→2) de (x² − 4)/(x − 2).', answer: '4',
            hints: ['Substitua para diagnosticar: dá 0/0.', 'Fatore o numerador: x² − 4 = (x+2)(x−2).',
                    'Cancele e substitua no que sobrar.'],
            solution: ['Substituição direta: 0/0 — indeterminado',
                       'x² − 4 = (x + 2)(x − 2)',
                       'Cancela (x − 2), válido pois x ≠ 2', 'Sobra x + 2 → 2 + 2 = 4'],
            traps: { '0': 'Você parou em 0/0. Isso não é zero: é aviso de que falta fatorar.' } },
          { id: 'c1.li.conc#i2', type: 'input', prompt: 'Calcule lim (x→−3) de (x² + 3x)/(x + 3).', answer: '-3',
            hints: ['Dá 0/0. Fatore o numerador colocando x em evidência.',
                    'x² + 3x = x(x + 3).', 'Cancele (x+3) e substitua.'],
            solution: ['Substituição: 0/0', 'x² + 3x = x(x + 3)',
                       'Cancela (x+3): sobra x', 'Substituindo: −3'],
            traps: { '0': 'Você respondeu a indeterminação.', '3': 'Sinal trocado ao substituir.' } },
          { id: 'c1.li.conc#i3', type: 'input', prompt: 'Calcule lim (x→5) de (x² − 25)/(x − 5).', answer: '10',
            hints: ['Diferença de quadrados no numerador.', '(x+5)(x−5)/(x−5).', 'Cancela e sobra x + 5.'],
            solution: ['x² − 25 = (x+5)(x−5)', 'Cancela (x−5)', 'x + 5 → 5 + 5 = 10'] }
        ],
        avancado: [
          { id: 'c1.li.conc#a1', type: 'input', prompt: 'Calcule lim (x→4) de (√x − 2)/(x − 4).', answer: '0.25',
            accept: ['1/4', '0,25'],
            hints: ['Dá 0/0. Racionalize multiplicando pelo conjugado (√x + 2).',
                    'O numerador vira x − 4.', 'Cancele com o denominador e substitua.'],
            solution: ['Multiplique em cima e embaixo por (√x + 2)',
                       'Numerador: (√x − 2)(√x + 2) = x − 4',
                       'Fica (x − 4)/[(x − 4)(√x + 2)]',
                       'Cancela (x − 4): sobra 1/(√x + 2)',
                       'Substituindo x = 4: 1/(2 + 2) = 1/4'],
            traps: { '0': 'Você parou na indeterminação.', '4': 'Você inverteu numerador e denominador no fim.' } },
          { id: 'c1.li.conc#a2', type: 'input', prompt: 'Calcule lim (x→0) de (x² + 3x)/x.', answer: '3',
            hints: ['Dá 0/0. Coloque x em evidência no numerador.',
                    'x(x + 3)/x.', 'Cancela x, válido porque x ≠ 0.'],
            solution: ['x² + 3x = x(x + 3)', 'x(x+3)/x, com x ≠ 0', 'Cancela: x + 3', 'Substituindo: 0 + 3 = 3'],
            traps: { '0': 'Você respondeu a indeterminação em vez de resolvê-la.' } }
        ],
        desafio: [
          { id: 'c1.li.conc#d1', type: 'input', prompt: 'Calcule lim (x→1) de (x³ − 1)/(x − 1).', answer: '3',
            hints: ['Dá 0/0. Use a fatoração de diferença de cubos.',
                    'x³ − 1 = (x − 1)(x² + x + 1).', 'Cancele (x−1) e substitua x = 1.'],
            solution: ['x³ − 1 = (x − 1)(x² + x + 1)',
                       'Cancela (x − 1): sobra x² + x + 1',
                       'Substituindo x = 1: 1 + 1 + 1 = 3'],
            traps: { '0': 'Você parou na indeterminação.',
                     '1': 'Você cancelou termos dentro da soma em vez de fatorar.' } }
        ]
      },

      review: [
        'Limite é para onde a função aponta, não onde ela chega.',
        'O valor da função no ponto não interfere no limite.',
        '0/0 é indeterminação: aviso de que falta fatorar, racionalizar ou simplificar.',
        'Substitua primeiro para diagnosticar; só depois decida a técnica.'
      ],

      lab: 'labLimite'
    },

    /* ═══════════════════════════════════════════════════════════════
       Definição de derivada
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'c1.de.definicao',

      whatIs: `<p>A derivada de <span class="math">f</span> em <span class="math">x</span> é o limite da taxa de variação quando o intervalo encolhe a zero:</p>
        <p><span class="math">f′(x) = lim_{h→0} [f(x + h) − f(x)] / h</span></p>
        <p>Geometricamente: a inclinação da reta tangente. Fisicamente: a taxa instantânea de variação.</p>`,

      whyExists: `<p>Taxa média responde "quanto mudou entre dois instantes". Ninguém consegue responder "quanto está mudando <em>agora</em>" com essa ferramenta, porque "agora" é um único ponto e <span class="math">Δx = 0</span> daria divisão por zero.</p>
        <p>A derivada resolve isso pegando a taxa média em intervalos cada vez menores e perguntando para onde ela converge. Todas as regras de derivação — potência, produto, cadeia — são atalhos demonstrados a partir deste limite.</p>`,

      simple: 'Pegue dois pontos da curva, calcule a inclinação entre eles, e vá aproximando um do outro. O valor para o qual a inclinação converge é a derivada.',

      academic: `<p>A função <span class="math">f</span> é derivável em <span class="math">x₀</span> quando o limite <span class="math">lim_{h→0} [f(x₀+h) − f(x₀)]/h</span> existe e é finito. O quociente é chamado razão incremental ou quociente de Newton.</p>
        <p>Derivabilidade implica continuidade, mas não o contrário: <span class="math">f(x) = |x|</span> é contínua em 0 e não derivável ali, porque os limites laterais do quociente valem −1 e +1.</p>
        <p>Notações equivalentes: <span class="math">f′(x)</span>, <span class="math">dy/dx</span>, <span class="math">Df</span>. A de Leibniz é a que torna a regra da cadeia legível.</p>`,

      examples: [
        { level: 'basico', prompt: 'Use a definição para derivar f(x) = 3x + 2',
          steps: ['f(x+h) = 3(x+h) + 2 = 3x + 3h + 2',
                  'f(x+h) − f(x) = 3h',
                  '3h/h = 3', 'O limite de uma constante é ela mesma'],
          answer: 'f′(x) = 3' },
        { level: 'intermediario', prompt: 'Use a definição para derivar f(x) = x²',
          steps: ['f(x+h) = (x+h)² = x² + 2xh + h²',
                  'f(x+h) − f(x) = 2xh + h²',
                  'Divida por h: 2x + h',
                  'Faça h → 0'],
          answer: 'f′(x) = 2x' },
        { level: 'avancado', prompt: 'Use a definição para derivar f(x) = 1/x',
          steps: ['f(x+h) − f(x) = 1/(x+h) − 1/x',
                  'Denominador comum: [x − (x+h)]/[x(x+h)] = −h/[x(x+h)]',
                  'Divida por h: −1/[x(x+h)]',
                  'Faça h → 0'],
          answer: 'f′(x) = −1/x²' }
      ],

      application: { area: 'Engenharia da Computação',
        text: 'Treinar uma rede neural é calcular a derivada do erro em relação a cada peso e caminhar contra ela. O algoritmo de retropropagação é a regra da cadeia aplicada em série — e toda ela repousa nesta definição.' },

      formulas: [
        { f: "f′(x) = lim_{h→0} [f(x+h) − f(x)]/h", note: 'A definição. Toda regra de derivação sai daqui.' },
        { f: "f′(a) = lim_{x→a} [f(x) − f(a)]/(x − a)", note: 'Forma equivalente, útil para derivada num ponto específico.' },
        { f: 'Reta tangente: y − f(a) = f′(a)(x − a)', note: 'A derivada é o coeficiente angular.' },
        { f: 'Derivável ⟹ contínua', note: 'A recíproca é falsa: |x| é contínua e não derivável em 0.' }
      ],

      mistakes: [
        { erro: 'Cancelar o h antes de simplificar o numerador',
          porque: 'Querer eliminar a indeterminação sem fazer a álgebra.',
          certo: 'Primeiro expanda e junte; o h só sai depois de aparecer como fator comum.' },
        { erro: 'Escrever (x + h)² = x² + h²',
          porque: 'Distribuir o expoente sobre a soma.',
          certo: '(x+h)² = x² + 2xh + h². É o 2xh que sobrevive ao limite e dá 2x.' },
        { erro: 'Fazer h = 0 antes de simplificar',
          porque: 'Substituir cedo demais e obter 0/0.',
          certo: 'Simplifique até o h sumir do denominador, e só então faça h → 0.' }
      ],

      tip: 'Ao derivar pela definição, o h SEMPRE tem de aparecer como fator comum no numerador. Se depois de expandir ele não aparecer, há erro de álgebra — não continue.',

      drills: {
        basico: [
          { id: 'c1.de.def#b1', type: 'input', prompt: 'Pela definição, qual é a derivada de f(x) = 5x ?', answer: '5',
            hints: ['f(x+h) = 5(x+h) = 5x + 5h.', 'A diferença é 5h.', 'Divida por h.'],
            solution: ['f(x+h) − f(x) = 5x + 5h − 5x = 5h', '5h/h = 5', 'lim = 5'],
            traps: { '5h': 'Faltou dividir por h.', '0': 'A derivada de uma função linear é a inclinação, não zero.' } },
          { id: 'c1.de.def#b2', type: 'input', prompt: 'Pela definição, qual é a derivada de f(x) = 7 (função constante) ?', answer: '0',
            hints: ['f(x+h) = 7 também.', 'A diferença é 7 − 7 = 0.', '0/h = 0.'],
            solution: ['f(x+h) − f(x) = 7 − 7 = 0', '0/h = 0', 'lim = 0',
                       'Faz sentido: reta horizontal tem inclinação zero'] },
          { id: 'c1.de.def#b3', type: 'choice', prompt: 'A derivada f′(a) representa geometricamente:',
            choices: ['A área sob a curva até a', 'A inclinação da reta tangente em a',
                      'O valor de f em a', 'A distância até o eixo x'], answer: 1,
            hints: ['A definição é um limite de inclinações de secantes.', 'A secante vira tangente quando h → 0.',
                    'O que sobra é a inclinação da tangente.'],
            solution: ['O quociente [f(x+h)−f(x)]/h é a inclinação da secante',
                       'Quando h → 0, a secante tende à tangente',
                       'Logo f′(a) é a inclinação da tangente em a'] }
        ],
        intermediario: [
          { id: 'c1.de.def#i1', type: 'input', prompt: 'Pela definição, qual é a derivada de f(x) = x² + 3x ? (escreva a expressão)',
            answer: '2x+3', accept: ['2x + 3'],
            hints: ['f(x+h) = (x+h)² + 3(x+h).', 'Expanda: x² + 2xh + h² + 3x + 3h.',
                    'Subtraia f(x) e divida por h: 2x + h + 3.'],
            solution: ['f(x+h) = x² + 2xh + h² + 3x + 3h',
                       'f(x+h) − f(x) = 2xh + h² + 3h = h(2x + h + 3)',
                       'Divida por h: 2x + h + 3', 'h → 0: 2x + 3'],
            traps: { '2x': 'Você derivou só o x² e esqueceu o 3x.' } },
          { id: 'c1.de.def#i2', type: 'input', prompt: 'Se f(x) = x², qual a inclinação da reta tangente em x = 3 ?', answer: '6',
            hints: ['A derivada de x² é 2x.', 'Substitua x = 3.', '2(3).'],
            solution: ["f′(x) = 2x", 'f′(3) = 2(3) = 6'],
            traps: { '9': 'Isso é f(3), o valor da função, não a inclinação.' } },
          { id: 'c1.de.def#i3', type: 'choice', prompt: 'Por que f(x) = |x| não é derivável em x = 0 ?',
            choices: ['Porque não é contínua ali', 'Porque os limites laterais do quociente diferem',
                      'Porque f(0) não existe', 'Porque a função é negativa'], answer: 1,
            hints: ['A função é contínua em 0 — o gráfico não se rompe.', 'Mas há um bico.',
                    'Pela esquerda a inclinação é −1; pela direita, +1.'],
            solution: ['|x| é contínua em 0', 'Pela esquerda o quociente vale −1',
                       'Pela direita vale +1', 'Os laterais discordam: o limite não existe, logo não é derivável'] }
        ],
        avancado: [
          { id: 'c1.de.def#a1', type: 'input', prompt: 'Pela definição, qual é a derivada de f(x) = x³ ? (escreva a expressão, use ^ para expoente)',
            answer: '3x^2', accept: ['3x²', '3x^2 '],
            hints: ['(x+h)³ = x³ + 3x²h + 3xh² + h³.', 'Subtraia x³ e coloque h em evidência.',
                    'Sobra 3x² + 3xh + h². Agora h → 0.'],
            solution: ['(x+h)³ = x³ + 3x²h + 3xh² + h³',
                       'f(x+h) − f(x) = 3x²h + 3xh² + h³ = h(3x² + 3xh + h²)',
                       'Divide por h: 3x² + 3xh + h²', 'h → 0: 3x²'],
            traps: { 'x^2': 'Faltou o coeficiente 3 que vem da expansão do cubo.',
                     '3x^3': 'O expoente diminui em um: x³ → 3x².' } },
          { id: 'c1.de.def#a2', type: 'input', prompt: 'Qual a equação da reta tangente a f(x) = x² no ponto x = 2 ? Escreva na forma y = ax + b, respondendo a e b separados por vírgula.',
            answer: '4,-4', accept: ['4, -4', '4,−4'],
            hints: ['f(2) = 4 e f′(x) = 2x, então f′(2) = 4.', 'Use y − f(a) = f′(a)(x − a).',
                    'y − 4 = 4(x − 2).'],
            solution: ['f(2) = 4', "f′(x) = 2x, logo f′(2) = 4",
                       'y − 4 = 4(x − 2)', 'y = 4x − 8 + 4 = 4x − 4', 'a = 4, b = −4'],
            traps: { '4,4': 'Erro de sinal ao distribuir: 4(x−2) = 4x − 8.' } }
        ],
        desafio: [
          { id: 'c1.de.def#d1', type: 'input', prompt: 'Pela definição, qual é a derivada de f(x) = √x ? (escreva na forma 1/(a*raiz(x)), respondendo só o número a)',
            answer: '2',
            hints: ['Racionalize multiplicando pelo conjugado (√(x+h) + √x).',
                    'O numerador vira (x+h) − x = h.',
                    'Cancele o h e faça h → 0: 1/(√x + √x).'],
            solution: ['[√(x+h) − √x]/h, multiplicado por [√(x+h) + √x] em cima e embaixo',
                       'Numerador: (x+h) − x = h',
                       'Fica h/(h·[√(x+h) + √x]) = 1/[√(x+h) + √x]',
                       'h → 0: 1/(2√x)', 'Logo a = 2'],
            traps: { '1': 'Ao fazer h → 0, os dois radicais viram √x e se somam: 2√x.' } }
        ]
      },

      review: [
        'A derivada é o limite da taxa média quando o intervalo vai a zero.',
        'Geometricamente é a inclinação da tangente; fisicamente, a taxa instantânea.',
        'O h precisa aparecer como fator comum no numerador antes de cancelar.',
        'Derivável implica contínua, mas contínua não implica derivável.'
      ],

      lab: 'labDerivada'
    },

    /* ═══════════════════════════════════════════════════════════════
       Regras básicas de derivação
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'c1.de.basicas',

      whatIs: `<p>As regras básicas são atalhos demonstrados a partir da definição. Com quatro delas você deriva qualquer polinômio:</p>
        <ul>
          <li><strong>Constante:</strong> <span class="math">(k)′ = 0</span></li>
          <li><strong>Potência:</strong> <span class="math">(xⁿ)′ = n·x^(n−1)</span></li>
          <li><strong>Múltiplo:</strong> <span class="math">(k·f)′ = k·f′</span></li>
          <li><strong>Soma:</strong> <span class="math">(f + g)′ = f′ + g′</span></li>
        </ul>`,

      whyExists: `<p>Derivar <span class="math">x⁵ − 3x² + 7</span> pela definição levaria meia página. Pela regra da potência, leva cinco segundos.</p>
        <p>Mais importante: a regra da potência vale para expoente <em>qualquer</em> — negativo, fracionário, irracional. Reescrever <span class="math">√x</span> como <span class="math">x^(1/2)</span> e <span class="math">1/x²</span> como <span class="math">x^(−2)</span> transforma expressões que pareciam exigir técnica especial em aplicações diretas da mesma regra.</p>`,

      simple: 'Desce o expoente multiplicando e diminui um dele. Constante vira zero. Soma deriva termo a termo.',

      academic: `<p>A regra da potência para <span class="math">n ∈ ℕ</span> segue da expansão binomial de <span class="math">(x+h)ⁿ</span> na definição: todos os termos com <span class="math">h²</span> ou superior morrem no limite, restando <span class="math">n·x^(n−1)</span>.</p>
        <p>A extensão para expoentes reais quaisquer usa <span class="math">xⁿ = e^(n·ln x)</span> e a regra da cadeia. A linearidade — <span class="math">(αf + βg)′ = αf′ + βg′</span> — faz da derivação um operador linear, propriedade que estrutura toda a teoria.</p>`,

      examples: [
        { level: 'basico', prompt: 'Derive f(x) = x⁵',
          steps: ['Desce o expoente: 5', 'Diminui um dele: 5 − 1 = 4'],
          answer: 'f′(x) = 5x⁴' },
        { level: 'intermediario', prompt: 'Derive f(x) = 4x³ − 7x + 2',
          steps: ['Termo a termo', '4x³ → 4·3x² = 12x²', '−7x → −7', '2 → 0'],
          answer: 'f′(x) = 12x² − 7' },
        { level: 'avancado', prompt: 'Derive f(x) = √x + 1/x²',
          steps: ['Reescreva como potências: x^(1/2) + x^(−2)',
                  'x^(1/2) → (1/2)x^(−1/2) = 1/(2√x)',
                  'x^(−2) → −2x^(−3) = −2/x³'],
          answer: 'f′(x) = 1/(2√x) − 2/x³' }
      ],

      application: { area: 'Economia',
        text: 'Custo marginal é a derivada da função custo. Se C(q) = 0,5q² + 20q + 500, então C′(q) = q + 20: o custo de produzir a próxima unidade. A empresa produz enquanto o custo marginal for menor que a receita marginal.' },

      formulas: [
        { f: '(k)′ = 0', note: 'Constante não varia; reta horizontal tem inclinação zero.' },
        { f: '(xⁿ)′ = n·x^(n−1)', note: 'Vale para n negativo, fracionário e irracional também.' },
        { f: '(k·f)′ = k·f′', note: 'Constante multiplicando sai de dentro.' },
        { f: '(f ± g)′ = f′ ± g′', note: 'Deriva termo a termo. Não vale para produto nem quociente.' },
        { f: '√x = x^(1/2) e 1/xⁿ = x^(−n)', note: 'Reescreva antes de derivar: vira regra da potência.' }
      ],

      mistakes: [
        { erro: 'Derivar x⁵ como 5x⁵',
          porque: 'Descer o expoente e esquecer de diminuí-lo.',
          certo: 'Desce E diminui: 5x⁴.' },
        { erro: 'Derivar 1/x como 1/1 ou como ln x',
          porque: 'Não reescrever a fração como potência negativa.',
          certo: '1/x = x^(−1), então a derivada é −1·x^(−2) = −1/x².' },
        { erro: 'Derivar o produto termo a termo: (x²·x³)′ = 2x·3x²',
          porque: 'Aplicar a regra da soma ao produto.',
          certo: 'Ou use a regra do produto, ou simplifique antes: x²·x³ = x⁵, e a derivada é 5x⁴.' }
      ],

      tip: 'Antes de derivar, reescreva TUDO como potência de x. Raiz vira expoente fracionário, fração vira expoente negativo. Depois disso, uma regra só resolve a expressão inteira.',

      drills: {
        basico: [
          { id: 'c1.de.bas#b1', type: 'input', prompt: 'Derive f(x) = x⁷. Escreva a expressão (use ^ para expoente).',
            answer: '7x^6', accept: ['7x⁶'],
            hints: ['Regra da potência.', 'Desce o 7 multiplicando.', 'E o expoente diminui em um.'],
            solution: ['(xⁿ)′ = n·x^(n−1)', 'n = 7', 'f′(x) = 7x⁶'],
            traps: { '7x^7': 'O expoente tem de diminuir em um.' } },
          { id: 'c1.de.bas#b2', type: 'input', prompt: 'Derive f(x) = 12. Responda só o número.', answer: '0',
            hints: ['É uma função constante.', 'O gráfico é uma reta horizontal.', 'Inclinação zero.'],
            solution: ['Constante não varia', 'f′(x) = 0'] },
          { id: 'c1.de.bas#b3', type: 'input', prompt: 'Derive f(x) = 3x² + 5x. Escreva a expressão.',
            answer: '6x+5', accept: ['6x + 5'],
            hints: ['Derive termo a termo.', '3x² → 3·2x = 6x.', '5x → 5.'],
            solution: ['3x² → 6x', '5x → 5', 'f′(x) = 6x + 5'],
            traps: { '6x': 'Você esqueceu de derivar o termo 5x.' } }
        ],
        intermediario: [
          { id: 'c1.de.bas#i1', type: 'input', prompt: 'Derive f(x) = 2x⁴ − 6x² + 9. Escreva a expressão.',
            answer: '8x^3-12x', accept: ['8x³-12x', '8x^3 - 12x'],
            hints: ['Termo a termo.', '2x⁴ → 8x³.', '−6x² → −12x, e a constante some.'],
            solution: ['2x⁴ → 2·4x³ = 8x³', '−6x² → −6·2x = −12x', '9 → 0', 'f′(x) = 8x³ − 12x'],
            traps: { '8x^3-12x+9': 'A constante deriva para zero, não permanece.' } },
          { id: 'c1.de.bas#i2', type: 'input', prompt: 'Derive f(x) = 1/x. Escreva a expressão (use ^ para expoente).',
            answer: '-1/x^2', accept: ['-x^-2', '−1/x²', '-1/x²'],
            hints: ['Reescreva como potência: 1/x = x^(−1).', 'Aplique a regra: −1·x^(−2).',
                    'Volte para fração: −1/x².'],
            solution: ['1/x = x^(−1)', 'Derivada: −1·x^(−1−1) = −x^(−2)', '= −1/x²'],
            traps: { '1/x^2': 'Faltou o sinal negativo, que vem do expoente −1 descendo.' } },
          { id: 'c1.de.bas#i3', type: 'input', prompt: 'Derive f(x) = √x. Escreva na forma 1/(a*raiz(x)) e responda só o número a.',
            answer: '2',
            hints: ['√x = x^(1/2).', 'Derivada: (1/2)x^(−1/2).', 'Isso é 1/(2√x).'],
            solution: ['√x = x^(1/2)', '(1/2)·x^(−1/2)', '= 1/(2√x)', 'a = 2'] }
        ],
        avancado: [
          { id: 'c1.de.bas#a1', type: 'input', prompt: 'Derive f(x) = 3/x² . Escreva a expressão (use ^ para expoente).',
            answer: '-6/x^3', accept: ['-6x^-3', '−6/x³', '-6/x³'],
            hints: ['Reescreva: 3/x² = 3x^(−2).', 'Derivada: 3·(−2)x^(−3).', '= −6/x³.'],
            solution: ['3/x² = 3x^(−2)', 'f′ = 3·(−2)·x^(−3) = −6x^(−3)', '= −6/x³'],
            traps: { '6/x^3': 'Faltou o sinal: o expoente negativo desce e produz o menos.',
                     '-6/x': 'O expoente vai de −2 para −3, não para −1.' } },
          { id: 'c1.de.bas#a2', type: 'input', prompt: 'Para f(x) = x³ − 3x, em quais valores de x tem-se f′(x) = 0 ? Responda separados por vírgula, do menor para o maior.',
            answer: '-1,1', accept: ['-1, 1', '−1,1'],
            hints: ['Derive: f′(x) = 3x² − 3.', 'Iguale a zero: 3x² − 3 = 0.', 'x² = 1.'],
            solution: ['f′(x) = 3x² − 3', '3x² − 3 = 0 → x² = 1', 'x = −1 ou x = 1',
                       'São os pontos onde a curva tem tangente horizontal'],
            traps: { '0': 'Você resolveu f(x) = 0 em vez de f′(x) = 0.',
                     '1': 'Faltou a raiz negativa: x² = 1 tem duas soluções.' } }
        ],
        desafio: [
          { id: 'c1.de.bas#d1', type: 'input', prompt: 'A posição de um objeto é s(t) = t³ − 6t² + 9t. Em que instante t > 0 a velocidade é zero pela primeira vez ?',
            answer: '1',
            hints: ['Velocidade é a derivada da posição.', "s′(t) = 3t² − 12t + 9.",
                    'Resolva 3t² − 12t + 9 = 0, ou t² − 4t + 3 = 0.'],
            solution: ["v(t) = s′(t) = 3t² − 12t + 9", 'Iguale a zero: t² − 4t + 3 = 0',
                       'Fatorando: (t − 1)(t − 3) = 0', 't = 1 ou t = 3',
                       'O primeiro instante positivo é t = 1'],
            traps: { '3': 'Esse é o segundo instante em que a velocidade zera.',
                     '0': 'Em t = 0 a velocidade é 9, não zero.' } }
        ]
      },

      review: [
        'Potência: desce o expoente multiplicando e diminui um dele.',
        'Constante deriva para zero; constante multiplicando sai de dentro.',
        'Soma e diferença derivam termo a termo — produto e quociente não.',
        'Reescreva raízes e frações como potências antes de derivar.'
      ],

      lab: 'labDerivada'
    },

    /* ═══════════════════════════════════════════════════════════════
       Regra da cadeia
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'c1.de.cadeia',

      whatIs: `<p>A regra da cadeia deriva funções compostas — função dentro de função:</p>
        <p><span class="math">[f(g(x))]′ = f′(g(x)) · g′(x)</span></p>
        <p>Em palavras: <strong>derivada de fora, mantendo o de dentro, vezes a derivada do de dentro</strong>.</p>`,

      whyExists: `<p>Quase nada em problema real é função simples. <span class="math">sen(3x)</span>, <span class="math">e^(x²)</span>, <span class="math">√(x²+1)</span> — todas são compostas, e nenhuma regra anterior alcança.</p>
        <p>A intuição: se <span class="math">y</span> muda 3 vezes mais rápido que <span class="math">u</span>, e <span class="math">u</span> muda 2 vezes mais rápido que <span class="math">x</span>, então <span class="math">y</span> muda 6 vezes mais rápido que <span class="math">x</span>. As taxas se multiplicam. Na notação de Leibniz isso fica óbvio: <span class="math">dy/dx = (dy/du)·(du/dx)</span>.</p>`,

      simple: 'Derive a de fora deixando a de dentro intacta, e multiplique pela derivada da de dentro. O erro clássico é parar antes do "vezes a de dentro".',

      academic: `<p>Se <span class="math">g</span> é derivável em <span class="math">x</span> e <span class="math">f</span> é derivável em <span class="math">g(x)</span>, então <span class="math">f∘g</span> é derivável em <span class="math">x</span> e <span class="math">(f∘g)′(x) = f′(g(x))·g′(x)</span>.</p>
        <p>A notação de Leibniz <span class="math">dy/dx = (dy/du)(du/dx)</span> sugere um cancelamento de diferenciais que não é uma demonstração, mas é uma mnemônica correta — e é a forma que se generaliza para várias variáveis e sustenta a retropropagação.</p>`,

      examples: [
        { level: 'basico', prompt: 'Derive f(x) = (2x + 1)³',
          steps: ['De fora: potência cúbica. De dentro: 2x + 1',
                  'Derivada de fora: 3(2x + 1)²',
                  'Derivada de dentro: 2', 'Multiplique'],
          answer: 'f′(x) = 6(2x + 1)²' },
        { level: 'intermediario', prompt: 'Derive f(x) = √(x² + 5)',
          steps: ['Reescreva: (x² + 5)^(1/2)',
                  'De fora: (1/2)(x² + 5)^(−1/2)',
                  'De dentro: 2x',
                  'Multiplique e simplifique'],
          answer: 'f′(x) = x/√(x² + 5)' },
        { level: 'avancado', prompt: 'Derive f(x) = sen(3x²)',
          steps: ['De fora: seno → cosseno, mantendo o de dentro: cos(3x²)',
                  'De dentro: 3x² → 6x',
                  'Multiplique'],
          answer: 'f′(x) = 6x·cos(3x²)' }
      ],

      application: { area: 'Ciência de Dados',
        text: 'Retropropagação é a regra da cadeia aplicada camada por camada. O gradiente de uma rede com dez camadas é um produto de dez derivadas encadeadas — e o problema do gradiente que desaparece é literalmente esse produto tendendo a zero.' },

      formulas: [
        { f: "[f(g(x))]′ = f′(g(x))·g′(x)", note: 'Fora derivada, dentro intacto, vezes derivada de dentro.' },
        { f: 'dy/dx = (dy/du)·(du/dx)', note: 'Notação de Leibniz. As taxas se multiplicam.' },
        { f: '[(g(x))ⁿ]′ = n·(g(x))^(n−1)·g′(x)', note: 'Caso mais comum: potência de uma função.' },
        { f: '[e^(g(x))]′ = e^(g(x))·g′(x)', note: 'A exponencial se repete e ainda multiplica pela de dentro.' }
      ],

      mistakes: [
        { erro: 'Derivar (2x+1)³ como 3(2x+1)²',
          porque: 'Parar antes de multiplicar pela derivada de dentro.',
          certo: 'Falta o ×2: a resposta é 6(2x+1)².' },
        { erro: 'Derivar sen(3x) como cos(3x)',
          porque: 'Mesmo erro: esquecer o fator de dentro.',
          certo: '3cos(3x). O 3 aparece porque a derivada de 3x é 3.' },
        { erro: 'Derivar a de dentro junto com a de fora: [(x²+1)³]′ = 3(2x)²',
          porque: 'Aplicar as duas derivadas ao mesmo tempo.',
          certo: 'A de dentro fica intacta na primeira parte: 3(x²+1)²·2x.' }
      ],

      tip: 'Antes de derivar, escreva em voz alta: "o de fora é ___, o de dentro é ___". Se você não consegue dizer isso, ainda não identificou a composição — e vai errar.',

      drills: {
        basico: [
          { id: 'c1.de.cad#b1', type: 'input', prompt: 'Derive f(x) = (3x + 2)⁴. Escreva na forma a(3x+2)^b, respondendo a e b separados por vírgula.',
            answer: '12,3', accept: ['12, 3'],
            hints: ['De fora é a potência 4, de dentro é 3x+2.', 'Derivada de fora: 4(3x+2)³.',
                    'Derivada de dentro: 3. Multiplique 4 por 3.'],
            solution: ['Fora: 4(3x + 2)³', 'Dentro: (3x+2)′ = 3', 'Produto: 12(3x + 2)³', 'a = 12, b = 3'],
            traps: { '4,3': 'Faltou multiplicar pela derivada de dentro, que é 3.' } },
          { id: 'c1.de.cad#b2', type: 'input', prompt: 'Derive f(x) = sen(5x). Escreva na forma a*cos(5x), respondendo só o número a.',
            answer: '5',
            hints: ['Derivada do seno é cosseno, mantendo o de dentro.', 'Depois multiplique pela derivada de 5x.',
                    '(5x)′ = 5.'],
            solution: ['Fora: cos(5x)', 'Dentro: (5x)′ = 5', 'f′(x) = 5cos(5x)'],
            traps: { '1': 'Faltou o fator 5 que vem da derivada de dentro.' } },
          { id: 'c1.de.cad#b3', type: 'choice', prompt: 'Em f(x) = (x² + 7)⁵, qual é a "função de dentro"?',
            choices: ['x²', 'x² + 7', '(...)⁵', '7'], answer: 1,
            hints: ['A de dentro é o que está sendo elevado à quinta.', 'É a expressão inteira dentro do parêntese.',
                    'A de fora é a potência.'],
            solution: ['A composição é: eleva-se à quinta o resultado de x² + 7',
                       'De dentro: g(x) = x² + 7', 'De fora: f(u) = u⁵'] }
        ],
        intermediario: [
          { id: 'c1.de.cad#i1', type: 'input', prompt: 'Derive f(x) = (x² + 1)³. Escreva na forma a*x(x^2+1)^b, respondendo a e b separados por vírgula.',
            answer: '6,2', accept: ['6, 2'],
            hints: ['Fora: 3(x²+1)².', 'Dentro: (x²+1)′ = 2x.', 'Multiplique: 3·2x = 6x.'],
            solution: ['Fora: 3(x² + 1)²', 'Dentro: 2x', "f′(x) = 6x(x² + 1)²", 'a = 6, b = 2'],
            traps: { '3,2': 'Faltou multiplicar pelo 2x da derivada de dentro.' } },
          { id: 'c1.de.cad#i2', type: 'input', prompt: 'Derive f(x) = e^(2x). Escreva na forma a*e^(2x), respondendo só o número a.',
            answer: '2',
            hints: ['A derivada de eᵘ é eᵘ vezes u′.', 'Aqui u = 2x.', 'u′ = 2.'],
            solution: ['Fora: e^(2x) permanece', 'Dentro: (2x)′ = 2', 'f′(x) = 2e^(2x)'],
            traps: { '1': 'A exponencial se repete, mas ainda multiplica pela derivada de dentro.' } },
          { id: 'c1.de.cad#i3', type: 'input', prompt: 'Derive f(x) = cos(x²). Escreva na forma a*x*sen(x^2), respondendo só o número a (com sinal).',
            answer: '-2',
            hints: ['Derivada do cosseno é −seno.', 'Mantenha o de dentro: −sen(x²).', 'Multiplique por (x²)′ = 2x.'],
            solution: ['Fora: −sen(x²)', 'Dentro: 2x', 'f′(x) = −2x·sen(x²)'],
            traps: { '2': 'Faltou o sinal negativo da derivada do cosseno.' } }
        ],
        avancado: [
          { id: 'c1.de.cad#a1', type: 'input', prompt: 'Derive f(x) = √(4x + 1). Escreva na forma a/raiz(4x+1), respondendo só o número a.',
            answer: '2',
            hints: ['Reescreva como (4x+1)^(1/2).', 'Fora: (1/2)(4x+1)^(−1/2).', 'Dentro: 4. Multiplique: 4/2 = 2.'],
            solution: ['(4x+1)^(1/2)', 'Fora: (1/2)(4x+1)^(−1/2)', 'Dentro: 4',
                       'f′ = (4/2)(4x+1)^(−1/2) = 2/√(4x+1)'],
            traps: { '4': 'Você esqueceu do fator 1/2 da derivada da raiz.',
                     '1': 'Faltou multiplicar pela derivada de dentro.' } },
          { id: 'c1.de.cad#a2', type: 'input', prompt: 'Derive f(x) = sen²(x), ou seja, [sen(x)]². Escreva na forma a*sen(x)*cos(x), respondendo só o número a.',
            answer: '2',
            hints: ['A de fora é a potência 2; a de dentro é sen(x).', 'Fora: 2·sen(x).',
                    'Dentro: cos(x). Multiplique.'],
            solution: ['Fora: 2[sen(x)]¹ = 2sen(x)', 'Dentro: (sen x)′ = cos x',
                       'f′(x) = 2sen(x)cos(x)', 'Que também é sen(2x)'],
            traps: { '1': 'Faltou multiplicar pela derivada de dentro, cos(x).' } }
        ],
        desafio: [
          { id: 'c1.de.cad#d1', type: 'input', prompt: 'Derive f(x) = (sen(3x))⁴ e avalie o número de camadas de composição. Quantas vezes a regra da cadeia é aplicada?',
            answer: '2',
            hints: ['Identifique as camadas: potência, depois seno, depois 3x.',
                    'Derivar a potência exige uma aplicação; derivar sen(3x) exige outra.',
                    'São duas aplicações encadeadas.'],
            solution: ['Camadas: u⁴, onde u = sen(v), onde v = 3x',
                       'Primeira aplicação: 4(sen 3x)³ · [sen(3x)]′',
                       'Segunda aplicação: [sen(3x)]′ = 3cos(3x)',
                       "Resultado: f′(x) = 12(sen 3x)³·cos(3x) — duas aplicações"],
            traps: { '1': 'Há duas composições encadeadas, não uma.',
                     '3': 'A camada 3x é derivada dentro da segunda aplicação, não numa terceira.' } }
        ]
      },

      review: [
        'Derivada de fora com o de dentro intacto, vezes a derivada do de dentro.',
        'O erro que mais custa ponto é parar antes do último fator.',
        'Identifique explicitamente "o de fora" e "o de dentro" antes de derivar.',
        'Composições encadeadas aplicam a regra uma vez por camada.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Máximos e mínimos
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'c1.ap.extremos',

      whatIs: `<p>Nos picos e vales de uma curva suave, a reta tangente é horizontal — ou seja, <span class="math">f′(x) = 0</span>. Esses pontos são chamados <strong>críticos</strong>.</p>
        <p>Ser crítico não garante ser extremo: <span class="math">f(x) = x³</span> tem <span class="math">f′(0) = 0</span> e nem sobe nem desce ali. Por isso é preciso testar.</p>`,

      whyExists: `<p>Toda pergunta de otimização — maior lucro, menor custo, área máxima, caminho mais curto — é a busca de um extremo. Antes do Cálculo, só se resolvia o caso da parábola. Com derivada, resolve-se qualquer função derivável.</p>
        <p>É por isso que este tópico é o que mais aparece em prova de engenharia e economia: ele é a razão prática de o Cálculo existir.</p>`,

      simple: 'Onde a curva vira, a tangente fica horizontal. Ache onde a derivada zera e depois veja se o sinal dela muda de + para − (máximo) ou de − para + (mínimo).',

      academic: `<p><strong>Teorema de Fermat:</strong> se <span class="math">f</span> tem extremo local em <span class="math">c</span> interior ao domínio e é derivável em <span class="math">c</span>, então <span class="math">f′(c) = 0</span>. A recíproca é falsa.</p>
        <p><strong>Teste da primeira derivada:</strong> em <span class="math">c</span> crítico, se <span class="math">f′</span> passa de positiva a negativa há máximo local; de negativa a positiva, mínimo local; se não muda de sinal, não há extremo.</p>
        <p><strong>Teste da segunda derivada:</strong> <span class="math">f″(c) &lt; 0</span> indica máximo, <span class="math">f″(c) &gt; 0</span> indica mínimo; <span class="math">f″(c) = 0</span> é inconclusivo.</p>
        <p>Num intervalo fechado, extremos globais podem ocorrer também nas extremidades — que não são pontos críticos.</p>`,

      examples: [
        { level: 'basico', prompt: 'Ache os pontos críticos de f(x) = x² − 6x + 5',
          steps: ["f′(x) = 2x − 6", 'Iguale a zero: 2x − 6 = 0', 'x = 3',
                  'Como a parábola abre para cima, é mínimo'],
          answer: 'x = 3, mínimo' },
        { level: 'intermediario', prompt: 'Classifique os pontos críticos de f(x) = x³ − 3x',
          steps: ["f′(x) = 3x² − 3 = 0 → x = ±1",
                  "f″(x) = 6x",
                  "f″(−1) = −6 < 0 → máximo local",
                  "f″(1) = 6 > 0 → mínimo local"],
          answer: 'x = −1 máximo local, x = 1 mínimo local' },
        { level: 'avancado', prompt: 'Uma caixa sem tampa é feita de uma folha 12×12 cortando quadrados de lado x nos cantos. Qual x maximiza o volume?',
          steps: ['V(x) = x(12 − 2x)² , com 0 < x < 6',
                  "V′(x) = (12−2x)² + x·2(12−2x)(−2) = (12−2x)(12 − 6x)",
                  'Zeros: x = 6 (fora do domínio útil) e x = 2',
                  'Em x = 2 o volume é 2·8² = 128'],
          answer: 'x = 2, volume máximo 128' }
      ],

      application: { area: 'Engenharia',
        text: 'Dimensionar um vaso de pressão para minimizar material com volume fixo é um problema de extremo com restrição. A restrição vira substituição, a função objetivo vira uma variável só, e a derivada resolve. É o roteiro de praticamente toda questão de otimização.' },

      formulas: [
        { f: "f′(c) = 0 ⟹ c é ponto crítico", note: 'Condição necessária, não suficiente.' },
        { f: "f′ muda de + para − ⟹ máximo local", note: 'Teste da primeira derivada.' },
        { f: "f″(c) < 0 ⟹ máximo · f″(c) > 0 ⟹ mínimo", note: 'Teste da segunda derivada. Zero é inconclusivo.' },
        { f: 'Extremos globais em [a,b]: críticos ∪ {a, b}', note: 'As extremidades também competem.' }
      ],

      mistakes: [
        { erro: 'Concluir que todo ponto crítico é extremo',
          porque: 'Confundir condição necessária com suficiente.',
          certo: 'f(x) = x³ tem f′(0) = 0 e não tem extremo ali. É preciso testar o sinal.' },
        { erro: 'Esquecer de verificar as extremidades num intervalo fechado',
          porque: 'Procurar só onde a derivada zera.',
          certo: 'O máximo global pode estar em a ou b, onde a derivada nem precisa zerar.' },
        { erro: 'Responder o x crítico quando a pergunta pede o valor máximo',
          porque: 'Parar no meio.',
          certo: 'O valor é f(x_crítico). Volte à função original.' }
      ],

      tip: 'Em problema de otimização com enunciado, sempre escreva o domínio antes de derivar. Metade das respostas absurdas — comprimento negativo, x maior que a folha — some quando o domínio está escrito no papel.',

      drills: {
        basico: [
          { id: 'c1.ap.ext#b1', type: 'input', prompt: 'Ache o ponto crítico de f(x) = x² − 10x + 3. Responda o valor de x.',
            answer: '5',
            hints: ['Derive.', "f′(x) = 2x − 10.", 'Iguale a zero.'],
            solution: ["f′(x) = 2x − 10", '2x − 10 = 0', 'x = 5'],
            traps: { '10': 'Faltou dividir por 2 ao isolar x.' } },
          { id: 'c1.ap.ext#b2', type: 'choice', prompt: 'Se f′(c) = 0 e f″(c) > 0, o ponto c é:',
            choices: ['Máximo local', 'Mínimo local', 'Ponto de inflexão', 'Nada se pode dizer'], answer: 1,
            hints: ['A segunda derivada indica a concavidade.', 'Positiva significa concavidade para cima.',
                    'Concavidade para cima com tangente horizontal é um vale.'],
            solution: ["f″ > 0 → concavidade para cima", 'Com tangente horizontal, é o fundo do vale',
                       'Logo é mínimo local'] },
          { id: 'c1.ap.ext#b3', type: 'input', prompt: 'Quantos pontos críticos tem f(x) = x³ − 12x ?', answer: '2',
            hints: ["f′(x) = 3x² − 12.", 'Resolva 3x² − 12 = 0.', 'x² = 4 tem duas soluções.'],
            solution: ["f′(x) = 3x² − 12 = 0", 'x² = 4', 'x = −2 e x = 2', 'Dois pontos críticos'],
            traps: { '1': 'x² = 4 tem duas raízes, não uma.' } }
        ],
        intermediario: [
          { id: 'c1.ap.ext#i1', type: 'input', prompt: 'Em f(x) = x³ − 3x² , qual valor de x é mínimo local ?', answer: '2',
            hints: ["f′(x) = 3x² − 6x = 3x(x − 2), com zeros em 0 e 2.", "f″(x) = 6x − 6.",
                    "f″(2) = 6 > 0."],
            solution: ["f′(x) = 3x(x − 2) → críticos em x = 0 e x = 2",
                       "f″(x) = 6x − 6", "f″(0) = −6 < 0 → máximo", "f″(2) = 6 > 0 → mínimo"],
            traps: { '0': 'Em x = 0 a segunda derivada é negativa: é máximo local.' } },
          { id: 'c1.ap.ext#i2', type: 'input', prompt: 'Qual o valor máximo de f(x) = −x² + 4x + 1 ?', answer: '5',
            hints: ["f′(x) = −2x + 4 = 0 dá x = 2.", 'Substitua x = 2 na função original.',
                    'f(2) = −4 + 8 + 1.'],
            solution: ["f′(x) = −2x + 4 = 0 → x = 2", 'f(2) = −4 + 8 + 1 = 5', 'Valor máximo: 5'],
            traps: { '2': 'Esse é o x onde ocorre, não o valor máximo.' } },
          { id: 'c1.ap.ext#i3', type: 'choice', prompt: 'Por que x = 0 não é extremo de f(x) = x³, mesmo com f′(0) = 0 ?',
            choices: ['Porque f não é contínua ali', 'Porque a derivada não muda de sinal',
                      'Porque f(0) = 0', 'Porque x³ não é derivável'], answer: 1,
            hints: ["f′(x) = 3x² é sempre ≥ 0.", 'Antes e depois de 0 a derivada é positiva.',
                    'Sem mudança de sinal, não há pico nem vale.'],
            solution: ["f′(x) = 3x² ≥ 0 para todo x", 'A função só cresce, com uma pausa em x = 0',
                       'Sem mudança de sinal em f′, não há extremo — é ponto de inflexão'] }
        ],
        avancado: [
          { id: 'c1.ap.ext#a1', type: 'input', prompt: 'Qual o valor máximo de f(x) = x³ − 3x no intervalo fechado [0, 3] ?',
            answer: '18',
            hints: ["f′(x) = 3x² − 3 = 0 dá x = ±1; só x = 1 está no intervalo.",
                    'Avalie f em 1, e também nas extremidades 0 e 3.',
                    'f(1) = −2, f(0) = 0, f(3) = 27 − 9.'],
            solution: ["Críticos: x = 1 (x = −1 está fora do intervalo)",
                       'f(0) = 0', 'f(1) = 1 − 3 = −2', 'f(3) = 27 − 9 = 18',
                       'Máximo global no intervalo: 18, em x = 3'],
            traps: { '-2': 'Esse é o mínimo local, e nem é o mínimo global do intervalo.',
                     '1': 'Esse é um x crítico, não o valor máximo.' } },
          { id: 'c1.ap.ext#a2', type: 'input', prompt: 'Dois números positivos somam 20. Qual o maior produto possível entre eles ?',
            answer: '100',
            hints: ['Se um é x, o outro é 20 − x.', 'P(x) = x(20 − x) = 20x − x².',
                    "P′(x) = 20 − 2x = 0 dá x = 10."],
            solution: ['P(x) = x(20 − x) = 20x − x²', "P′(x) = 20 − 2x = 0 → x = 10",
                       'O outro número também é 10', 'Produto máximo: 100'],
            traps: { '10': 'Esse é cada número, não o produto.' } }
        ],
        desafio: [
          { id: 'c1.ap.ext#d1', type: 'input', prompt: 'Uma lata cilíndrica de volume 1000 cm³ deve usar o mínimo de material. Qual deve ser o raio, em cm, arredondado para o inteiro mais próximo ?',
            answer: '5',
            hints: ['Área total: A = 2πr² + 2πrh, com V = πr²h = 1000.',
                    'Isole h = 1000/(πr²) e substitua: A(r) = 2πr² + 2000/r.',
                    "A′(r) = 4πr − 2000/r² = 0 → r³ = 500/π."],
            solution: ['V = πr²h = 1000 → h = 1000/(πr²)',
                       'A(r) = 2πr² + 2πr·1000/(πr²) = 2πr² + 2000/r',
                       "A′(r) = 4πr − 2000/r²", 'Igualando a zero: 4πr³ = 2000 → r³ = 500/π ≈ 159,15',
                       'r ≈ 5,42 → aproximadamente 5 cm'],
            traps: { '10': 'Você resolveu para o diâmetro ou usou a fórmula da esfera.',
                     '4': 'Confira a conta: r³ ≈ 159 dá r ≈ 5,4.' } }
        ]
      },

      review: [
        'Extremos de funções deriváveis ocorrem onde f′ = 0 — mas nem todo ponto crítico é extremo.',
        'Teste pelo sinal de f′ ou pelo sinal de f″.',
        'Em intervalo fechado, as extremidades competem pelo extremo global.',
        'Escreva o domínio do problema antes de derivar.'
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       Teorema Fundamental do Cálculo
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'c1.it.tfc',

      whatIs: `<p>O Teorema Fundamental liga as duas metades do Cálculo. A parte que mais se usa diz:</p>
        <p><span class="math">∫ₐᵇ f(x) dx = F(b) − F(a)</span>, onde <span class="math">F′ = f</span>.</p>
        <p>Ou seja: para achar a área sob uma curva, não é preciso somar infinitos retângulos. Basta achar uma antiderivada e avaliar nas pontas.</p>`,

      whyExists: `<p>Área sob curva e inclinação de tangente pareciam problemas sem relação — um sobre acumulação, outro sobre variação. O teorema mostra que são operações inversas.</p>
        <p>A consequência prática é gigantesca: um cálculo que exigia limite de somas infinitas vira uma subtração. É o resultado que transformou o Cálculo de curiosidade em ferramenta.</p>`,

      simple: 'Ache uma função cuja derivada é a que você quer integrar. Calcule ela no limite de cima, calcule no de baixo, subtraia. Pronto.',

      academic: `<p><strong>Primeira parte:</strong> se <span class="math">f</span> é contínua em <span class="math">[a,b]</span> e <span class="math">F(x) = ∫ₐˣ f(t)dt</span>, então <span class="math">F′(x) = f(x)</span>. A função acumulada tem como derivada o integrando.</p>
        <p><strong>Segunda parte:</strong> se <span class="math">F</span> é qualquer antiderivada de <span class="math">f</span> contínua em <span class="math">[a,b]</span>, então <span class="math">∫ₐᵇ f(x)dx = F(b) − F(a)</span>.</p>
        <p>A constante de integração não interfere na integral definida: ela aparece em <span class="math">F(b)</span> e em <span class="math">F(a)</span> e se cancela na subtração.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule ∫₀² x dx',
          steps: ['Antiderivada de x é x²/2', 'Avalie em 2: 4/2 = 2', 'Avalie em 0: 0', 'Subtraia: 2 − 0'],
          answer: '2' },
        { level: 'intermediario', prompt: 'Calcule ∫₁³ (2x + 1) dx',
          steps: ['Antiderivada: x² + x',
                  'Em 3: 9 + 3 = 12', 'Em 1: 1 + 1 = 2', '12 − 2'],
          answer: '10' },
        { level: 'avancado', prompt: 'Calcule ∫₀^π sen(x) dx',
          steps: ['Antiderivada de sen(x) é −cos(x)',
                  'Em π: −cos(π) = −(−1) = 1',
                  'Em 0: −cos(0) = −1',
                  '1 − (−1)'],
          answer: '2' }
      ],

      application: { area: 'Física',
        text: 'A integral da velocidade no tempo é o deslocamento. Se v(t) é conhecida, ∫ₐᵇ v(t)dt dá exatamente quanto o objeto andou entre a e b — sem precisar somar pedacinhos de trajetória.' },

      formulas: [
        { f: '∫ₐᵇ f(x)dx = F(b) − F(a), com F′ = f', note: 'A segunda parte. É a que se usa para calcular.' },
        { f: 'd/dx ∫ₐˣ f(t)dt = f(x)', note: 'A primeira parte: derivar desfaz integrar.' },
        { f: '∫ xⁿ dx = x^(n+1)/(n+1) + C, n ≠ −1', note: 'Sobe um e divide. O caso n = −1 dá ln|x|.' },
        { f: '∫ₐᵇ = −∫ᵇₐ', note: 'Inverter os limites troca o sinal.' }
      ],

      mistakes: [
        { erro: 'Subtrair na ordem errada: F(a) − F(b)',
          porque: 'Não fixar que o limite superior vem primeiro.',
          certo: 'Sempre F(b) − F(a). Inverter troca o sinal do resultado.' },
        { erro: 'Aplicar a regra da potência com n = −1',
          porque: 'Usar a fórmula sem verificar a restrição.',
          certo: '∫ x^(−1)dx = ln|x| + C. A fórmula geral daria divisão por zero.' },
        { erro: 'Escrever +C numa integral definida',
          porque: 'Arrastar o hábito da indefinida.',
          certo: 'Na definida o C se cancela na subtração. Só a indefinida leva +C.' }
      ],

      tip: 'Confira toda antiderivada derivando de volta. Se F′ não devolver exatamente o integrando, a integral está errada — e essa checagem custa cinco segundos.',

      drills: {
        basico: [
          { id: 'c1.it.tfc#b1', type: 'input', prompt: 'Calcule ∫₀³ 2x dx.', answer: '9',
            hints: ['Antiderivada de 2x é x².', 'Avalie em 3 e em 0.', '9 − 0.'],
            solution: ['F(x) = x²', 'F(3) = 9', 'F(0) = 0', '9 − 0 = 9'],
            traps: { '6': 'Você avaliou 2x em 3 em vez de usar a antiderivada.' } },
          { id: 'c1.it.tfc#b2', type: 'input', prompt: 'Calcule ∫₁² 3 dx.', answer: '3',
            hints: ['Antiderivada de 3 é 3x.', 'F(2) = 6 e F(1) = 3.', '6 − 3.'],
            solution: ['F(x) = 3x', 'F(2) − F(1) = 6 − 3 = 3',
                       'Faz sentido: retângulo de altura 3 e base 1'],
            traps: { '6': 'Faltou subtrair F(1).' } },
          { id: 'c1.it.tfc#b3', type: 'input', prompt: 'Calcule ∫₀¹ x² dx. Responda como fração a/b.', answer: '1/3',
            accept: ['0.333', '0,333'],
            hints: ['Antiderivada de x² é x³/3.', 'F(1) = 1/3 e F(0) = 0.', 'Subtraia.'],
            solution: ['F(x) = x³/3', 'F(1) = 1/3', 'F(0) = 0', 'Resultado: 1/3'],
            traps: { '1': 'Você esqueceu de dividir por 3 ao integrar x².' } }
        ],
        intermediario: [
          { id: 'c1.it.tfc#i1', type: 'input', prompt: 'Calcule ∫₁³ (2x + 3) dx.', answer: '14',
            hints: ['Antiderivada: x² + 3x.', 'F(3) = 9 + 9 = 18.', 'F(1) = 1 + 3 = 4.'],
            solution: ['F(x) = x² + 3x', 'F(3) = 9 + 9 = 18', 'F(1) = 1 + 3 = 4', '18 − 4 = 14'],
            traps: { '18': 'Faltou subtrair F(1).' } },
          { id: 'c1.it.tfc#i2', type: 'input', prompt: 'Calcule ∫₀² (3x² − 2x) dx.', answer: '4',
            hints: ['Antiderivada: x³ − x².', 'F(2) = 8 − 4 = 4.', 'F(0) = 0.'],
            solution: ['F(x) = x³ − x²', 'F(2) = 8 − 4 = 4', 'F(0) = 0', 'Resultado: 4'],
            traps: { '8': 'Você integrou só o primeiro termo.' } },
          { id: 'c1.it.tfc#i3', type: 'choice', prompt: 'Por que a constante C não aparece na integral definida ?',
            choices: ['Porque ela vale zero', 'Porque se cancela na subtração F(b) − F(a)',
                      'Porque a integral definida não tem antiderivada', 'Porque C só existe em derivadas'],
            answer: 1,
            hints: ['Escreva F(b) + C − [F(a) + C].', 'O C aparece nos dois termos.', 'Com sinais opostos, ele some.'],
            solution: ['[F(b) + C] − [F(a) + C]', '= F(b) − F(a) + C − C', 'O C se cancela'] }
        ],
        avancado: [
          { id: 'c1.it.tfc#a1', type: 'input', prompt: 'Calcule ∫₁⁴ (1/√x) dx.', answer: '2',
            hints: ['Reescreva 1/√x como x^(−1/2).', 'Antiderivada: 2x^(1/2) = 2√x.',
                    'F(4) = 4 e F(1) = 2.'],
            solution: ['1/√x = x^(−1/2)', 'F(x) = x^(1/2)/(1/2) = 2√x',
                       'F(4) = 2·2 = 4', 'F(1) = 2·1 = 2', '4 − 2 = 2'],
            traps: { '1': 'Você esqueceu o fator 2 da antiderivada.' } },
          { id: 'c1.it.tfc#a2', type: 'input', prompt: 'Calcule ∫₀^(π/2) cos(x) dx.', answer: '1',
            hints: ['Antiderivada de cos(x) é sen(x).', 'sen(π/2) = 1.', 'sen(0) = 0.'],
            solution: ['F(x) = sen(x)', 'F(π/2) = 1', 'F(0) = 0', 'Resultado: 1'],
            traps: { '0': 'Você usou −cos como antiderivada; essa é a do seno.' } }
        ],
        desafio: [
          { id: 'c1.it.tfc#d1', type: 'input', prompt: 'Calcule a área entre a curva y = x² e a reta y = x, de x = 0 a x = 1. Responda como fração a/b.',
            answer: '1/6', accept: ['0.1667', '0,1667'],
            hints: ['Área entre curvas: integre a de cima menos a de baixo.',
                    'Entre 0 e 1, a reta y = x está acima da parábola y = x².',
                    'Calcule ∫₀¹ (x − x²) dx.'],
            solution: ['Entre 0 e 1: x ≥ x²', 'Área = ∫₀¹ (x − x²) dx',
                       'F(x) = x²/2 − x³/3', 'F(1) = 1/2 − 1/3 = 1/6', 'F(0) = 0', 'Área: 1/6'],
            traps: { '1/2': 'Você integrou só a reta.',
                     '1/3': 'Você integrou só a parábola.',
                     '-1/6': 'Ordem invertida: subtraia a de baixo da de cima.' } }
        ]
      },

      review: [
        'Integral definida = antiderivada avaliada em cima menos avaliada embaixo.',
        'Derivar e integrar são operações inversas — é o que o teorema afirma.',
        'A constante C se cancela na integral definida.',
        'Confira toda antiderivada derivando de volta.'
      ],

      lab: 'labIntegral'
    }
  ]);
})(window.CZ);
