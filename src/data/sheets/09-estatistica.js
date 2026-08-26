/* ==========================================================================
   data/sheets/09-estatistica.js — fichas de Estatística.
   Formato e regras em core/sheets.js.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.sheets.register([
    /* ═══════════════════════════════════════════════════════════════
       Média
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'es.tc.media',

      whatIs: `<p>A média aritmética é a soma dos valores dividida pela quantidade deles:</p>
        <p><span class="math">x̄ = (x₁ + x₂ + … + xₙ) / n</span></p>
        <p>Ela é o ponto de equilíbrio do conjunto: se os dados fossem pesos numa régua, a média seria onde ela ficaria equilibrada.</p>`,

      whyExists: `<p>É o resumo mais direto de "em torno de que valor os dados estão". Usa toda a informação disponível — cada dado entra na conta.</p>
        <p>E é exatamente por usar todos que ela é sensível a extremos: um único valor absurdo arrasta a média inteira. Essa é a característica que decide quando ela serve e quando engana.</p>`,

      simple: 'Some tudo e divida pela quantidade. É o ponto de equilíbrio dos dados — mas um valor muito fora do padrão puxa esse ponto junto com ele.',

      academic: `<p>Para uma amostra <span class="math">{x₁,…,xₙ}</span>, define-se <span class="math">x̄ = (1/n)Σxᵢ</span>. A média é o valor <span class="math">c</span> que minimiza <span class="math">Σ(xᵢ − c)²</span> — propriedade que a coloca no centro do método dos mínimos quadrados.</p>
        <p>Duas consequências: <span class="math">Σ(xᵢ − x̄) = 0</span> (os desvios se anulam), e a média não é robusta, pois seu ponto de ruptura é <span class="math">1/n</span> — uma única observação arbitrariamente grande a leva junto.</p>
        <p>Para dados agrupados usa-se a média ponderada <span class="math">x̄ = Σfᵢxᵢ / Σfᵢ</span>.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule a média de 4, 7, 9 e 12',
          steps: ['Some: 4 + 7 + 9 + 12 = 32', 'Divida por 4'],
          answer: '8' },
        { level: 'intermediario', prompt: 'Um aluno tirou 6,0 na prova (peso 3) e 8,0 no trabalho (peso 2). Qual a média ponderada?',
          steps: ['Multiplique cada nota pelo peso: 6(3) = 18 e 8(2) = 16',
                  'Some: 34', 'Divida pela soma dos pesos: 3 + 2 = 5'],
          answer: '6,8' },
        { level: 'avancado', prompt: 'Numa turma de 9 pessoas a média salarial é R$ 3.000. Entra alguém que ganha R$ 30.000. Qual a nova média?',
          steps: ['Soma anterior: 9 × 3000 = 27.000',
                  'Nova soma: 27.000 + 30.000 = 57.000',
                  'Nova média: 57.000 / 10'],
          answer: 'R$ 5.700 — quase o dobro, por causa de um só valor' }
      ],

      application: { area: 'Ciência de Dados',
        text: 'Renda média e renda mediana de um país costumam diferir muito, e a diferença mede a concentração no topo. Reportar só a média em distribuições assimétricas dá a impressão de que a maioria está melhor do que está.' },

      formulas: [
        { f: 'x̄ = Σxᵢ / n', note: 'Média aritmética simples.' },
        { f: 'x̄ = Σ(fᵢ·xᵢ) / Σfᵢ', note: 'Média ponderada, também usada em dados agrupados.' },
        { f: 'Σ(xᵢ − x̄) = 0', note: 'Os desvios em relação à média sempre se cancelam.' },
        { f: 'Soma = média × n', note: 'Útil para recalcular a média ao acrescentar ou remover dados.' }
      ],

      mistakes: [
        { erro: 'Fazer a média das médias de grupos de tamanhos diferentes',
          porque: 'Ignorar que grupos maiores devem pesar mais.',
          certo: 'Use média ponderada pelos tamanhos, ou some tudo e divida pelo total geral.' },
        { erro: 'Usar a média em distribuição fortemente assimétrica',
          porque: 'Aplicar por hábito, sem olhar a forma dos dados.',
          certo: 'Com cauda longa ou outlier, a mediana descreve melhor o valor típico.' },
        { erro: 'Esquecer de dividir pela soma dos pesos na média ponderada',
          porque: 'Dividir pela quantidade de itens.',
          certo: 'Com pesos 3 e 2, divide-se por 5, não por 2.' }
      ],

      tip: 'Antes de reportar uma média, calcule também a mediana. Se as duas ficarem próximas, a média descreve bem. Se ficarem distantes, existe assimetria ou outlier — e vale investigar antes de publicar o número.',

      drills: {
        basico: [
          { id: 'es.tc.med#b1', type: 'input', prompt: 'Qual a média de 5, 10 e 15 ?', answer: '10',
            hints: ['Some os três valores.', '5 + 10 + 15 = 30.', 'Divida por 3.'],
            solution: ['Soma: 30', 'n = 3', 'Média: 30/3 = 10'],
            traps: { '30': 'Faltou dividir pela quantidade.' } },
          { id: 'es.tc.med#b2', type: 'input', prompt: 'Qual a média de 2, 4, 4, 6 e 9 ?', answer: '5',
            hints: ['Some todos, inclusive os repetidos.', '2 + 4 + 4 + 6 + 9 = 25.', 'Divida por 5.'],
            solution: ['Soma: 25', 'n = 5', 'Média: 5'],
            traps: { '6.25': 'Você contou apenas 4 valores, ignorando o repetido.' } },
          { id: 'es.tc.med#b3', type: 'input', prompt: 'A média de 6 valores é 7. Qual a soma deles ?', answer: '42',
            hints: ['Soma = média × n.', '7 × 6.', 'A relação é a fórmula da média isolada.'],
            solution: ['x̄ = soma/n', 'soma = x̄ · n = 7 × 6 = 42'],
            traps: { '13': 'Você somou média e quantidade em vez de multiplicar.' } }
        ],
        intermediario: [
          { id: 'es.tc.med#i1', type: 'input', prompt: 'Notas 8 (peso 2) e 5 (peso 3). Qual a média ponderada? (uma casa decimal)',
            answer: '6.2', accept: ['6,2'],
            hints: ['Multiplique cada nota pelo peso.', '8(2) + 5(3) = 16 + 15 = 31.',
                    'Divida pela soma dos pesos: 5.'],
            solution: ['8×2 = 16 e 5×3 = 15', 'Soma: 31', 'Pesos: 2 + 3 = 5', '31/5 = 6,2'],
            traps: { '6.5': 'Você fez a média simples de 8 e 5, ignorando os pesos.',
                     '15.5': 'Você dividiu por 2 em vez de pela soma dos pesos.' } },
          { id: 'es.tc.med#i2', type: 'input', prompt: 'A média de 4 valores é 10. Ao acrescentar o valor 20, qual a nova média?',
            answer: '12',
            hints: ['Soma anterior: 4 × 10 = 40.', 'Nova soma: 40 + 20 = 60.', 'Agora são 5 valores.'],
            solution: ['Soma anterior: 40', 'Nova soma: 60', 'Nova média: 60/5 = 12'],
            traps: { '15': 'Você fez a média entre 10 e 20, ignorando quantos valores havia.' } },
          { id: 'es.tc.med#i3', type: 'input', prompt: 'Turma A: 10 alunos, média 6. Turma B: 30 alunos, média 8. Qual a média geral?',
            answer: '7.5', accept: ['7,5'],
            hints: ['Não é a média entre 6 e 8: as turmas têm tamanhos diferentes.',
                    'Soma A: 60. Soma B: 240.', 'Total 300 dividido por 40 alunos.'],
            solution: ['Soma A: 10 × 6 = 60', 'Soma B: 30 × 8 = 240', 'Total: 300 em 40 alunos',
                       'Média geral: 300/40 = 7,5'],
            traps: { '7': 'Você fez a média das médias, ignorando os tamanhos das turmas.' } }
        ],
        avancado: [
          { id: 'es.tc.med#a1', type: 'input', prompt: 'Em 9, 11, 10, 12 e 158, qual a média? (uma casa decimal)',
            answer: '40', accept: ['40.0', '40,0'],
            hints: ['Some: 9 + 11 + 10 + 12 + 158.', '= 200.', 'Divida por 5.'],
            solution: ['Soma: 200', 'Média: 200/5 = 40',
                       'Note que 4 dos 5 valores estão perto de 10 — a média não representa nenhum deles'],
            traps: { '10.5': 'Você provavelmente calculou a mediana ou ignorou o 158.' } },
          { id: 'es.tc.med#a2', type: 'input', prompt: 'A média de 5 números é 12. Removendo o número 20, qual a média dos 4 restantes?',
            answer: '10',
            hints: ['Soma original: 5 × 12 = 60.', 'Sem o 20: 60 − 20 = 40.', 'Agora são 4 valores.'],
            solution: ['Soma original: 60', 'Após remover 20: 40', 'Nova média: 40/4 = 10'],
            traps: { '8': 'Você subtraiu 20 da média em vez de da soma.' } }
        ],
        desafio: [
          { id: 'es.tc.med#d1', type: 'input', prompt: 'A média de uma turma de 20 alunos é 7,0. Descobre-se que a nota de um aluno foi lançada como 9 quando o correto era 5. Qual a média correta?',
            answer: '6.8', accept: ['6,8'],
            hints: ['Soma lançada: 20 × 7 = 140.', 'A correção tira 4 pontos: 140 − 4 = 136.',
                    'Divida por 20.'],
            solution: ['Soma lançada: 140', 'Correção: −4 pontos (de 9 para 5)',
                       'Soma correta: 136', 'Média: 136/20 = 6,8'],
            traps: { '7.2': 'Sinal invertido: a nota diminuiu, então a média cai.',
                     '6.6': 'Você descontou 8 em vez de 4.' } }
        ]
      },

      review: [
        'Média é a soma dividida pela quantidade — o ponto de equilíbrio dos dados.',
        'Ela usa todos os valores, e por isso é sensível a extremos.',
        'Média de médias só vale quando os grupos têm o mesmo tamanho.',
        'Compare sempre com a mediana antes de reportar.'
      ],

      lab: 'labEstatistica'
    },

    /* ═══════════════════════════════════════════════════════════════
       Variância e desvio padrão
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'es.dp.variancia',

      whatIs: `<p>Variância mede o quanto os dados se espalham em torno da média. Calcula-se o desvio de cada valor até a média, eleva-se ao quadrado e faz-se a média desses quadrados.</p>
        <p>O <strong>desvio padrão</strong> é a raiz quadrada da variância — e existe justamente para voltar à unidade original dos dados.</p>`,

      whyExists: `<p>Duas turmas podem ter a mesma média e realidades opostas: uma com todo mundo em 7, outra com metade em 4 e metade em 10. A média não distingue; a dispersão sim.</p>
        <p>Por que elevar ao quadrado? Porque a soma dos desvios simples é sempre zero — os positivos cancelam os negativos. O quadrado elimina o sinal e, de quebra, penaliza mais os desvios grandes, que é o comportamento desejado.</p>`,

      simple: 'Veja o quanto cada valor se afasta da média, eleve ao quadrado, tire a média disso. Depois tire a raiz para voltar à unidade original.',

      academic: `<p>Variância populacional: <span class="math">σ² = Σ(xᵢ − μ)²/N</span>. Variância amostral: <span class="math">s² = Σ(xᵢ − x̄)²/(n−1)</span>.</p>
        <p>A divisão por <span class="math">n−1</span> (correção de Bessel) existe porque <span class="math">x̄</span> foi estimada dos próprios dados, consumindo um grau de liberdade. Dividir por <span class="math">n</span> subestimaria sistematicamente a variância populacional; com <span class="math">n−1</span> o estimador fica não viesado.</p>
        <p>Fórmula prática: <span class="math">s² = [Σxᵢ² − (Σxᵢ)²/n]/(n−1)</span>, que evita calcular cada desvio.</p>`,

      examples: [
        { level: 'basico', prompt: 'Calcule a variância populacional de 2, 4 e 6',
          steps: ['Média: (2+4+6)/3 = 4',
                  'Desvios: −2, 0, 2', 'Quadrados: 4, 0, 4', 'Média dos quadrados: 8/3'],
          answer: '≈ 2,67' },
        { level: 'intermediario', prompt: 'Calcule o desvio padrão amostral de 5, 7 e 9',
          steps: ['Média: 7', 'Desvios: −2, 0, 2 → quadrados 4, 0, 4',
                  'Soma: 8. Divida por n−1 = 2: s² = 4', 'Desvio padrão: √4'],
          answer: '2' },
        { level: 'avancado', prompt: 'Duas turmas têm média 7. A turma A tem desvio padrão 0,5 e a B tem 3,0. O que isso diz?',
          steps: ['A média é a mesma, mas a dispersão não',
                  'Em A quase todo mundo tirou perto de 7',
                  'Em B há muita nota baixa e muita alta se compensando'],
          answer: 'A é homogênea; B é polarizada. A média sozinha esconderia isso.' }
      ],

      application: { area: 'Controle de qualidade',
        text: 'Numa linha de produção, a média dizer que a peça está na medida não basta: se o desvio padrão for alto, muitas peças estão fora da tolerância mesmo com a média certa. Índices de capacidade de processo comparam justamente a tolerância com o desvio padrão.' },

      formulas: [
        { f: 'σ² = Σ(xᵢ − μ)² / N', note: 'Variância populacional: divide por N.' },
        { f: 's² = Σ(xᵢ − x̄)² / (n − 1)', note: 'Variância amostral: divide por n−1.' },
        { f: 's = √(s²)', note: 'Desvio padrão: volta à unidade original dos dados.' },
        { f: 'Var(X) = E(X²) − [E(X)]²', note: 'Fórmula prática, evita calcular cada desvio.' },
        { f: 'CV = s/x̄', note: 'Coeficiente de variação: dispersão relativa, para comparar escalas diferentes.' }
      ],

      mistakes: [
        { erro: 'Somar os desvios sem elevar ao quadrado',
          porque: 'Tentar medir dispersão pela soma direta.',
          certo: 'A soma dos desvios é sempre zero. O quadrado é o que evita o cancelamento.' },
        { erro: 'Dividir por n numa amostra',
          porque: 'Usar a fórmula populacional em dados amostrais.',
          certo: 'Amostra divide por n−1. Com n pequeno a diferença é grande.' },
        { erro: 'Comparar variâncias de grandezas com unidades diferentes',
          porque: 'Ignorar que a variância tem unidade ao quadrado.',
          certo: 'Use o coeficiente de variação, que é adimensional.' }
      ],

      tip: 'Reporte sempre o desvio padrão, não a variância: ele está na mesma unidade dos dados e pode ser lido junto com a média. "Média 70 ± 5 kg" comunica; "variância 25 kg²" não.',

      drills: {
        basico: [
          { id: 'es.dp.var#b1', type: 'input', prompt: 'Qual a variância populacional de 3, 5 e 7 ?', answer: '2.67',
            accept: ['2,67', '8/3', '2.6667'],
            hints: ['A média é 5.', 'Desvios: −2, 0, 2. Quadrados: 4, 0, 4.', 'Soma 8, dividida por 3.'],
            solution: ['Média: 5', 'Desvios ao quadrado: 4, 0, 4', 'Soma: 8', 'σ² = 8/3 ≈ 2,67'],
            traps: { '0': 'Você somou os desvios sem elevar ao quadrado — eles sempre dão zero.' } },
          { id: 'es.dp.var#b2', type: 'input', prompt: 'Se a variância é 49, qual o desvio padrão ?', answer: '7',
            hints: ['Desvio padrão é a raiz da variância.', '√49.', 'Sempre positivo.'],
            solution: ['s = √s²', 's = √49 = 7'],
            traps: { '2401': 'Você elevou ao quadrado em vez de tirar a raiz.' } },
          { id: 'es.dp.var#b3', type: 'choice', prompt: 'Um conjunto tem desvio padrão zero. O que isso significa ?',
            choices: ['Os dados são todos negativos', 'Todos os valores são iguais',
                      'A média é zero', 'Não há dados suficientes'], answer: 1,
            hints: ['Desvio padrão zero significa nenhum desvio.', 'Ou seja, todo valor é igual à média.',
                    'Isso só acontece se todos forem iguais entre si.'],
            solution: ['s = 0 exige Σ(xᵢ − x̄)² = 0', 'Como são quadrados, cada termo é zero',
                       'Logo xᵢ = x̄ para todos: todos iguais'] }
        ],
        intermediario: [
          { id: 'es.dp.var#i1', type: 'input', prompt: 'Qual a variância amostral de 4, 6 e 8 ?', answer: '4',
            hints: ['Média: 6.', 'Desvios ao quadrado: 4, 0, 4 → soma 8.',
                    'Amostra: divida por n−1 = 2.'],
            solution: ['Média: 6', 'Soma dos quadrados dos desvios: 8', 's² = 8/2 = 4'],
            traps: { '2.67': 'Você usou a fórmula populacional, dividindo por 3.' } },
          { id: 'es.dp.var#i2', type: 'input', prompt: 'Qual o desvio padrão amostral de 10, 12, 14 e 16 ?', answer: '2.58',
            accept: ['2,58', '2.582', '2.6', '2,6'],
            hints: ['Média: 13.', 'Desvios: −3, −1, 1, 3 → quadrados 9, 1, 1, 9 → soma 20.',
                    's² = 20/3 ≈ 6,67, e s = √6,67.'],
            solution: ['Média: 13', 'Quadrados dos desvios: 9, 1, 1, 9', 'Soma: 20',
                       's² = 20/3 ≈ 6,667', 's ≈ 2,58'],
            traps: { '2.24': 'Você dividiu por 4 em vez de 3.' } },
          { id: 'es.dp.var#i3', type: 'choice', prompt: 'Por que a variância amostral divide por n−1 ?',
            choices: ['Para simplificar a conta', 'Porque a média foi estimada dos próprios dados',
                      'Porque n pode ser zero', 'Por convenção histórica'], answer: 1,
            hints: ['A média amostral já foi calculada a partir dos dados.', 'Isso consome um grau de liberdade.',
                    'Sem a correção, a variância seria subestimada.'],
            solution: ['x̄ é estimada dos mesmos dados', 'Isso reduz em 1 os graus de liberdade',
                       'Dividir por n subestimaria σ²; n−1 corrige o viés'] }
        ],
        avancado: [
          { id: 'es.dp.var#a1', type: 'input', prompt: 'Turma A tem média 50 e desvio padrão 5. Turma B tem média 200 e desvio padrão 10. Qual tem maior dispersão RELATIVA? Responda A ou B.',
            answer: 'A',
            hints: ['Compare pelo coeficiente de variação: s/x̄.', 'A: 5/50 = 0,10. B: 10/200 = 0,05.',
                    'Maior CV significa maior dispersão relativa.'],
            solution: ['CV(A) = 5/50 = 0,10 = 10%', 'CV(B) = 10/200 = 0,05 = 5%',
                       'A tem o dobro da dispersão relativa, apesar do desvio padrão menor'],
            traps: { 'B': 'B tem desvio padrão maior em valor absoluto, mas a média também é muito maior.' } },
          { id: 'es.dp.var#a2', type: 'input', prompt: 'Se todos os valores de um conjunto forem somados de 10, o que acontece com o desvio padrão? Responda: aumenta, diminui ou não muda.',
            answer: 'não muda', accept: ['nao muda', 'não muda', 'nmuda', 'igual'],
            hints: ['Somar uma constante desloca todos os valores igualmente.', 'A média também sobe 10.',
                    'Os desvios em relação à média permanecem os mesmos.'],
            solution: ['Cada xᵢ vira xᵢ + 10 e x̄ vira x̄ + 10',
                       'O desvio (xᵢ + 10) − (x̄ + 10) = xᵢ − x̄ não muda',
                       'Logo o desvio padrão não muda'] }
        ],
        desafio: [
          { id: 'es.dp.var#d1', type: 'input', prompt: 'Um conjunto tem média 20 e desvio padrão 4. Se todos os valores forem multiplicados por 3, qual o novo desvio padrão ?',
            answer: '12',
            hints: ['Multiplicar por k multiplica os desvios por k.', 'A variância é multiplicada por k².',
                    'O desvio padrão é multiplicado por |k| = 3.'],
            solution: ['Var(kX) = k²·Var(X)', 'Novo s² = 9 × 16 = 144',
                       'Novo s = √144 = 12', 'Ou direto: s cresce pelo fator |k| = 3'],
            traps: { '36': 'Isso seria a nova variância multiplicada errado; o desvio padrão cresce por k, não k².',
                     '4': 'Multiplicar por constante SIM altera a dispersão — diferente de somar.' } }
        ]
      },

      review: [
        'Variância é a média dos quadrados dos desvios em relação à média.',
        'O quadrado existe porque a soma dos desvios simples é sempre zero.',
        'Amostra divide por n−1; população divide por N.',
        'Somar constante não muda a dispersão; multiplicar por k multiplica o desvio padrão por |k|.'
      ],

      lab: 'labEstatistica'
    },

    /* ═══════════════════════════════════════════════════════════════
       Correlação
       ═══════════════════════════════════════════════════════════════ */
    {
      topic: 'es.rl.correlacao',

      whatIs: `<p>O coeficiente de correlação de Pearson, <span class="math">r</span>, mede a força e o sentido da relação <strong>linear</strong> entre duas variáveis.</p>
        <p>Ele varia de <span class="math">−1</span> a <span class="math">+1</span>. Próximo de +1: quando uma sobe, a outra sobe. Próximo de −1: quando uma sobe, a outra desce. Próximo de 0: não há relação linear.</p>`,

      whyExists: `<p>Olhar um gráfico de dispersão e dizer "parece que tem relação" não é reprodutível. O <span class="math">r</span> transforma essa impressão num número comparável entre estudos.</p>
        <p>Mas ele tem um limite que precisa estar claro: mede apenas relação <em>linear</em>. Uma parábola perfeita pode ter <span class="math">r = 0</span> — há relação total, e nenhuma dela é linear. Por isso o gráfico nunca deve ser dispensado.</p>`,

      simple: 'r perto de 1 significa que sobem juntas; perto de −1, que uma sobe quando a outra desce; perto de 0, que não há relação em linha reta.',

      academic: `<p><span class="math">r = Σ(xᵢ − x̄)(yᵢ − ȳ) / [√Σ(xᵢ − x̄)² · √Σ(yᵢ − ȳ)²]</span>, isto é, a covariância dividida pelo produto dos desvios padrão.</p>
        <p>Propriedades: <span class="math">−1 ≤ r ≤ 1</span>; <span class="math">r</span> é adimensional e invariante a transformações lineares positivas; <span class="math">r²</span> é o coeficiente de determinação, a proporção da variância de <span class="math">y</span> explicada linearmente por <span class="math">x</span>.</p>
        <p>O quarteto de Anscombe mostra quatro conjuntos com o mesmo <span class="math">r</span> e gráficos completamente distintos — o argumento clássico contra reportar <span class="math">r</span> sem o gráfico.</p>`,

      examples: [
        { level: 'basico', prompt: 'r = 0,92 entre horas de estudo e nota. Como interpretar?',
          steps: ['O sinal é positivo: as duas crescem juntas',
                  'O valor é alto: a relação linear é forte'],
          answer: 'Forte relação linear positiva' },
        { level: 'intermediario', prompt: 'r = −0,85 entre preço e quantidade vendida. E agora?',
          steps: ['Sinal negativo: quando o preço sobe, a quantidade cai',
                  'Valor absoluto alto: relação forte'],
          answer: 'Forte relação linear negativa' },
        { level: 'avancado', prompt: 'Entre y = x² e x, com x de −5 a 5, o r dá aproximadamente 0. Isso significa ausência de relação?',
          steps: ['Não. A relação é perfeita, mas em forma de parábola',
                  'Metade sobe e metade desce, e a correlação linear se cancela',
                  'O r só capta a componente linear'],
          answer: 'Não: há relação total, mas não linear' }
      ],

      application: { area: 'Ciência de Dados',
        text: 'A matriz de correlação é o primeiro diagnóstico de um conjunto de dados. Variáveis muito correlacionadas entre si causam multicolinearidade em regressão, inflando o erro dos coeficientes — o modelo continua prevendo bem, mas a interpretação de cada coeficiente deixa de fazer sentido.' },

      formulas: [
        { f: 'r = cov(x,y) / (sₓ·s_y)', note: 'Covariância normalizada pelos desvios padrão.' },
        { f: '−1 ≤ r ≤ 1', note: 'Adimensional e limitado.' },
        { f: 'r² = proporção da variância explicada', note: 'r = 0,7 explica 49% da variância, não 70%.' },
        { f: 'r = 0 ⇏ independência', note: 'Significa apenas ausência de relação LINEAR.' }
      ],

      mistakes: [
        { erro: 'Concluir causalidade a partir de correlação alta',
          porque: 'Confundir associação com mecanismo.',
          certo: 'Pode haver variável de confusão, causalidade reversa ou coincidência. Só experimento controlado estabelece causa.' },
        { erro: 'Interpretar r = 0 como ausência de relação',
          porque: 'Esquecer que o r só mede linearidade.',
          certo: 'Relação em U ou parabólica dá r ≈ 0. Sempre olhe o gráfico.' },
        { erro: 'Ler r = 0,7 como "70% de relação"',
          porque: 'Tratar r como porcentagem.',
          certo: 'A proporção explicada é r² = 0,49, ou seja, 49%.' }
      ],

      tip: 'Nunca reporte r sem ter olhado o gráfico de dispersão. O quarteto de Anscombe existe exatamente para provar que o mesmo r pode vir de dados que não se parecem em nada.',

      drills: {
        basico: [
          { id: 'es.rl.cor#b1', type: 'choice', prompt: 'r = −0,9 indica:',
            choices: ['Relação fraca', 'Relação linear negativa forte',
                      'Relação linear positiva forte', 'Ausência de relação'], answer: 1,
            hints: ['O sinal indica o sentido.', 'O valor absoluto indica a força.',
                    '0,9 em módulo é alto.'],
            solution: ['Sinal negativo: quando uma sobe, a outra desce',
                       '|r| = 0,9: relação forte', 'Relação linear negativa forte'] },
          { id: 'es.rl.cor#b2', type: 'choice', prompt: 'Qual valor de r é impossível ?',
            choices: ['0', '−1', '0,999', '1,5'], answer: 3,
            hints: ['O r é limitado.', 'Ele varia entre −1 e 1.', '1,5 está fora do intervalo.'],
            solution: ['−1 ≤ r ≤ 1 sempre', 'r = 1,5 é impossível e indica erro de cálculo'] },
          { id: 'es.rl.cor#b3', type: 'input', prompt: 'Se r = 0,6, qual a proporção da variância explicada? Responda em porcentagem, só o número.',
            answer: '36',
            hints: ['A proporção explicada é r², não r.', '0,6² = 0,36.', 'Em porcentagem: 36%.'],
            solution: ['r² = 0,6² = 0,36', '36% da variância de y é explicada linearmente por x'],
            traps: { '60': 'r não é porcentagem; a proporção explicada é r².' } }
        ],
        intermediario: [
          { id: 'es.rl.cor#i1', type: 'choice', prompt: 'Um estudo acha r = 0,85 entre consumo de sorvete e afogamentos. Qual a explicação mais provável ?',
            choices: ['Sorvete causa afogamento', 'Afogamento causa consumo de sorvete',
                      'Há uma variável de confusão: o calor', 'A correlação é erro de cálculo'], answer: 2,
            hints: ['Pense no que faz as duas coisas subirem juntas.', 'As duas aumentam no verão.',
                    'A temperatura é causa comum das duas.'],
            solution: ['Calor aumenta o consumo de sorvete',
                       'Calor também aumenta a ida a praias e piscinas',
                       'A temperatura é variável de confusão: causa comum das duas'] },
          { id: 'es.rl.cor#i2', type: 'choice', prompt: 'Os dados formam uma parábola perfeita simétrica. Quanto vale r aproximadamente ?',
            choices: ['1', '−1', '0', '0,5'], answer: 2,
            hints: ['A parábola sobe de um lado e desce do outro.', 'As contribuições positivas e negativas se cancelam.',
                    'O r mede só a componente linear.'],
            solution: ['Metade da parábola tem relação positiva, metade negativa',
                       'Na correlação linear elas se cancelam', 'r ≈ 0, apesar da relação ser perfeita'] },
          { id: 'es.rl.cor#i3', type: 'input', prompt: 'Um modelo tem r = 0,8. Qual porcentagem da variância NÃO é explicada? Responda só o número.',
            answer: '36',
            hints: ['Explicada: r² = 0,64.', 'Não explicada: 1 − 0,64.', '= 0,36.'],
            solution: ['r² = 0,64 → 64% explicada', 'Não explicada: 1 − 0,64 = 0,36 = 36%'],
            traps: { '20': 'Você calculou 1 − r, não 1 − r².' } }
        ],
        avancado: [
          { id: 'es.rl.cor#a1', type: 'choice', prompt: 'Se todas as alturas forem convertidas de metros para centímetros, o que acontece com r entre altura e peso ?',
            choices: ['Multiplica por 100', 'Divide por 100', 'Não muda', 'Fica igual a 1'], answer: 2,
            hints: ['r é adimensional.', 'Ele é invariante a mudanças de escala positivas.',
                    'A relação entre as variáveis não mudou; só a unidade.'],
            solution: ['r é a covariância normalizada pelos desvios padrão',
                       'Multiplicar x por 100 multiplica covariância e sₓ por 100',
                       'Os fatores se cancelam: r não muda'] },
          { id: 'es.rl.cor#a2', type: 'choice', prompt: 'Dois conjuntos têm o mesmo r = 0,82, mas gráficos completamente diferentes. Isso é possível ?',
            choices: ['Não, r determina o gráfico', 'Sim — é exatamente o que o quarteto de Anscombe mostra',
                      'Só se houver erro de cálculo', 'Só com amostras muito grandes'], answer: 1,
            hints: ['r resume os dados num único número.', 'Resumos perdem informação.',
                    'Anscombe construiu quatro conjuntos com estatísticas idênticas e formas distintas.'],
            solution: ['r é um resumo, e resumos não determinam os dados',
                       'O quarteto de Anscombe tem mesma média, variância e r em quatro formas diferentes',
                       'Por isso o gráfico é obrigatório'] }
        ],
        desafio: [
          { id: 'es.rl.cor#d1', type: 'choice', prompt: 'Um estudo mostra que cidades com mais hospitais têm mais mortes. Qual a leitura correta ?',
            choices: ['Hospitais causam mortes', 'Cidades maiores têm mais dos dois — o tamanho é a confusão',
                      'A correlação deve estar errada', 'Mortes causam construção de hospitais'], answer: 1,
            hints: ['Pense no que cidades com muitos hospitais têm em comum.', 'Elas têm mais população.',
                    'Mais gente significa mais hospitais e mais mortes em números absolutos.'],
            solution: ['População é variável de confusão',
                       'Cidades maiores têm mais hospitais E mais mortes absolutas',
                       'A análise correta usaria taxas per capita, não números absolutos'] }
        ]
      },

      review: [
        'r mede força e sentido da relação LINEAR, entre −1 e 1.',
        'r = 0 significa ausência de relação linear, não ausência de relação.',
        'A proporção da variância explicada é r², não r.',
        'Correlação não é causalidade: procure confusão e causalidade reversa antes de concluir.'
      ],

      lab: 'labEstatistica'
    }
  ]);
})(window.CZ);
