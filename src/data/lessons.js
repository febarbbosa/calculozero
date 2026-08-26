/* ==========================================================================
   data/lessons.js — conteúdo das aulas.

   Toda aula segue a mesma sequência de 7 passos:
     contexto → explicacao → exemplo → visual → guiado → sozinho → revisao

   `alt` guarda as reescritas usadas pelo botão "Não entendi":
     simples   · a mesma ideia com menos palavras
     cotidiano · um exemplo fora da matemática
     visual    · uma imagem mental ou desenho
     passos    · o raciocínio quebrado em etapas
     dica      · um empurrão, sem entregar a resposta
     outro     · outro exemplo do mesmo tipo

   `why` responde "por que eu preciso aprender isso?" e pode variar por área
   de faculdade através de `whyByArea`.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const LESSONS = [

    /* ═══════════════ ARITMÉTICA ═══════════════ */
    {
      id: 'ar1', topic: 'aritmetica', title: 'A ordem das operações',
      why: 'Metade dos erros em Cálculo não é erro de Cálculo — é conta feita fora de ordem.',
      steps: [
        { kind: 'contexto', html: `
          <p>Você compra <strong>2 pães de R$ 3</strong> e <strong>1 suco de R$ 5</strong>. Quanto deu?</p>
          <p>Ninguém soma tudo e multiplica no fim. Você calcula o pão primeiro, e só depois junta com o suco. Sua cabeça já usa ordem de operações — a matemática só escreveu essa regra no papel.</p>`,
          alt: {
            cotidiano: 'Receita de bolo: você bate os ovos antes de misturar com a farinha. Trocar a ordem muda o resultado. Contas funcionam igual.',
            simples: 'Nem toda conta se resolve da esquerda para a direita. Existe uma fila oficial.'
          }
        },
        { kind: 'explicacao', html: `
          <p>A fila é sempre esta:</p>
          <ol style="padding-left:20px;color:var(--ink-2)">
            <li><strong>Parênteses</strong> — o que está dentro vem primeiro</li>
            <li><strong>Potências e raízes</strong></li>
            <li><strong>Multiplicação e divisão</strong> — da esquerda para a direita</li>
            <li><strong>Soma e subtração</strong> — da esquerda para a direita</li>
          </ol>
          <p>Multiplicação e divisão empatam: quem aparece primeiro na linha resolve primeiro. Vale o mesmo para soma e subtração.</p>`,
          alt: {
            simples: 'Parênteses → potência → vezes/dividir → mais/menos.',
            visual: 'Pense num torneio: parênteses jogam a final. Potências, a semifinal. Vezes e dividir, as quartas. Soma e subtração entram por último.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Resolvendo <span class="math">2 + 3 × 4</span>:</p>
          <div class="math-block">2 + 3 × 4<br>= 2 + 12<br>= 14</div>
          <p>Quem responde 20 somou primeiro. É o erro mais comum do país inteiro — e vale um ponto em toda prova.</p>`,
          alt: {
            outro: 'Tente 10 − 2 × 3. Multiplicação primeiro: 10 − 6 = 4. Não é 24.',
            passos: 'Passo 1: procure multiplicação ou divisão. Passo 2: resolva. Passo 3: só então some ou subtraia.'
          }
        },
        { kind: 'visual', html: `<p>Deslize e veja como o parêntese muda tudo. A mesma sequência de números, dois resultados diferentes.</p>`,
          viz: { type: 'ordemOperacoes' } },
        { kind: 'guiado',  exercise: 'ar-g1' },
        { kind: 'sozinho', exercise: 'ar-s1' },
        { kind: 'revisao', html: `
          <p>Você guardou três coisas:</p>
          <ul>
            <li>Existe uma ordem oficial, e ela não é da esquerda para a direita</li>
            <li>Parênteses mandam mais que tudo</li>
            <li>Vezes e dividir vêm antes de mais e menos</li>
          </ul>
          <p>Sempre que uma conta longa der um resultado estranho, releia a ordem antes de suspeitar da fórmula.</p>` }
      ]
    },

    {
      id: 'ar2', topic: 'aritmetica', title: 'Números negativos sem susto',
      why: 'Derivada quase sempre produz sinal negativo em algum passo. Errar sinal aqui derruba a questão inteira lá na frente.',
      steps: [
        { kind: 'contexto', html: `
          <p>Sua conta tem R$ 50. Você gasta R$ 80. O saldo vira <span class="math">−30</span>.</p>
          <p>Negativo não é um número esquisito. É uma direção: o oposto de somar.</p>`,
          alt: { cotidiano: 'Elevador: térreo é o zero, subsolo é negativo. −2 é dois andares abaixo do térreo.' }
        },
        { kind: 'explicacao', html: `
          <p>Imagine uma régua com o zero no meio. Somar anda para a direita, subtrair anda para a esquerda.</p>
          <p>Na multiplicação existem só duas regras:</p>
          <ul>
            <li>Sinais <strong>iguais</strong> → resultado positivo &nbsp;<span class="math">(−2)×(−3) = 6</span></li>
            <li>Sinais <strong>diferentes</strong> → resultado negativo &nbsp;<span class="math">(−2)×3 = −6</span></li>
          </ul>`,
          alt: {
            visual: 'Menos vezes menos é como dar meia-volta duas vezes: você acaba olhando para a frente de novo.',
            simples: 'Iguais dão positivo. Diferentes dão negativo. Só isso.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Cuidado com o menos que gruda no parêntese:</p>
          <div class="math-block">5 − (3 − 7)<br>= 5 − (−4)<br>= 5 + 4 = 9</div>
          <p>Subtrair um negativo é somar. É o mesmo que tirar uma dívida de você.</p>`,
          alt: { passos: '1) Resolva o parêntese: 3−7 = −4. 2) Reescreva: 5 − (−4). 3) Dois menos viram mais: 5 + 4 = 9.' }
        },
        { kind: 'visual', html: `<p>Arraste o ponto e acompanhe o resultado na régua.</p>`,
          viz: { type: 'retaNumerica' } },
        { kind: 'guiado',  exercise: 'ar-g2' },
        { kind: 'sozinho', exercise: 'ar-s2' },
        { kind: 'revisao', html: `
          <p>O essencial: negativo é direção, não defeito. Sinais iguais multiplicando dão positivo; diferentes dão negativo. E subtrair um negativo sempre vira soma.</p>` }
      ]
    },

    /* ═══════════════ FRAÇÕES ═══════════════ */
    {
      id: 'fr1', topic: 'fracoes', title: 'O que uma fração realmente é',
      why: 'Toda derivada nasce de uma fração: variação dividida por variação. Quem não enxerga fração não enxerga derivada.',
      steps: [
        { kind: 'contexto', html: `
          <p>Uma pizza cortada em 4 pedaços. Você come 3.</p>
          <p>Você comeu <span class="math">3/4</span> da pizza. O número de baixo diz <strong>em quantas partes o inteiro foi cortado</strong>. O de cima diz <strong>quantas você pegou</strong>.</p>`,
          alt: { cotidiano: 'Bateria do celular em 50% é o mesmo que 1/2. Você já lê fração o dia inteiro, só não chama assim.' }
        },
        { kind: 'explicacao', html: `
          <p>Fração é uma divisão que ainda não foi feita. <span class="math">3/4</span> é literalmente "3 dividido por 4", que dá 0,75.</p>
          <p>Daí vem a regra que confunde todo mundo: <strong>quanto maior o número de baixo, menor o pedaço</strong>. Cortar a pizza em 8 dá pedaços menores que cortar em 4.</p>`,
          alt: {
            visual: 'Duas barras do mesmo tamanho. Uma dividida em 4, outra em 8. Os traços da segunda são mais apertados — cada pedaço é menor.',
            simples: 'Número de baixo = tamanho do corte. Número de cima = quantos cortes você pegou.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Qual é maior, <span class="math">2/3</span> ou <span class="math">3/5</span>?</p>
          <p>Deixe os dois com o mesmo corte. O menor múltiplo comum de 3 e 5 é 15:</p>
          <div class="math-block">2/3 = 10/15 &nbsp;&nbsp;&nbsp; 3/5 = 9/15</div>
          <p>Com pedaços do mesmo tamanho, comparar vira contar. 10 &gt; 9, então 2/3 é maior.</p>`,
          alt: { passos: '1) Ache um denominador comum. 2) Converta as duas. 3) Compare só os numeradores.' }
        },
        { kind: 'visual', html: `<p>Mexa nos dois controles e veja as barras mudarem de tamanho.</p>`,
          viz: { type: 'fracaoBarra' } },
        { kind: 'guiado',  exercise: 'fr-g1' },
        { kind: 'sozinho', exercise: 'fr-s1' },
        { kind: 'revisao', html: `
          <p>Fração é divisão pendente. Denominador maior significa pedaço menor. Para comparar ou somar, iguale os denominadores primeiro.</p>` }
      ]
    },

    {
      id: 'fr2', topic: 'fracoes', title: 'Somar e multiplicar frações',
      why: 'Simplificar frações é o passo que aparece no fim de quase toda derivada por quociente.',
      steps: [
        { kind: 'contexto', html: `
          <p>Somar <span class="math">1/2 + 1/4</span> não é somar em cima e embaixo. Se fosse, daria 2/6, que é <em>menor</em> que 1/2 — impossível, já que você está somando.</p>`,
          alt: { dica: 'Antes de somar, pergunte: os pedaços têm o mesmo tamanho? Se não, iguale.' }
        },
        { kind: 'explicacao', html: `
          <p><strong>Somar</strong>: iguale os denominadores, some só os de cima.</p>
          <p><strong>Multiplicar</strong>: aqui é fácil de verdade — multiplica em cima e embaixo, sem igualar nada.</p>
          <div class="math-block">a/b × c/d = (a×c)/(b×d)</div>
          <p><strong>Dividir</strong>: inverta a segunda e multiplique.</p>`,
          alt: { simples: 'Somar exige denominador igual. Multiplicar não exige nada. Dividir é multiplicar pelo invertido.' }
        },
        { kind: 'exemplo', html: `
          <div class="math-block">1/2 + 1/4 = 2/4 + 1/4 = 3/4</div>
          <div class="math-block">2/3 × 3/4 = 6/12 = 1/2</div>
          <p>Repare que 6/12 simplificou para 1/2: dividimos os dois lados por 6.</p>`,
          alt: { outro: '3/5 × 5/9 = 15/45 = 1/3. Sempre simplifique no fim — professor desconta por resposta não simplificada.' }
        },
        { kind: 'visual', html: `<p>Compare visualmente antes e depois de igualar os denominadores.</p>`,
          viz: { type: 'fracaoBarra' } },
        { kind: 'guiado',  exercise: 'fr-g2' },
        { kind: 'sozinho', exercise: 'fr-s2' },
        { kind: 'revisao', html: `<p>Somar pede denominador comum. Multiplicar é direto. Dividir é inverter e multiplicar. E sempre simplifique o resultado.</p>` }
      ]
    },

    /* ═══════════════ ÁLGEBRA ═══════════════ */
    {
      id: 'al1', topic: 'algebra', title: 'A letra é só um número escondido',
      why: 'Em Cálculo você vai manipular expressões com letras o tempo todo. Travar aqui é travar em tudo.',
      steps: [
        { kind: 'contexto', html: `
          <p>"Pensei num número, multipliquei por 2, somei 5 e deu 15. Que número era?"</p>
          <p>Você acabou de resolver <span class="math">2x + 5 = 15</span> de cabeça. A letra é só um apelido para o número que você ainda não sabe.</p>`,
          alt: { cotidiano: 'Preço com desconto: você sabe quanto pagou e quer saber o preço original. O preço original é o x.' }
        },
        { kind: 'explicacao', html: `
          <p>Equação é uma balança em equilíbrio. O sinal de igual é o fiel no meio.</p>
          <p><strong>Regra única:</strong> o que você fizer de um lado, faça do outro. A balança continua equilibrada.</p>
          <p>O objetivo é sempre o mesmo: deixar o x sozinho de um lado.</p>`,
          alt: {
            visual: 'Imagine uma gangorra com pesos iguais. Tirar 5kg de um lado só derruba a gangorra. Tirar dos dois mantém no lugar.',
            simples: 'Isole o x. Para tirar algo de perto dele, faça a operação contrária dos dois lados.'
          }
        },
        { kind: 'exemplo', html: `
          <div class="math-block">2x + 5 = 15</div>
          <p>O 5 está somando. Para tirá-lo, subtraia 5 dos dois lados:</p>
          <div class="math-block">2x = 10</div>
          <p>O 2 está multiplicando. Divida os dois lados por 2:</p>
          <div class="math-block">x = 5</div>
          <p>Confira: 2×5 + 5 = 15. Bateu. <strong>Sempre confira</strong> — leva 5 segundos e salva a questão.</p>`,
          alt: { passos: '1) Some ou subtraia para tirar o termo solto. 2) Multiplique ou divida para tirar o coeficiente. 3) Substitua para conferir.' }
        },
        { kind: 'visual', html: `<p>Mexa no valor de x e veja os dois lados da balança se ajustando. O equilíbrio acontece num ponto só.</p>`,
          viz: { type: 'balanca' } },
        { kind: 'guiado',  exercise: 'al-g1' },
        { kind: 'sozinho', exercise: 'al-s1' },
        { kind: 'revisao', html: `<p>Equação é balança. Isolar o x é o objetivo. Operação contrária dos dois lados é a ferramenta. Conferir no final é o hábito que separa quem tira nota de quem quase tira.</p>` }
      ]
    },

    {
      id: 'al2', topic: 'algebra', title: 'Produtos notáveis e fatoração',
      why: 'Quase todo limite com "0/0" se resolve fatorando. Sem fatoração, você trava na primeira questão de limite da prova.',
      steps: [
        { kind: 'contexto', html: `
          <p>Alguns produtos aparecem tanto que vale reconhecê-los de cara, em vez de multiplicar tudo toda vez.</p>`,
          alt: { dica: 'É como reconhecer um rosto: você não analisa cada traço, você só reconhece.' }
        },
        { kind: 'explicacao', html: `
          <p>Os três que mais aparecem:</p>
          <div class="math-block">(a + b)² = a² + 2ab + b²</div>
          <div class="math-block">(a − b)² = a² − 2ab + b²</div>
          <div class="math-block">a² − b² = (a − b)(a + b)</div>
          <p>O terceiro se chama <strong>diferença de quadrados</strong> e é o mais útil dos três em Cálculo.</p>`,
          alt: { simples: 'Quadrado da soma tem um termo do meio: 2ab. Diferença de quadrados não tem termo do meio — ela abre em dois parênteses.' }
        },
        { kind: 'exemplo', html: `
          <p>O erro clássico é achar que <span class="math">(x+3)²</span> é <span class="math">x² + 9</span>. Não é. Abrindo com calma:</p>
          <div class="math-block">(x+3)(x+3) = x² + 3x + 3x + 9 = x² + 6x + 9</div>
          <p>O <span class="math">6x</span> do meio é justamente o que a fórmula chama de 2ab.</p>`,
          alt: { outro: '(x − 5)² = x² − 10x + 25. O sinal do meio segue o sinal do parêntese.' }
        },
        { kind: 'visual', html: `
          <p>Fatorar é o caminho de volta: sair de <span class="math">x² − 9</span> e chegar em <span class="math">(x−3)(x+3)</span>. Guarde essa, porque ela reaparece em Limites.</p>
          <div class="math-block">x² − 9 = (x − 3)(x + 3)</div>` },
        { kind: 'guiado',  exercise: 'al-g2' },
        { kind: 'sozinho', exercise: 'al-s2' },
        { kind: 'revisao', html: `<p>Três fórmulas, muito retorno. Especialmente a diferença de quadrados: ela é a chave da maioria dos limites indeterminados.</p>` }
      ]
    },

    /* ═══════════════ FUNÇÕES ═══════════════ */
    {
      id: 'fu1', topic: 'funcoes', title: 'Função é uma máquina',
      why: 'Função é o objeto que o Cálculo estuda. Limite, derivada e integral são só três perguntas diferentes sobre a mesma função.',
      whyByArea: {
        compe: 'Toda função em código é exatamente isto: entra parâmetro, sai retorno. Você já programa funções — falta só ler a notação matemática delas.',
        econ: 'Custo em função da quantidade produzida, receita em função do preço. Economia é praticamente feita de funções.',
        fisica: 'Posição em função do tempo é a função mais importante da física inteira.'
      },
      steps: [
        { kind: 'contexto', html: `
          <p>Uma caneta custa R$ 5. Quanto você gasta comprando 3?</p>
          <table class="table-mini">
            <tr><td>1 caneta</td><td>R$ 5</td></tr>
            <tr><td>2 canetas</td><td>R$ 10</td></tr>
            <tr><td>3 canetas</td><td>R$ 15</td></tr>
          </table>
          <p>Você respondeu sem pensar. E acabou de usar uma função.</p>`,
          alt: { cotidiano: 'Máquina de café: você aperta um botão (entrada) e sai uma bebida (saída). Mesmo botão, mesma bebida, sempre.' }
        },
        { kind: 'explicacao', html: `
          <p>A regra que você usou tem nome:</p>
          <div class="math-block">P(x) = 5x</div>
          <p>Lê-se "P de x". <strong>Não é multiplicação</strong> — é "a máquina P aplicada em x". Essa confusão trava muita gente logo no começo.</p>
          <p>Uma função tem uma exigência só: <strong>uma entrada, uma saída</strong>. A mesma entrada nunca pode dar dois resultados diferentes.</p>`,
          alt: {
            simples: 'f(x) significa "coloque x na regra f e veja o que sai".',
            visual: 'Desenhe uma caixa. Uma seta entrando com x, uma seta saindo com f(x). É isso.',
            passos: '1) Veja a regra. 2) Troque todo x pelo número. 3) Faça a conta.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Se <span class="math">f(x) = 2x + 1</span>, quanto é f(4)?</p>
          <p>Troque todo x por 4:</p>
          <div class="math-block">f(4) = 2·4 + 1 = 9</div>
          <p>E f(0)? Também troca: 2·0 + 1 = 1. Nada de místico, é só substituição.</p>`,
          alt: { outro: 'g(x) = x² − 3. Então g(5) = 25 − 3 = 22, e g(−2) = 4 − 3 = 1.' }
        },
        { kind: 'visual', html: `<p>Arraste a entrada e acompanhe a máquina rodando. O ponto no gráfico é o registro de cada entrega.</p>`,
          viz: { type: 'maquina' } },
        { kind: 'guiado',  exercise: 'fu-g1' },
        { kind: 'sozinho', exercise: 'fu-s1' },
        { kind: 'revisao', html: `<p>Função é máquina: entra um número, sai outro, sempre pela mesma regra. f(x) se lê "f de x". O gráfico é o registro de todas as entregas.</p>` }
      ]
    },

    {
      id: 'fu2', topic: 'funcoes', title: 'Reta: o que a inclinação significa',
      why: 'A derivada é inclinação. Se você entende inclinação de reta agora, metade do assunto de derivada já está resolvido.',
      steps: [
        { kind: 'contexto', html: `
          <p>Um plano de celular cobra R$ 30 fixos mais R$ 2 por giga. A conta é:</p>
          <div class="math-block">C(x) = 2x + 30</div>
          <p>O 30 é onde você começa. O 2 é o quanto sobe a cada giga.</p>`,
          alt: { cotidiano: 'Corrida de app: bandeirada fixa + valor por quilômetro. Mesma estrutura.' }
        },
        { kind: 'explicacao', html: `
          <p>Toda função <span class="math">f(x) = ax + b</span> desenha uma reta.</p>
          <ul>
            <li><strong>b</strong> é onde a reta corta o eixo vertical — o ponto de partida</li>
            <li><strong>a</strong> é a <strong>inclinação</strong>: quanto o resultado sobe quando x anda 1</li>
          </ul>
          <p>Se a for negativo, a reta desce. Se for zero, ela fica deitada.</p>`,
          alt: {
            visual: 'Inclinação é a "rampa". a = 2 significa: ande 1 para a direita, suba 2. a = −1: ande 1 para a direita, desça 1.',
            simples: 'b = onde começa. a = quanto sobe por passo.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Inclinação entre dois pontos é sempre <strong>subida dividida por avanço</strong>:</p>
          <div class="math-block">a = (y₂ − y₁) / (x₂ − x₁)</div>
          <p>De (1, 5) até (3, 11): subiu 6, avançou 2. Inclinação = 6/2 = 3.</p>
          <p>Guarde essa fórmula. Ela é literalmente a definição de derivada, só que com os dois pontos bem pertinho.</p>`,
          alt: { passos: '1) Subtraia os y. 2) Subtraia os x. 3) Divida o primeiro pelo segundo.' }
        },
        { kind: 'visual', html: `<p>Mexa em a e b e veja a reta responder.</p>`,
          viz: { type: 'reta' } },
        { kind: 'guiado',  exercise: 'fu-g2' },
        { kind: 'sozinho', exercise: 'fu-s2' },
        { kind: 'revisao', html: `<p>Reta é ax + b. O b posiciona, o a inclina. Inclinação é subida ÷ avanço — a mesma conta que vai virar derivada.</p>` }
      ]
    },

    {
      id: 'fu3', topic: 'funcoes', title: 'Parábola e o ponto de virada',
      why: 'Problemas de máximo e mínimo em prova quase sempre chegam numa parábola. E o vértice é onde a derivada zera.',
      steps: [
        { kind: 'contexto', html: `
          <p>Jogue uma bola para cima. Ela sobe, para no ar por um instante, e desce.</p>
          <p>Esse desenho é uma parábola — o gráfico de <span class="math">f(x) = ax² + bx + c</span>.</p>`,
          alt: { cotidiano: 'Jato de água de um bebedouro faz exatamente essa curva.' }
        },
        { kind: 'explicacao', html: `
          <p>O que muda tudo é o sinal do <strong>a</strong>:</p>
          <ul>
            <li><span class="math">a &gt; 0</span> → boca para cima, tem <strong>ponto mínimo</strong></li>
            <li><span class="math">a &lt; 0</span> → boca para baixo, tem <strong>ponto máximo</strong></li>
          </ul>
          <p>Esse ponto de virada se chama <strong>vértice</strong>, e fica em:</p>
          <div class="math-block">x = −b / (2a)</div>`,
          alt: { visual: 'a positivo é uma tigela (segura água). a negativo é uma tigela virada (a água escorre).' }
        },
        { kind: 'exemplo', html: `
          <p>Em <span class="math">f(x) = x² − 4x + 3</span>: a = 1, b = −4.</p>
          <div class="math-block">x = −(−4) / (2·1) = 4/2 = 2</div>
          <p>Substituindo: f(2) = 4 − 8 + 3 = −1. O vértice é (2, −1), o ponto mais baixo da curva.</p>`,
          alt: { dica: 'Cuidado com o sinal do b: se b já é negativo, o −b vira positivo.' }
        },
        { kind: 'visual', html: `<p>Mexa nos coeficientes. Repare que o vértice é o único lugar onde a curva não está nem subindo nem descendo — segure essa ideia até a aula de derivada.</p>`,
          viz: { type: 'parabola' } },
        { kind: 'guiado',  exercise: 'fu-g3' },
        { kind: 'sozinho', exercise: 'fu-s3' },
        { kind: 'revisao', html: `<p>Parábola vem de x². O sinal de a decide se ela tem máximo ou mínimo. O vértice fica em −b/2a — e é o ponto onde a inclinação é zero.</p>` }
      ]
    },

    /* ═══════════════ PRÉ-CÁLCULO ═══════════════ */
    {
      id: 'pc1', topic: 'precalculo', title: 'Potências e crescimento exponencial',
      why: 'A regra da potência é a primeira regra de derivada que você aprende. E exponencial é a função que mais aparece em prova de Cálculo.',
      whyByArea: {
        compe: 'Complexidade de algoritmo é exatamente isso: O(n²) cresce como potência, O(2ⁿ) cresce como exponencial. A diferença entre um programa que roda e um que trava.',
        cc: 'Complexidade de algoritmo é exatamente isso: O(n²) cresce como potência, O(2ⁿ) cresce como exponencial.'
      },
      steps: [
        { kind: 'contexto', html: `
          <p>Uma folha de papel dobrada 20 vezes teria mais de 10 km de espessura. Parece mentira, mas é só <span class="math">2²⁰</span>.</p>
          <p>Crescimento exponencial engana a intuição. Por isso vale entender direito.</p>`,
          alt: { cotidiano: 'Juros compostos: o dinheiro rende sobre o que já rendeu. É exponencial, e por isso dívida de cartão vira bola de neve.' }
        },
        { kind: 'explicacao', html: `
          <p>As regras que você vai usar em toda derivada:</p>
          <ul>
            <li><span class="math">xᵃ · xᵇ = xᵃ⁺ᵇ</span> — mesma base multiplicando, soma expoentes</li>
            <li><span class="math">xᵃ / xᵇ = xᵃ⁻ᵇ</span> — dividindo, subtrai</li>
            <li><span class="math">(xᵃ)ᵇ = xᵃᵇ</span> — potência de potência, multiplica</li>
            <li><span class="math">x⁻ᵃ = 1/xᵃ</span> — expoente negativo vira fração</li>
            <li><span class="math">x⁰ = 1</span> — sempre, para qualquer x ≠ 0</li>
          </ul>
          <p>A quarta é a mais importante para Cálculo: é ela que deixa você derivar <span class="math">1/x</span> escrevendo <span class="math">x⁻¹</span>.</p>`,
          alt: { simples: 'Multiplicando soma expoente. Dividindo subtrai. Potência de potência multiplica. Negativo vira fração.' }
        },
        { kind: 'exemplo', html: `
          <div class="math-block">2³ · 2² = 2⁵ = 32</div>
          <p>Confira: 8 × 4 = 32. Bateu.</p>
          <div class="math-block">1/x³ = x⁻³</div>
          <p>Reescrever assim é o truque que transforma uma fração assustadora numa potência simples de derivar.</p>`,
          alt: { outro: 'x⁵ / x² = x³. E (x²)⁴ = x⁸.' }
        },
        { kind: 'visual', html: `<p>Compare crescimento linear e exponencial no mesmo gráfico. No começo parecem parecidos. Depois não.</p>`,
          viz: { type: 'expo' } },
        { kind: 'guiado',  exercise: 'pc-g1' },
        { kind: 'sozinho', exercise: 'pc-s1' },
        { kind: 'revisao', html: `<p>Cinco regras de potência resolvem quase tudo. A que mais importa em Cálculo é x⁻ᵃ = 1/xᵃ, porque ela transforma fração em potência.</p>` }
      ]
    },

    {
      id: 'pc2', topic: 'precalculo', title: 'Logaritmo é uma pergunta',
      why: 'Logaritmo aparece em derivada, em integral e em toda modelagem de crescimento. E ele é bem mais simples do que a fama sugere.',
      steps: [
        { kind: 'contexto', html: `
          <p>Todo logaritmo é uma pergunta só:</p>
          <p class="center" style="font-family:var(--display);font-size:19px;font-weight:600">"A base elevada a quanto dá esse número?"</p>`,
          alt: { simples: 'log é o expoente que faltava.' }
        },
        { kind: 'explicacao', html: `
          <div class="math-block">log₂ 8 = 3 &nbsp;&nbsp;porque&nbsp;&nbsp; 2³ = 8</div>
          <p>Log e potência são a mesma informação escrita de dois jeitos. Um desfaz o outro.</p>
          <p>As propriedades seguem daí:</p>
          <ul>
            <li><span class="math">log(a·b) = log a + log b</span></li>
            <li><span class="math">log(a/b) = log a − log b</span></li>
            <li><span class="math">log(aⁿ) = n · log a</span></li>
          </ul>`,
          alt: { visual: 'Log transforma multiplicação em soma. Era assim que se multiplicava número grande antes da calculadora.' }
        },
        { kind: 'exemplo', html: `
          <p>Quanto é <span class="math">log₃ 81</span>?</p>
          <p>Pergunte: 3 elevado a quanto dá 81? Vá contando: 3, 9, 27, 81. Quatro passos.</p>
          <div class="math-block">log₃ 81 = 4</div>`,
          alt: { passos: '1) Leia a base. 2) Vá multiplicando a base por ela mesma. 3) Conte quantas vezes até chegar no número.' }
        },
        { kind: 'visual', html: `
          <p>Uma dupla que vale decorar: <span class="math">ln</span> é o log de base <span class="math">e</span> (≈ 2,718). É o que aparece em praticamente toda prova de Cálculo, porque a derivada de <span class="math">ln x</span> é simplesmente <span class="math">1/x</span>.</p>` },
        { kind: 'guiado',  exercise: 'pc-g2' },
        { kind: 'sozinho', exercise: 'pc-s2' },
        { kind: 'revisao', html: `<p>Log é o expoente que faltava. Ele desfaz a potência. Multiplicação vira soma. E ln é o log de base e — o que você mais vai ver.</p>` }
      ]
    },

    /* ═══════════════ LIMITES ═══════════════ */
    {
      id: 'li1', topic: 'limites', title: 'Chegar perto sem poder tocar',
      why: 'Limite existe para responder perguntas onde a conta direta quebra. Sem ele, derivada não teria como ser definida.',
      steps: [
        { kind: 'contexto', html: `
          <p>Qual é a velocidade do carro <em>exatamente neste instante</em>?</p>
          <p>Velocidade é distância dividida por tempo. Mas num instante, o tempo é zero — e você não pode dividir por zero.</p>
          <p>A saída: medir em intervalos cada vez menores e ver para onde o resultado aponta. Isso é limite.</p>`,
          alt: {
            cotidiano: 'Você se aproxima de uma parede pela metade da distância, sempre. Nunca encosta, mas fica claro onde vai parar.',
            simples: 'Limite responde "para onde isso está indo?", não "quanto vale exatamente ali".'
          }
        },
        { kind: 'explicacao', html: `
          <p>Notação:</p>
          <div class="math-block">lim<sub>x→a</sub> f(x) = L</div>
          <p>Lê-se: "quando x se aproxima de a, f(x) se aproxima de L".</p>
          <p>Detalhe que muda tudo: <strong>o limite não pergunta quanto vale f(a)</strong>. A função pode nem existir naquele ponto. Ele só olha a vizinhança.</p>
          <p>E precisa valer dos <strong>dois lados</strong>. Se pela esquerda aponta para 2 e pela direita para 5, o limite não existe.</p>`,
          alt: {
            visual: 'Imagine um buraco na estrada. Você consegue ver perfeitamente para onde a estrada ia, mesmo sem pisar no buraco.',
            passos: '1) Tente substituir. 2) Se der número, acabou. 3) Se der 0/0, fatore ou simplifique. 4) Substitua de novo.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Calcule <span class="math">lim<sub>x→1</sub> (x² − 1)/(x − 1)</span>.</p>
          <p>Substituindo direto: 0/0. Isso não é resposta, é aviso de que dá para simplificar.</p>
          <p>Fatore o de cima (diferença de quadrados):</p>
          <div class="math-block">(x−1)(x+1) / (x−1) = x + 1</div>
          <p>Agora substitua: 1 + 1 = <strong>2</strong>. Note que a função nunca existiu em x = 1 — mas o limite existe e vale 2.</p>`,
          alt: { dica: 'Sempre que der 0/0, o caminho quase sempre é fatorar. Foi por isso que valeu a pena aprender produtos notáveis.' }
        },
        { kind: 'visual', html: `<p>Aproxime pelos dois lados e veja os números convergindo para o mesmo valor.</p>`,
          viz: { type: 'limite' } },
        { kind: 'guiado',  exercise: 'li-g1' },
        { kind: 'sozinho', exercise: 'li-s1' },
        { kind: 'revisao', html: `<p>Limite é para onde a função aponta, não quanto ela vale. Precisa concordar dos dois lados. E 0/0 não é resposta — é convite para fatorar.</p>` }
      ]
    },

    /* ═══════════════ DERIVADAS ═══════════════ */
    {
      id: 'de1', topic: 'derivadas', title: 'Por que a derivada existe',
      why: 'Derivada é a resposta a uma pergunta concreta: quão rápido isso está mudando agora?',
      whyByArea: {
        compe: 'Taxa de amostragem de sensor, variação de latência, gradiente que treina uma rede neural — tudo é derivada. Descida de gradiente é literalmente seguir a derivada ladeira abaixo.',
        econ: 'Custo marginal é a derivada do custo total. Quando o economista diz "marginal", ele está dizendo "derivada".',
        fisica: 'Velocidade é a derivada da posição. Aceleração é a derivada da velocidade. É a linguagem básica da mecânica.'
      },
      steps: [
        { kind: 'contexto', html: `
          <p>Um carro percorre 100 km em 2 horas. Velocidade média: 50 km/h.</p>
          <p>Mas ele não andou a 50 o tempo todo. Parou em semáforo, acelerou na estrada. A pergunta interessante é outra: <strong>que velocidade ele marcava às 14h37min12s?</strong></p>
          <p>Média não responde isso. Derivada responde.</p>`,
          alt: { cotidiano: 'O velocímetro do carro mostra derivada em tempo real. Ele não mostra a média da viagem — mostra o agora.' }
        },
        { kind: 'explicacao', html: `
          <p>A ideia é medir a variação num intervalo e depois encolher esse intervalo até quase zero:</p>
          <div class="math-block">f′(x) = lim<sub>h→0</sub> [ f(x+h) − f(x) ] / h</div>
          <p>Aquele quociente é só <strong>subida ÷ avanço</strong> — a mesma inclinação da aula de reta. A novidade é o limite, encolhendo o avanço até virar um ponto só.</p>
          <p>No gráfico: a reta que corta a curva em dois pontos gira até encostar num ponto só. Essa é a <strong>tangente</strong>, e sua inclinação é a derivada.</p>`,
          alt: {
            visual: 'Duas tachinhas numa curva com um barbante esticado entre elas. Deslize uma tachinha em direção à outra: o barbante gira até tangenciar a curva.',
            simples: 'Derivada = inclinação da curva naquele ponto exato.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Vamos derivar <span class="math">f(x) = x²</span> na marra:</p>
          <div class="math-block">[(x+h)² − x²] / h</div>
          <p>Abra o quadrado: x² + 2xh + h² − x², que sobra 2xh + h².</p>
          <div class="math-block">(2xh + h²) / h = 2x + h</div>
          <p>Agora faça h ir a zero. Sobra <strong>2x</strong>.</p>
          <p>É daí que vem a regra pronta que você vai usar na prova.</p>`,
          alt: { passos: '1) Monte o quociente. 2) Abra e simplifique. 3) Corte o h. 4) Faça h → 0.' }
        },
        { kind: 'visual', html: `<p>Encoste o segundo ponto no primeiro e veja a secante virar tangente. Acompanhe o número convergindo.</p>`,
          viz: { type: 'tangente' } },
        { kind: 'guiado',  exercise: 'de-g1' },
        { kind: 'sozinho', exercise: 'de-s1' },
        { kind: 'revisao', html: `<p>Derivada é inclinação instantânea. Nasce de subida ÷ avanço com o avanço indo a zero. E ela é uma função nova: dá a inclinação em cada ponto.</p>` }
      ]
    },

    {
      id: 'de2', topic: 'derivadas', title: 'As regras que você vai usar sempre',
      why: 'Ninguém deriva pela definição na prova. Você usa as regras — mas só depois de entender de onde elas vieram.',
      steps: [
        { kind: 'contexto', html: `
          <p>Fazer o limite toda vez seria inviável. Felizmente o padrão se repete, e virou regra.</p>` },
        { kind: 'explicacao', html: `
          <p><strong>Potência</strong> — a mais usada de todas:</p>
          <div class="math-block">(xⁿ)′ = n · xⁿ⁻¹</div>
          <p>Desce o expoente multiplicando e diminui um.</p>
          <ul>
            <li><strong>Constante:</strong> (5)′ = 0 — número parado não varia</li>
            <li><strong>Constante vezes função:</strong> (3x²)′ = 3·(x²)′ = 6x</li>
            <li><strong>Soma:</strong> derive cada pedaço separadamente</li>
            <li><strong>Produto:</strong> (u·v)′ = u′v + uv′</li>
            <li><strong>Cadeia:</strong> derive de fora para dentro e multiplique pela derivada de dentro</li>
          </ul>`,
          alt: { simples: 'Potência: desce e diminui. Constante: some. Soma: um de cada vez. Produto e cadeia: têm fórmula própria.' }
        },
        { kind: 'exemplo', html: `
          <p>Derive <span class="math">f(x) = 3x⁴ − 5x + 7</span>.</p>
          <p>Um termo de cada vez:</p>
          <ul>
            <li>3x⁴ → 3 · 4x³ = 12x³</li>
            <li>−5x → −5 (o x¹ vira x⁰ = 1)</li>
            <li>7 → 0</li>
          </ul>
          <div class="math-block">f′(x) = 12x³ − 5</div>`,
          alt: { outro: 'g(x) = x³ + 2x² → g′(x) = 3x² + 4x.', dica: 'Constante sozinha sempre morre. Constante multiplicando sempre sobrevive.' }
        },
        { kind: 'visual', html: `<p>Mova o ponto e compare: em cima a curva, embaixo o valor da derivada. Onde a curva vira, a derivada cruza o zero.</p>`,
          viz: { type: 'tangente' } },
        { kind: 'guiado',  exercise: 'de-g2' },
        { kind: 'sozinho', exercise: 'de-s2' },
        { kind: 'revisao', html: `<p>Regra da potência resolve a maioria. Constante vira zero. Soma se deriva termo a termo. Produto e cadeia exigem fórmula — e são o que mais cai em prova.</p>` }
      ]
    },

    {
      id: 'de3', topic: 'derivadas', title: 'Máximos, mínimos e otimização',
      why: 'É o tipo de questão que mais cai em prova de Cálculo I: "encontre o valor que maximiza...".',
      steps: [
        { kind: 'contexto', html: `
          <p>No topo de uma subida, por um instante você não está mais subindo nem já descendo. A inclinação ali é <strong>zero</strong>.</p>` },
        { kind: 'explicacao', html: `
          <p>Isso vira um método:</p>
          <ol style="padding-left:20px;color:var(--ink-2)">
            <li>Derive a função</li>
            <li>Iguale a derivada a zero e resolva</li>
            <li>Esses x são os <strong>pontos críticos</strong></li>
            <li>Veja o sinal da derivada antes e depois para saber se é máximo ou mínimo</li>
          </ol>
          <p>Derivada positiva → subindo. Negativa → descendo. Se passa de positiva para negativa, você achou um <strong>máximo</strong>.</p>`,
          alt: { visual: 'Ande sobre o gráfico. Enquanto sobe, derivada positiva. Quando começa a descer, virou negativa. O topo é o ponto exato da virada.' }
        },
        { kind: 'exemplo', html: `
          <p>Ache o mínimo de <span class="math">f(x) = x² − 4x + 3</span>.</p>
          <div class="math-block">f′(x) = 2x − 4</div>
          <p>Iguale a zero: 2x − 4 = 0, então x = 2.</p>
          <p>Antes de 2 a derivada é negativa (descendo), depois é positiva (subindo). Logo x = 2 é <strong>mínimo</strong>.</p>
          <p>Repare: é o mesmo vértice que você achou com −b/2a na aula de parábola. Dois caminhos, mesmo destino.</p>`,
          alt: { passos: '1) Derive. 2) Iguale a zero. 3) Resolva. 4) Teste o sinal antes e depois.' }
        },
        { kind: 'visual', html: `<p>Procure o ponto onde a inclinação zera.</p>`,
          viz: { type: 'parabola' } },
        { kind: 'guiado',  exercise: 'de-g3' },
        { kind: 'sozinho', exercise: 'de-s3' },
        { kind: 'revisao', html: `<p>Derivada zero marca os candidatos a máximo e mínimo. O sinal da derivada antes e depois decide qual é qual.</p>` }
      ]
    },

    /* ═══════════════ INTEGRAIS ═══════════════ */
    {
      id: 'in1', topic: 'integrais', title: 'Somar fatias para achar área',
      why: 'Área, volume, trabalho, distância percorrida, probabilidade acumulada — tudo isso é integral.',
      steps: [
        { kind: 'contexto', html: `
          <p>Qual a área de uma forma torta? Ninguém sabe de cabeça.</p>
          <p>Mas todo mundo sabe a área de um retângulo. Então: cubra o espaço com retângulos, some, e vá afinando.</p>`,
          alt: { cotidiano: 'Estimar a área de um terreno irregular colocando lajotas quadradas por cima. Lajota menor, estimativa melhor.' }
        },
        { kind: 'explicacao', html: `
          <p>Com poucos retângulos a estimativa é grosseira. Com muitos, ela chega perto. Com infinitos retângulos infinitamente finos, ela acerta.</p>
          <div class="math-block">∫<sub>a</sub><sup>b</sup> f(x) dx</div>
          <p>O símbolo ∫ é um "S" esticado de <strong>soma</strong>. E <span class="math">dx</span> é a largura de cada fatia — infinitamente fina.</p>`,
          alt: { simples: 'Integral é somar infinitas fatias finas para achar área exata.' }
        },
        { kind: 'exemplo', html: `
          <p>Área sob <span class="math">f(x) = x²</span> entre 0 e 2.</p>
          <p>Com 10 retângulos por cima você chega em 3,08. Por baixo, 2,28. O valor verdadeiro está espremido entre os dois.</p>
          <p>Aumentando o número de retângulos, o aperto fecha em <span class="math">8/3 ≈ 2,667</span>.</p>`,
          alt: { dica: 'Estimar por cima e por baixo ao mesmo tempo é o truque que mostra que existe um único valor possível no meio.' }
        },
        { kind: 'visual', html: `<p>Aumente o número de retângulos e veja o erro despencar.</p>`,
          viz: { type: 'riemann' } },
        { kind: 'guiado',  exercise: 'in-g1' },
        { kind: 'sozinho', exercise: 'in-s1' },
        { kind: 'revisao', html: `<p>Integral é soma de fatias. O ∫ é um S de soma. Mais fatias, menos erro. No limite, o valor é exato.</p>` }
      ]
    },

    {
      id: 'in2', topic: 'integrais', title: 'Integral desfaz derivada',
      why: 'É o Teorema Fundamental do Cálculo — o motivo de derivada e integral morarem na mesma matéria.',
      steps: [
        { kind: 'contexto', html: `
          <p>Somar infinitas fatias parece impossível na prática. E seria — se não existisse um atalho absurdo.</p>` },
        { kind: 'explicacao', html: `
          <p>O atalho: para achar a área, procure uma função cuja <strong>derivada</strong> seja a função original. Depois é só subtrair as pontas.</p>
          <div class="math-block">∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)</div>
          <p>onde <span class="math">F′(x) = f(x)</span>.</p>
          <p>Integrar é perguntar: <em>"de quem isso é derivada?"</em></p>`,
          alt: {
            visual: 'Derivada e integral são um par de setas em sentidos opostos ligando as mesmas duas funções.',
            simples: 'Ache quem, ao ser derivado, dá a sua função. Depois calcule nas pontas e subtraia.'
          }
        },
        { kind: 'exemplo', html: `
          <p>Volte à área sob x² de 0 a 2.</p>
          <p>Quem tem derivada x²? Como derivar desce o expoente, para subir você faz o contrário: <span class="math">x³/3</span>.</p>
          <p>Confira: (x³/3)′ = 3x²/3 = x². Certo.</p>
          <div class="math-block">2³/3 − 0³/3 = 8/3 ≈ 2,667</div>
          <p>O mesmo número dos retângulos — mas em três linhas, sem somar nada.</p>`,
          alt: { passos: '1) Ache F com F′ = f. 2) Calcule F no limite de cima. 3) Calcule no de baixo. 4) Subtraia.' }
        },
        { kind: 'visual', html: `
          <p>A regra prática, o inverso da regra da potência:</p>
          <div class="math-block">∫ xⁿ dx = xⁿ⁺¹/(n+1) + C</div>
          <p>Sobe um no expoente e divide por ele. O <span class="math">+C</span> aparece porque toda constante some ao derivar — então ao voltar, você não sabe qual constante estava lá.</p>` },
        { kind: 'guiado',  exercise: 'in-g2' },
        { kind: 'sozinho', exercise: 'in-s2' },
        { kind: 'revisao', html: `
          <p>Integral desfaz derivada. Para integrar xⁿ: sobe um e divide. Não esqueça o +C na integral indefinida — é ponto perdido em prova.</p>
          <p>Se você chegou até aqui: você percorreu o caminho inteiro, de somar frações até o Teorema Fundamental do Cálculo.</p>` }
      ]
    }
  ];

  let byId = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
  const byTopic = (topicId) => LESSONS.filter((l) => l.topic === topicId);

  /**
   * Registra aulas de outro módulo de conteúdo.
   * É o que permite manter cada trilha (cálculo, vetores) no seu próprio
   * arquivo sem que nenhum deles precise conhecer o outro.
   */
  function register(extra) {
    extra.forEach((l) => LESSONS.push(l));
    byId = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
    CZ.lessons.byId = byId;
  }

  const KIND_LABEL = {
    contexto: 'Contexto',
    explicacao: 'Explicação',
    exemplo: 'Exemplo',
    visual: 'Visualize',
    guiado: 'Exercício guiado',
    sozinho: 'Agora você',
    revisao: 'Revisão'
  };

  const HELP_LABEL = {
    simples:   'Explicar mais simples',
    cotidiano: 'Exemplo do dia a dia',
    visual:    'Explicar visualmente',
    passos:    'Passo a passo',
    dica:      'Só uma dica',
    outro:     'Outro exemplo'
  };

  CZ.lessons = { LESSONS, byTopic, byId, register, KIND_LABEL, HELP_LABEL };
})(window.CZ);
