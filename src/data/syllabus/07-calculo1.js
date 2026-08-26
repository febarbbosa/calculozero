/* ==========================================================================
   data/syllabus/07-calculo1.js

   Cálculo I. O currículo segue a ordem clássica — limite, continuidade,
   derivada, integral — mas a entrada é pelo problema, não pela definição:
   o módulo de introdução existe para que limite apareça como resposta a
   uma pergunta que o aluno já tem, e não como um formalismo sem motivo.

   Cada um dos três conceitos centrais tem um laboratório próprio, porque
   os três são visuais antes de serem simbólicos: limite é aproximação,
   derivada é inclinação, integral é área.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'calculo1', n: 7,
    name: 'Cálculo I',
    icon: '∫',
    tagline: 'Variação e acumulação: as duas perguntas que criaram o Cálculo.',
    goal: 'Calcular limites, derivadas e integrais e usá-los para resolver problemas de variação, otimização e acumulação.',
    requires: ['precalculo'],

    modules: [
      /* ═══════════ 7.1 Introdução ═══════════ */
      {
        id: 'c1.introducao', name: 'Introdução ao Cálculo',
        goal: 'Entender qual problema o Cálculo resolve antes de aprender a técnica que o resolve.',
        units: [
          {
            id: 'c1.introducao.base', name: 'Os dois problemas originais',
            topics: [
              { id: 'c1.in.taxa', name: 'Taxa de variação média',
                requires: ['fn.af.taxa', 'pc.lm.intuicao'],
                sub: ['Δy/Δx entre dois pontos', 'reta secante', 'velocidade média', 'taxa com unidade'],
                goal: 'Calcular e interpretar a taxa média — e perceber que ela não responde "e nesse instante exato?".' },

              { id: 'c1.in.tangente', name: 'O problema da tangente',
                requires: ['c1.in.taxa'],
                sub: ['secante virando tangente', 'inclinação num ponto', 'por que Δx = 0 não funciona', 'necessidade do limite'],
                goal: 'Enxergar por que a inclinação num ponto exige um processo de aproximação, e não uma divisão direta.' },

              { id: 'c1.in.area', name: 'O problema da área',
                requires: ['c1.in.taxa', 'ge.med.area'],
                sub: ['área sob curva', 'aproximação por retângulos', 'refinar a partição', 'necessidade do limite outra vez'],
                goal: 'Perceber que área sob curva e inclinação num ponto pedem a mesma ferramenta.' }
            ]
          }
        ]
      },

      /* ═══════════ 7.2 Limites ═══════════ */
      {
        id: 'c1.limites', name: 'Limites',
        goal: 'Calcular limites com segurança, incluindo indeterminações e comportamento no infinito.',
        units: [
          {
            id: 'c1.limites.conceito', name: 'Conceito e cálculo',
            topics: [
              { id: 'c1.li.conceito', name: 'Conceito de limite',
                requires: ['c1.in.tangente'], track: 'limites', lesson: 'li1',
                sub: ['aproximação por tabela', 'notação lim', 'o valor no ponto é irrelevante', 'buraco removível'],
                goal: 'Calcular limites por aproximação e explicar por que f(a) não interfere no limite em a.' },

              { id: 'c1.li.laterais', name: 'Limites laterais',
                requires: ['c1.li.conceito'],
                sub: ['limite pela esquerda', 'limite pela direita', 'existe ⟺ os dois coincidem', 'função definida por partes', 'salto'],
                goal: 'Decidir a existência do limite comparando os dois lados, especialmente em funções por partes.' },

              { id: 'c1.li.propriedades', name: 'Propriedades operatórias',
                requires: ['c1.li.laterais'],
                sub: ['limite da soma e do produto', 'limite do quociente', 'substituição direta quando é contínua', 'limite de constante'],
                goal: 'Quebrar um limite complicado em limites simples usando as propriedades.' },

              { id: 'c1.li.indeterminacoes', name: 'Indeterminações',
                requires: ['c1.li.propriedades', 'pc.cs.algebra'],
                sub: ['0/0', '∞/∞', '∞ − ∞', 'fatorar para cancelar', 'racionalizar com conjugado', 'divisão pelo maior grau'],
                goal: 'Reconhecer o tipo de indeterminação e escolher a manipulação algébrica que a resolve.' },

              { id: 'c1.li.notaveis', name: 'Limites fundamentais',
                requires: ['c1.li.indeterminacoes', 'tg.fu.conversao'],
                sub: ['lim (sen x)/x = 1', 'lim (1 + 1/n)ⁿ = e', 'lim (eˣ − 1)/x = 1', 'por que exigem radianos'],
                goal: 'Reconhecer os limites fundamentais dentro de expressões maiores e usá-los.' }
            ]
          },
          {
            id: 'c1.limites.infinito', name: 'Infinito',
            topics: [
              { id: 'c1.li.infinitos', name: 'Limites infinitos',
                requires: ['c1.li.laterais', 'fn.ra.assintotas'],
                sub: ['f(x) → ±∞', 'assíntota vertical', 'sinal pelos dois lados', 'divisão por zero com sinal'],
                goal: 'Determinar assíntotas verticais analisando o sinal do denominador pelos dois lados.' },

              { id: 'c1.li.noInfinito', name: 'Limites no infinito',
                requires: ['c1.li.infinitos', 'pc.lm.assintotico'],
                sub: ['x → ±∞', 'assíntota horizontal', 'comparar graus', 'dividir pelo maior grau', 'crescimento dominante'],
                goal: 'Calcular limites no infinito de funções racionais e identificar assíntotas horizontais.' },

              { id: 'c1.li.laboratorio', name: 'Laboratório de limites',
                requires: ['c1.li.noInfinito'], lab: 'labLimite',
                sub: ['aproximar pelos dois lados', 'ver o buraco', 'limite lateral divergente', 'tabela ao vivo'],
                goal: 'Ver o valor se aproximar enquanto x se aproxima — o conceito antes da conta.' }
            ]
          }
        ]
      },

      /* ═══════════ 7.3 Continuidade ═══════════ */
      {
        id: 'c1.continuidade', name: 'Continuidade',
        goal: 'Reconhecer onde uma função é contínua e usar os teoremas que dependem disso.',
        units: [
          {
            id: 'c1.continuidade.base', name: 'Funções contínuas',
            topics: [
              { id: 'c1.ct.definicao', name: 'Continuidade em um ponto',
                requires: ['c1.li.laterais'],
                sub: ['f(a) existe', 'o limite existe', 'limite = f(a)', 'as três condições', 'desenhar sem tirar o lápis'],
                goal: 'Testar as três condições e apontar exatamente qual delas falha.' },

              { id: 'c1.ct.descontinuidades', name: 'Tipos de descontinuidade',
                requires: ['c1.ct.definicao'],
                sub: ['removível', 'salto', 'infinita', 'redefinir para remover'],
                goal: 'Classificar a descontinuidade e dizer se ela pode ser removida.' },

              { id: 'c1.ct.intervalo', name: 'Continuidade em intervalo',
                requires: ['c1.ct.descontinuidades'],
                sub: ['contínua em [a,b]', 'continuidade lateral nas pontas', 'operações preservam continuidade', 'composta de contínuas'],
                goal: 'Determinar o maior intervalo em que uma função é contínua.' },

              { id: 'c1.ct.teoremas', name: 'Teorema do valor intermediário e de Weierstrass',
                requires: ['c1.ct.intervalo'],
                sub: ['TVI', 'existência de raiz por troca de sinal', 'método da bissecção', 'teorema do valor extremo'],
                goal: 'Usar o TVI para garantir a existência de uma raiz e localizar por bissecção.' }
            ]
          }
        ]
      },

      /* ═══════════ 7.4 Derivadas ═══════════ */
      {
        id: 'c1.derivadas', name: 'Derivadas',
        goal: 'Derivar qualquer função das famílias estudadas e saber o que a derivada significa.',
        units: [
          {
            id: 'c1.derivadas.conceito', name: 'Conceito',
            topics: [
              { id: 'c1.de.definicao', name: 'Definição de derivada',
                requires: ['c1.li.indeterminacoes', 'c1.in.tangente'], track: 'derivadas', lesson: 'de1',
                sub: ['limite do quociente de Newton', 'f′(x) = lim [f(x+h) − f(x)]/h', 'derivada pela definição', 'notações f′, dy/dx, Df'],
                goal: 'Calcular derivada pela definição em casos simples — e entender que toda regra vem daí.' },

              { id: 'c1.de.geometrica', name: 'Interpretação geométrica',
                requires: ['c1.de.definicao'],
                sub: ['inclinação da reta tangente', 'equação da tangente', 'reta normal', 'derivada como função'],
                goal: 'Escrever a equação da reta tangente a uma curva num ponto.' },

              { id: 'c1.de.fisica', name: 'Interpretação física',
                requires: ['c1.de.geometrica', 'mb.gr.derivadas'],
                sub: ['velocidade instantânea', 'aceleração como derivada segunda', 'taxa instantânea em geral', 'unidades da derivada'],
                goal: 'Interpretar a derivada como taxa instantânea, com a unidade correta.' },

              { id: 'c1.de.derivabilidade', name: 'Derivabilidade e continuidade',
                requires: ['c1.de.definicao', 'c1.ct.definicao'],
                sub: ['derivável ⟹ contínua', 'a recíproca é falsa', 'bico e ponto anguloso', 'tangente vertical', '|x| em zero'],
                goal: 'Explicar por que |x| é contínua mas não derivável em zero.' },

              { id: 'c1.de.laboratorio', name: 'Laboratório de derivadas',
                requires: ['c1.de.geometrica'], lab: 'labDerivada',
                sub: ['secante virando tangente', 'inclinação ao vivo', 'gráfico de f e de f′ lado a lado', 'onde f′ zera'],
                goal: 'Ver a secante colapsar na tangente e a curva de f′ nascer da inclinação de f.' }
            ]
          },
          {
            id: 'c1.derivadas.regras', name: 'Regras de derivação',
            topics: [
              { id: 'c1.de.basicas', name: 'Regras básicas',
                requires: ['c1.de.definicao'], track: 'derivadas', lesson: 'de2',
                sub: ['derivada da constante', 'regra da potência', 'múltiplo constante', 'soma e diferença'],
                goal: 'Derivar polinômios instantaneamente pela regra da potência.' },

              { id: 'c1.de.produto', name: 'Regra do produto',
                requires: ['c1.de.basicas'],
                sub: ['(uv)′ = u′v + uv′', 'por que não é u′v′', 'produto de três fatores', 'quando é melhor expandir antes'],
                goal: 'Aplicar a regra do produto e reconhecer quando expandir dá menos trabalho.' },

              { id: 'c1.de.quociente', name: 'Regra do quociente',
                requires: ['c1.de.produto'],
                sub: ['(u/v)′ = (u′v − uv′)/v²', 'a ordem do numerador importa', 'erro de trocar os termos', 'reescrever como produto'],
                goal: 'Derivar quocientes sem inverter a ordem do numerador.' },

              { id: 'c1.de.cadeia', name: 'Regra da cadeia',
                requires: ['c1.de.quociente', 'pc.cs.composicao'],
                sub: ['(f∘g)′ = f′(g)·g′', 'derivada de fora vezes derivada de dentro', 'camadas encaixadas', 'notação de Leibniz'],
                goal: 'Identificar as camadas de uma composta e derivar de fora para dentro.' },

              { id: 'c1.de.implicita', name: 'Derivação implícita',
                requires: ['c1.de.cadeia'],
                sub: ['equação não resolvida em y', 'derivar os dois lados', 'cadeia sobre y', 'isolar dy/dx', 'tangente a uma circunferência'],
                goal: 'Derivar implicitamente para achar dy/dx quando y não está isolado.' },

              { id: 'c1.de.altaOrdem', name: 'Derivadas de ordem superior',
                requires: ['c1.de.cadeia'],
                sub: ['f″, f‴, f⁽ⁿ⁾', 'aceleração', 'notação', 'padrões em derivadas sucessivas'],
                goal: 'Calcular derivadas sucessivas e interpretar a segunda derivada.' }
            ]
          },
          {
            id: 'c1.derivadas.familias', name: 'Derivadas por família de função',
            topics: [
              { id: 'c1.df.polinomiais', name: 'Polinomiais e racionais',
                requires: ['c1.de.quociente'],
                sub: ['regra da potência com expoente qualquer', 'expoente negativo', 'expoente fracionário', 'raízes como potência'],
                goal: 'Derivar raízes e frações reescrevendo tudo como potência.' },

              { id: 'c1.df.exponenciais', name: 'Exponenciais',
                requires: ['c1.de.cadeia', 'fn.ex.numeroE'],
                sub: ['(eˣ)′ = eˣ', '(aˣ)′ = aˣ·ln a', 'exponencial composta', 'por que e é especial'],
                goal: 'Derivar exponenciais de qualquer base e explicar a singularidade de eˣ.' },

              { id: 'c1.df.logaritmicas', name: 'Logarítmicas',
                requires: ['c1.df.exponenciais', 'fn.lg.mudancaBase'],
                sub: ['(ln x)′ = 1/x', '(log_a x)′', 'ln de função composta', 'derivação logarítmica'],
                goal: 'Derivar logaritmos e usar derivação logarítmica em produtos longos e em xˣ.' },

              { id: 'c1.df.trigonometricas', name: 'Trigonométricas',
                requires: ['c1.de.cadeia', 'c1.li.notaveis'],
                sub: ['(sen x)′ = cos x', '(cos x)′ = −sen x', 'tangente e secante', 'dedução pelo limite fundamental'],
                goal: 'Derivar as seis funções trigonométricas e lembrar de onde vem o sinal negativo.' },

              { id: 'c1.df.inversas', name: 'Funções inversas e trigonométricas inversas',
                requires: ['c1.df.trigonometricas', 'tg.fn.inversas'],
                sub: ['derivada da inversa', '(arcsen x)′', '(arctan x)′', 'dedução por derivação implícita'],
                goal: 'Deduzir a derivada de arcsen e arctan por derivação implícita.' }
            ]
          }
        ]
      },

      /* ═══════════ 7.6 Aplicações de derivadas ═══════════ */
      {
        id: 'c1.aplicDerivadas', name: 'Aplicações das derivadas',
        goal: 'Usar a derivada para analisar gráficos, otimizar e relacionar taxas.',
        units: [
          {
            id: 'c1.aplicDerivadas.analise', name: 'Análise de funções',
            topics: [
              { id: 'c1.ap.crescimento', name: 'Crescimento e decrescimento',
                requires: ['c1.de.basicas'],
                sub: ['f′ > 0: cresce', 'f′ < 0: decresce', 'pontos críticos', 'quadro de sinais de f′'],
                goal: 'Determinar intervalos de crescimento a partir do sinal da derivada.' },

              { id: 'c1.ap.extremos', name: 'Máximos e mínimos',
                requires: ['c1.ap.crescimento'], track: 'derivadas', lesson: 'de3',
                sub: ['ponto crítico', 'teste da primeira derivada', 'extremo local × global', 'extremos nas bordas do intervalo'],
                goal: 'Classificar pontos críticos e distinguir extremo local de global.' },

              { id: 'c1.ap.concavidade', name: 'Concavidade e inflexão',
                requires: ['c1.ap.extremos', 'c1.de.altaOrdem'],
                sub: ['f″ > 0: concavidade para cima', 'f″ < 0: para baixo', 'ponto de inflexão', 'teste da segunda derivada'],
                goal: 'Usar a segunda derivada para determinar concavidade e classificar extremos.' },

              { id: 'c1.ap.esboco', name: 'Esboço completo de gráficos',
                requires: ['c1.ap.concavidade', 'c1.li.noInfinito'],
                sub: ['domínio e interseções', 'assíntotas', 'sinais de f′ e f″', 'tabela-resumo', 'esboço final'],
                goal: 'Construir o gráfico de uma função a partir da análise completa, sem plotar pontos.' }
            ]
          },
          {
            id: 'c1.aplicDerivadas.problemas', name: 'Problemas',
            topics: [
              { id: 'c1.ap.otimizacao', name: 'Otimização',
                requires: ['c1.ap.extremos', 'fn.qu.otimizacao'],
                sub: ['função objetivo', 'equação de restrição', 'reduzir a uma variável', 'domínio do problema', 'verificar se é máximo'],
                goal: 'Modelar e resolver problemas de otimização, sempre validando o resultado no contexto.' },

              { id: 'c1.ap.taxas', name: 'Taxas relacionadas',
                requires: ['c1.ap.otimizacao', 'c1.de.implicita'],
                sub: ['relacionar as variáveis', 'derivar em relação ao tempo', 'substituir só no fim', 'escada, cone e balão'],
                goal: 'Resolver taxas relacionadas derivando a relação antes de substituir os valores.' },

              { id: 'c1.ap.aproximacao', name: 'Aproximação linear e diferencial',
                requires: ['c1.de.geometrica'],
                sub: ['f(x) ≈ f(a) + f′(a)(x−a)', 'diferencial dy', 'estimativa de erro', 'método de Newton'],
                goal: 'Aproximar valores usando a reta tangente e estimar o erro cometido.' },

              { id: 'c1.ap.lhopital', name: 'Regra de L’Hôpital',
                requires: ['c1.ap.aproximacao', 'c1.li.indeterminacoes'],
                sub: ['0/0 e ∞/∞', 'derivar numerador e denominador separadamente', 'quando não se aplica', 'outras indeterminações reduzidas'],
                goal: 'Aplicar L’Hôpital apenas nas indeterminações válidas, sem confundir com a regra do quociente.' }
            ]
          }
        ]
      },

      /* ═══════════ 7.7 Integrais ═══════════ */
      {
        id: 'c1.integrais', name: 'Integrais',
        goal: 'Integrar e usar o Teorema Fundamental para ligar área e antiderivada.',
        units: [
          {
            id: 'c1.integrais.base', name: 'Antiderivada e integral definida',
            topics: [
              { id: 'c1.it.antiderivada', name: 'Antiderivada e integral indefinida',
                requires: ['c1.de.basicas'], track: 'integrais', lesson: 'in2',
                sub: ['a pergunta inversa da derivada', 'regra da potência ao contrário', 'a constante C', 'família de primitivas'],
                goal: 'Integrar potências e explicar por que o +C não é detalhe.' },

              { id: 'c1.it.riemann', name: 'Soma de Riemann e integral definida',
                requires: ['c1.in.area', 'c1.li.conceito'], track: 'integrais', lesson: 'in1',
                sub: ['partição do intervalo', 'retângulos por baixo e por cima', 'limite da soma', 'notação ∫ₐᵇ', 'área com sinal'],
                goal: 'Entender a integral definida como limite de somas, e por que a área abaixo do eixo conta negativo.' },

              { id: 'c1.it.tfc', name: 'Teorema Fundamental do Cálculo',
                requires: ['c1.it.antiderivada', 'c1.it.riemann'],
                sub: ['primeira parte: derivada da integral', 'segunda parte: F(b) − F(a)', 'por que os dois problemas eram um só', 'função acumulada'],
                goal: 'Calcular integrais definidas por antiderivada e explicar por que isso funciona.' },

              { id: 'c1.it.propriedades', name: 'Propriedades da integral',
                requires: ['c1.it.tfc'],
                sub: ['linearidade', 'aditividade em intervalos', 'inverter os limites', 'integral de função par e ímpar'],
                goal: 'Quebrar e reorganizar integrais usando as propriedades antes de calcular.' },

              { id: 'c1.it.laboratorio', name: 'Laboratório de integrais',
                requires: ['c1.it.riemann'], lab: 'labIntegral',
                sub: ['aumentar o número de retângulos', 'erro diminuindo', 'soma por baixo e por cima', 'convergência para a área'],
                goal: 'Ver o erro da soma de Riemann encolher conforme a partição refina.' }
            ]
          },
          {
            id: 'c1.integrais.tecnicas', name: 'Técnicas de integração',
            topics: [
              { id: 'c1.tc.substituicao', name: 'Integração por substituição',
                requires: ['c1.it.propriedades', 'c1.de.cadeia'],
                sub: ['a regra da cadeia ao contrário', 'escolher u', 'trocar dx por du', 'ajustar os limites na definida'],
                goal: 'Escolher a substituição certa reconhecendo a derivada interna no integrando.' },

              { id: 'c1.tc.partes', name: 'Integração por partes',
                requires: ['c1.tc.substituicao', 'c1.de.produto'],
                sub: ['∫u dv = uv − ∫v du', 'a regra do produto ao contrário', 'escolher u pela ordem LIATE', 'aplicar duas vezes', 'integral cíclica'],
                goal: 'Escolher u e dv com critério e resolver integrais que voltam a si mesmas.' },

              { id: 'c1.tc.trigonometricas', name: 'Integrais trigonométricas e substituição trigonométrica',
                requires: ['c1.tc.partes', 'tg.id.duplo'],
                sub: ['potências de seno e cosseno', 'redução por identidade', 'substituição trigonométrica', '√(a² − x²) e afins'],
                goal: 'Usar identidades para baixar potências e substituição trigonométrica em radicais quadráticos.' },

              { id: 'c1.tc.fracoesParciais', name: 'Frações parciais',
                requires: ['c1.tc.substituicao', 'al.pol.raizes'],
                sub: ['decompor a fração racional', 'fatores lineares distintos', 'fatores repetidos', 'fator quadrático irredutível'],
                goal: 'Decompor uma fração racional em parcelas integráveis.' }
            ]
          },
          {
            id: 'c1.integrais.aplicacoes', name: 'Aplicações das integrais',
            topics: [
              { id: 'c1.ai.area', name: 'Área entre curvas',
                requires: ['c1.it.tfc'],
                sub: ['∫(f − g)', 'achar as interseções', 'integrar em y quando conviver', 'regiões divididas'],
                goal: 'Montar a integral da área entre curvas escolhendo a variável de integração adequada.' },

              { id: 'c1.ai.volume', name: 'Volume de sólidos de revolução',
                requires: ['c1.ai.area', 'ge.esp.cilindro'],
                sub: ['método dos discos', 'método dos anéis', 'cascas cilíndricas', 'eixo de rotação'],
                goal: 'Escolher entre discos e cascas conforme o eixo de rotação e montar a integral.' },

              { id: 'c1.ai.fisicas', name: 'Distância, valor médio e aplicações físicas',
                requires: ['c1.ai.area', 'c1.de.fisica'],
                sub: ['deslocamento × distância percorrida', 'valor médio de uma função', 'trabalho', 'centro de massa'],
                goal: 'Interpretar a integral como acumulação e distinguir deslocamento de distância percorrida.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
