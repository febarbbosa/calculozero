/* ==========================================================================
   data/lessons-vectors.js — trilha de vetores.

   Conteúdo alinhado com a disciplina Física das Variações: vetores
   geométricos, algébricos, produto escalar, vetorial, misto, combinação
   linear e base.

   Este arquivo não conhece o módulo de cálculo e vice-versa — os dois se
   registram no mesmo banco por CZ.lessons.register().
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const LESSONS = [

    /* ═══════════════ VETORES GEOMÉTRICOS ═══════════════ */
    {
      id: 'vg1', topic: 'vetores-geo', title: 'O que um vetor realmente é',
      why: 'Vetor é o objeto que carrega direção. Sem ele não dá para falar de força, velocidade ou campo.',
      whyByArea: {
        compe: 'Posição de sprite, direção de raio em renderização, gradiente de rede neural — tudo é vetor. A GPU inteira é feita para multiplicar vetor rápido.',
        fisica: 'Força, velocidade e aceleração são vetores. Somar errado é a origem de metade dos erros em mecânica.'
      },
      steps: [
        { kind: 'contexto', html: `
          <p>"Ande 5 metros." Para onde?</p>
          <p>Alguns números precisam de direção para significar alguma coisa. Temperatura não precisa — 20°C é 20°C. Deslocamento precisa.</p>
          <p>Números que precisam de direção são <strong>vetores</strong>. Os que não precisam são <strong>escalares</strong>.</p>`,
          alt: {
            cotidiano: 'GPS: "2 km" é inútil. "2 km ao norte" resolve. A segunda informação é um vetor.',
            simples: 'Escalar = só tamanho. Vetor = tamanho + direção + sentido.'
          }
        },
        { kind: 'explicacao', html: `
          <p>No papel, um vetor é uma <strong>seta</strong>. Ela carrega três coisas:</p>
          <ul>
            <li><strong>Módulo</strong> — o comprimento da seta (escreve-se <span class="math">|v|</span>)</li>
            <li><strong>Direção</strong> — a reta sobre a qual ela está (horizontal, vertical, 30°...)</li>
            <li><strong>Sentido</strong> — para que lado da reta ela aponta</li>
          </ul>
          <p>Direção e sentido não são a mesma coisa, e a prova cobra isso: <span class="math">v</span> e <span class="math">−v</span> têm a <em>mesma direção</em> e <em>sentidos opostos</em>.</p>
          <p>E o detalhe que confunde: um vetor <strong>não tem posição fixa</strong>. Duas setas iguais e paralelas, em cantos diferentes da folha, são o mesmo vetor.</p>`,
          alt: {
            visual: 'Direção é a rua. Sentido é para qual ponta da rua você anda. Módulo é quantos metros.',
            passos: '1) Meça o comprimento → módulo. 2) Veja a inclinação da reta → direção. 3) Veja a ponta da flecha → sentido.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Num quadriculado, se <span class="math">AB</span> e <span class="math">NE</span> são setas do mesmo tamanho, paralelas e apontando para o mesmo lado, então:</p>
          <div class="math-block">AB = NE</div>
          <p>São o mesmo vetor, apesar de estarem em lugares diferentes. É exatamente o tipo de questão V ou F da Lista 01-A.</p>
          <p>Já <span class="math">KO = −NM</span> significa: mesmo tamanho, mesma direção, sentido contrário.</p>`,
          alt: { outro: 'Se KP tem o dobro do comprimento de GH e aponta para o mesmo lado, então KP = 2·GH.' }
        },
        { kind: 'visual', html: `<p>Arraste as pontas e observe módulo, direção e sentido mudando.</p>`,
          viz: { type: 'vetorSoma' } },
        { kind: 'guiado',  exercise: 'vg-g1' },
        { kind: 'sozinho', exercise: 'vg-s1' },
        { kind: 'revisao', html: `
          <p>Vetor = módulo + direção + sentido. Ele não tem endereço fixo: setas paralelas, de mesmo tamanho e mesmo sentido são iguais. E <span class="math">−v</span> só inverte o sentido.</p>` }
      ]
    },

    {
      id: 'vg2', topic: 'vetores-geo', title: 'Somar vetores sem coordenada',
      why: 'A Lista 01-B é inteira sobre força resultante. Isso é soma de vetores com régua e trigonometria.',
      steps: [
        { kind: 'contexto', html: `
          <p>Duas pessoas puxam uma argola: uma com 200 N, outra com 500 N, em direções diferentes.</p>
          <p>A argola não sente 700 N. Ela sente a <strong>resultante</strong> — e ela é sempre menor que a soma, a menos que as forças estejam perfeitamente alinhadas.</p>`,
          alt: { cotidiano: 'Dois cachorros puxando a mesma coleira para lados diferentes. A coleira vai para um terceiro lugar.' }
        },
        { kind: 'explicacao', html: `
          <p>Dois métodos, mesmo resultado:</p>
          <p><strong>Ponta com origem:</strong> desenhe o segundo vetor começando onde o primeiro termina. A resultante vai da origem do primeiro até a ponta do segundo.</p>
          <p><strong>Paralelogramo:</strong> coloque os dois saindo do mesmo ponto, feche o paralelogramo. A resultante é a diagonal.</p>
          <p>Para o módulo, quando o ângulo entre eles é <span class="math">θ</span>:</p>
          <div class="math-block">|R|² = |u|² + |v|² + 2·|u|·|v|·cos θ</div>
          <p>Repare: se θ = 90°, o cosseno some e sobra Pitágoras.</p>`,
          alt: {
            visual: 'Ponta com origem é caminhar: ande o primeiro trajeto, depois o segundo. A resultante é a linha reta de onde você saiu até onde chegou.',
            simples: 'Encoste um vetor na ponta do outro. A resultante fecha o triângulo.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Duas forças de 200 N e 500 N formando 90° entre si:</p>
          <div class="math-block">|R| = √(200² + 500²) = √(40000 + 250000) = √290000 ≈ 538,5 N</div>
          <p>Bem menos que 700 N. Quanto maior o ângulo, menor a resultante.</p>`,
          alt: { passos: '1) Ache o ângulo entre os vetores. 2) Aplique a lei dos cossenos. 3) Tire a raiz.' }
        },
        { kind: 'visual', html: `<p>Mude os dois vetores e acompanhe a resultante — e o efeito do ângulo sobre o módulo dela.</p>`,
          viz: { type: 'vetorSoma' } },
        { kind: 'guiado',  exercise: 'vg-g2' },
        { kind: 'sozinho', exercise: 'vg-s2' },
        { kind: 'revisao', html: `<p>Somar vetor é encostar um na ponta do outro. A resultante fecha o triângulo. O módulo sai da lei dos cossenos — que vira Pitágoras quando o ângulo é reto.</p>` }
      ]
    },

    /* ═══════════════ VETORES ALGÉBRICOS ═══════════════ */
    {
      id: 'va1', topic: 'vetores-alg', title: 'A seta vira par ordenado',
      why: 'Com coordenadas, somar vetor vira somar número. É por isso que a Lista 02 é bem mais rápida que a 01.',
      steps: [
        { kind: 'contexto', html: `
          <p>Desenhar seta e medir com régua funciona, mas é lento e impreciso.</p>
          <p>A saída: descrever a seta por <strong>quanto ela anda em cada eixo</strong>.</p>`,
          alt: { simples: 'Em vez de desenhar, escreva quanto anda na horizontal e quanto anda na vertical.' }
        },
        { kind: 'explicacao', html: `
          <p>Uma seta que anda 3 para a direita e 4 para cima vira:</p>
          <div class="math-block">v = (3, 4)</div>
          <p>Agora todas as operações ficam mecânicas:</p>
          <ul>
            <li><strong>Somar:</strong> componente com componente — <span class="math">(a,b) + (c,d) = (a+c, b+d)</span></li>
            <li><strong>Multiplicar por número:</strong> multiplica tudo — <span class="math">k(a,b) = (ka, kb)</span></li>
            <li><strong>Módulo:</strong> Pitágoras — <span class="math">|v| = √(a² + b²)</span></li>
          </ul>
          <p>Em R³ é igual, só com três componentes. E a notação <span class="math">3i − 5j + 8k</span> é exatamente o mesmo que <span class="math">(3, −5, 8)</span> — <span class="math">i, j, k</span> são só os nomes dos eixos.</p>`,
          alt: {
            passos: '1) Ande na horizontal e anote. 2) Ande na vertical e anote. 3) Escreva o par.',
            visual: 'O vetor é a hipotenusa. As componentes são os catetos. Por isso o módulo é Pitágoras.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Da Lista 02: <span class="math">u = (2, −3)</span> e <span class="math">v = (−1, 4)</span>. Calcule <span class="math">3u + 2v</span>.</p>
          <div class="math-block">3u = (6, −9) &nbsp;&nbsp; 2v = (−2, 8)</div>
          <div class="math-block">3u + 2v = (6−2, −9+8) = (4, −1)</div>
          <p>Nenhum desenho, nenhuma régua. Só aritmética com sinal.</p>`,
          alt: { outro: '−2u + v = (−4, 6) + (−1, 4) = (−5, 10).', dica: 'O erro mais comum aqui é sinal. Multiplique primeiro, some depois — nunca os dois ao mesmo tempo.' }
        },
        { kind: 'visual', html: `<p>Mexa nas componentes e veja a seta e o módulo respondendo.</p>`,
          viz: { type: 'vetorSoma' } },
        { kind: 'guiado',  exercise: 'va-g1' },
        { kind: 'sozinho', exercise: 'va-s1' },
        { kind: 'revisao', html: `<p>Vetor virou par ordenado. Soma é componente a componente. Escalar multiplica tudo. Módulo é Pitágoras. E <span class="math">i, j, k</span> são só rótulos dos eixos.</p>` }
      ]
    },

    {
      id: 'va2', topic: 'vetores-alg', title: 'Vetor entre dois pontos, módulo e versor',
      why: 'Quase toda questão das listas começa com "dados os pontos A e B". Saber montar o vetor é o primeiro passo.',
      steps: [
        { kind: 'contexto', html: `
          <p>Dados dois pontos, qual é a seta que vai de um até o outro?</p>` },
        { kind: 'explicacao', html: `
          <p>Sempre <strong>ponta menos origem</strong>:</p>
          <div class="math-block">AB = B − A</div>
          <p>A ordem importa: <span class="math">AB = −BA</span>.</p>
          <p><strong>Versor</strong> (ou vetor unitário) é a seta com o mesmo rumo, mas comprimento 1:</p>
          <div class="math-block">û = u / |u|</div>
          <p>Ele serve quando você quer só a direção, sem o tamanho atrapalhando.</p>`,
          alt: {
            simples: 'AB = B − A, sempre. Versor = divida o vetor pelo próprio módulo.',
            visual: 'O versor é a mesma flecha encolhida até medir exatamente 1.'
          }
        },
        { kind: 'exemplo', html: `
          <p>A(4, −1, 2) e B(3, 2, −1):</p>
          <div class="math-block">AB = (3−4, 2−(−1), −1−2) = (−1, 3, −3)</div>
          <p>Módulo:</p>
          <div class="math-block">|AB| = √(1 + 9 + 9) = √19 ≈ 4,36</div>`,
          alt: { passos: '1) Subtraia coordenada por coordenada, na ordem B − A. 2) Eleve cada uma ao quadrado. 3) Some e tire a raiz.' }
        },
        { kind: 'visual', html: `
          <p>Um versor famoso: se <span class="math">u = (3, 4)</span>, então <span class="math">|u| = 5</span> e o versor é <span class="math">(0,6 ; 0,8)</span>. Confira: 0,6² + 0,8² = 0,36 + 0,64 = 1.</p>` },
        { kind: 'guiado',  exercise: 'va-g2' },
        { kind: 'sozinho', exercise: 'va-s2' },
        { kind: 'revisao', html: `<p>AB = B − A. Módulo é a raiz da soma dos quadrados. Versor é o vetor dividido pelo próprio módulo — e sempre mede 1.</p>` }
      ]
    },

    /* ═══════════════ PRODUTO ESCALAR ═══════════════ */
    {
      id: 'pe1', topic: 'produto-escalar', title: 'Multiplicar vetores e sair um número',
      why: 'É a ferramenta de ângulo e de perpendicularidade. Aparece em toda a Lista 03 e volta na 09.',
      whyByArea: {
        compe: 'Em computação gráfica o produto escalar decide quanta luz bate numa superfície. Em busca de texto, ele mede quão parecidos são dois documentos.'
      },
      steps: [
        { kind: 'contexto', html: `
          <p>Você empurra uma caixa com força inclinada. Só a parte da força que aponta na direção do movimento realiza trabalho — o resto se perde empurrando para baixo.</p>
          <p>Medir "quanto de um vetor aponta na direção do outro" é exatamente o que o produto escalar faz.</p>`,
          alt: { simples: 'O produto escalar mede o quanto dois vetores concordam de direção.' }
        },
        { kind: 'explicacao', html: `
          <p>Duas fórmulas para a mesma coisa. A prática:</p>
          <div class="math-block">u · v = a₁b₁ + a₂b₂ + a₃b₃</div>
          <p>E a geométrica, que explica o significado:</p>
          <div class="math-block">u · v = |u| · |v| · cos θ</div>
          <p>O resultado é um <strong>número</strong>, não um vetor. Daí o nome escalar.</p>
          <p>Como o cosseno manda no sinal:</p>
          <ul>
            <li><strong>Positivo</strong> → ângulo agudo, apontam mais ou menos para o mesmo lado</li>
            <li><strong>Zero</strong> → <strong>perpendiculares</strong> (é assim que se testa ortogonalidade)</li>
            <li><strong>Negativo</strong> → ângulo obtuso, apontam para lados opostos</li>
          </ul>`,
          alt: {
            passos: '1) Multiplique as primeiras componentes. 2) As segundas. 3) As terceiras. 4) Some tudo.',
            dica: 'Deu zero? São perpendiculares. Esse teste sozinho resolve várias questões da lista.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Da Lista 03: <span class="math">u = 3i − 5j + 8k</span> e <span class="math">v = 4i − 2j − 3k</span>.</p>
          <div class="math-block">⟨u,v⟩ = 3·4 + (−5)(−2) + 8·(−3)</div>
          <div class="math-block">= 12 + 10 − 24 = −2</div>
          <p>Negativo: o ângulo entre eles é obtuso.</p>
          <p>Para achar o ângulo, isole o cosseno:</p>
          <div class="math-block">cos θ = (u · v) / (|u| · |v|)</div>`,
          alt: { outro: 'u = (3,2,1) e v = (−1,−4,−1): ⟨u,v⟩ = −3 − 8 − 1 = −12.' }
        },
        { kind: 'visual', html: `<p>Gire os vetores e acompanhe o produto escalar mudando de sinal ao cruzar os 90°.</p>`,
          viz: { type: 'escalarAngulo' } },
        { kind: 'guiado',  exercise: 'pe-g1' },
        { kind: 'sozinho', exercise: 'pe-s1' },
        { kind: 'revisao', html: `<p>Produto escalar devolve número. Na prática: multiplique componente a componente e some. Zero significa perpendicular. O sinal conta se o ângulo é agudo ou obtuso.</p>` }
      ]
    },

    {
      id: 'pe2', topic: 'produto-escalar', title: 'Ângulo, projeção e produto interno',
      why: 'A Lista 09 pede para verificar as propriedades do produto interno. Elas são as mesmas do escalar, generalizadas.',
      steps: [
        { kind: 'contexto', html: `
          <p>Sabendo o produto escalar e os módulos, o ângulo sai de graça.</p>` },
        { kind: 'explicacao', html: `
          <div class="math-block">θ = arccos[ (u·v) / (|u|·|v|) ]</div>
          <p>E a <strong>projeção</strong> de u sobre v é a "sombra" de u na direção de v:</p>
          <div class="math-block">proj_v u = [ (u·v) / |v|² ] · v</div>
          <p>O <strong>produto interno</strong> é a versão geral: qualquer operação que respeite três regras vale como produto interno.</p>
          <ul>
            <li><strong>Simetria:</strong> <span class="math">⟨u,v⟩ = ⟨v,u⟩</span></li>
            <li><strong>Homogeneidade:</strong> <span class="math">⟨ku,v⟩ = k⟨u,v⟩</span></li>
            <li><strong>Aditividade:</strong> <span class="math">⟨u+v,w⟩ = ⟨u,w⟩ + ⟨v,w⟩</span></li>
          </ul>
          <p>O produto escalar comum é o produto interno <em>euclidiano</em> — um caso particular.</p>`,
          alt: { visual: 'Projeção é a sombra de um vetor no chão do outro, com o sol exatamente perpendicular.' }
        },
        { kind: 'exemplo', html: `
          <p>Verificando simetria com <span class="math">u = (3,−2)</span> e <span class="math">v = (4,5)</span>:</p>
          <div class="math-block">⟨u,v⟩ = 12 − 10 = 2</div>
          <div class="math-block">⟨v,u⟩ = 12 − 10 = 2 ✓</div>
          <p>É a questão 1(a) da Lista 09 inteira. As outras seguem o mesmo roteiro: calcule os dois lados e mostre que batem.</p>`,
          alt: { passos: '1) Calcule o lado esquerdo. 2) Calcule o lado direito. 3) Compare. Provar propriedade é isso.' }
        },
        { kind: 'visual', html: `<p>Acompanhe o ângulo enquanto gira os vetores.</p>`,
          viz: { type: 'escalarAngulo' } },
        { kind: 'guiado',  exercise: 'pe-g2' },
        { kind: 'sozinho', exercise: 'pe-s2' },
        { kind: 'revisao', html: `<p>Ângulo sai do arccos do produto escalar sobre os módulos. Projeção é a sombra. E produto interno é a generalização — as três propriedades são o que define.</p>` }
      ]
    },

    /* ═══════════════ PRODUTO VETORIAL ═══════════════ */
    {
      id: 'pv1', topic: 'produto-vetorial', title: 'Multiplicar vetores e sair um vetor',
      why: 'Toda a Lista 04. E é o que dá área de paralelogramo e triângulo de graça.',
      steps: [
        { kind: 'contexto', html: `
          <p>Como achar um vetor perpendicular a outros dois ao mesmo tempo?</p>
          <p>Em 3D existe exatamente uma direção assim. O produto vetorial a entrega pronta.</p>`,
          alt: { cotidiano: 'Abra um livro. As duas páginas são os vetores; a lombada aponta na direção do produto vetorial.' }
        },
        { kind: 'explicacao', html: `
          <p>Monte o determinante com <span class="math">i, j, k</span> na primeira linha:</p>
          <div class="math-block">u × v = | i&nbsp;&nbsp;j&nbsp;&nbsp;k ; a₁ a₂ a₃ ; b₁ b₂ b₃ |</div>
          <p>Abrindo:</p>
          <div class="math-block">u × v = (a₂b₃ − a₃b₂, &nbsp;a₃b₁ − a₁b₃, &nbsp;a₁b₂ − a₂b₁)</div>
          <p>Dois fatos que caem em prova:</p>
          <ul>
            <li><strong>Não é comutativo:</strong> <span class="math">u × v = −(v × u)</span>. Trocar a ordem inverte o vetor.</li>
            <li><strong>O módulo é área:</strong> <span class="math">|u × v|</span> é a área do paralelogramo formado pelos dois. Metade disso é a área do triângulo.</li>
          </ul>`,
          alt: {
            passos: '1) Escreva i, j, k na primeira linha. 2) u na segunda, v na terceira. 3) Abra o determinante. 4) Atenção ao sinal do meio: o j vem negativo.',
            dica: 'O erro campeão é esquecer o sinal negativo do termo do meio.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Da Lista 04: <span class="math">u = (3, 1, 2)</span> e <span class="math">v = (−2, 2, 5)</span>.</p>
          <div class="math-block">i: (1·5 − 2·2) = 1</div>
          <div class="math-block">j: −(3·5 − 2·(−2)) = −(15 + 4) = −19</div>
          <div class="math-block">k: (3·2 − 1·(−2)) = 6 + 2 = 8</div>
          <div class="math-block">u × v = (1, −19, 8)</div>
          <p>Confira fazendo o produto escalar com u: 3 − 19 + 16 = 0. Perpendicular, como esperado — esse é o melhor jeito de conferir.</p>`,
          alt: { outro: 'u = 5i + 4j e v = i + k → u × v = (4, −5, −4).' }
        },
        { kind: 'visual', html: `<p>O paralelogramo mostra o módulo do produto vetorial: a área.</p>`,
          viz: { type: 'vetorialArea' } },
        { kind: 'guiado',  exercise: 'pv-g1' },
        { kind: 'sozinho', exercise: 'pv-s1' },
        { kind: 'revisao', html: `<p>Produto vetorial devolve vetor perpendicular aos dois. Sai de um determinante — cuidado com o sinal do j. O módulo é a área do paralelogramo. E trocar a ordem inverte o resultado.</p>` }
      ]
    },

    /* ═══════════════ PRODUTO MISTO ═══════════════ */
    {
      id: 'pm1', topic: 'produto-misto', title: 'Três vetores, um volume',
      why: 'Lista 05 inteira. E o teste de coplanaridade cai praticamente sempre.',
      steps: [
        { kind: 'contexto', html: `
          <p>Dois vetores geram um paralelogramo. Três geram uma caixa torta — um paralelepípedo.</p>
          <p>O produto misto dá o volume dessa caixa.</p>` },
        { kind: 'explicacao', html: `
          <div class="math-block">(u, v, w) = u · (v × w)</div>
          <p>Na prática é só um determinante 3×3 com os três vetores nas linhas:</p>
          <div class="math-block">| a₁ a₂ a₃ ; b₁ b₂ b₃ ; c₁ c₂ c₃ |</div>
          <p>E o resultado que mais cai:</p>
          <p><strong>Produto misto igual a zero significa que os três vetores são coplanares</strong> — cabem no mesmo plano, e a caixa tem volume nulo.</p>`,
          alt: {
            simples: 'Monte o determinante 3×3 com os três vetores. O resultado é o volume. Zero = coplanares.',
            visual: 'Se a caixa é achatada até virar uma folha, o volume some. É isso que o zero está dizendo.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Da Lista 05: para que valor de m os vetores <span class="math">u = (2, m, 0)</span>, <span class="math">v = (1, −1, 2)</span> e <span class="math">w = (−1, 3, −1)</span> são coplanares?</p>
          <p>Coplanares significa determinante zero:</p>
          <div class="math-block">2[(−1)(−1) − 2·3] − m[1·(−1) − 2·(−1)] + 0</div>
          <div class="math-block">= 2(1 − 6) − m(−1 + 2) = −10 − m</div>
          <p>Iguale a zero: <span class="math">−10 − m = 0</span>, logo <strong>m = −10</strong>.</p>`,
          alt: { passos: '1) Monte o determinante. 2) Abra pela linha ou coluna com mais zeros. 3) Iguale a zero. 4) Resolva para a incógnita.' }
        },
        { kind: 'visual', html: `
          <p>Volume do paralelepípedo é o <strong>módulo</strong> do produto misto — o sinal só indica a orientação dos vetores, e para volume você descarta.</p>
          <div class="math-block">V = |(u, v, w)|</div>
          <p>Para o tetraedro formado pelos mesmos vetores, o volume é um sexto disso.</p>` },
        { kind: 'guiado',  exercise: 'pm-g1' },
        { kind: 'sozinho', exercise: 'pm-s1' },
        { kind: 'revisao', html: `<p>Produto misto é determinante 3×3. O módulo é volume. Zero significa coplanares — e é esse teste que a lista mais cobra.</p>` }
      ]
    },

    /* ═══════════════ COMBINAÇÃO LINEAR, LI/LD, BASE ═══════════════ */
    {
      id: 'ev1', topic: 'espaco-vetorial', title: 'Combinação linear: montar um vetor com outros',
      why: 'É a base conceitual das Listas 06, 07 e 08. Sem isso, LI/LD e base viram decoreba.',
      steps: [
        { kind: 'contexto', html: `
          <p>Você tem dois vetores. Pode esticar, encolher e inverter cada um, e depois somar.</p>
          <p>Tudo que você consegue produzir assim é uma <strong>combinação linear</strong> deles.</p>`,
          alt: { cotidiano: 'Duas cores de tinta. Misturando em proporções diferentes você alcança um monte de tons — mas nem todos.' }
        },
        { kind: 'explicacao', html: `
          <div class="math-block">w = a·u + b·v</div>
          <p>Achar <span class="math">a</span> e <span class="math">b</span> é resolver um sistema. Nada além disso.</p>
          <p>Se o sistema tem solução, <span class="math">w</span> é combinação linear de u e v. Se não tem, não é.</p>`,
          alt: { passos: '1) Escreva w = au + bv. 2) Iguale componente a componente. 3) Resolva o sistema. 4) Sem solução = não é combinação linear.' }
        },
        { kind: 'exemplo', html: `
          <p>Da Lista 06: escrever <span class="math">w = (7, −11, 2)</span> como combinação de <span class="math">u = (2,−3,2)</span> e <span class="math">v = (−1,2,4)</span>.</p>
          <div class="math-block">2a − b = 7<br>−3a + 2b = −11<br>2a + 4b = 2</div>
          <p>Da primeira: <span class="math">b = 2a − 7</span>. Substituindo na terceira:</p>
          <div class="math-block">2a + 4(2a−7) = 2 → 10a = 30 → a = 3</div>
          <p>Então <span class="math">b = −1</span>. Confira na segunda: −9 − 2 = −11 ✓</p>
          <div class="math-block">w = 3u − v</div>`,
          alt: { dica: 'Sempre confira na equação que você não usou. Se ela não bater, não existe combinação linear.' }
        },
        { kind: 'visual', html: `<p>Mexa em a e b e tente alcançar o alvo com a combinação dos dois vetores.</p>`,
          viz: { type: 'combLinear' } },
        { kind: 'guiado',  exercise: 'ev-g1' },
        { kind: 'sozinho', exercise: 'ev-s1' },
        { kind: 'revisao', html: `<p>Combinação linear é esticar e somar. Achar os coeficientes é resolver um sistema. Sem solução significa que o vetor está fora do alcance daqueles dois.</p>` }
      ]
    },

    {
      id: 'ev2', topic: 'espaco-vetorial', title: 'LI, LD, gerador e base',
      why: 'É o conteúdo da Lista 08 e o vocabulário que a prova usa o tempo todo.',
      steps: [
        { kind: 'contexto', html: `
          <p>Se um dos vetores do conjunto já é combinação dos outros, ele não acrescenta nada — é peso morto.</p>` },
        { kind: 'explicacao', html: `
          <ul>
            <li><strong>LD</strong> (linearmente dependente): pelo menos um é combinação dos outros. Sobra gente.</li>
            <li><strong>LI</strong> (linearmente independente): nenhum é combinação dos outros. Todos são necessários.</li>
            <li><strong>Gerador</strong> de R<sup>n</sup>: com combinações desses vetores você alcança <em>qualquer</em> vetor do espaço.</li>
            <li><strong>Base</strong>: LI <em>e</em> gerador ao mesmo tempo. O conjunto mínimo que ainda alcança tudo.</li>
          </ul>
          <p>O atalho que resolve quase toda a Lista 08: monte a matriz com os vetores e calcule o determinante.</p>
          <div class="math-block">det ≠ 0 → LI e gera o espaço → é base<br>det = 0 → LD e não gera</div>
          <p>Isso vale quando o número de vetores é igual à dimensão (2 vetores em R², 3 em R³).</p>`,
          alt: {
            simples: 'Determinante diferente de zero = base. Determinante zero = tem vetor sobrando.',
            visual: 'Dois vetores LD em R² são paralelos — só alcançam a reta deles, não o plano inteiro.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Da Lista 08: <span class="math">S = {(2,1), (−1,2)}</span> gera o R²?</p>
          <div class="math-block">det = 2·2 − 1·(−1) = 4 + 1 = 5 ≠ 0</div>
          <p>Gera, é LI, e portanto é base do R².</p>
          <p>Já <span class="math">S = {(−1,2), (2,−4)}</span>:</p>
          <div class="math-block">det = (−1)(−4) − 2·2 = 4 − 4 = 0</div>
          <p>Não gera. Repare que <span class="math">(2,−4) = −2·(−1,2)</span> — é o mesmo vetor esticado, então os dois vivem sobre a mesma reta.</p>`,
          alt: { dica: 'Antes de calcular determinante, olhe se um vetor é múltiplo do outro. Se for, já é LD e você economiza a conta.' }
        },
        { kind: 'visual', html: `<p>Deixe os dois vetores paralelos e veja o alcance da combinação colapsar numa reta.</p>`,
          viz: { type: 'combLinear' } },
        { kind: 'guiado',  exercise: 'ev-g2' },
        { kind: 'sozinho', exercise: 'ev-s2' },
        { kind: 'revisao', html: `
          <p>LD = tem vetor sobrando. LI = todos necessários. Gerador = alcança tudo. Base = LI + gerador. E o determinante decide, quando a quantidade bate com a dimensão.</p>` }
      ]
    }
  ];

  CZ.lessons.register(LESSONS);
})(window.CZ);
