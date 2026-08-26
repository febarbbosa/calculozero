/* ==========================================================================
   data/syllabus/12-algebra-linear.js

   Álgebra Linear entra por duas portas na plataforma. A primeira é a
   disciplina Física das Variações, que já tem trilha própria e listas
   reais — os tópicos com `track` apontam para ela. A segunda é Ciência de
   Dados: matriz, base e autovetor são a linguagem de PCA, de compressão e
   de rede neural.

   Por isso a disciplina vai além do que a lista da faculdade cobre:
   matrizes, transformações lineares e autovalores fecham o quadro.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'algebra-linear', n: 12,
    name: 'Álgebra Linear',
    icon: '⟨⟩',
    tagline: 'Vetores, matrizes e transformações — a matemática do espaço.',
    goal: 'Operar com vetores e matrizes, resolver sistemas por escalonamento e entender base, dimensão e autovetores.',
    requires: ['algebra', 'geometria'],

    modules: [
      /* ═══════════ Vetores ═══════════ */
      {
        id: 'la.vetores', name: 'Vetores',
        goal: 'Tratar o vetor primeiro como seta e depois como lista de números — as duas leituras precisam conviver.',
        units: [
          {
            id: 'la.vetores.geometricos', name: 'Vetores geométricos',
            topics: [
              { id: 'la.ve.conceito', name: 'O que é um vetor',
                requires: ['ge.pl.entes'], track: 'vetores-geo', lesson: 'vg1',
                sub: ['módulo, direção e sentido', 'escalar × vetor', 'vetor não tem posição fixa', 'vetores iguais e opostos'],
                goal: 'Distinguir direção de sentido e reconhecer quando duas setas representam o mesmo vetor.' },

              { id: 'la.ve.somaGeo', name: 'Soma geométrica e resultante',
                requires: ['la.ve.conceito', 'tg.tr.leis'], deferred: true, track: 'vetores-geo', lesson: 'vg2',
                sub: ['método do polígono', 'regra do paralelogramo', 'lei dos cossenos para o módulo', 'força resultante', 'vetor oposto e subtração'],
                goal: 'Compor vetores geometricamente e calcular o módulo da resultante pela lei dos cossenos.' }
            ]
          },
          {
            id: 'la.vetores.algebricos', name: 'Vetores algébricos',
            topics: [
              { id: 'la.ve.coordenadas', name: 'Vetor em coordenadas',
                requires: ['la.ve.somaGeo', 'ge.an.plano'], track: 'vetores-alg', lesson: 'va1',
                sub: ['par e terna ordenada', 'notação i, j, k', 'soma componente a componente', 'multiplicação por escalar', 'combinação de operações'],
                goal: 'Converter entre a seta e o par ordenado e operar algebricamente sem desenhar.' },

              { id: 'la.ve.moduloVersor', name: 'Vetor entre pontos, módulo e versor',
                requires: ['la.ve.coordenadas', 'ge.an.distancia'], track: 'vetores-alg', lesson: 'va2',
                sub: ['AB = B − A', 'módulo por Pitágoras', 'versor u/|u|', 'vetor unitário', 'ângulos diretores'],
                goal: 'Montar o vetor entre dois pontos e normalizá-lo para obter só a direção.' }
            ]
          }
        ]
      },

      /* ═══════════ Produtos ═══════════ */
      {
        id: 'la.produtos', name: 'Produtos entre vetores',
        goal: 'Usar os três produtos para medir ângulo, área e volume.',
        units: [
          {
            id: 'la.produtos.escalar', name: 'Produto escalar',
            topics: [
              { id: 'la.pr.escalar', name: 'Produto escalar',
                requires: ['la.ve.moduloVersor'], track: 'produto-escalar', lesson: 'pe1',
                sub: ['a₁b₁ + a₂b₂ + a₃b₃', '|u||v|cos θ', 'resultado é um número', 'zero significa perpendicular', 'sinal e tipo de ângulo'],
                goal: 'Calcular o produto escalar pelas duas fórmulas e usá-lo como teste de ortogonalidade.' },

              { id: 'la.pr.anguloProjecao', name: 'Ângulo, projeção e produto interno',
                requires: ['la.pr.escalar', 'tg.fn.inversas'], deferred: true, track: 'produto-escalar', lesson: 'pe2',
                sub: ['θ = arccos(u·v / |u||v|)', 'projeção de u sobre v', 'produto interno geral', 'simetria, homogeneidade e aditividade', 'desigualdade de Cauchy-Schwarz'],
                goal: 'Calcular ângulo e projeção e verificar as propriedades que definem um produto interno.' }
            ]
          },
          {
            id: 'la.produtos.vetorial', name: 'Produto vetorial e misto',
            topics: [
              { id: 'la.pr.vetorial', name: 'Produto vetorial',
                requires: ['la.pr.escalar', 'la.mt.determinante'], track: 'produto-vetorial', lesson: 'pv1',
                sub: ['determinante com i, j, k', 'resultado perpendicular aos dois', 'não é comutativo', 'módulo é a área do paralelogramo', 'área do triângulo'],
                goal: 'Calcular u × v pelo determinante e conferir o resultado pela ortogonalidade.' },

              { id: 'la.pr.misto', name: 'Produto misto',
                requires: ['la.pr.vetorial'], track: 'produto-misto', lesson: 'pm1',
                sub: ['u·(v × w)', 'determinante 3×3', 'módulo é o volume do paralelepípedo', 'zero significa coplanares', 'volume do tetraedro'],
                goal: 'Usar o produto misto como teste de coplanaridade e como cálculo de volume.' }
            ]
          }
        ]
      },

      /* ═══════════ Matrizes ═══════════ */
      {
        id: 'la.matrizes', name: 'Matrizes e determinantes',
        goal: 'Operar com matrizes e calcular determinantes — a ferramenta que resolve sistemas e descreve transformações.',
        units: [
          {
            id: 'la.matrizes.base', name: 'Matrizes',
            topics: [
              { id: 'la.mt.conceito', name: 'Matriz e tipos',
                requires: ['al.fund.termos'],
                sub: ['ordem m×n', 'elemento aᵢⱼ', 'matriz quadrada, identidade e nula', 'transposta', 'matriz simétrica'],
                goal: 'Ler a notação de índices e identificar os tipos especiais de matriz.' },

              { id: 'la.mt.operacoes', name: 'Operações com matrizes',
                requires: ['la.mt.conceito'],
                sub: ['soma e subtração', 'multiplicação por escalar', 'produto de matrizes', 'condição de compatibilidade', 'produto não é comutativo'],
                goal: 'Multiplicar matrizes conferindo as dimensões antes de começar a conta.' },

              { id: 'la.mt.determinante', name: 'Determinante',
                requires: ['la.mt.operacoes'],
                sub: ['determinante 2×2', 'regra de Sarrus', 'Laplace por cofatores', 'propriedades', 'determinante como fator de área e volume'],
                goal: 'Calcular determinantes até 3×3 e interpretar o resultado como fator de escala de área.' },

              { id: 'la.mt.inversa', name: 'Matriz inversa',
                requires: ['la.mt.determinante'],
                sub: ['A·A⁻¹ = I', 'existe se det ≠ 0', 'inversa por adjunta', 'inversa por escalonamento', 'matriz singular'],
                goal: 'Decidir pela existência da inversa e calculá-la pelo método mais econômico.' }
            ]
          }
        ]
      },

      /* ═══════════ Sistemas ═══════════ */
      {
        id: 'la.sistemas', name: 'Sistemas lineares',
        goal: 'Resolver e classificar sistemas de qualquer tamanho por escalonamento.',
        units: [
          {
            id: 'la.sistemas.base', name: 'Resolução matricial',
            topics: [
              { id: 'la.si.matricial', name: 'Forma matricial e matriz aumentada',
                requires: ['la.mt.operacoes', 'al.sist.tres'],
                sub: ['AX = B', 'matriz dos coeficientes', 'matriz aumentada', 'notação compacta'],
                goal: 'Escrever qualquer sistema na forma AX = B e montar a matriz aumentada.' },

              { id: 'la.si.escalonamento', name: 'Escalonamento (Gauss-Jordan)',
                requires: ['la.si.matricial'],
                sub: ['operações elementares', 'forma escalonada', 'forma escalonada reduzida', 'pivô', 'substituição regressiva'],
                goal: 'Escalonar uma matriz aumentada até a forma reduzida e ler a solução direto dela.' },

              { id: 'la.si.classificacao', name: 'Classificação e posto',
                requires: ['la.si.escalonamento'],
                sub: ['SPD, SPI e SI', 'posto da matriz', 'grau de liberdade', 'variáveis livres', 'regra de Cramer'],
                goal: 'Classificar o sistema pelo posto e descrever a solução geral quando ela é infinita.' }
            ]
          }
        ]
      },

      /* ═══════════ Espaços vetoriais ═══════════ */
      {
        id: 'la.espacos', name: 'Espaços vetoriais',
        goal: 'Generalizar a noção de vetor e entender base e dimensão.',
        units: [
          {
            id: 'la.espacos.base', name: 'Combinação linear, base e dimensão',
            topics: [
              { id: 'la.ep.combinacao', name: 'Combinação linear',
                requires: ['la.ve.coordenadas', 'al.sist.substituicao'], track: 'espaco-vetorial', lesson: 'ev1',
                sub: ['w = au + bv', 'resolver o sistema dos coeficientes', 'espaço gerado', 'quando não existe solução'],
                goal: 'Decidir se um vetor é combinação linear de outros resolvendo o sistema correspondente.' },

              { id: 'la.ep.liLd', name: 'Dependência linear, base e dimensão',
                requires: ['la.ep.combinacao', 'la.mt.determinante'], track: 'espaco-vetorial', lesson: 'ev2',
                sub: ['LI e LD', 'conjunto gerador', 'base', 'dimensão', 'determinante como teste', 'base canônica'],
                goal: 'Usar o determinante para decidir se um conjunto é base — quando a quantidade bate com a dimensão.' },

              { id: 'la.ep.axiomas', name: 'Espaço vetorial abstrato e subespaços',
                requires: ['la.ep.liLd'],
                sub: ['os oito axiomas', 'espaços de polinômios e de matrizes', 'subespaço', 'teste do subespaço', 'espaço nulo e espaço coluna'],
                goal: 'Verificar se um conjunto é subespaço e reconhecer vetores que não são setas.' },

              { id: 'la.ep.coordenadas', name: 'Coordenadas e mudança de base',
                requires: ['la.ep.axiomas'],
                sub: ['vetor de coordenadas numa base', 'matriz mudança de base', 'mesma seta, outros números', 'ortonormalidade'],
                goal: 'Reescrever o mesmo vetor em outra base e entender por que os números mudam sem o vetor mudar.' }
            ]
          }
        ]
      },

      /* ═══════════ Transformações e autovalores ═══════════ */
      {
        id: 'la.transformacoes', name: 'Transformações lineares e autovalores',
        goal: 'Enxergar a matriz como função que transforma o espaço, e achar as direções que ela preserva.',
        units: [
          {
            id: 'la.transformacoes.base', name: 'A matriz como transformação',
            topics: [
              { id: 'la.tf.conceito', name: 'Transformação linear',
                requires: ['la.ep.coordenadas', 'fn.op.composta'], deferred: true,
                sub: ['T(u+v) = T(u)+T(v)', 'T(ku) = kT(u)', 'matriz da transformação', 'núcleo e imagem', 'teorema do núcleo e da imagem'],
                goal: 'Reconhecer uma transformação linear e montar sua matriz na base canônica.' },

              { id: 'la.tf.geometricas', name: 'Transformações geométricas',
                requires: ['la.tf.conceito', 'tg.ap.engenharia'], deferred: true,
                sub: ['rotação', 'reflexão', 'escala', 'cisalhamento', 'composição por produto de matrizes', 'determinante como fator de área'],
                goal: 'Escrever a matriz de rotação e escala e compor transformações multiplicando matrizes.' },

              { id: 'la.tf.autovalores', name: 'Autovalores e autovetores',
                requires: ['la.tf.geometricas', 'la.mt.inversa'],
                sub: ['Av = λv', 'as direções que não giram', 'polinômio característico', 'multiplicidade', 'diagonalização'],
                goal: 'Calcular autovalores pelo polinômio característico e interpretar autovetores como eixos preservados.' },

              { id: 'la.tf.aplicacoes', name: 'Aplicações',
                requires: ['la.tf.autovalores'],
                sub: ['PCA', 'compressão de dados', 'PageRank', 'sistemas dinâmicos', 'computação gráfica'],
                goal: 'Reconhecer autovetores por trás de PCA e de algoritmos de ranqueamento.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
