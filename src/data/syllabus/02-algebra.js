/* ==========================================================================
   data/syllabus/02-algebra.js

   Álgebra é onde a matemática deixa de ser conta e vira linguagem. O aluno
   que não passa daqui não avança em nada depois: função é álgebra com
   nome, limite é álgebra com aproximação, derivada é álgebra com limite.

   O recorte segue a ordem que sustenta o Cálculo: manipular expressão →
   resolver equação → fatorar → resolver sistema. Fatoração ganha módulo
   próprio porque é ela que desfaz a indeterminação 0/0 mais adiante.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'algebra', n: 2,
    name: 'Álgebra',
    icon: '𝑥',
    tagline: 'A letra é só um número que ainda não se apresentou.',
    goal: 'Manipular expressões, resolver equações e sistemas, e fatorar com fluência suficiente para não travar no meio de um problema maior.',
    requires: ['mat-basica'],

    modules: [
      /* ═══════════ 2.1 Fundamentos ═══════════ */
      {
        id: 'al.fundamentos', name: 'Fundamentos da linguagem algébrica',
        goal: 'Ler uma expressão com letras sem medo e saber o que cada pedaço significa.',
        units: [
          {
            id: 'al.fundamentos.base', name: 'Do número à letra',
            topics: [
              { id: 'al.fund.variaveis', name: 'Variáveis e constantes',
                requires: ['mb.op.propriedades'], track: 'algebra', lesson: 'al1',
                sub: ['a letra como número desconhecido', 'a letra como número que varia', 'constante', 'parâmetro'],
                goal: 'Distinguir os três papéis de uma letra: incógnita, variável e parâmetro.' },

              { id: 'al.fund.termos', name: 'Termos, coeficientes e grau',
                requires: ['al.fund.variaveis'],
                sub: ['termo algébrico', 'coeficiente numérico', 'parte literal', 'grau de um termo', 'termos semelhantes'],
                goal: 'Identificar coeficiente, parte literal e grau — o vocabulário que toda regra de derivada usa.' },

              { id: 'al.fund.substituicao', name: 'Substituição de valores',
                requires: ['al.fund.termos', 'mb.op.ordem'],
                sub: ['trocar a letra pelo número', 'parênteses ao substituir negativos', 'ordem das operações', 'valor numérico'],
                goal: 'Calcular o valor numérico de uma expressão sem errar sinal ao substituir negativos.' }
            ]
          }
        ]
      },

      /* ═══════════ 2.2 Expressões algébricas ═══════════ */
      {
        id: 'al.expressoes', name: 'Expressões algébricas',
        goal: 'Deixar uma expressão na forma mais simples possível sem alterar o que ela vale.',
        units: [
          {
            id: 'al.expressoes.base', name: 'Manipular sem alterar',
            topics: [
              { id: 'al.exp.reducao', name: 'Redução de termos semelhantes',
                requires: ['al.fund.termos'], track: 'algebra',
                sub: ['somar apenas semelhantes', 'coeficientes se somam, letras não', 'reorganizar a expressão', 'erros com x e x²'],
                goal: 'Juntar termos semelhantes e reconhecer que x e x² nunca se somam.' },

              { id: 'al.exp.distributiva', name: 'Propriedade distributiva',
                requires: ['al.exp.reducao'],
                sub: ['a(b + c)', 'sinal negativo distribuindo', 'produto de dois binômios', 'distributiva ao contrário'],
                goal: 'Aplicar a distributiva nos dois sentidos, inclusive quando o fator é negativo.' },

              { id: 'al.exp.simplificacao', name: 'Simplificação de expressões',
                requires: ['al.exp.distributiva'], track: 'algebra',
                sub: ['abrir parênteses', 'reduzir semelhantes', 'expressões encaixadas', 'conferir substituindo um valor'],
                goal: 'Simplificar expressões longas e conferir o resultado substituindo um número qualquer.' }
            ]
          }
        ]
      },

      /* ═══════════ 2.3 Equações ═══════════ */
      {
        id: 'al.equacoes', name: 'Equações',
        goal: 'Isolar a incógnita mantendo a igualdade — a operação mais usada de toda a matemática aplicada.',
        units: [
          {
            id: 'al.equacoes.primeiro', name: 'Equações do primeiro grau',
            topics: [
              { id: 'al.eq.primeiro', name: 'Equação do primeiro grau',
                requires: ['al.exp.simplificacao'], track: 'algebra', lesson: 'al1',
                sub: ['a balança', 'operação inversa', 'isolar a incógnita', 'conferir a raiz'],
                goal: 'Resolver ax + b = c justificando cada passo pela igualdade, não por regra decorada.' },

              { id: 'al.eq.parenteses', name: 'Equações com parênteses',
                requires: ['al.eq.primeiro', 'al.exp.distributiva'],
                sub: ['abrir antes de isolar', 'menos na frente do parêntese', 'incógnita nos dois lados', 'agrupar os termos com x'],
                goal: 'Resolver equações com incógnita dos dois lados sem perder sinal ao abrir parênteses.' },

              { id: 'al.eq.fracoes', name: 'Equações com frações',
                requires: ['al.eq.parenteses', 'mb.fr.soma'],
                sub: ['MMC dos denominadores', 'multiplicar a equação toda', 'equação fracionária', 'restrição do denominador'],
                goal: 'Limpar denominadores multiplicando pelo MMC e verificar as restrições de domínio.' },

              { id: 'al.eq.literais', name: 'Equações literais',
                requires: ['al.eq.fracoes'],
                sub: ['isolar uma letra entre várias', 'mudança de fórmula', 'dividir por expressão ≠ 0', 'aplicação em física'],
                goal: 'Isolar qualquer variável de uma fórmula — o que se faz o tempo todo em física e engenharia.' }
            ]
          },
          {
            id: 'al.equacoes.segundo', name: 'Equações do segundo grau',
            topics: [
              { id: 'al.eq.segundo', name: 'Equação do segundo grau',
                requires: ['al.eq.parenteses', 'mb.rad.simplificacao'],
                sub: ['forma ax² + bx + c = 0', 'fórmula resolutiva', 'discriminante Δ', 'número de raízes', 'soma e produto'],
                goal: 'Resolver equações quadráticas e ler no discriminante quantas raízes reais existem.' },

              { id: 'al.eq.incompletas', name: 'Equações incompletas e por fatoração',
                requires: ['al.eq.segundo'],
                sub: ['ax² + bx = 0', 'ax² + c = 0', 'resolver colocando x em evidência', 'produto nulo'],
                goal: 'Resolver quadráticas incompletas pelo caminho curto, sem apelar para a fórmula.' },

              { id: 'al.eq.problemas', name: 'Problemas de aplicação',
                requires: ['al.eq.literais', 'al.eq.segundo'],
                sub: ['traduzir enunciado em equação', 'nomear a incógnita', 'verificar se a raiz faz sentido', 'descartar solução impossível'],
                goal: 'Transformar texto em equação e criticar a resposta obtida à luz do enunciado.' }
            ]
          }
        ]
      },

      /* ═══════════ 2.4 Inequações ═══════════ */
      {
        id: 'al.inequacoes', name: 'Inequações',
        goal: 'Resolver desigualdades e representar a solução como conjunto — pré-requisito direto de domínio de função.',
        units: [
          {
            id: 'al.inequacoes.base', name: 'Desigualdades',
            topics: [
              { id: 'al.ineq.primeiro', name: 'Inequação do primeiro grau',
                requires: ['al.eq.primeiro', 'mb.num.comparacao'],
                sub: ['mesmas operações da equação', 'multiplicar por negativo inverte o sinal', 'conjunto solução', 'representação na reta'],
                goal: 'Resolver inequações lembrando de inverter o sinal ao multiplicar por número negativo.' },

              { id: 'al.ineq.intervalos', name: 'Solução em intervalos',
                requires: ['al.ineq.primeiro', 'mb.num.intervalos'],
                sub: ['notação de intervalo', 'notação de conjunto', 'aberto e fechado', 'união e interseção'],
                goal: 'Escrever o conjunto solução em notação de intervalo e desenhá-lo na reta.' },

              { id: 'al.ineq.compostas', name: 'Inequações compostas e produto',
                requires: ['al.ineq.intervalos'],
                sub: ['dupla desigualdade', 'inequação-produto', 'inequação-quociente', 'quadro de sinais'],
                goal: 'Montar quadro de sinais para resolver inequações com produto ou quociente de fatores.' },

              { id: 'al.ineq.modulo', name: 'Inequações com módulo',
                requires: ['al.ineq.compostas', 'mb.num.absoluto'],
                sub: ['|x| < a', '|x| > a', 'leitura por distância', 'ligação com vizinhança'],
                goal: 'Resolver |x − a| < δ por distância — exatamente a leitura usada na definição formal de limite.' }
            ]
          }
        ]
      },

      /* ═══════════ 2.5 Produtos notáveis ═══════════ */
      {
        id: 'al.produtos', name: 'Produtos notáveis',
        goal: 'Reconhecer os três padrões que aparecem em toda conta de Cálculo e escrever o resultado sem multiplicar.',
        units: [
          {
            id: 'al.produtos.base', name: 'Os padrões',
            topics: [
              { id: 'al.prod.quadradoSoma', name: 'Quadrado da soma',
                requires: ['al.exp.distributiva'], track: 'algebra', lesson: 'al2',
                sub: ['(a + b)² = a² + 2ab + b²', 'por que existe o termo do meio', 'prova geométrica', 'erro de esquecer o 2ab'],
                goal: 'Expandir (a+b)² de cabeça e justificar o termo 2ab pela área do quadrado.' },

              { id: 'al.prod.quadradoDif', name: 'Quadrado da diferença',
                requires: ['al.prod.quadradoSoma'],
                sub: ['(a − b)² = a² − 2ab + b²', 'sinal do termo do meio', 'último termo sempre positivo', 'aplicação em completar quadrado'],
                goal: 'Expandir (a−b)² com o sinal correto em cada termo.' },

              { id: 'al.prod.diferenca', name: 'Produto da soma pela diferença',
                requires: ['al.prod.quadradoDif'], track: 'algebra',
                sub: ['(a + b)(a − b) = a² − b²', 'o termo do meio se cancela', 'uso em racionalização', 'uso em limites'],
                goal: 'Reconhecer a² − b² instantaneamente — o padrão que mais resolve limite indeterminado.' },

              { id: 'al.prod.cubos', name: 'Cubo da soma e da diferença',
                requires: ['al.prod.diferenca'],
                sub: ['(a ± b)³', 'coeficientes 1, 3, 3, 1', 'triângulo de Pascal', 'noção de binômio de Newton'],
                goal: 'Expandir cubos e reconhecer o padrão dos coeficientes binomiais.' }
            ]
          }
        ]
      },

      /* ═══════════ 2.6 Fatoração ═══════════ */
      {
        id: 'al.fatoracao', name: 'Fatoração',
        goal: 'Transformar soma em produto — a operação que permite simplificar frações algébricas e matar indeterminações.',
        units: [
          {
            id: 'al.fatoracao.base', name: 'Técnicas de fatoração',
            topics: [
              { id: 'al.fat.comum', name: 'Fator comum em evidência',
                requires: ['al.exp.distributiva'], track: 'algebra',
                sub: ['identificar o fator comum', 'MDC dos coeficientes', 'menor expoente de cada letra', 'conferir redistribuindo'],
                goal: 'Colocar em evidência o maior fator comum possível e conferir aplicando a distributiva de volta.' },

              { id: 'al.fat.agrupamento', name: 'Agrupamento',
                requires: ['al.fat.comum'],
                sub: ['agrupar dois a dois', 'evidenciar em cada grupo', 'fator comum entre os grupos', 'quando não funciona'],
                goal: 'Fatorar polinômios de quatro termos por agrupamento.' },

              { id: 'al.fat.quadrados', name: 'Diferença de quadrados',
                requires: ['al.prod.diferenca'], track: 'algebra',
                sub: ['a² − b² = (a−b)(a+b)', 'reconhecer quadrados perfeitos', 'a soma de quadrados não fatora nos reais', 'uso em limites'],
                goal: 'Fatorar a² − b² de imediato e saber que a² + b² não fatora em ℝ.' },

              { id: 'al.fat.trinomio', name: 'Trinômio quadrado perfeito e trinômio do segundo grau',
                requires: ['al.fat.quadrados', 'al.eq.segundo'],
                sub: ['reconhecer o TQP', 'a(x − x₁)(x − x₂)', 'fatorar pelas raízes', 'soma e produto'],
                goal: 'Fatorar qualquer trinômio do segundo grau usando as raízes.' },

              { id: 'al.fat.cubos', name: 'Soma e diferença de cubos',
                requires: ['al.fat.trinomio', 'al.prod.cubos'],
                sub: ['a³ − b³ = (a−b)(a² + ab + b²)', 'a³ + b³ = (a+b)(a² − ab + b²)', 'regra dos sinais', 'uso em limite de x³ − a³'],
                goal: 'Aplicar as duas identidades de cubos com o sinal correto em cada fator.' },

              { id: 'al.fat.completar', name: 'Completar quadrado',
                requires: ['al.fat.trinomio', 'al.prod.quadradoDif'],
                sub: ['forçar o TQP', 'somar e subtrair o mesmo valor', 'forma canônica da parábola', 'uso em integrais'],
                goal: 'Completar quadrado para reescrever ax² + bx + c na forma a(x − h)² + k.' }
            ]
          }
        ]
      },

      /* ═══════════ 2.7 Sistemas ═══════════ */
      {
        id: 'al.sistemas', name: 'Sistemas lineares',
        goal: 'Resolver sistemas por mais de um método e entender geometricamente o que a solução significa.',
        units: [
          {
            id: 'al.sistemas.base', name: 'Sistemas 2×2 e 3×3',
            topics: [
              { id: 'al.sist.substituicao', name: 'Método da substituição',
                requires: ['al.eq.literais'],
                sub: ['isolar uma incógnita', 'substituir na outra equação', 'voltar para achar a segunda', 'conferir nas duas'],
                goal: 'Resolver um sistema 2×2 por substituição e conferir a solução nas duas equações.' },

              { id: 'al.sist.eliminacao', name: 'Método da adição (eliminação)',
                requires: ['al.sist.substituicao'],
                sub: ['igualar coeficientes', 'somar ou subtrair as equações', 'multiplicar uma equação inteira', 'escolher a incógnita a eliminar'],
                goal: 'Eliminar uma incógnita somando equações — o método que vira escalonamento em Álgebra Linear.' },

              { id: 'al.sist.geometrica', name: 'Interpretação geométrica',
                requires: ['al.sist.eliminacao', 'ge.an.reta'], deferred: true,
                sub: ['duas retas que se cruzam', 'retas paralelas: sem solução', 'retas coincidentes: infinitas soluções', 'sistema possível e determinado'],
                goal: 'Classificar um sistema pela posição relativa das retas, sem resolver.' },

              { id: 'al.sist.tres', name: 'Sistemas 3×3',
                requires: ['al.sist.geometrica'],
                sub: ['eliminação em cadeia', 'escalonamento', 'substituição regressiva', 'planos no espaço'],
                goal: 'Escalonar um sistema 3×3 até a forma triangular e resolver de baixo para cima.' }
            ]
          }
        ]
      },

      /* ═══════════ 2.8 Polinômios ═══════════ */
      {
        id: 'al.polinomios', name: 'Polinômios',
        goal: 'Operar, dividir e fatorar polinômios — a estrutura por trás de funções polinomiais e racionais.',
        units: [
          {
            id: 'al.polinomios.base', name: 'Álgebra de polinômios',
            topics: [
              { id: 'al.pol.conceito', name: 'Polinômio, grau e operações',
                requires: ['al.exp.simplificacao'],
                sub: ['definição', 'grau', 'coeficiente líder', 'soma e subtração', 'multiplicação'],
                goal: 'Somar e multiplicar polinômios e determinar o grau do resultado antes de calcular.' },

              { id: 'al.pol.divisao', name: 'Divisão de polinômios',
                requires: ['al.pol.conceito'],
                sub: ['algoritmo da chave', 'dispositivo de Briot-Ruffini', 'quociente e resto', 'divisão exata'],
                goal: 'Dividir polinômios pelo algoritmo longo e por Briot-Ruffini quando o divisor é x − a.' },

              { id: 'al.pol.resto', name: 'Teorema do resto e do fator',
                requires: ['al.pol.divisao'],
                sub: ['resto = P(a)', 'x − a é fator ⟺ P(a) = 0', 'testar raízes racionais', 'verificar divisibilidade sem dividir'],
                goal: 'Usar P(a) para achar o resto e decidir se x − a é fator, sem executar a divisão.' },

              { id: 'al.pol.raizes', name: 'Raízes e fatoração completa',
                requires: ['al.pol.resto', 'al.fat.trinomio'],
                sub: ['raízes racionais', 'multiplicidade', 'fatoração em fatores lineares', 'teorema fundamental da álgebra'],
                goal: 'Fatorar um polinômio até o fim a partir de uma raiz encontrada por tentativa.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
