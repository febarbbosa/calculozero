/* ==========================================================================
   data/syllabus/03-geometria.js

   Geometria entra no currículo por dois motivos práticos. Primeiro, é ela
   que dá significado visual à álgebra: coeficiente angular é inclinação,
   raiz é interseção com o eixo, integral é área. Segundo, é o terreno da
   trigonometria — que é pré-requisito direto de Cálculo.

   A ordem vai do concreto (figura desenhada) ao abstrato (figura descrita
   por equação), porque geometria analítica sem geometria plana vira
   fórmula solta.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.syllabus.register({
    id: 'geometria', n: 3,
    name: 'Geometria',
    icon: '📐',
    tagline: 'Onde a álgebra ganha desenho e a fórmula ganha sentido.',
    goal: 'Calcular medidas de figuras planas e espaciais e descrever objetos geométricos por equações no plano cartesiano.',
    requires: ['mat-basica', 'algebra'],

    modules: [
      /* ═══════════ 3.1 Geometria plana ═══════════ */
      {
        id: 'ge.plana', name: 'Geometria plana',
        goal: 'Reconhecer e relacionar os objetos básicos do plano: ponto, reta, ângulo e as figuras que eles formam.',
        units: [
          {
            id: 'ge.plana.entes', name: 'Entes fundamentais e ângulos',
            topics: [
              { id: 'ge.pl.entes', name: 'Ponto, reta e plano',
                requires: [],
                sub: ['noções primitivas', 'reta, semirreta e segmento', 'posições relativas entre retas', 'paralelas e concorrentes'],
                goal: 'Usar o vocabulário geométrico com precisão e classificar posições relativas entre retas.' },

              { id: 'ge.pl.angulos', name: 'Ângulos',
                requires: ['ge.pl.entes'],
                sub: ['medida em graus', 'agudo, reto, obtuso e raso', 'complementares e suplementares', 'opostos pelo vértice', 'ângulos em retas paralelas cortadas por transversal'],
                goal: 'Calcular ângulos desconhecidos usando as relações de paralelismo e de complementaridade.' }
            ]
          },
          {
            id: 'ge.plana.figuras', name: 'Polígonos e circunferência',
            topics: [
              { id: 'ge.pl.poligonos', name: 'Polígonos',
                requires: ['ge.pl.angulos'],
                sub: ['classificação por número de lados', 'convexo e não convexo', 'soma dos ângulos internos', 'ângulos externos', 'diagonais'],
                goal: 'Calcular soma de ângulos internos e número de diagonais de qualquer polígono.' },

              { id: 'ge.pl.quadrilateros', name: 'Quadriláteros',
                requires: ['ge.pl.poligonos'],
                sub: ['paralelogramo', 'retângulo', 'losango', 'quadrado', 'trapézio', 'propriedades das diagonais'],
                goal: 'Distinguir os quadriláteros pelas propriedades de lados, ângulos e diagonais.' },

              { id: 'ge.pl.circunferencia', name: 'Circunferência e círculo',
                requires: ['ge.pl.angulos'],
                sub: ['centro e raio', 'corda, diâmetro e arco', 'ângulo central e inscrito', 'tangente e secante', 'posições relativas'],
                goal: 'Relacionar ângulo central e ângulo inscrito e reconhecer a perpendicularidade da tangente ao raio.' }
            ]
          }
        ]
      },

      /* ═══════════ 3.2 Medidas ═══════════ */
      {
        id: 'ge.medidas', name: 'Medidas',
        goal: 'Calcular perímetro, área e volume e entender por que cada fórmula tem a forma que tem.',
        units: [
          {
            id: 'ge.medidas.plana', name: 'Perímetro e área',
            topics: [
              { id: 'ge.med.perimetro', name: 'Perímetro e comprimento',
                requires: ['ge.pl.poligonos', 'mb.gr.comprimento'],
                sub: ['perímetro de polígonos', 'comprimento da circunferência', 'π como razão', 'comprimento de arco'],
                goal: 'Calcular contornos, inclusive de arcos, entendendo π como a razão entre circunferência e diâmetro.' },

              { id: 'ge.med.area', name: 'Área de figuras planas',
                requires: ['ge.med.perimetro'],
                sub: ['retângulo e quadrado', 'triângulo', 'paralelogramo e trapézio', 'losango', 'círculo e setor circular', 'decomposição de figuras'],
                goal: 'Calcular área por decomposição e justificar cada fórmula a partir da área do retângulo.' }
            ]
          },
          {
            id: 'ge.medidas.espacial', name: 'Volume',
            topics: [
              { id: 'ge.med.volume', name: 'Volume e capacidade',
                requires: ['ge.med.area'],
                sub: ['volume como área da base × altura', 'unidades de volume e capacidade', 'volume por decomposição', 'princípio de Cavalieri'],
                goal: 'Enxergar volume como empilhamento de áreas — a mesma ideia que gera a integral de sólidos.' }
            ]
          }
        ]
      },

      /* ═══════════ 3.3 Triângulos ═══════════ */
      {
        id: 'ge.triangulos', name: 'Triângulos',
        goal: 'Dominar o triângulo, que é a peça de onde saem semelhança, Pitágoras e toda a trigonometria.',
        units: [
          {
            id: 'ge.triangulos.base', name: 'Classificação e relações',
            topics: [
              { id: 'ge.tri.classificacao', name: 'Classificação de triângulos',
                requires: ['ge.pl.angulos'],
                sub: ['quanto aos lados', 'quanto aos ângulos', 'soma dos ângulos internos = 180°', 'desigualdade triangular', 'cevianas'],
                goal: 'Classificar triângulos e decidir se três medidas dadas podem formar um.' },

              { id: 'ge.tri.congruencia', name: 'Congruência',
                requires: ['ge.tri.classificacao'],
                sub: ['LLL', 'LAL', 'ALA', 'LAAo', 'caso especial do triângulo retângulo'],
                goal: 'Provar que dois triângulos são congruentes escolhendo o caso adequado.' },

              { id: 'ge.tri.semelhanca', name: 'Semelhança',
                requires: ['ge.tri.congruencia', 'mb.rp.proporcao'],
                sub: ['razão de semelhança', 'caso AA', 'teorema de Tales', 'razão entre áreas', 'aplicação em sombras e mapas'],
                goal: 'Usar semelhança para achar medidas inacessíveis e saber que a razão entre áreas é o quadrado da razão de semelhança.' },

              { id: 'ge.tri.pitagoras', name: 'Teorema de Pitágoras',
                requires: ['ge.tri.semelhanca', 'mb.rad.conceito'],
                sub: ['a² = b² + c²', 'demonstração por semelhança', 'relações métricas no triângulo retângulo', 'ternos pitagóricos', 'recíproca'],
                goal: 'Aplicar Pitágoras e reconhecê-lo por trás da distância entre pontos e do módulo de um vetor.' }
            ]
          }
        ]
      },

      /* ═══════════ 3.4 Geometria espacial ═══════════ */
      {
        id: 'ge.espacial', name: 'Geometria espacial',
        goal: 'Calcular área e volume dos sólidos que aparecem em problemas de otimização e de integrais.',
        units: [
          {
            id: 'ge.espacial.poliedros', name: 'Poliedros',
            topics: [
              { id: 'ge.esp.prismas', name: 'Prismas',
                requires: ['ge.med.volume'],
                sub: ['elementos do prisma', 'área lateral e total', 'volume = área da base × altura', 'cubo e paralelepípedo', 'diagonal do paralelepípedo'],
                goal: 'Calcular área e volume de prismas quaisquer a partir da base.' },

              { id: 'ge.esp.piramides', name: 'Pirâmides',
                requires: ['ge.esp.prismas'],
                sub: ['elementos', 'apótema', 'área lateral', 'volume = (1/3)·área da base·altura', 'tetraedro'],
                goal: 'Calcular volume de pirâmides e entender de onde vem o fator 1/3.' },

              { id: 'ge.esp.euler', name: 'Relação de Euler',
                requires: ['ge.esp.piramides'],
                sub: ['V − A + F = 2', 'poliedros convexos', 'poliedros de Platão', 'verificação'],
                goal: 'Verificar a consistência de um poliedro convexo pela relação de Euler.' }
            ]
          },
          {
            id: 'ge.espacial.redondos', name: 'Corpos redondos',
            topics: [
              { id: 'ge.esp.cilindro', name: 'Cilindro',
                requires: ['ge.esp.prismas'],
                sub: ['planificação', 'área lateral 2πrh', 'área total', 'volume πr²h', 'cilindro equilátero'],
                goal: 'Deduzir a área lateral do cilindro pela planificação, sem decorar a fórmula.' },

              { id: 'ge.esp.cone', name: 'Cone',
                requires: ['ge.esp.cilindro', 'ge.tri.pitagoras'],
                sub: ['geratriz', 'relação g² = h² + r²', 'área lateral πrg', 'volume (1/3)πr²h', 'tronco de cone'],
                goal: 'Relacionar raio, altura e geratriz por Pitágoras e calcular área e volume.' },

              { id: 'ge.esp.esfera', name: 'Esfera',
                requires: ['ge.esp.cone'],
                sub: ['área 4πr²', 'volume (4/3)πr³', 'secção plana', 'fuso e cunha'],
                goal: 'Calcular área e volume da esfera e de secções — resultados que a integral reobtém depois.' }
            ]
          }
        ]
      },

      /* ═══════════ 3.5 Geometria analítica ═══════════ */
      {
        id: 'ge.analitica', name: 'Geometria analítica',
        goal: 'Traduzir figuras em equações — a ponte direta entre geometria e o estudo de funções.',
        units: [
          {
            id: 'ge.analitica.plano', name: 'O plano cartesiano',
            topics: [
              { id: 'ge.an.plano', name: 'Plano cartesiano',
                requires: ['mb.num.reta'],
                sub: ['eixos e origem', 'par ordenado', 'quadrantes', 'sinal das coordenadas', 'localização de pontos'],
                goal: 'Localizar pontos e ler sinais de coordenadas por quadrante sem hesitar.' },

              { id: 'ge.an.distancia', name: 'Distância entre pontos',
                requires: ['ge.an.plano', 'ge.tri.pitagoras'],
                sub: ['d = √((x₂−x₁)² + (y₂−y₁)²)', 'Pitágoras disfarçado', 'distância em R³', 'ligação com módulo de vetor'],
                goal: 'Calcular distância entre pontos reconhecendo que a fórmula é Pitágoras aplicado aos catetos horizontais e verticais.' },

              { id: 'ge.an.medio', name: 'Ponto médio e baricentro',
                requires: ['ge.an.distancia'],
                sub: ['média das coordenadas', 'ponto médio de um segmento', 'baricentro do triângulo', 'divisão de segmento em razão dada'],
                goal: 'Calcular ponto médio e baricentro como médias de coordenadas.' }
            ]
          },
          {
            id: 'ge.analitica.reta', name: 'A reta',
            topics: [
              { id: 'ge.an.inclinacao', name: 'Inclinação e coeficiente angular',
                requires: ['ge.an.medio'],
                sub: ['m = Δy/Δx', 'subida sobre avanço', 'sinal do coeficiente', 'reta vertical', 'ligação com tangente do ângulo'],
                goal: 'Calcular e interpretar o coeficiente angular — que é a derivada da função afim.' },

              { id: 'ge.an.reta', name: 'Equação da reta',
                requires: ['ge.an.inclinacao'],
                sub: ['forma reduzida y = mx + n', 'forma geral ax + by + c = 0', 'equação por ponto e inclinação', 'reta por dois pontos'],
                goal: 'Escrever a equação de uma reta a partir de dois pontos ou de um ponto e a inclinação.' },

              { id: 'ge.an.posicoes', name: 'Paralelismo e perpendicularidade',
                requires: ['ge.an.reta'],
                sub: ['paralelas: m₁ = m₂', 'perpendiculares: m₁·m₂ = −1', 'interseção de retas', 'ângulo entre retas'],
                goal: 'Decidir a posição relativa de duas retas pelos coeficientes angulares.' },

              { id: 'ge.an.pontoReta', name: 'Distância de ponto a reta',
                requires: ['ge.an.posicoes'],
                sub: ['fórmula |ax₀ + by₀ + c| / √(a² + b²)', 'interpretação como menor distância', 'distância entre paralelas', 'aplicação em otimização'],
                goal: 'Calcular a menor distância de um ponto a uma reta e interpretá-la geometricamente.' },

              { id: 'ge.an.circunferencia', name: 'Equação da circunferência',
                requires: ['ge.an.distancia', 'al.fat.completar'],
                sub: ['(x − a)² + (y − b)² = r²', 'forma geral', 'completar quadrado para achar centro e raio', 'posição de ponto em relação à circunferência'],
                goal: 'Passar da forma geral para a reduzida completando quadrado e identificar centro e raio.' }
            ]
          }
        ]
      }
    ]
  });
})(window.CZ);
