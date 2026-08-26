/* ==========================================================================
   data/syllabus/10-computacao.js

   Matemática para Computação. A disciplina existe porque o aluno de
   Engenharia da Computação encontra esses assuntos duas vezes — uma na
   aula de matemática, outra na de algoritmos — e quase nunca percebe que
   é a mesma coisa.

   Todo tópico aqui segue o mesmo trajeto: conceito matemático → onde ele
   aparece no código → o que ele custa em tempo de execução. Sem essa
   terceira parte, matemática discreta vira conteúdo decorativo.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'computacao', n: 10,
    name: 'Matemática para Computação',
    icon: '💻',
    tagline: 'A matemática que já está dentro do seu código.',
    goal: 'Reconhecer as estruturas matemáticas por trás de algoritmos, estruturas de dados e análise de desempenho.',
    requires: ['algebra', 'precalculo', 'probabilidade', 'algebra-linear'],

    modules: [
      /* ═══════════ Lógica e conjuntos ═══════════ */
      {
        id: 'mc.logica', name: 'Lógica e conjuntos',
        goal: 'Escrever e avaliar condições com precisão — o que todo if do mundo exige.',
        units: [
          {
            id: 'mc.logica.base', name: 'Lógica proposicional',
            topics: [
              { id: 'mc.lg.proposicoes', name: 'Proposições e conectivos',
                requires: ['al.fund.variaveis'],
                sub: ['proposição e valor lógico', 'negação, conjunção e disjunção', 'condicional e bicondicional', 'tabela-verdade', 'operadores booleanos no código'],
                goal: 'Montar tabelas-verdade e traduzir uma condição em português para expressão booleana.' },

              { id: 'mc.lg.equivalencias', name: 'Equivalências e leis de De Morgan',
                requires: ['mc.lg.proposicoes'],
                sub: ['tautologia e contradição', 'leis de De Morgan', 'contrapositiva', 'simplificação de condições', 'curto-circuito na avaliação'],
                goal: 'Simplificar condições compostas usando De Morgan — o refactor mais comum em revisão de código.' },

              { id: 'mc.lg.quantificadores', name: 'Quantificadores e demonstração',
                requires: ['mc.lg.equivalencias'],
                sub: ['para todo e existe', 'negação de quantificador', 'demonstração direta', 'por absurdo', 'por indução'],
                goal: 'Negar sentenças quantificadas e provar por indução — a técnica que valida laços e recursões.' }
            ]
          },
          {
            id: 'mc.logica.conjuntos', name: 'Conjuntos e relações',
            topics: [
              { id: 'mc.cj.conjuntos', name: 'Conjuntos',
                requires: ['mc.lg.proposicoes', 'pb.ev.operacoes'],
                sub: ['pertinência e inclusão', 'união, interseção e diferença', 'complementar', 'conjunto das partes', 'cardinalidade', 'Set em linguagens de programação'],
                goal: 'Operar com conjuntos e relacionar cada operação ao método correspondente de um Set.' },

              { id: 'mc.cj.produto', name: 'Produto cartesiano e relações',
                requires: ['mc.cj.conjuntos'],
                sub: ['produto cartesiano', 'relação binária', 'domínio e imagem da relação', 'relação de equivalência', 'relação de ordem', 'tabelas relacionais'],
                goal: 'Reconhecer a relação binária por trás de uma tabela de banco de dados.' },

              { id: 'mc.cj.funcoes', name: 'Funções discretas',
                requires: ['mc.cj.produto', 'fn.op.inversa'],
                sub: ['função como relação especial', 'injetora, sobrejetora e bijetora', 'função hash', 'colisão', 'função piso e teto', 'aritmética modular'],
                goal: 'Usar a linguagem de funções para analisar hashing, colisão e operações módulo n.' }
            ]
          }
        ]
      },

      /* ═══════════ Sequências e recorrência ═══════════ */
      {
        id: 'mc.recorrencia', name: 'Sequências e recorrência',
        goal: 'Descrever e resolver processos que se definem em termos de si mesmos.',
        units: [
          {
            id: 'mc.recorrencia.base', name: 'Recorrência',
            topics: [
              { id: 'mc.rc.sequencias', name: 'Sequências e somatórios',
                requires: ['pc.sq.pa', 'pc.sq.pg'],
                sub: ['notação de somatório', 'somas conhecidas', 'produto', 'sequência gerada por laço', 'invariante de laço'],
                goal: 'Traduzir um laço em somatório e calcular o total de operações que ele executa.' },

              { id: 'mc.rc.relacoes', name: 'Relações de recorrência',
                requires: ['mc.rc.sequencias', 'mc.lg.quantificadores'],
                sub: ['caso base e passo', 'Fibonacci', 'torre de Hanói', 'recursão × iteração', 'memoização'],
                goal: 'Escrever a recorrência de um algoritmo recursivo e resolvê-la para termos fechados simples.' },

              { id: 'mc.rc.divisao', name: 'Recorrências de divisão e conquista',
                requires: ['mc.rc.relacoes', 'fn.lg.mudancaBase'],
                sub: ['T(n) = aT(n/b) + f(n)', 'busca binária', 'merge sort', 'árvore de recursão', 'teorema mestre'],
                goal: 'Aplicar o teorema mestre para obter a complexidade de um algoritmo de divisão e conquista.' }
            ]
          }
        ]
      },

      /* ═══════════ Combinatória e grafos ═══════════ */
      {
        id: 'mc.discreta', name: 'Combinatória e grafos',
        goal: 'Contar estruturas e modelar relações — a base de algoritmos de busca e de otimização.',
        units: [
          {
            id: 'mc.discreta.contagem', name: 'Contagem aplicada',
            topics: [
              { id: 'mc.co.contagem', name: 'Combinatória em algoritmos',
                requires: ['pb.ct.combinacoes'],
                sub: ['contar subconjuntos', 'permutações e força bruta', 'explosão combinatória', 'princípio da casa dos pombos', 'contagem de estados'],
                goal: 'Estimar quantos casos um algoritmo de força bruta percorre e quando isso deixa de ser viável.' }
            ]
          },
          {
            id: 'mc.discreta.grafos', name: 'Grafos',
            topics: [
              { id: 'mc.gr.conceito', name: 'Grafos: conceitos',
                requires: ['mc.cj.produto'],
                sub: ['vértices e arestas', 'dirigido e não dirigido', 'grau', 'caminho e ciclo', 'conexidade', 'árvore'],
                goal: 'Modelar uma situação como grafo e ler suas propriedades básicas.' },

              { id: 'mc.gr.representacao', name: 'Representação de grafos',
                requires: ['mc.gr.conceito', 'la.mt.conceito'],
                sub: ['matriz de adjacência', 'lista de adjacência', 'matriz de incidência', 'custo de memória', 'grafos esparsos e densos'],
                goal: 'Escolher entre matriz e lista de adjacência conforme a densidade do grafo.' },

              { id: 'mc.gr.algoritmos', name: 'Algoritmos em grafos',
                requires: ['mc.gr.representacao', 'mc.rc.divisao'],
                sub: ['busca em largura', 'busca em profundidade', 'caminho mínimo', 'árvore geradora mínima', 'ordenação topológica'],
                goal: 'Relacionar cada algoritmo clássico ao problema que ele resolve e ao seu custo.' }
            ]
          }
        ]
      },

      /* ═══════════ Álgebra linear aplicada ═══════════ */
      {
        id: 'mc.linear', name: 'Vetores e matrizes na computação',
        goal: 'Usar vetores e matrizes como estruturas de dados, não apenas como objetos abstratos.',
        units: [
          {
            id: 'mc.linear.base', name: 'Álgebra linear introdutória aplicada',
            topics: [
              { id: 'mc.al.vetores', name: 'Vetores em computação',
                requires: ['la.ve.coordenadas', 'la.pr.escalar'],
                sub: ['posição e direção em jogos', 'produto escalar e iluminação', 'similaridade de cosseno', 'embeddings', 'normalização'],
                goal: 'Aplicar produto escalar em iluminação e em similaridade entre documentos.' },

              { id: 'mc.al.matrizes', name: 'Matrizes e transformações',
                requires: ['mc.al.vetores', 'la.tf.geometricas'],
                sub: ['matriz como tabela e como transformação', 'rotação e escala em 2D', 'coordenadas homogêneas', 'pipeline gráfico', 'custo do produto matricial'],
                goal: 'Compor transformações por multiplicação de matrizes e estimar o custo da operação.' },

              { id: 'mc.al.sistemas', name: 'Sistemas lineares na prática',
                requires: ['mc.al.matrizes', 'la.si.escalonamento'],
                sub: ['escalonamento como algoritmo', 'custo O(n³)', 'erro numérico e pivoteamento', 'métodos iterativos', 'esparsidade'],
                goal: 'Reconhecer a eliminação de Gauss como algoritmo e entender por que a estabilidade numérica importa.' }
            ]
          }
        ]
      },

      /* ═══════════ Complexidade e probabilidade aplicada ═══════════ */
      {
        id: 'mc.analise', name: 'Complexidade e probabilidade aplicada',
        goal: 'Medir o custo de um algoritmo e raciocinar sobre comportamento médio.',
        units: [
          {
            id: 'mc.analise.complexidade', name: 'Complexidade',
            topics: [
              { id: 'mc.cp.assintotica', name: 'Notação assintótica',
                requires: ['pc.lm.crescimento', 'mc.rc.sequencias'],
                sub: ['O grande, Ω e Θ', 'crescimento dominante', 'constantes que somem', 'comparar O(n log n) e O(n²)', 'limites no infinito aplicados'],
                goal: 'Classificar o custo de um algoritmo e justificar por que constantes desaparecem no limite.' },

              { id: 'mc.cp.classes', name: 'Classes de complexidade',
                requires: ['mc.cp.assintotica', 'fn.ex.crescimento'],
                sub: ['constante, logarítmico e linear', 'linearítmico', 'quadrático e cúbico', 'exponencial e fatorial', 'tratável × intratável'],
                goal: 'Situar um algoritmo na hierarquia de crescimento e prever até que tamanho de entrada ele serve.' },

              { id: 'mc.cp.amortizada', name: 'Análise de caso médio e amortizada',
                requires: ['mc.cp.classes', 'pb.va.esperanca'],
                sub: ['melhor, pior e caso médio', 'esperança do número de operações', 'análise amortizada', 'array dinâmico', 'algoritmos aleatorizados'],
                goal: 'Calcular o custo esperado de um algoritmo usando esperança matemática.' }
            ]
          },
          {
            id: 'mc.analise.probabilidade', name: 'Probabilidade aplicada',
            topics: [
              { id: 'mc.pa.aleatorios', name: 'Aleatoriedade em computação',
                requires: ['pb.di.uniforme', 'mc.cj.funcoes'],
                sub: ['gerador pseudoaleatório', 'semente', 'distribuição uniforme discreta', 'embaralhamento de Fisher-Yates', 'viés em sorteios mal feitos'],
                goal: 'Gerar e embaralhar valores sem introduzir viés — erro clássico em sorteio implementado à mão.' },

              { id: 'mc.pa.estruturas', name: 'Estruturas probabilísticas',
                requires: ['mc.pa.aleatorios', 'pb.cd.independencia'],
                sub: ['tabela hash e colisões', 'paradoxo do aniversário', 'filtro de Bloom', 'falso positivo', 'skip list'],
                goal: 'Estimar a taxa de colisão de uma tabela hash e o falso positivo de um filtro de Bloom.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
