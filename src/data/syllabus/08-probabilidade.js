/* ==========================================================================
   data/syllabus/08-probabilidade.js

   Probabilidade é a disciplina em que a intuição erra mais. Por isso o
   currículo insiste em duas coisas: contar direito antes de dividir, e
   comparar o valor teórico com o resultado de milhares de repetições.

   O laboratório de simulação não é enfeite — ele é o argumento. Ver a
   frequência relativa convergir para a probabilidade teórica convence
   mais do que qualquer demonstração no quadro.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'probabilidade', n: 8,
    name: 'Probabilidade',
    icon: '🎲',
    tagline: 'Contar o que pode acontecer — e medir o quanto é provável.',
    goal: 'Calcular probabilidades de eventos simples e compostos, trabalhar com variáveis aleatórias e reconhecer as distribuições clássicas.',
    requires: ['funcoes'],

    modules: [
      /* ═══════════ 8.1 Fundamentos ═══════════ */
      {
        id: 'pb.fundamentos', name: 'Fundamentos',
        goal: 'Montar o espaço amostral e calcular probabilidade como razão de casos.',
        units: [
          {
            id: 'pb.fundamentos.base', name: 'Experimento e probabilidade',
            topics: [
              { id: 'pb.fu.experimento', name: 'Experimento aleatório e espaço amostral',
                requires: ['mb.fr.conceito'],
                sub: ['experimento determinístico × aleatório', 'resultado elementar', 'espaço amostral Ω', 'evento como subconjunto', 'diagrama de árvore'],
                goal: 'Listar o espaço amostral de um experimento e escrever eventos como subconjuntos.' },

              { id: 'pb.fu.teorica', name: 'Probabilidade teórica',
                requires: ['pb.fu.experimento', 'mb.pc.basica'],
                sub: ['casos favoráveis / casos possíveis', 'espaço equiprovável', 'P entre 0 e 1', 'probabilidade em porcentagem', 'evento certo e impossível'],
                goal: 'Calcular a probabilidade clássica e verificar quando a hipótese de equiprobabilidade vale.' },

              { id: 'pb.fu.experimental', name: 'Probabilidade experimental e frequência',
                requires: ['pb.fu.teorica'],
                sub: ['frequência relativa', 'lei dos grandes números', 'convergência com muitas repetições', 'quando não dá para calcular teoricamente'],
                goal: 'Estimar probabilidade por frequência e explicar por que ela se aproxima do valor teórico.' },

              { id: 'pb.fu.laboratorio', name: 'Laboratório de simulação',
                requires: ['pb.fu.experimental'], lab: 'labProbabilidade',
                sub: ['milhares de repetições', 'frequência × probabilidade teórica', 'flutuação com poucas amostras', 'convergência ao vivo'],
                goal: 'Rodar milhares de experimentos e ver a frequência relativa assentar no valor teórico.' }
            ]
          }
        ]
      },

      /* ═══════════ 8.2 Operações com eventos ═══════════ */
      {
        id: 'pb.eventos', name: 'Operações com eventos',
        goal: 'Combinar eventos com a linguagem de conjuntos e calcular a probabilidade da combinação.',
        units: [
          {
            id: 'pb.eventos.base', name: 'Álgebra de eventos',
            topics: [
              { id: 'pb.ev.operacoes', name: 'União, interseção e complemento',
                requires: ['pb.fu.teorica'],
                sub: ['A ∪ B', 'A ∩ B', 'complementar Aᶜ', 'diagrama de Venn', 'leis de De Morgan'],
                goal: 'Traduzir "pelo menos um", "ambos" e "nenhum" em operações entre eventos.' },

              { id: 'pb.ev.soma', name: 'Regra da soma',
                requires: ['pb.ev.operacoes'],
                sub: ['P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', 'por que subtrair a interseção', 'eventos mutuamente exclusivos', 'três eventos'],
                goal: 'Aplicar a regra da soma sem contar duas vezes a interseção.' },

              { id: 'pb.ev.complementar', name: 'Estratégia do complementar',
                requires: ['pb.ev.soma'],
                sub: ['P(A) = 1 − P(Aᶜ)', 'problemas de "pelo menos um"', 'quando o complementar é mais fácil', 'aniversários'],
                goal: 'Reconhecer os problemas em que calcular o complementar é drasticamente mais simples.' }
            ]
          }
        ]
      },

      /* ═══════════ 8.3 Contagem ═══════════ */
      {
        id: 'pb.contagem', name: 'Análise combinatória',
        goal: 'Contar casos sem listar — a habilidade que sustenta a probabilidade de eventos compostos.',
        units: [
          {
            id: 'pb.contagem.base', name: 'Técnicas de contagem',
            topics: [
              { id: 'pb.ct.multiplicativo', name: 'Princípio multiplicativo',
                requires: ['pb.fu.experimento'],
                sub: ['etapas sucessivas', 'multiplicar as possibilidades', 'diagrama de árvore', 'princípio aditivo', 'com e sem reposição'],
                goal: 'Contar por etapas, decidindo entre multiplicar e somar conforme o problema.' },

              { id: 'pb.ct.fatorial', name: 'Fatorial e permutações',
                requires: ['pb.ct.multiplicativo'],
                sub: ['n!', 'permutação simples', 'permutação com repetição', 'permutação circular', '0! = 1'],
                goal: 'Contar ordenações, inclusive com elementos repetidos.' },

              { id: 'pb.ct.arranjos', name: 'Arranjos',
                requires: ['pb.ct.fatorial'],
                sub: ['A(n,p) = n!/(n−p)!', 'a ordem importa', 'escolher e ordenar', 'diferença para permutação'],
                goal: 'Usar arranjo quando a ordem dos escolhidos faz diferença.' },

              { id: 'pb.ct.combinacoes', name: 'Combinações',
                requires: ['pb.ct.arranjos'],
                sub: ['C(n,p) = n!/(p!(n−p)!)', 'a ordem não importa', 'dividir pelas repetições', 'triângulo de Pascal', 'binômio de Newton'],
                goal: 'Distinguir arranjo de combinação pela pergunta "trocar a ordem muda o resultado?".' },

              { id: 'pb.ct.probabilidade', name: 'Contagem aplicada à probabilidade',
                requires: ['pb.ct.combinacoes', 'pb.ev.complementar'],
                sub: ['casos favoráveis por combinação', 'baralho, urna e loteria', 'probabilidade de mãos', 'contar numerador e denominador com o mesmo critério'],
                goal: 'Calcular probabilidades em espaços grandes contando favoráveis e possíveis pelo mesmo método.' }
            ]
          }
        ]
      },

      /* ═══════════ 8.4–8.6 Condicional, independência e Bayes ═══════════ */
      {
        id: 'pb.condicional', name: 'Probabilidade condicional',
        goal: 'Atualizar probabilidades diante de nova informação — a base de todo raciocínio bayesiano.',
        units: [
          {
            id: 'pb.condicional.base', name: 'Condicionar e atualizar',
            topics: [
              { id: 'pb.cd.conceito', name: 'Probabilidade condicional',
                requires: ['pb.ct.probabilidade'],
                sub: ['P(A|B) = P(A ∩ B)/P(B)', 'reduzir o espaço amostral', 'notação e leitura', 'tabela de dupla entrada'],
                goal: 'Calcular P(A|B) entendendo que condicionar é encolher o espaço amostral.' },

              { id: 'pb.cd.produto', name: 'Regra do produto',
                requires: ['pb.cd.conceito'],
                sub: ['P(A ∩ B) = P(A)·P(B|A)', 'extrações sucessivas sem reposição', 'árvore de probabilidades', 'encadeamento'],
                goal: 'Multiplicar ao longo dos ramos de uma árvore de probabilidades.' },

              { id: 'pb.cd.independencia', name: 'Independência',
                requires: ['pb.cd.produto'],
                sub: ['P(A|B) = P(A)', 'P(A ∩ B) = P(A)·P(B)', 'independente × mutuamente exclusivo', 'independência de vários eventos'],
                goal: 'Testar independência e não confundi-la com exclusão mútua — que são quase opostos.' },

              { id: 'pb.cd.total', name: 'Probabilidade total',
                requires: ['pb.cd.independencia'],
                sub: ['partição do espaço amostral', 'P(A) = ΣP(A|Bᵢ)P(Bᵢ)', 'somar os ramos da árvore', 'aplicação em linhas de produção'],
                goal: 'Somar caminhos de uma árvore para obter a probabilidade de um evento composto.' },

              { id: 'pb.cd.bayes', name: 'Teorema de Bayes',
                requires: ['pb.cd.total'],
                sub: ['inverter o condicionamento', 'prior e posterior', 'teste diagnóstico', 'falso positivo', 'por que a intuição erra tanto'],
                goal: 'Calcular P(doença|teste positivo) e explicar por que ela pode ser baixa mesmo com teste preciso.' }
            ]
          }
        ]
      },

      /* ═══════════ 8.7 Variáveis aleatórias ═══════════ */
      {
        id: 'pb.variaveis', name: 'Variáveis aleatórias',
        goal: 'Passar de eventos para números e resumir uma distribuição por esperança e variância.',
        units: [
          {
            id: 'pb.variaveis.base', name: 'Variável aleatória',
            topics: [
              { id: 'pb.va.discreta', name: 'Variável aleatória discreta',
                requires: ['pb.cd.conceito', 'fn.co.maquina'],
                sub: ['função do espaço amostral em ℝ', 'valores possíveis', 'função de probabilidade', 'a soma das probabilidades é 1'],
                goal: 'Construir a tabela de distribuição de uma variável aleatória discreta.' },

              { id: 'pb.va.esperanca', name: 'Esperança',
                requires: ['pb.va.discreta'],
                sub: ['E(X) = Σx·P(x)', 'média ponderada pelas probabilidades', 'valor esperado × valor provável', 'jogos justos', 'linearidade'],
                goal: 'Calcular o valor esperado e interpretá-lo como média de longo prazo, não como resultado típico.' },

              { id: 'pb.va.variancia', name: 'Variância e desvio padrão',
                requires: ['pb.va.esperanca'],
                sub: ['Var(X) = E(X²) − [E(X)]²', 'desvio padrão', 'dispersão em torno da média', 'unidades'],
                goal: 'Calcular variância pela fórmula prática e interpretar o desvio padrão na unidade original.' },

              { id: 'pb.va.continua', name: 'Variável aleatória contínua',
                requires: ['pb.va.variancia', 'c1.it.riemann'], deferred: true,
                sub: ['função densidade', 'probabilidade como área', 'P(X = a) = 0', 'função de distribuição acumulada'],
                goal: 'Entender que no caso contínuo probabilidade é área sob a densidade — a integral aplicada.' }
            ]
          }
        ]
      },

      /* ═══════════ 8.8 Distribuições ═══════════ */
      {
        id: 'pb.distribuicoes', name: 'Distribuições de probabilidade',
        goal: 'Reconhecer o modelo certo para cada situação em vez de recalcular tudo do zero.',
        units: [
          {
            id: 'pb.distribuicoes.discretas', name: 'Distribuições discretas',
            topics: [
              { id: 'pb.di.bernoulli', name: 'Bernoulli',
                requires: ['pb.va.esperanca'],
                sub: ['um único ensaio', 'sucesso e fracasso', 'E(X) = p', 'Var(X) = p(1−p)', 'bloco das demais'],
                goal: 'Reconhecer o ensaio de Bernoulli como o tijolo de que a binomial é feita.' },

              { id: 'pb.di.binomial', name: 'Binomial',
                requires: ['pb.di.bernoulli', 'pb.ct.combinacoes'],
                sub: ['n ensaios independentes', 'P(X=k) = C(n,k)pᵏ(1−p)ⁿ⁻ᵏ', 'E(X) = np', 'condições de aplicação', 'forma da distribuição'],
                goal: 'Verificar as quatro condições da binomial antes de aplicar a fórmula.' },

              { id: 'pb.di.geometrica', name: 'Geométrica',
                requires: ['pb.di.binomial'],
                sub: ['ensaios até o primeiro sucesso', 'P(X=k) = (1−p)ᵏ⁻¹p', 'E(X) = 1/p', 'falta de memória'],
                goal: 'Modelar "quantas tentativas até dar certo" e calcular a esperança.' },

              { id: 'pb.di.poisson', name: 'Poisson',
                requires: ['pb.di.geometrica'],
                sub: ['contagem por intervalo', 'parâmetro λ', 'P(X=k) = λᵏe⁻λ/k!', 'E(X) = Var(X) = λ', 'aproximação da binomial'],
                goal: 'Modelar contagens raras num intervalo e reconhecer quando Poisson aproxima a binomial.' }
            ]
          },
          {
            id: 'pb.distribuicoes.continuas', name: 'Distribuições contínuas',
            topics: [
              { id: 'pb.di.uniforme', name: 'Uniforme contínua',
                requires: ['pb.va.continua'],
                sub: ['densidade constante', 'probabilidade proporcional ao comprimento', 'E(X) = (a+b)/2', 'geração de números aleatórios'],
                goal: 'Calcular probabilidades na uniforme como razão de comprimentos.' },

              { id: 'pb.di.normal', name: 'Distribuição normal',
                requires: ['pb.di.uniforme', 'pb.di.binomial'],
                sub: ['curva em sino', 'parâmetros μ e σ', 'regra 68-95-99,7', 'padronização z = (x−μ)/σ', 'tabela z'],
                goal: 'Padronizar valores e usar a tabela z para calcular probabilidades sob a normal.' },

              { id: 'pb.di.tcl', name: 'Teorema central do limite',
                requires: ['pb.di.normal', 'pb.va.variancia'],
                sub: ['distribuição da média amostral', 'aproximação normal independente da origem', 'erro padrão σ/√n', 'por que a normal aparece em toda parte'],
                goal: 'Explicar por que médias de amostras grandes ficam normais mesmo quando os dados não são.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
