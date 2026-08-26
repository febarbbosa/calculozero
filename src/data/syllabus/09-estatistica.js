/* ==========================================================================
   data/syllabus/09-estatistica.js

   Estatística é a disciplina que mais aparece fora da sala de aula e a que
   mais é usada errada. O recorte aqui segue a cadeia que dá sentido ao
   conjunto: dados → probabilidade → distribuições → amostragem →
   inferência. Pular a amostragem é o que transforma teste de hipótese em
   ritual de fórmula.

   A ordem também serve à trilha de Ciência de Dados: correlação, regressão
   e inferência são o pé da escada que leva a modelos preditivos.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'estatistica', n: 9,
    name: 'Estatística',
    icon: '📊',
    tagline: 'Tirar conclusão de dados sem se enganar no caminho.',
    goal: 'Descrever conjuntos de dados, medir relações entre variáveis e tirar conclusões sobre uma população a partir de uma amostra.',
    requires: ['probabilidade'],

    modules: [
      /* ═══════════ 9.1–9.2 Conceitos e organização ═══════════ */
      {
        id: 'es.conceitos', name: 'Conceitos e organização dos dados',
        goal: 'Saber o que está sendo medido e organizar os dados antes de calcular qualquer coisa.',
        units: [
          {
            id: 'es.conceitos.base', name: 'Dados e variáveis',
            topics: [
              { id: 'es.cn.populacao', name: 'População, amostra e variável',
                requires: ['mb.pc.basica'],
                sub: ['população × amostra', 'censo × amostragem', 'unidade observacional', 'parâmetro × estatística'],
                goal: 'Distinguir parâmetro (da população) de estatística (da amostra) — a confusão que atravessa toda a inferência.' },

              { id: 'es.cn.tipos', name: 'Tipos de variáveis',
                requires: ['es.cn.populacao'],
                sub: ['qualitativa nominal e ordinal', 'quantitativa discreta e contínua', 'escalas de medida', 'que gráfico cabe em cada tipo'],
                goal: 'Classificar variáveis e usar isso para escolher a medida e o gráfico corretos.' },

              { id: 'es.cn.frequencia', name: 'Tabelas de frequência',
                requires: ['es.cn.tipos', 'mb.pc.basica'],
                sub: ['frequência absoluta', 'frequência relativa', 'frequência acumulada', 'classes e amplitude de classe', 'ponto médio da classe'],
                goal: 'Montar uma tabela de frequências com classes bem escolhidas.' }
            ]
          }
        ]
      },

      /* ═══════════ 9.3 Visualização ═══════════ */
      {
        id: 'es.visualizacao', name: 'Visualização de dados',
        goal: 'Escolher o gráfico que responde à pergunta — e reconhecer o gráfico que engana.',
        units: [
          {
            id: 'es.visualizacao.base', name: 'Gráficos',
            topics: [
              { id: 'es.vz.categoricos', name: 'Gráficos para dados qualitativos',
                requires: ['es.cn.frequencia'],
                sub: ['barras', 'colunas', 'setores', 'quando o setor atrapalha', 'ordenação das categorias'],
                goal: 'Representar dados categóricos escolhendo entre barras e setores com critério.' },

              { id: 'es.vz.histograma', name: 'Histograma e distribuição',
                requires: ['es.vz.categoricos'],
                sub: ['histograma × gráfico de barras', 'escolha do número de classes', 'forma da distribuição', 'polígono de frequências', 'densidade'],
                goal: 'Ler a forma de uma distribuição num histograma e perceber o efeito do número de classes.' },

              { id: 'es.vz.boxplot', name: 'Boxplot',
                requires: ['es.vz.histograma', 'es.ps.quartis'], lab: 'labEstatistica',
                sub: ['cinco números', 'caixa e bigodes', 'outliers marcados', 'comparação entre grupos'],
                goal: 'Construir e comparar boxplots para enxergar dispersão e assimetria entre grupos.' },

              { id: 'es.vz.relacao', name: 'Linha e dispersão',
                requires: ['es.vz.histograma', 'ge.an.plano'],
                sub: ['série temporal', 'gráfico de dispersão', 'padrão, tendência e ruído', 'eixos truncados e distorção'],
                goal: 'Usar dispersão para investigar relação entre duas variáveis e desconfiar de eixos manipulados.' }
            ]
          }
        ]
      },

      /* ═══════════ 9.4–9.6 Medidas ═══════════ */
      {
        id: 'es.medidas', name: 'Medidas descritivas',
        goal: 'Resumir um conjunto de dados por centro, dispersão e posição — e saber quando cada resumo mente.',
        units: [
          {
            id: 'es.medidas.central', name: 'Tendência central',
            topics: [
              { id: 'es.tc.media', name: 'Média',
                requires: ['es.cn.frequencia'],
                sub: ['média aritmética', 'média ponderada', 'média de dados agrupados', 'sensibilidade a valores extremos'],
                goal: 'Calcular médias simples e ponderadas e reconhecer quando um extremo distorce o resultado.' },

              { id: 'es.tc.mediana', name: 'Mediana',
                requires: ['es.tc.media'],
                sub: ['ordenar os dados', 'posição central', 'n par e n ímpar', 'robustez a outliers', 'renda mediana × renda média'],
                goal: 'Calcular a mediana e justificar quando ela descreve melhor o conjunto que a média.' },

              { id: 'es.tc.moda', name: 'Moda',
                requires: ['es.tc.mediana'],
                sub: ['valor mais frequente', 'amodal, bimodal e multimodal', 'moda em dados qualitativos', 'classe modal'],
                goal: 'Identificar a moda e usá-la onde média e mediana não fazem sentido.' }
            ]
          },
          {
            id: 'es.medidas.dispersao', name: 'Dispersão',
            topics: [
              { id: 'es.dp.amplitude', name: 'Amplitude',
                requires: ['es.tc.mediana'],
                sub: ['máximo − mínimo', 'simplicidade e fragilidade', 'amplitude interquartil', 'quando usar'],
                goal: 'Medir dispersão pela amplitude e reconhecer sua fragilidade diante de um único extremo.' },

              { id: 'es.dp.variancia', name: 'Variância e desvio padrão',
                requires: ['es.dp.amplitude'],
                sub: ['desvio em relação à média', 'por que elevar ao quadrado', 'variância populacional × amostral', 'divisão por n−1', 'desvio padrão e unidade'],
                goal: 'Calcular variância e desvio padrão e explicar por que a amostral divide por n−1.' },

              { id: 'es.dp.cv', name: 'Coeficiente de variação',
                requires: ['es.dp.variancia'],
                sub: ['CV = σ/μ', 'dispersão relativa', 'comparar grupos de escalas diferentes', 'limitações'],
                goal: 'Comparar a dispersão de conjuntos com unidades ou magnitudes diferentes.' }
            ]
          },
          {
            id: 'es.medidas.posicao', name: 'Medidas de posição',
            topics: [
              { id: 'es.ps.quartis', name: 'Quartis, decis e percentis',
                requires: ['es.tc.mediana'],
                sub: ['Q1, Q2 e Q3', 'percentil', 'decil', 'interpretação de posição relativa', 'nota de corte'],
                goal: 'Calcular e interpretar quartis e percentis como posição relativa dentro do conjunto.' },

              { id: 'es.ps.iqr', name: 'Amplitude interquartil e escore z',
                requires: ['es.ps.quartis', 'es.dp.variancia'],
                sub: ['IQR = Q3 − Q1', 'escore z', 'padronização', 'comparar observações de distribuições diferentes'],
                goal: 'Usar IQR e escore z para localizar uma observação dentro da distribuição.' }
            ]
          }
        ]
      },

      /* ═══════════ 9.7–9.9 Forma e outliers ═══════════ */
      {
        id: 'es.forma', name: 'Forma da distribuição e outliers',
        goal: 'Descrever o formato dos dados e decidir o que fazer com valores extremos.',
        units: [
          {
            id: 'es.forma.base', name: 'Forma e valores atípicos',
            topics: [
              { id: 'es.fm.assimetria', name: 'Simetria e assimetria',
                requires: ['es.vz.histograma', 'es.tc.moda'],
                sub: ['distribuição simétrica', 'assimetria à direita e à esquerda', 'posição relativa de média, mediana e moda', 'caudas'],
                goal: 'Diagnosticar assimetria pela posição relativa entre média e mediana.' },

              { id: 'es.fm.curtose', name: 'Curtose e caudas',
                requires: ['es.fm.assimetria'],
                sub: ['achatamento', 'caudas pesadas', 'comparação com a normal', 'risco de eventos extremos'],
                goal: 'Reconhecer distribuições de cauda pesada e por que elas subestimam risco quando tratadas como normais.' },

              { id: 'es.fm.outliers', name: 'Outliers',
                requires: ['es.ps.iqr', 'es.fm.assimetria'], lab: 'labEstatistica',
                sub: ['critério 1,5·IQR', 'critério por escore z', 'erro de medida × valor legítimo', 'impacto na média e na mediana', 'nunca excluir sem justificar'],
                goal: 'Detectar outliers por dois critérios e decidir com justificativa se eles saem ou ficam.' },

              { id: 'es.fm.normal', name: 'Distribuições de referência',
                requires: ['es.fm.curtose', 'pb.di.normal'],
                sub: ['normal', 'binomial', 'Poisson', 'uniforme', 'qual modelo cabe em quais dados'],
                goal: 'Associar cada conjunto de dados ao modelo de distribuição mais plausível.' }
            ]
          }
        ]
      },

      /* ═══════════ 9.10–9.11 Relação entre variáveis ═══════════ */
      {
        id: 'es.relacao', name: 'Correlação e regressão',
        goal: 'Medir e modelar a relação entre duas variáveis — o começo da modelagem preditiva.',
        units: [
          {
            id: 'es.relacao.base', name: 'Duas variáveis',
            topics: [
              { id: 'es.rl.correlacao', name: 'Correlação',
                requires: ['es.vz.relacao', 'es.dp.variancia'],
                sub: ['correlação positiva, negativa e nula', 'coeficiente de Pearson r', 'r entre −1 e 1', 'correlação só capta relação linear'],
                goal: 'Calcular e interpretar r, sabendo que r ≈ 0 não significa ausência de relação.' },

              { id: 'es.rl.causalidade', name: 'Correlação não é causalidade',
                requires: ['es.rl.correlacao'],
                sub: ['variável de confusão', 'causalidade reversa', 'coincidência em séries longas', 'necessidade de experimento'],
                goal: 'Apontar explicações alternativas para uma correlação forte antes de afirmar causa.' },

              { id: 'es.rl.regressao', name: 'Regressão linear simples',
                requires: ['es.rl.causalidade', 'fn.af.modelagem'],
                sub: ['reta ŷ = a + bx', 'método dos mínimos quadrados', 'interpretação dos coeficientes', 'coeficiente de determinação R²'],
                goal: 'Ajustar e interpretar uma reta de regressão, incluindo o significado de R².' },

              { id: 'es.rl.residuos', name: 'Resíduos e previsão',
                requires: ['es.rl.regressao'],
                sub: ['resíduo = observado − previsto', 'gráfico de resíduos', 'padrão nos resíduos indica modelo errado', 'interpolação × extrapolação'],
                goal: 'Diagnosticar a qualidade do ajuste pelos resíduos e recusar extrapolações indevidas.' }
            ]
          }
        ]
      },

      /* ═══════════ 9.12 Amostragem ═══════════ */
      {
        id: 'es.amostragem', name: 'Amostragem',
        goal: 'Obter uma amostra que represente a população — sem isso, nenhuma inferência vale.',
        units: [
          {
            id: 'es.amostragem.base', name: 'Como escolher a amostra',
            topics: [
              { id: 'es.am.tipos', name: 'Tipos de amostragem',
                requires: ['es.cn.populacao', 'pb.fu.teorica'],
                sub: ['aleatória simples', 'estratificada', 'sistemática', 'por conglomerados', 'amostragem por conveniência'],
                goal: 'Escolher o plano amostral adequado e reconhecer os que não permitem inferência.' },

              { id: 'es.am.vies', name: 'Viés',
                requires: ['es.am.tipos'],
                sub: ['viés de seleção', 'viés de não resposta', 'viés do sobrevivente', 'pergunta enviesada', 'amostra grande não corrige viés'],
                goal: 'Identificar fontes de viés e entender por que aumentar a amostra não conserta um viés.' },

              { id: 'es.am.distribuicaoAmostral', name: 'Distribuição amostral',
                requires: ['es.am.vies', 'pb.di.tcl'],
                sub: ['estatística como variável aleatória', 'distribuição da média amostral', 'erro padrão', 'efeito do tamanho da amostra'],
                goal: 'Entender que a média amostral tem distribuição própria — a ideia que torna a inferência possível.' }
            ]
          }
        ]
      },

      /* ═══════════ 9.13–9.14 Inferência ═══════════ */
      {
        id: 'es.inferencia', name: 'Inferência estatística',
        goal: 'Concluir sobre a população com incerteza declarada, em vez de fingir certeza.',
        units: [
          {
            id: 'es.inferencia.estimacao', name: 'Estimação',
            topics: [
              { id: 'es.if.estimativa', name: 'Estimativa pontual',
                requires: ['es.am.distribuicaoAmostral'],
                sub: ['estimador', 'viés do estimador', 'média amostral como estimador de μ', 'precisão'],
                goal: 'Usar a estatística amostral como estimativa do parâmetro e reconhecer sua imprecisão.' },

              { id: 'es.if.intervalo', name: 'Intervalo de confiança',
                requires: ['es.if.estimativa', 'pb.di.normal'],
                sub: ['margem de erro', 'nível de confiança', 'IC para a média', 'IC para proporção', 'o que 95% realmente significa'],
                goal: 'Construir e interpretar um intervalo de confiança sem dizer que "há 95% de chance de μ estar nele".' }
            ]
          },
          {
            id: 'es.inferencia.testes', name: 'Testes de hipótese',
            topics: [
              { id: 'es.if.hipotese', name: 'Teste de hipótese',
                requires: ['es.if.intervalo'],
                sub: ['hipótese nula e alternativa', 'estatística de teste', 'região crítica', 'nível de significância α', 'teste uni e bicaudal'],
                goal: 'Formular H₀ e H₁ corretamente e conduzir a decisão do teste.' },

              { id: 'es.if.pvalor', name: 'p-valor',
                requires: ['es.if.hipotese'],
                sub: ['definição correta', 'p-valor não é probabilidade de H₀', 'comparação com α', 'significância estatística × relevância prática', 'p-hacking'],
                goal: 'Interpretar o p-valor com precisão e reconhecer o abuso mais comum da estatística aplicada.' },

              { id: 'es.if.erros', name: 'Erros tipo I e tipo II',
                requires: ['es.if.pvalor'],
                sub: ['falso positivo', 'falso negativo', 'relação entre α e β', 'poder do teste', 'tamanho de amostra'],
                goal: 'Relacionar α, β e poder e explicar o custo de cada tipo de erro no contexto.' },

              { id: 'es.if.testes', name: 'Testes clássicos',
                requires: ['es.if.erros'],
                sub: ['teste z', 'teste t de Student', 'teste para proporções', 'qui-quadrado', 'ANOVA', 'como escolher o teste'],
                goal: 'Escolher o teste adequado a partir do tipo de dado, do número de grupos e do que se sabe da população.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
