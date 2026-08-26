/* ==========================================================================
   data/syllabus/05-trigonometria.js

   Trigonometria começa como razão entre lados de um triângulo e termina
   como função periódica. Essa mudança de estatuto é o ponto que a maioria
   dos alunos não faz, e é por isso que sen(x) em Cálculo parece um objeto
   estranho: ele nunca deixou de ser "cateto oposto sobre hipotenusa" na
   cabeça de quem aprendeu só a primeira metade.

   O módulo do círculo trigonométrico é a ponte, e o laboratório existe
   para mostrar as duas leituras na mesma tela.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'trigonometria', n: 5,
    name: 'Trigonometria',
    icon: '◯',
    tagline: 'Do triângulo à onda: a matemática de tudo que se repete.',
    goal: 'Calcular com razões trigonométricas, ler o círculo trigonométrico e tratar seno e cosseno como funções periódicas.',
    requires: ['geometria', 'funcoes'],

    modules: [
      /* ═══════════ 5.1 Fundamentos ═══════════ */
      {
        id: 'tg.fundamentos', name: 'Ângulos e medidas',
        goal: 'Medir ângulos nas duas unidades e converter sem hesitar — Cálculo trabalha em radianos.',
        units: [
          {
            id: 'tg.fundamentos.base', name: 'Graus e radianos',
            topics: [
              { id: 'tg.fu.angulos', name: 'Ângulos e arcos',
                requires: ['ge.pl.angulos', 'ge.pl.circunferencia'],
                sub: ['ângulo central e arco', 'sentido positivo e negativo', 'arcos côngruos', 'volta completa'],
                goal: 'Relacionar ângulo central e arco e identificar arcos côngruos.' },

              { id: 'tg.fu.radianos', name: 'Radiano',
                requires: ['tg.fu.angulos', 'ge.med.perimetro'],
                sub: ['radiano como arco igual ao raio', '2π rad = 360°', 'por que radiano é adimensional', 'ângulos notáveis em radianos'],
                goal: 'Entender o radiano como razão entre arco e raio, e não como "outra escala qualquer".' },

              { id: 'tg.fu.conversao', name: 'Conversão entre unidades',
                requires: ['tg.fu.radianos', 'mb.rp.regra3'],
                sub: ['regra de três com 180° = π rad', 'converter nos dois sentidos', 'valores notáveis', 'erro de usar grau em Cálculo'],
                goal: 'Converter graus e radianos automaticamente e saber por que as fórmulas de derivada exigem radianos.' }
            ]
          }
        ]
      },

      /* ═══════════ 5.2 Triângulo retângulo ═══════════ */
      {
        id: 'tg.triangulo', name: 'Trigonometria no triângulo retângulo',
        goal: 'Calcular lados e ângulos inacessíveis a partir das três razões básicas.',
        units: [
          {
            id: 'tg.triangulo.base', name: 'As razões',
            topics: [
              { id: 'tg.tr.razoes', name: 'Seno, cosseno e tangente',
                requires: ['ge.tri.pitagoras', 'ge.tri.semelhanca'],
                sub: ['cateto oposto e adjacente', 'sen = op/hip', 'cos = adj/hip', 'tan = op/adj', 'por que a razão só depende do ângulo'],
                goal: 'Definir as três razões e justificar por que elas dependem só do ângulo, via semelhança.' },

              { id: 'tg.tr.notaveis', name: 'Ângulos notáveis',
                requires: ['tg.tr.razoes'],
                sub: ['30°, 45° e 60°', 'dedução pelo quadrado e pelo triângulo equilátero', 'tabela dos notáveis', 'memorização por padrão'],
                goal: 'Reconstruir a tabela dos ângulos notáveis a partir de duas figuras, sem decorar.' },

              { id: 'tg.tr.aplicacoes', name: 'Aplicações no triângulo retângulo',
                requires: ['tg.tr.notaveis'],
                sub: ['altura inacessível', 'ângulo de elevação e depressão', 'rampa e inclinação', 'decomposição de forças'],
                goal: 'Resolver problemas de altura, distância e inclinação escolhendo a razão adequada.' },

              { id: 'tg.tr.leis', name: 'Lei dos senos e lei dos cossenos',
                requires: ['tg.tr.aplicacoes'],
                sub: ['lei dos senos', 'lei dos cossenos', 'triângulo qualquer', 'Pitágoras como caso particular', 'área do triângulo por seno'],
                goal: 'Resolver triângulos não retângulos e reconhecer Pitágoras dentro da lei dos cossenos.' }
            ]
          }
        ]
      },

      /* ═══════════ 5.3 Círculo trigonométrico ═══════════ */
      {
        id: 'tg.circulo', name: 'Círculo trigonométrico',
        goal: 'Estender seno e cosseno para qualquer ângulo — a passagem de razão para função.',
        units: [
          {
            id: 'tg.circulo.base', name: 'A circunferência unitária',
            topics: [
              { id: 'tg.ci.definicao', name: 'A circunferência unitária',
                requires: ['tg.tr.notaveis', 'ge.an.circunferencia'],
                sub: ['raio 1 centrado na origem', 'cos como abscissa', 'sen como ordenada', 'identidade sen² + cos² = 1 como Pitágoras'],
                goal: 'Ler cosseno e seno como as coordenadas do ponto no círculo — a definição que vale para qualquer ângulo.' },

              { id: 'tg.ci.quadrantes', name: 'Quadrantes e sinais',
                requires: ['tg.ci.definicao'],
                sub: ['sinal de sen e cos por quadrante', 'ângulos maiores que 360°', 'ângulos negativos', 'redução ao primeiro quadrante'],
                goal: 'Determinar o sinal e o valor de qualquer ângulo reduzindo ao primeiro quadrante.' },

              { id: 'tg.ci.tangente', name: 'Tangente no círculo',
                requires: ['tg.ci.quadrantes'],
                sub: ['tan = sen/cos', 'eixo das tangentes', 'onde a tangente não existe', 'período π'],
                goal: 'Entender por que a tangente explode em 90° e por que o período dela é π, não 2π.' },

              { id: 'tg.ci.laboratorio', name: 'Laboratório do círculo trigonométrico',
                requires: ['tg.ci.tangente'], lab: 'labTrig',
                sub: ['girar o ângulo e ver as coordenadas', 'desenrolar o círculo no gráfico', 'relação círculo ↔ onda', 'valores notáveis ao vivo'],
                goal: 'Ver a onda nascer do giro: a mesma informação em duas representações simultâneas.' }
            ]
          }
        ]
      },

      /* ═══════════ 5.4 Funções trigonométricas ═══════════ */
      {
        id: 'tg.funcoes', name: 'Funções trigonométricas',
        goal: 'Tratar seno e cosseno como funções: domínio, período, amplitude e transformações.',
        units: [
          {
            id: 'tg.funcoes.base', name: 'Gráficos e parâmetros',
            topics: [
              { id: 'tg.fn.graficos', name: 'Gráficos de seno e cosseno',
                requires: ['tg.ci.laboratorio', 'fn.co.comportamento'],
                sub: ['senoide', 'domínio e imagem', 'período 2π', 'zeros e extremos', 'cosseno como seno deslocado'],
                goal: 'Esboçar seno e cosseno de memória, marcando zeros, máximos e mínimos.' },

              { id: 'tg.fn.parametros', name: 'Amplitude, período e fase',
                requires: ['tg.fn.graficos', 'fn.tr.escala'],
                sub: ['A·sen(Bx + C) + D', 'amplitude |A|', 'período 2π/|B|', 'defasagem −C/B', 'deslocamento vertical D'],
                goal: 'Ler os quatro parâmetros de uma senoide e desenhar o gráfico direto da fórmula.' },

              { id: 'tg.fn.outras', name: 'Tangente, secante, cossecante e cotangente',
                requires: ['tg.fn.parametros'],
                sub: ['gráfico da tangente', 'assíntotas verticais', 'funções recíprocas', 'domínios restritos'],
                goal: 'Reconhecer os gráficos das demais funções trigonométricas e seus domínios.' },

              { id: 'tg.fn.inversas', name: 'Funções trigonométricas inversas',
                requires: ['tg.fn.outras', 'fn.op.inversa'],
                sub: ['arcsen, arccos, arctan', 'restrição de domínio para inverter', 'imagem de cada uma', 'uso na calculadora'],
                goal: 'Usar as inversas sabendo exatamente qual intervalo de resposta cada uma devolve.' }
            ]
          }
        ]
      },

      /* ═══════════ 5.5 Identidades ═══════════ */
      {
        id: 'tg.identidades', name: 'Identidades trigonométricas',
        goal: 'Transformar expressões trigonométricas — manipulação exigida em integrais e em física ondulatória.',
        units: [
          {
            id: 'tg.identidades.base', name: 'As identidades que importam',
            topics: [
              { id: 'tg.id.fundamental', name: 'Identidade fundamental e derivadas dela',
                requires: ['tg.ci.definicao'],
                sub: ['sen²x + cos²x = 1', '1 + tan²x = sec²x', '1 + cot²x = csc²x', 'dedução por divisão'],
                goal: 'Deduzir as três identidades pitagóricas a partir de uma só.' },

              { id: 'tg.id.soma', name: 'Soma e diferença de arcos',
                requires: ['tg.id.fundamental'],
                sub: ['sen(a ± b)', 'cos(a ± b)', 'tan(a ± b)', 'sinais que trocam', 'uso para valores não notáveis'],
                goal: 'Calcular seno e cosseno de ângulos como 75° combinando notáveis.' },

              { id: 'tg.id.duplo', name: 'Arco duplo e arco metade',
                requires: ['tg.id.soma'],
                sub: ['sen 2a = 2 sen a cos a', 'cos 2a nas três formas', 'fórmulas de meio ângulo', 'redução de potência'],
                goal: 'Aplicar arco duplo nos dois sentidos, inclusive para baixar o expoente de sen² e cos².' },

              { id: 'tg.id.transformacao', name: 'Transformação em produto',
                requires: ['tg.id.duplo'],
                sub: ['prostaférese', 'soma em produto', 'produto em soma', 'batimento de ondas'],
                goal: 'Converter soma de senoides em produto — o cálculo por trás do batimento sonoro.' }
            ]
          }
        ]
      },

      /* ═══════════ 5.6 Equações ═══════════ */
      {
        id: 'tg.equacoes', name: 'Equações trigonométricas',
        goal: 'Resolver equações periódicas descrevendo todas as soluções, não apenas uma.',
        units: [
          {
            id: 'tg.equacoes.base', name: 'Resolver e generalizar',
            topics: [
              { id: 'tg.eq.basicas', name: 'Equações elementares',
                requires: ['tg.ci.quadrantes', 'tg.fn.inversas'],
                sub: ['sen x = k', 'cos x = k', 'tan x = k', 'soluções no intervalo dado', 'quando não há solução'],
                goal: 'Encontrar todas as soluções de uma equação elementar num intervalo pedido.' },

              { id: 'tg.eq.periodicidade', name: 'Solução geral e periodicidade',
                requires: ['tg.eq.basicas'],
                sub: ['x = x₀ + 2kπ', 'famílias de soluções', 'período de cada função', 'k inteiro'],
                goal: 'Escrever a solução geral com o parâmetro inteiro correto para cada função.' },

              { id: 'tg.eq.identidades', name: 'Equações que exigem identidade',
                requires: ['tg.eq.periodicidade', 'tg.id.duplo'],
                sub: ['reduzir a uma única função', 'substituição', 'equação quadrática em sen x', 'verificar soluções estranhas'],
                goal: 'Transformar equações mistas em uma equação de uma só função trigonométrica.' }
            ]
          }
        ]
      },

      /* ═══════════ 5.7 Aplicações ═══════════ */
      {
        id: 'tg.aplicacoes', name: 'Aplicações',
        goal: 'Modelar fenômenos periódicos — o motivo pelo qual trigonometria é obrigatória em engenharia.',
        units: [
          {
            id: 'tg.aplicacoes.base', name: 'Fenômenos periódicos',
            topics: [
              { id: 'tg.ap.ondas', name: 'Ondas e sinais',
                requires: ['tg.fn.parametros'],
                sub: ['amplitude, frequência e fase', 'período × frequência', 'som e luz', 'superposição', 'noção de série de Fourier'],
                goal: 'Ler os parâmetros de uma onda a partir do gráfico e da fórmula.' },

              { id: 'tg.ap.movimento', name: 'Movimento circular e harmônico',
                requires: ['tg.ap.ondas', 'tg.ci.laboratorio'],
                sub: ['MCU projetado num eixo', 'movimento harmônico simples', 'pêndulo', 'velocidade angular'],
                goal: 'Reconhecer o MHS como a projeção de um movimento circular — o mesmo círculo do laboratório.' },

              { id: 'tg.ap.engenharia', name: 'Aplicações em engenharia e computação',
                requires: ['tg.ap.movimento'],
                sub: ['decomposição de vetores', 'corrente alternada', 'rotação de coordenadas', 'síntese de áudio', 'animação e interpolação'],
                goal: 'Aplicar trigonometria em rotação e decomposição — o uso mais frequente em computação gráfica.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
