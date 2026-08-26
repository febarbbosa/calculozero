/* ==========================================================================
   data/syllabus/01-matematica-basica.js

   A fundação. Esta disciplina existe para quem responde "eu não sei
   matemática" — e é a única do currículo sem nenhum pré-requisito.

   Critério de recorte: entra aqui tudo que aparece dentro de uma conta de
   álgebra sem ser explicado. Fração, sinal, potência e proporção derrubam
   mais gente em Cálculo do que limite e derivada juntos, porque ninguém
   volta para consertá-los.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'mat-basica', n: 1,
    name: 'Matemática Básica',
    icon: '🧱',
    tagline: 'Número, conta, fração, porcentagem — o chão de tudo.',
    goal: 'Operar com qualquer número que aparece na álgebra e no dia a dia sem depender de calculadora nem de decoreba.',
    requires: [],

    modules: [
      /* ═══════════ 1.1 Números ═══════════ */
      {
        id: 'mb.numeros', name: 'Números',
        goal: 'Saber que tipo de número está na sua frente e o que se pode fazer com ele.',
        units: [
          {
            id: 'mb.numeros.conjuntos', name: 'Conjuntos numéricos',
            topics: [
              { id: 'mb.num.naturais', name: 'Números naturais',
                requires: [], track: 'aritmetica',
                sub: ['contagem', 'sucessor e antecessor', 'ordem', 'zero como quantidade'],
                goal: 'Reconhecer os naturais como os números de contar e ordená-los sem hesitar.' },

              { id: 'mb.num.inteiros', name: 'Números inteiros',
                requires: ['mb.num.naturais'], track: 'aritmetica',
                sub: ['negativos', 'oposto', 'a reta dos inteiros', 'temperatura e saldo'],
                goal: 'Entender o negativo como direção, não como defeito, e ordenar inteiros com segurança.' },

              { id: 'mb.num.racionais', name: 'Números racionais',
                requires: ['mb.num.inteiros'], track: 'fracoes',
                sub: ['razão entre inteiros', 'fração e decimal', 'dízima periódica', 'densidade'],
                goal: 'Reconhecer que fração e decimal periódico são o mesmo objeto escrito de dois jeitos.' },

              { id: 'mb.num.irracionais', name: 'Números irracionais',
                requires: ['mb.num.racionais'],
                sub: ['√2', 'π', 'e', 'decimal infinita não periódica', 'aproximação'],
                goal: 'Saber por que existem números que nenhuma fração alcança e como lidar com eles na prática.' },

              { id: 'mb.num.reais', name: 'Números reais',
                requires: ['mb.num.irracionais'],
                sub: ['a reta completa', 'racionais ∪ irracionais', 'ordem', 'densidade e continuidade'],
                goal: 'Enxergar a reta real como um contínuo sem buracos — a base sobre a qual o Cálculo é construído.' }
            ]
          },
          {
            id: 'mb.numeros.reta', name: 'A reta, a ordem e a distância',
            topics: [
              { id: 'mb.num.reta', name: 'Reta numérica',
                requires: ['mb.num.inteiros'], track: 'aritmetica',
                sub: ['origem', 'escala', 'posicionar frações e decimais', 'sentido positivo'],
                goal: 'Localizar qualquer número na reta e usá-la para pensar em vez de decorar.' },

              { id: 'mb.num.comparacao', name: 'Comparação e ordenação',
                requires: ['mb.num.reta'],
                sub: ['<, >, ≤, ≥', 'comparar negativos', 'comparar frações', 'comparar decimais'],
                goal: 'Comparar dois números quaisquer justificando pela posição na reta.' },

              { id: 'mb.num.absoluto', name: 'Valor absoluto',
                requires: ['mb.num.reta'],
                sub: ['|x| como distância', 'módulo de negativo', '|x − a| como distância entre pontos', 'propriedades'],
                goal: 'Ler |x| como distância até a origem — a leitura que faz a definição de limite fazer sentido depois.' },

              { id: 'mb.num.intervalos', name: 'Intervalos',
                requires: ['mb.num.comparacao', 'mb.num.absoluto'],
                sub: ['aberto e fechado', 'notação (a,b) e [a,b]', 'infinito', 'união de intervalos', 'representação na reta'],
                goal: 'Escrever e desenhar qualquer conjunto de números descrito por desigualdade.' }
            ]
          }
        ]
      },

      /* ═══════════ 1.2 Operações ═══════════ */
      {
        id: 'mb.operacoes', name: 'Operações',
        goal: 'Fazer contas com sinal e com ordem correta, e saber quando o resultado está obviamente errado.',
        units: [
          {
            id: 'mb.operacoes.quatro', name: 'As quatro operações',
            topics: [
              { id: 'mb.op.adicao', name: 'Adição e subtração',
                requires: ['mb.num.inteiros'], track: 'aritmetica',
                sub: ['soma com sinais iguais', 'soma com sinais diferentes', 'subtrair é somar o oposto', 'menos na frente do parêntese'],
                goal: 'Somar e subtrair inteiros sem errar sinal, inclusive com parêntese negativo.' },

              { id: 'mb.op.multiplicacao', name: 'Multiplicação e divisão',
                requires: ['mb.op.adicao'], track: 'aritmetica',
                sub: ['regra de sinais', 'múltiplos e divisores', 'divisão exata e com resto', 'divisão por zero'],
                goal: 'Aplicar a regra de sinais com naturalidade e saber por que dividir por zero não existe.' },

              { id: 'mb.op.ordem', name: 'Ordem das operações',
                requires: ['mb.op.multiplicacao'], track: 'aritmetica', lesson: 'ar1',
                sub: ['parênteses', 'potências', 'multiplicação e divisão', 'soma e subtração', 'empates resolvidos da esquerda para a direita'],
                goal: 'Resolver expressões longas na ordem certa — o erro mais caro e mais comum de todos.' }
            ]
          },
          {
            id: 'mb.operacoes.propriedades', name: 'Propriedades e cálculo esperto',
            topics: [
              { id: 'mb.op.propriedades', name: 'Propriedades das operações',
                requires: ['mb.op.multiplicacao'],
                sub: ['comutativa', 'associativa', 'distributiva', 'elemento neutro', 'elemento oposto e inverso'],
                goal: 'Usar as propriedades para reorganizar contas — é o mesmo mecanismo que sustenta toda a álgebra.' },

              { id: 'mb.op.mental', name: 'Cálculo mental',
                requires: ['mb.op.propriedades'],
                sub: ['decompor e recompor', 'compensação', 'multiplicar por 10, 5 e 9', 'dobro e metade'],
                goal: 'Fazer de cabeça as contas que aparecem no meio de um problema maior, sem perder o fio.' },

              { id: 'mb.op.estimativa', name: 'Estimativas e ordem de grandeza',
                requires: ['mb.op.mental'],
                sub: ['arredondar antes de calcular', 'ordem de grandeza', 'checagem de plausibilidade', 'erro relativo grosseiro'],
                goal: 'Saber o tamanho aproximado da resposta antes de calcular — o hábito que pega erro de sinal e de vírgula.' }
            ]
          }
        ]
      },

      /* ═══════════ 1.3 Frações ═══════════ */
      {
        id: 'mb.fracoes', name: 'Frações',
        goal: 'Dominar o objeto que mais derruba gente em Cálculo — porque toda derivada é uma fração.',
        units: [
          {
            id: 'mb.fracoes.conceito', name: 'Entender a fração',
            topics: [
              { id: 'mb.fr.conceito', name: 'O que uma fração é',
                requires: ['mb.num.racionais'], track: 'fracoes', lesson: 'fr1',
                sub: ['numerador e denominador', 'parte de um inteiro', 'fração como divisão', 'denominador maior = pedaço menor'],
                goal: 'Ler 3/4 como "3 dividido por 4" e como "3 pedaços de 4" ao mesmo tempo.' },

              { id: 'mb.fr.equivalentes', name: 'Frações equivalentes e simplificação',
                requires: ['mb.fr.conceito'], track: 'fracoes',
                sub: ['multiplicar em cima e embaixo', 'MDC', 'fração irredutível', 'por que o valor não muda'],
                goal: 'Simplificar até a forma irredutível e justificar por que isso não altera o valor.' },

              { id: 'mb.fr.comparacao', name: 'Comparação de frações',
                requires: ['mb.fr.equivalentes'], track: 'fracoes',
                sub: ['denominador comum', 'MMC', 'multiplicação cruzada', 'comparar com 1/2 e com 1'],
                goal: 'Decidir qual fração é maior sem converter para decimal.' }
            ]
          },
          {
            id: 'mb.fracoes.operacoes', name: 'Operar com frações',
            topics: [
              { id: 'mb.fr.soma', name: 'Adição e subtração de frações',
                requires: ['mb.fr.comparacao'], track: 'fracoes', lesson: 'fr2',
                sub: ['mesmo denominador', 'denominadores diferentes', 'MMC como denominador comum', 'simplificar no fim'],
                goal: 'Somar frações igualando denominadores — e nunca mais somar numerador com numerador e denominador com denominador.' },

              { id: 'mb.fr.produto', name: 'Multiplicação e divisão de frações',
                requires: ['mb.fr.soma'], track: 'fracoes',
                sub: ['multiplicar reto', 'inverso de uma fração', 'dividir é multiplicar pelo inverso', 'simplificar antes de multiplicar'],
                goal: 'Multiplicar e dividir frações e explicar por que a divisão vira multiplicação pelo inverso.' },

              { id: 'mb.fr.mistas', name: 'Frações mistas e impróprias',
                requires: ['mb.fr.produto'],
                sub: ['própria e imprópria', 'número misto', 'converter nos dois sentidos', 'quando cada forma é útil'],
                goal: 'Converter entre número misto e fração imprópria sem hesitar.' },

              { id: 'mb.fr.algebricas', name: 'Frações algébricas',
                requires: ['mb.fr.produto', 'al.exp.simplificacao'], deferred: true,
                sub: ['fração com letra', 'domínio: denominador ≠ 0', 'simplificar fatorando', 'somar frações algébricas'],
                goal: 'Aplicar as mesmas regras de fração quando aparece letra — o passo que trava metade da turma em limites.' }
            ]
          }
        ]
      },

      /* ═══════════ 1.4 Decimais ═══════════ */
      {
        id: 'mb.decimais', name: 'Decimais',
        goal: 'Transitar entre fração e decimal e controlar precisão sem perder informação.',
        units: [
          {
            id: 'mb.decimais.base', name: 'Decimais na prática',
            topics: [
              { id: 'mb.dec.conversao', name: 'Conversão entre fração e decimal',
                requires: ['mb.fr.conceito'],
                sub: ['dividir numerador por denominador', 'decimal exata', 'dízima periódica', 'fração geratriz'],
                goal: 'Converter nos dois sentidos, inclusive recuperando a fração de uma dízima periódica.' },

              { id: 'mb.dec.operacoes', name: 'Operações com decimais',
                requires: ['mb.dec.conversao', 'mb.op.ordem'],
                sub: ['alinhar a vírgula', 'multiplicar contando casas', 'dividir deslocando a vírgula', 'erros de vírgula'],
                goal: 'Operar decimais com controle de casas, sem depender de calculadora.' },

              { id: 'mb.dec.arredondamento', name: 'Arredondamento e precisão',
                requires: ['mb.dec.operacoes'],
                sub: ['regra de arredondamento', 'casas decimais', 'algarismos significativos', 'propagação de erro', 'truncar × arredondar'],
                goal: 'Arredondar com critério e saber quanto erro isso introduz — conceito que volta em ponto flutuante e em análise numérica.' }
            ]
          }
        ]
      },

      /* ═══════════ 1.5 Porcentagem ═══════════ */
      {
        id: 'mb.porcentagem', name: 'Porcentagem',
        goal: 'Resolver qualquer situação de aumento, desconto e variação sem fórmula decorada.',
        units: [
          {
            id: 'mb.porcentagem.base', name: 'Porcentagem e variação',
            topics: [
              { id: 'mb.pc.basica', name: 'Porcentagem básica',
                requires: ['mb.dec.conversao'], track: 'aritmetica',
                sub: ['por cento = por cem', 'converter para decimal', 'porcentagem de um valor', 'qual porcentagem um valor representa'],
                goal: 'Calcular porcentagem de qualquer valor tratando % como multiplicação por decimal.' },

              { id: 'mb.pc.aumento', name: 'Aumento e desconto',
                requires: ['mb.pc.basica'],
                sub: ['fator de aumento (1 + i)', 'fator de desconto (1 − i)', 'valor final direto', 'voltar ao valor original'],
                goal: 'Aplicar aumento e desconto por fator multiplicativo, em um passo só.' },

              { id: 'mb.pc.variacao', name: 'Variação percentual',
                requires: ['mb.pc.aumento'],
                sub: ['variação absoluta × relativa', '(fim − início)/início', 'ponto percentual × porcentagem', 'variação negativa'],
                goal: 'Calcular e interpretar variação percentual — inclusive a diferença entre "subiu 2%" e "subiu 2 pontos percentuais".' },

              { id: 'mb.pc.sucessiva', name: 'Porcentagens sucessivas',
                requires: ['mb.pc.variacao'],
                sub: ['multiplicar fatores', 'por que +10% e −10% não voltam ao início', 'aumento acumulado', 'desconto sobre desconto'],
                goal: 'Compor variações multiplicando fatores, e explicar por que elas não se somam.' },

              { id: 'mb.pc.juros', name: 'Juros simples e aplicações financeiras',
                requires: ['mb.pc.sucessiva'],
                sub: ['juros simples', 'noção de juros compostos', 'capital, taxa e tempo', 'taxa equivalente', 'comparar propostas'],
                goal: 'Calcular juros simples e reconhecer quando a situação é composta — a ponte para a função exponencial.' }
            ]
          }
        ]
      },

      /* ═══════════ 1.6 Razão e proporção ═══════════ */
      {
        id: 'mb.proporcao', name: 'Razão e proporção',
        goal: 'Enxergar proporcionalidade em qualquer problema — é a primeira função linear da vida do aluno.',
        units: [
          {
            id: 'mb.proporcao.base', name: 'Proporcionalidade',
            topics: [
              { id: 'mb.rp.razao', name: 'Razão',
                requires: ['mb.fr.conceito'],
                sub: ['comparação por divisão', 'razão × diferença', 'razão entre grandezas diferentes', 'leitura "para cada"'],
                goal: 'Interpretar uma razão como "para cada tanto de um, tanto do outro".' },

              { id: 'mb.rp.proporcao', name: 'Proporção',
                requires: ['mb.rp.razao'],
                sub: ['igualdade de razões', 'propriedade fundamental', 'grandezas direta e inversamente proporcionais', 'constante de proporcionalidade'],
                goal: 'Reconhecer proporcionalidade direta e inversa e escrever a constante que liga as grandezas.' },

              { id: 'mb.rp.regra3', name: 'Regra de três simples',
                requires: ['mb.rp.proporcao'],
                sub: ['montar a tabela', 'identificar o sentido', 'direta', 'inversa'],
                goal: 'Montar e resolver regra de três decidindo o sentido pela lógica, não pelo chute.' },

              { id: 'mb.rp.regra3c', name: 'Regra de três composta',
                requires: ['mb.rp.regra3'],
                sub: ['três ou mais grandezas', 'analisar uma grandeza por vez', 'sentido de cada coluna', 'problemas de trabalho e vazão'],
                goal: 'Resolver problemas com várias grandezas analisando o efeito de cada uma isoladamente.' },

              { id: 'mb.rp.escalas', name: 'Escalas e taxas',
                requires: ['mb.rp.regra3'],
                sub: ['escala de mapa e planta', 'taxa unitária', 'velocidade média', 'densidade', 'câmbio'],
                goal: 'Usar escala e taxa como razões aplicadas — inclusive a velocidade, que vira derivada mais adiante.' }
            ]
          }
        ]
      },

      /* ═══════════ 1.7 Potenciação ═══════════ */
      {
        id: 'mb.potencias', name: 'Potenciação',
        goal: 'Manipular expoentes com fluência — sem isso, exponencial, logaritmo e derivada não saem.',
        units: [
          {
            id: 'mb.potencias.base', name: 'Potências',
            topics: [
              { id: 'mb.pot.conceito', name: 'Potência e propriedades',
                requires: ['mb.op.multiplicacao'], track: 'precalculo', lesson: 'pc1',
                sub: ['base e expoente', 'produto de potências', 'quociente de potências', 'potência de potência', 'potência de produto'],
                goal: 'Aplicar as cinco propriedades sem confundir soma de expoentes com multiplicação de bases.' },

              { id: 'mb.pot.negativos', name: 'Expoentes zero e negativos',
                requires: ['mb.pot.conceito'],
                sub: ['a⁰ = 1 e por quê', 'a⁻ⁿ = 1/aⁿ', 'inverter a fração', 'sinal da base × sinal do expoente'],
                goal: 'Justificar a⁰ = 1 pela regra do quociente e converter expoente negativo em fração.' },

              { id: 'mb.pot.fracionarios', name: 'Expoentes fracionários',
                requires: ['mb.pot.negativos', 'mb.rad.conceito'],
                sub: ['a^(1/n) = ⁿ√a', 'a^(m/n)', 'unificar raiz e potência', 'restrições de base negativa'],
                goal: 'Reescrever qualquer raiz como potência — a forma que permite derivar e integrar depois.' },

              { id: 'mb.pot.cientifica', name: 'Notação científica',
                requires: ['mb.pot.negativos', 'mb.dec.operacoes'],
                sub: ['a × 10ⁿ com 1 ≤ a < 10', 'converter nos dois sentidos', 'operar em notação científica', 'ordem de grandeza'],
                goal: 'Escrever e operar números muito grandes e muito pequenos sem contar zeros.' }
            ]
          }
        ]
      },

      /* ═══════════ 1.8 Radiciação ═══════════ */
      {
        id: 'mb.raizes', name: 'Radiciação',
        goal: 'Simplificar e racionalizar raízes — a manipulação que aparece dentro de limite e de módulo de vetor.',
        units: [
          {
            id: 'mb.raizes.base', name: 'Raízes',
            topics: [
              { id: 'mb.rad.conceito', name: 'Raiz quadrada e raiz n-ésima',
                requires: ['mb.pot.conceito'],
                sub: ['raiz como operação inversa', 'índice e radicando', 'raiz exata × aproximada', 'por que √ de negativo não é real'],
                goal: 'Ler a raiz como a pergunta inversa da potência e reconhecer quando ela não existe nos reais.' },

              { id: 'mb.rad.propriedades', name: 'Propriedades das raízes',
                requires: ['mb.rad.conceito'],
                sub: ['√(ab) = √a·√b', '√(a/b)', 'raiz de potência', 'por que √(a+b) ≠ √a + √b'],
                goal: 'Aplicar as propriedades válidas e reconhecer de imediato a falsa distributiva sobre a soma.' },

              { id: 'mb.rad.simplificacao', name: 'Simplificação de radicais',
                requires: ['mb.rad.propriedades'],
                sub: ['extrair fatores', 'fatoração do radicando', 'radicais semelhantes', 'somar radicais'],
                goal: 'Reduzir qualquer radical à forma mais simples e somar apenas os semelhantes.' },

              { id: 'mb.rad.racionalizacao', name: 'Racionalização',
                requires: ['mb.rad.simplificacao', 'al.prod.diferenca'], deferred: true,
                sub: ['raiz simples no denominador', 'conjugado', 'racionalizar o numerador', 'uso em limites'],
                goal: 'Tirar a raiz do denominador (ou do numerador) usando o conjugado — a técnica que resolve limite 0/0 com raiz.' }
            ]
          }
        ]
      },

      /* ═══════════ 1.9 Grandezas e unidades ═══════════ */
      {
        id: 'mb.grandezas', name: 'Grandezas e unidades',
        goal: 'Converter unidades com segurança e usar a análise dimensional como conferência.',
        units: [
          {
            id: 'mb.grandezas.base', name: 'Medidas e conversões',
            topics: [
              { id: 'mb.gr.comprimento', name: 'Comprimento, área e volume',
                requires: ['mb.pot.conceito'],
                sub: ['múltiplos e submúltiplos', 'por que área multiplica por 100 e volume por 1000', 'litro e decímetro cúbico', 'unidades agrárias'],
                goal: 'Converter comprimento, área e volume entendendo por que o fator muda com a dimensão.' },

              { id: 'mb.gr.massa', name: 'Massa, tempo e outras grandezas',
                requires: ['mb.gr.comprimento'],
                sub: ['massa', 'tempo e o sistema sexagesimal', 'temperatura', 'unidades de dados (KB, MB, GB)'],
                goal: 'Operar com unidades não decimais, como tempo, sem transformar tudo em erro de vírgula.' },

              { id: 'mb.gr.derivadas', name: 'Grandezas derivadas e conversão',
                requires: ['mb.gr.massa', 'mb.rp.escalas'],
                sub: ['velocidade', 'densidade', 'vazão', 'km/h ↔ m/s', 'análise dimensional'],
                goal: 'Converter grandezas compostas e usar a dimensão da resposta para detectar erro de fórmula.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
