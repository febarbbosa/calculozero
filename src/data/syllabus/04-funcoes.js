/* ==========================================================================
   data/syllabus/04-funcoes.js

   A disciplina central da plataforma. Limite é o que acontece com uma
   função perto de um ponto; derivada é a inclinação de uma função;
   integral é a área sob uma função. Quem não enxerga função enxerga o
   Cálculo inteiro como manipulação simbólica sem sentido.

   Por isso o módulo de transformações e o laboratório existem: entender
   função é conseguir prever o gráfico antes de desenhá-lo.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'funcoes', n: 4,
    name: 'Funções',
    icon: 'ƒ',
    tagline: 'Máquinas de número — e o gráfico que mostra o que elas fazem.',
    goal: 'Ler, escrever e prever o comportamento das famílias de funções que sustentam todo o Cálculo.',
    requires: ['algebra', 'geometria'],

    modules: [
      /* ═══════════ 4.1 Conceito ═══════════ */
      {
        id: 'fn.conceito', name: 'Conceito de função',
        goal: 'Entender função como regra de correspondência e transitar entre suas três representações.',
        units: [
          {
            id: 'fn.conceito.base', name: 'O que é uma função',
            topics: [
              { id: 'fn.co.maquina', name: 'Função como máquina',
                requires: ['al.fund.substituicao'], track: 'funcoes', lesson: 'fu1',
                sub: ['entrada e saída', 'notação f(x)', 'a mesma entrada nunca dá duas saídas', 'variável independente e dependente'],
                goal: 'Ler f(x) como "o que a máquina devolve para x" e testar se uma correspondência é função.' },

              { id: 'fn.co.dominio', name: 'Domínio, contradomínio e imagem',
                requires: ['fn.co.maquina', 'al.ineq.intervalos'],
                sub: ['domínio: o que pode entrar', 'contradomínio × imagem', 'restrições: denominador e raiz par', 'escrever o domínio em intervalos'],
                goal: 'Determinar o domínio de uma função a partir das restrições algébricas e escrevê-lo como intervalo.' },

              { id: 'fn.co.representacoes', name: 'Tabela, fórmula e gráfico',
                requires: ['fn.co.dominio', 'ge.an.plano'],
                sub: ['montar tabela de valores', 'plotar pontos', 'teste da reta vertical', 'ler valores no gráfico'],
                goal: 'Converter entre as três representações e usar o teste da reta vertical.' },

              { id: 'fn.co.comportamento', name: 'Leitura de gráficos',
                requires: ['fn.co.representacoes'],
                sub: ['crescente e decrescente', 'zeros da função', 'sinal da função', 'máximos e mínimos locais', 'paridade'],
                goal: 'Extrair de um gráfico tudo que ele informa antes de qualquer conta.' }
            ]
          }
        ]
      },

      /* ═══════════ 4.2 Função afim ═══════════ */
      {
        id: 'fn.afim', name: 'Função afim',
        goal: 'Dominar a reta — a função cuja taxa de variação é constante, e o modelo local de todas as outras.',
        units: [
          {
            id: 'fn.afim.base', name: 'A reta como função',
            topics: [
              { id: 'fn.af.definicao', name: 'Definição e coeficientes',
                requires: ['fn.co.representacoes', 'ge.an.reta'], track: 'funcoes', lesson: 'fu2',
                sub: ['f(x) = ax + b', 'coeficiente angular a', 'coeficiente linear b', 'função linear × afim', 'função constante'],
                goal: 'Identificar o que cada coeficiente faz com o gráfico antes de desenhá-lo.' },

              { id: 'fn.af.taxa', name: 'Taxa de variação',
                requires: ['fn.af.definicao', 'ge.an.inclinacao'],
                sub: ['Δy/Δx constante', 'interpretação em contexto', 'unidades da taxa', 'ponte com a derivada'],
                goal: 'Interpretar o coeficiente angular como taxa de variação com unidade — a primeira derivada da vida do aluno.' },

              { id: 'fn.af.raiz', name: 'Raiz, sinal e crescimento',
                requires: ['fn.af.taxa', 'al.ineq.primeiro'],
                sub: ['raiz x = −b/a', 'estudo do sinal', 'crescente se a > 0', 'decrescente se a < 0'],
                goal: 'Determinar raiz e sinal de uma função afim e relacioná-los ao gráfico.' },

              { id: 'fn.af.modelagem', name: 'Modelagem com função afim',
                requires: ['fn.af.raiz'],
                sub: ['custo fixo e custo variável', 'ponto de equilíbrio', 'conversão de unidades', 'ajuste de reta a dados'],
                goal: 'Montar o modelo afim de uma situação real e interpretar coeficientes no contexto.' }
            ]
          }
        ]
      },

      /* ═══════════ 4.3 Função quadrática ═══════════ */
      {
        id: 'fn.quadratica', name: 'Função quadrática',
        goal: 'Dominar a parábola: a primeira função com máximo e mínimo, e o primeiro problema de otimização.',
        units: [
          {
            id: 'fn.quadratica.base', name: 'A parábola',
            topics: [
              { id: 'fn.qu.definicao', name: 'Definição e concavidade',
                requires: ['fn.af.raiz', 'al.eq.segundo'], track: 'funcoes', lesson: 'fu3',
                sub: ['f(x) = ax² + bx + c', 'concavidade pelo sinal de a', 'efeito de c no gráfico', 'forma fatorada e canônica'],
                goal: 'Prever a forma da parábola a partir dos coeficientes, sem tabela de valores.' },

              { id: 'fn.qu.raizes', name: 'Raízes e discriminante',
                requires: ['fn.qu.definicao'],
                sub: ['Δ > 0: duas raízes', 'Δ = 0: uma raiz dupla', 'Δ < 0: nenhuma raiz real', 'interseção com o eixo x'],
                goal: 'Ler no discriminante quantas vezes a parábola cruza o eixo x.' },

              { id: 'fn.qu.vertice', name: 'Vértice, eixo de simetria e extremos',
                requires: ['fn.qu.raizes', 'al.fat.completar'],
                sub: ['x_v = −b/2a', 'y_v = −Δ/4a', 'eixo de simetria', 'máximo ou mínimo', 'forma canônica a(x−h)² + k'],
                goal: 'Achar o vértice por completar quadrado e reconhecê-lo como o ponto onde a derivada zera.' },

              { id: 'fn.qu.otimizacao', name: 'Problemas de máximo e mínimo',
                requires: ['fn.qu.vertice'],
                sub: ['área máxima com perímetro fixo', 'receita máxima', 'trajetória de projétil', 'restrições do domínio'],
                goal: 'Resolver otimização quadrática sem Cálculo — e reconhecer depois que a derivada generaliza isso.' },

              { id: 'fn.qu.inequacoes', name: 'Inequações do segundo grau',
                requires: ['fn.qu.raizes', 'al.ineq.compostas'],
                sub: ['estudo de sinal pela parábola', 'entre as raízes × fora das raízes', 'quadro de sinais', 'solução em intervalos'],
                goal: 'Resolver inequações quadráticas olhando o gráfico em vez de decorar casos.' }
            ]
          }
        ]
      },

      /* ═══════════ 4.4 Funções polinomiais ═══════════ */
      {
        id: 'fn.polinomiais', name: 'Funções polinomiais',
        goal: 'Prever o comportamento de polinômios de qualquer grau a partir das raízes e do termo dominante.',
        units: [
          {
            id: 'fn.polinomiais.base', name: 'Além do segundo grau',
            topics: [
              { id: 'fn.pl.grau', name: 'Grau e comportamento nas pontas',
                requires: ['fn.qu.definicao', 'al.pol.conceito'],
                sub: ['termo dominante', 'grau par × ímpar', 'sinal do coeficiente líder', 'comportamento quando x → ±∞'],
                goal: 'Determinar para onde o gráfico vai nas extremidades usando só o termo de maior grau.' },

              { id: 'fn.pl.raizes', name: 'Raízes e multiplicidade',
                requires: ['fn.pl.grau', 'al.pol.raizes'],
                sub: ['fatoração em fatores lineares', 'multiplicidade par: toca e volta', 'multiplicidade ímpar: atravessa', 'número máximo de raízes'],
                goal: 'Esboçar um polinômio a partir das raízes fatoradas e de suas multiplicidades.' },

              { id: 'fn.pl.esboco', name: 'Esboço de gráficos polinomiais',
                requires: ['fn.pl.raizes'],
                sub: ['zeros e sinal', 'número máximo de curvas', 'simetria par e ímpar', 'esboço qualitativo'],
                goal: 'Esboçar o gráfico qualitativo de um polinômio sem calcular derivada.' }
            ]
          }
        ]
      },

      /* ═══════════ 4.5 Funções racionais ═══════════ */
      {
        id: 'fn.racionais', name: 'Funções racionais',
        goal: 'Trabalhar com quocientes de polinômios — o terreno onde limites infinitos e assíntotas aparecem.',
        units: [
          {
            id: 'fn.racionais.base', name: 'Quociente de polinômios',
            topics: [
              { id: 'fn.ra.dominio', name: 'Domínio e restrições',
                requires: ['fn.pl.raizes', 'mb.fr.algebricas'],
                sub: ['denominador ≠ 0', 'zeros do denominador', 'simplificação e buraco no gráfico', 'domínio em notação de intervalo'],
                goal: 'Determinar o domínio e distinguir buraco removível de assíntota.' },

              { id: 'fn.ra.assintotas', name: 'Assíntotas',
                requires: ['fn.ra.dominio'],
                sub: ['assíntota vertical', 'assíntota horizontal', 'comparação de graus', 'assíntota oblíqua'],
                goal: 'Determinar assíntotas comparando os graus do numerador e do denominador.' },

              { id: 'fn.ra.comportamento', name: 'Comportamento e esboço',
                requires: ['fn.ra.assintotas'],
                sub: ['sinal em cada intervalo', 'aproximação das assíntotas', 'interseções com os eixos', 'esboço completo'],
                goal: 'Esboçar uma função racional combinando domínio, assíntotas e estudo de sinal.' }
            ]
          }
        ]
      },

      /* ═══════════ 4.6 Exponenciais ═══════════ */
      {
        id: 'fn.exponenciais', name: 'Funções exponenciais',
        goal: 'Entender crescimento multiplicativo — o modelo de juros, população, meia-vida e complexidade.',
        units: [
          {
            id: 'fn.exponenciais.base', name: 'Crescimento e decaimento',
            topics: [
              { id: 'fn.ex.definicao', name: 'Função exponencial',
                requires: ['mb.pot.fracionarios', 'fn.co.representacoes'], track: 'precalculo', lesson: 'pc1',
                sub: ['f(x) = aˣ com a > 0 e a ≠ 1', 'domínio e imagem', 'gráfico crescente e decrescente', 'valor em x = 0'],
                goal: 'Reconhecer o formato do gráfico exponencial e por que ele nunca toca o eixo x.' },

              { id: 'fn.ex.crescimento', name: 'Crescimento e decaimento',
                requires: ['fn.ex.definicao', 'mb.pc.sucessiva'],
                sub: ['fator de crescimento', 'meia-vida', 'tempo de duplicação', 'juros compostos', 'comparação com crescimento linear'],
                goal: 'Modelar situações de crescimento multiplicativo e comparar com o crescimento linear.' },

              { id: 'fn.ex.numeroE', name: 'O número e e a exponencial natural',
                requires: ['fn.ex.crescimento'],
                sub: ['e como limite de (1 + 1/n)ⁿ', 'juros contínuos', 'eˣ', 'por que e é a base natural'],
                goal: 'Entender e como o resultado de capitalização contínua — e por que ele domina o Cálculo.' },

              { id: 'fn.ex.equacoes', name: 'Equações exponenciais',
                requires: ['fn.ex.definicao'],
                sub: ['igualar as bases', 'substituição de variável', 'quando não dá para igualar', 'necessidade do logaritmo'],
                goal: 'Resolver equações exponenciais por igualdade de bases e reconhecer quando o logaritmo é inevitável.' }
            ]
          }
        ]
      },

      /* ═══════════ 4.7 Logaritmos ═══════════ */
      {
        id: 'fn.logaritmos', name: 'Logaritmos',
        goal: 'Usar o logaritmo como a operação que desce expoente — e como função inversa da exponencial.',
        units: [
          {
            id: 'fn.logaritmos.base', name: 'Logaritmo',
            topics: [
              { id: 'fn.lg.definicao', name: 'Definição de logaritmo',
                requires: ['fn.ex.equacoes'], track: 'precalculo', lesson: 'pc2',
                sub: ['log_a b = x ⟺ aˣ = b', 'o log é uma pergunta', 'condições de existência', 'log decimal e log natural'],
                goal: 'Ler log_a b como "a elevado a quanto dá b" e enunciar as condições de existência.' },

              { id: 'fn.lg.propriedades', name: 'Propriedades operatórias',
                requires: ['fn.lg.definicao'],
                sub: ['log do produto', 'log do quociente', 'log da potência', 'por que log(a+b) não simplifica'],
                goal: 'Aplicar as três propriedades e reconhecer de imediato a falsa propriedade da soma.' },

              { id: 'fn.lg.mudancaBase', name: 'Mudança de base',
                requires: ['fn.lg.propriedades'],
                sub: ['log_a b = log_c b / log_c a', 'calcular qualquer log com ln', 'consequências', 'uso em complexidade'],
                goal: 'Converter entre bases e calcular qualquer logaritmo a partir de ln.' },

              { id: 'fn.lg.funcao', name: 'Função logarítmica',
                requires: ['fn.lg.mudancaBase'],
                sub: ['gráfico', 'domínio x > 0', 'assíntota vertical em x = 0', 'inversa da exponencial', 'escala logarítmica'],
                goal: 'Reconhecer o gráfico logarítmico como a exponencial refletida na reta y = x.' },

              { id: 'fn.lg.equacoes', name: 'Equações e inequações logarítmicas',
                requires: ['fn.lg.funcao'],
                sub: ['igualar logaritmos', 'aplicar a definição', 'verificar a condição de existência', 'inequações e sentido do sinal'],
                goal: 'Resolver equações logarítmicas sempre verificando o domínio antes de aceitar a raiz.' }
            ]
          }
        ]
      },

      /* ═══════════ 4.8 e 4.9 Composição e inversa ═══════════ */
      {
        id: 'fn.operacoes', name: 'Composição e inversão',
        goal: 'Combinar funções e desfazê-las — a estrutura por trás da regra da cadeia e da substituição.',
        units: [
          {
            id: 'fn.operacoes.base', name: 'Operar com funções',
            topics: [
              { id: 'fn.op.algebra', name: 'Álgebra de funções',
                requires: ['fn.co.dominio'],
                sub: ['soma e diferença', 'produto e quociente', 'domínio da função resultante', 'restrições acumuladas'],
                goal: 'Somar, multiplicar e dividir funções cuidando do domínio resultante.' },

              { id: 'fn.op.composta', name: 'Função composta',
                requires: ['fn.op.algebra'],
                sub: ['(f∘g)(x) = f(g(x))', 'ordem importa', 'domínio da composta', 'decompor em funções simples'],
                goal: 'Compor e, principalmente, decompor: identificar a função de dentro e a de fora.' },

              { id: 'fn.op.inversa', name: 'Função inversa',
                requires: ['fn.op.composta'],
                sub: ['injetora e sobrejetora', 'bijetora', 'trocar x por y e isolar', 'simetria em relação a y = x', 'restringir domínio para inverter'],
                goal: 'Calcular a inversa e reconhecer no gráfico a simetria em relação à reta y = x.' }
            ]
          }
        ]
      },

      /* ═══════════ 4.10 Transformações ═══════════ */
      {
        id: 'fn.transformacoes', name: 'Transformações de gráficos',
        goal: 'Prever o gráfico de qualquer variação de uma função conhecida sem calcular um único ponto.',
        units: [
          {
            id: 'fn.transformacoes.base', name: 'Mover, refletir e esticar',
            topics: [
              { id: 'fn.tr.translacao', name: 'Translação',
                requires: ['fn.co.comportamento'],
                sub: ['f(x) + k sobe e desce', 'f(x − h) desloca na horizontal', 'por que o sinal parece invertido', 'composição de translações'],
                goal: 'Deslocar gráficos nas duas direções e explicar por que f(x − h) move para a direita.' },

              { id: 'fn.tr.reflexao', name: 'Reflexão',
                requires: ['fn.tr.translacao'],
                sub: ['−f(x): reflete no eixo x', 'f(−x): reflete no eixo y', 'função par e ímpar', 'simetrias'],
                goal: 'Refletir gráficos e usar paridade para reduzir trabalho de esboço.' },

              { id: 'fn.tr.escala', name: 'Compressão e expansão',
                requires: ['fn.tr.reflexao'],
                sub: ['a·f(x): estica na vertical', 'f(bx): comprime na horizontal', 'fator > 1 e entre 0 e 1', 'ordem das transformações'],
                goal: 'Aplicar transformações na ordem correta e prever o gráfico final.' },

              { id: 'fn.tr.laboratorio', name: 'Laboratório de funções',
                requires: ['fn.tr.escala'], lab: 'labFuncoes',
                sub: ['alterar parâmetros ao vivo', 'comparar com a função base', 'famílias de funções', 'previsão antes do desenho'],
                goal: 'Prever o efeito de cada parâmetro antes de mexer no controle — e conferir na hora.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
