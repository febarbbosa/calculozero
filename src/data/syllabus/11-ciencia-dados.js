/* ==========================================================================
   data/syllabus/11-ciencia-dados.js

   Trilha de Ciência de Dados. É a última do currículo por dependência, não
   por importância: ela consome estatística, probabilidade, álgebra linear
   e derivadas ao mesmo tempo.

   O recorte é deliberadamente aplicado. Cada tópico matemático aparece
   ligado à operação correspondente em Python — porque o objetivo aqui não
   é demonstrar teorema, é entender o que a biblioteca faz por baixo antes
   de confiar na saída dela.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'ciencia-dados', n: 11,
    name: 'Matemática para Ciência de Dados',
    icon: '🐍',
    tagline: 'A matemática por trás da biblioteca que você ia chamar sem entender.',
    goal: 'Sustentar matematicamente análise exploratória, modelagem preditiva e otimização — e reconhecer quando o resultado não faz sentido.',
    requires: ['estatistica', 'algebra-linear', 'calculo1'],

    modules: [
      /* ═══════════ Dados e exploração ═══════════ */
      {
        id: 'cd.dados', name: 'Dados e análise exploratória',
        goal: 'Olhar para os dados antes de modelar — a etapa que evita a maioria dos erros posteriores.',
        units: [
          {
            id: 'cd.dados.base', name: 'Explorar antes de modelar',
            topics: [
              { id: 'cd.dd.estrutura', name: 'Estrutura de dados tabular',
                requires: ['es.cn.tipos', 'la.mt.conceito'],
                sub: ['linha como observação', 'coluna como variável', 'DataFrame', 'tipos de coluna', 'dados ausentes', 'dado longo × largo'],
                goal: 'Ler uma tabela como matriz de observações e variáveis, com o tipo correto em cada coluna.' },

              { id: 'cd.dd.limpeza', name: 'Limpeza e preparação',
                requires: ['cd.dd.estrutura', 'es.fm.outliers'],
                sub: ['dados faltantes', 'imputação', 'duplicatas', 'tratamento de outliers', 'normalização e padronização', 'codificação de categóricas'],
                goal: 'Preparar os dados justificando cada decisão de imputação e de tratamento de extremos.' },

              { id: 'cd.dd.exploratoria', name: 'Análise exploratória',
                requires: ['cd.dd.limpeza', 'es.vz.boxplot'],
                sub: ['estatísticas descritivas', 'distribuição de cada variável', 'relação entre pares', 'matriz de correlação', 'agrupamentos'],
                goal: 'Extrair as perguntas certas dos dados antes de escolher qualquer modelo.' },

              { id: 'cd.dd.visualizacao', name: 'Visualização para decisão',
                requires: ['cd.dd.exploratoria', 'es.vz.relacao'],
                sub: ['escolher o gráfico pela pergunta', 'escala e eixo', 'sobreposição e transparência', 'gráfico que engana', 'comunicar incerteza'],
                goal: 'Produzir um gráfico que responde a uma pergunta específica e mostra a incerteza envolvida.' }
            ]
          }
        ]
      },

      /* ═══════════ Álgebra linear para dados ═══════════ */
      {
        id: 'cd.linear', name: 'Vetores e matrizes para dados',
        goal: 'Enxergar o conjunto de dados como matriz e as operações de análise como álgebra linear.',
        units: [
          {
            id: 'cd.linear.base', name: 'Dados são matrizes',
            topics: [
              { id: 'cd.al.vetorizacao', name: 'Vetorização',
                requires: ['la.ve.coordenadas', 'cd.dd.estrutura'],
                sub: ['observação como vetor', 'operação elemento a elemento', 'broadcasting', 'por que laço em Python é lento', 'array n-dimensional'],
                goal: 'Reescrever um laço como operação vetorizada e explicar de onde vem o ganho de desempenho.' },

              { id: 'cd.al.distancias', name: 'Distância e similaridade',
                requires: ['cd.al.vetorizacao', 'la.pr.escalar'],
                sub: ['distância euclidiana', 'distância de Manhattan', 'similaridade de cosseno', 'efeito da escala', 'maldição da dimensionalidade'],
                goal: 'Escolher a métrica de distância adequada e reconhecer o efeito da escala das variáveis.' },

              { id: 'cd.al.decomposicao', name: 'Decomposição e redução de dimensão',
                requires: ['cd.al.distancias', 'la.tf.autovalores'],
                sub: ['matriz de covariância', 'autovetores como direções de maior variância', 'PCA', 'variância explicada', 'compressão'],
                goal: 'Entender PCA como a busca pelos autovetores da matriz de covariância.' }
            ]
          }
        ]
      },

      /* ═══════════ Probabilidade e estatística aplicadas ═══════════ */
      {
        id: 'cd.inferencia', name: 'Probabilidade e inferência aplicadas',
        goal: 'Quantificar incerteza em decisões baseadas em dados.',
        units: [
          {
            id: 'cd.inferencia.base', name: 'Da amostra à conclusão',
            topics: [
              { id: 'cd.if.distribuicoes', name: 'Distribuições em dados reais',
                requires: ['pb.di.normal', 'es.fm.curtose'],
                sub: ['identificar a distribuição empírica', 'ajuste a um modelo', 'cauda pesada', 'transformação logarítmica', 'quando a normal não serve'],
                goal: 'Diagnosticar a distribuição dos dados antes de aplicar métodos que assumem normalidade.' },

              { id: 'cd.if.amostragem', name: 'Amostragem e validação',
                requires: ['cd.if.distribuicoes', 'es.am.vies'],
                sub: ['treino e teste', 'validação cruzada', 'vazamento de dados', 'amostra representativa', 'desbalanceamento de classes'],
                goal: 'Separar dados de treino e teste sem vazar informação — o erro que produz modelo bom no papel e ruim na prática.' },

              { id: 'cd.if.testes', name: 'Testes e significância na prática',
                requires: ['cd.if.amostragem', 'es.if.pvalor'],
                sub: ['teste A/B', 'tamanho de efeito', 'múltiplas comparações', 'significância × relevância', 'intervalo de confiança em métricas'],
                goal: 'Conduzir um teste A/B declarando efeito, incerteza e limitações.' }
            ]
          }
        ]
      },

      /* ═══════════ Modelagem e otimização ═══════════ */
      {
        id: 'cd.modelagem', name: 'Modelagem e otimização',
        goal: 'Ajustar modelos entendendo o que o algoritmo de treino faz — que é minimizar uma função.',
        units: [
          {
            id: 'cd.modelagem.base', name: 'Ajustar é minimizar erro',
            topics: [
              { id: 'cd.md.regressao', name: 'Regressão linear',
                requires: ['es.rl.regressao', 'cd.al.vetorizacao'],
                sub: ['forma matricial', 'mínimos quadrados', 'equação normal', 'múltiplas variáveis', 'interpretação dos coeficientes'],
                goal: 'Escrever a regressão em forma matricial e interpretar cada coeficiente com a variável correspondente.' },

              { id: 'cd.md.custo', name: 'Função de custo',
                requires: ['cd.md.regressao', 'fn.qu.otimizacao'],
                sub: ['erro quadrático médio', 'erro absoluto', 'entropia cruzada', 'o custo como superfície', 'mínimo global × local'],
                goal: 'Escolher a função de custo adequada ao problema e enxergá-la como superfície a minimizar.' },

              { id: 'cd.md.gradiente', name: 'Gradiente descendente',
                requires: ['cd.md.custo', 'c1.ap.extremos', 'c1.de.cadeia'],
                sub: ['derivada indica a direção de subida', 'passo e taxa de aprendizado', 'convergência e divergência', 'derivada parcial e gradiente', 'regra da cadeia em cascata'],
                goal: 'Explicar o treino de um modelo como descida no gradiente — derivada aplicada, não metáfora.' },

              { id: 'cd.md.regularizacao', name: 'Sobreajuste e regularização',
                requires: ['cd.md.gradiente', 'cd.if.amostragem', 'es.rl.residuos'],
                sub: ['viés × variância', 'sobreajuste e subajuste', 'regularização L1 e L2', 'curva de aprendizado', 'seleção de modelo'],
                goal: 'Diagnosticar sobreajuste pela diferença entre erro de treino e de teste e escolher a correção.' }
            ]
          }
        ]
      },

      /* ═══════════ Ferramentas ═══════════ */
      {
        id: 'cd.ferramentas', name: 'Ferramentas',
        goal: 'Ligar cada conceito à operação correspondente no ecossistema Python.',
        units: [
          {
            id: 'cd.ferramentas.base', name: 'Do conceito ao código',
            topics: [
              { id: 'cd.fr.python', name: 'Python para matemática',
                requires: ['cd.al.vetorizacao'],
                sub: ['tipos numéricos', 'ponto flutuante e erro de arredondamento', 'listas × arrays', 'compreensão de lista', 'reprodutibilidade e semente'],
                goal: 'Escrever código numérico consciente das limitações do ponto flutuante.' },

              { id: 'cd.fr.numpy', name: 'NumPy: álgebra linear na prática',
                requires: ['cd.fr.python', 'cd.al.decomposicao'],
                sub: ['ndarray', 'shape e eixo', 'broadcasting', 'produto matricial', 'decomposições prontas', 'desempenho'],
                goal: 'Traduzir uma operação matricial do papel para NumPy conferindo as dimensões.' },

              { id: 'cd.fr.pandas', name: 'Pandas: manipulação de dados',
                requires: ['cd.fr.numpy', 'cd.dd.limpeza'],
                sub: ['DataFrame e Series', 'filtro e seleção', 'agrupamento e agregação', 'junção de tabelas', 'valores ausentes', 'pivô'],
                goal: 'Executar em Pandas as transformações que a análise exploratória exige.' },

              { id: 'cd.fr.projeto', name: 'Projeto integrador',
                requires: ['cd.fr.pandas', 'cd.md.regularizacao', 'cd.if.testes'],
                sub: ['definir a pergunta', 'preparar os dados', 'explorar', 'modelar', 'validar', 'comunicar com incerteza'],
                goal: 'Percorrer um ciclo completo de análise defendendo cada decisão tomada no caminho.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
