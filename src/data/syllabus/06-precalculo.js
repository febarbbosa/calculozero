/* ==========================================================================
   data/syllabus/06-precalculo.js

   Pré-Cálculo não é "mais matemática": é a etapa em que o que já foi
   aprendido separado passa a ser usado junto e rápido. Quem chega em
   Cálculo I sem essa fluência não trava no conceito novo — trava na
   fatoração que estava no meio da conta.

   Por isso o módulo de consolidação não repete conteúdo: ele cobra o uso
   combinado. O que é genuinamente novo aqui são complexos, sequências,
   progressões, comportamento assintótico e a primeira ideia de limite.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'precalculo', n: 6,
    name: 'Pré-Cálculo',
    icon: '🧠',
    tagline: 'A ponte: onde tudo que você aprendeu passa a andar junto.',
    goal: 'Chegar em Cálculo I com fluência algébrica suficiente para que a única dificuldade seja o conceito novo.',
    requires: ['funcoes', 'trigonometria'],

    modules: [
      /* ═══════════ 6.1 Consolidação ═══════════ */
      {
        id: 'pc.consolidacao', name: 'Consolidação',
        goal: 'Usar álgebra, funções e trigonometria juntas e no tempo de uma prova.',
        units: [
          {
            id: 'pc.consolidacao.base', name: 'Fluência combinada',
            topics: [
              { id: 'pc.cs.algebra', name: 'Manipulação algébrica sob pressão',
                requires: ['al.fat.cubos', 'al.fat.completar', 'mb.rad.racionalizacao'],
                sub: ['fatorar rápido', 'racionalizar com conjugado', 'simplificar fração algébrica', 'reconhecer o produto notável escondido'],
                goal: 'Executar as manipulações que aparecem no meio de um limite sem precisar parar para pensar.' },

              { id: 'pc.cs.funcoes', name: 'Domínio, imagem e esboço rápido',
                requires: ['fn.ra.comportamento', 'fn.pl.esboco', 'fn.tr.escala'],
                sub: ['domínio de expressões compostas', 'esboço por transformação', 'identificar a família da função', 'previsão de comportamento'],
                goal: 'Determinar domínio e esboçar qualquer função das famílias estudadas em poucos segundos.' },

              { id: 'pc.cs.composicao', name: 'Composição e decomposição',
                requires: ['fn.op.composta', 'fn.op.inversa'],
                sub: ['identificar função de dentro e de fora', 'decompor em três camadas', 'inversa de composta', 'preparação para a regra da cadeia'],
                goal: 'Decompor h(x) em f(g(x)) automaticamente — a habilidade que a regra da cadeia vai cobrar.' },

              { id: 'pc.cs.trigonometria', name: 'Trigonometria operacional',
                requires: ['tg.id.duplo', 'tg.eq.identidades'],
                sub: ['valores notáveis de memória', 'reduzir ao primeiro quadrante', 'aplicar identidade certa', 'radianos por padrão'],
                goal: 'Trabalhar em radianos e aplicar identidades sem consultar tabela.' }
            ]
          }
        ]
      },

      /* ═══════════ 6.2 Números complexos ═══════════ */
      {
        id: 'pc.complexos', name: 'Números complexos',
        goal: 'Completar o sistema numérico — necessário para raízes de polinômios e para engenharia elétrica.',
        units: [
          {
            id: 'pc.complexos.base', name: 'Complexos',
            topics: [
              { id: 'pc.cx.definicao', name: 'A unidade imaginária',
                requires: ['al.eq.segundo', 'mb.num.reais'],
                sub: ['i² = −1', 'forma algébrica a + bi', 'parte real e imaginária', 'potências de i', 'por que foram inventados'],
                goal: 'Operar com i e reconhecer o padrão cíclico das potências de i.' },

              { id: 'pc.cx.operacoes', name: 'Operações com complexos',
                requires: ['pc.cx.definicao'],
                sub: ['soma e subtração', 'multiplicação', 'conjugado', 'divisão pelo conjugado', 'módulo'],
                goal: 'Dividir complexos multiplicando pelo conjugado — a mesma técnica da racionalização.' },

              { id: 'pc.cx.geometria', name: 'Plano de Argand-Gauss',
                requires: ['pc.cx.operacoes', 'ge.an.plano'],
                sub: ['representação no plano', 'módulo como distância', 'argumento', 'forma trigonométrica', 'forma de Euler'],
                goal: 'Ver o complexo como vetor no plano e a multiplicação como rotação com escala.' },

              { id: 'pc.cx.raizes', name: 'Raízes e teorema fundamental',
                requires: ['pc.cx.geometria', 'al.pol.raizes'],
                sub: ['fórmula de De Moivre', 'raízes n-ésimas', 'raízes complexas conjugadas', 'todo polinômio de grau n tem n raízes'],
                goal: 'Extrair raízes n-ésimas e entender por que raízes complexas aparecem sempre aos pares.' }
            ]
          }
        ]
      },

      /* ═══════════ 6.3 Sequências e progressões ═══════════ */
      {
        id: 'pc.sequencias', name: 'Sequências e progressões',
        goal: 'Trabalhar com listas infinitas de números — o objeto que a definição de limite usa primeiro.',
        units: [
          {
            id: 'pc.sequencias.base', name: 'Sequências',
            topics: [
              { id: 'pc.sq.conceito', name: 'Sequência numérica',
                requires: ['fn.co.maquina'],
                sub: ['termo geral aₙ', 'sequência como função de ℕ', 'lei de recorrência', 'crescente e decrescente', 'limitada'],
                goal: 'Escrever o termo geral de uma sequência e reconhecê-la como função de domínio ℕ.' },

              { id: 'pc.sq.pa', name: 'Progressão aritmética',
                requires: ['pc.sq.conceito', 'fn.af.taxa'],
                sub: ['razão constante', 'aₙ = a₁ + (n−1)r', 'soma dos n primeiros termos', 'PA como função afim discreta'],
                goal: 'Reconhecer a PA como o análogo discreto da função afim e somar seus termos.' },

              { id: 'pc.sq.pg', name: 'Progressão geométrica',
                requires: ['pc.sq.pa', 'fn.ex.crescimento'],
                sub: ['razão multiplicativa', 'aₙ = a₁·qⁿ⁻¹', 'soma dos n primeiros termos', 'PG como exponencial discreta'],
                goal: 'Reconhecer a PG como o análogo discreto da exponencial e somar seus termos.' },

              { id: 'pc.sq.convergencia', name: 'Soma infinita e convergência',
                requires: ['pc.sq.pg'],
                sub: ['PG infinita com |q| < 1', 'S = a₁/(1 − q)', 'dízima periódica como PG', 'primeira ideia de convergência'],
                goal: 'Somar infinitos termos quando a razão é menor que 1 — o primeiro infinito que dá número finito.' }
            ]
          }
        ]
      },

      /* ═══════════ 6.4 Comportamento e limites ═══════════ */
      {
        id: 'pc.limites', name: 'Comportamento assintótico e ideia de limite',
        goal: 'Chegar em Cálculo I já sabendo o que significa "chegar perto sem tocar".',
        units: [
          {
            id: 'pc.limites.base', name: 'Antes do limite formal',
            topics: [
              { id: 'pc.lm.crescimento', name: 'Comparação de crescimento',
                requires: ['fn.ex.definicao', 'fn.lg.funcao', 'fn.pl.grau'],
                sub: ['logarítmico × linear × polinomial × exponencial', 'quem domina no infinito', 'gráficos em escala', 'aplicação em complexidade'],
                goal: 'Ordenar famílias de funções por velocidade de crescimento — o mesmo raciocínio de notação O grande.' },

              { id: 'pc.lm.assintotico', name: 'Comportamento assintótico',
                requires: ['pc.lm.crescimento', 'fn.ra.assintotas'],
                sub: ['tendência quando x → ∞', 'termo dominante', 'assíntotas revisitadas', 'aproximação para valores grandes'],
                goal: 'Prever o comportamento de uma expressão para valores grandes olhando só o termo dominante.' },

              { id: 'pc.lm.intuicao', name: 'Ideia intuitiva de limite',
                requires: ['pc.lm.assintotico', 'pc.sq.convergencia'],
                sub: ['aproximação por tabela', 'chegar perto pelos dois lados', 'buraco no gráfico', 'quando o valor não existe mas o limite sim'],
                goal: 'Estimar um limite numericamente e explicar por que o valor da função no ponto é irrelevante.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
