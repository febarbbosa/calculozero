/* ==========================================================================
   data/diagnostic.js — banco de questões do diagnóstico inicial.

   `d` = dificuldade dentro do nível (1 = tranquila, 3 = exige domínio).
   O motor começa pelas fáceis e só sobe de nível enquanto o aluno acerta,
   para que o diagnóstico não vire uma humilhação de 40 questões.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const QUESTIONS = [
    /* ---------------- Nível 0 · Aritmética ---------------- */
    { id: 'a1', level: 'aritmetica', d: 1, skill: 'operações',
      prompt: 'Quanto é 7 × 8?',
      opts: ['54', '56', '48', '64'], answer: 1 },

    { id: 'a2', level: 'aritmetica', d: 1, skill: 'negativos',
      prompt: 'Quanto é −5 + 3?',
      opts: ['−8', '−2', '2', '8'], answer: 1 },

    { id: 'a3', level: 'aritmetica', d: 2, skill: 'ordem das operações',
      prompt: 'Quanto é 2 + 3 × 4?',
      opts: ['20', '14', '24', '9'], answer: 1,
      why: 'Multiplicação vem antes da soma. Primeiro 3×4=12, depois 2+12.' },

    { id: 'a4', level: 'aritmetica', d: 2, skill: 'frações',
      prompt: 'Quanto é 1/2 + 1/4?',
      opts: ['2/6', '1/6', '3/4', '2/4'], answer: 2,
      why: 'Iguale os denominadores: 1/2 vira 2/4. Aí 2/4 + 1/4 = 3/4.' },

    { id: 'a5', level: 'aritmetica', d: 3, skill: 'porcentagem',
      prompt: '20% de 250 é quanto?',
      opts: ['25', '40', '50', '60'], answer: 2,
      why: '20% = 20/100 = 0,2. Então 0,2 × 250 = 50.' },

    /* ---------------- Nível 1 · Álgebra ---------------- */
    { id: 'b1', level: 'algebra', d: 1, skill: 'equação simples',
      prompt: 'Se 2x + 5 = 15, quanto vale x?',
      opts: ['5', '10', '7,5', '2'], answer: 0,
      why: 'Tire o 5 dos dois lados → 2x = 10. Divida por 2 → x = 5.' },

    { id: 'b2', level: 'algebra', d: 2, skill: 'expressões',
      prompt: 'Se x = 3, quanto vale 2x² − 4?',
      opts: ['14', '32', '8', '2'], answer: 0,
      why: 'Primeiro a potência: 3² = 9. Depois 2×9 = 18, e 18 − 4 = 14.' },

    { id: 'b3', level: 'algebra', d: 2, skill: 'produtos notáveis',
      prompt: 'Qual é o resultado de (x + 3)²?',
      opts: ['x² + 9', 'x² + 3x + 9', 'x² + 6x + 9', 'x² + 6x + 3'], answer: 2,
      why: '(a+b)² = a² + 2ab + b². Aqui: x² + 2·x·3 + 3² = x² + 6x + 9.' },

    { id: 'b4', level: 'algebra', d: 3, skill: 'fatoração',
      prompt: 'x² − 9 é o mesmo que:',
      opts: ['(x−3)(x+3)', '(x−9)(x+1)', '(x−3)²', '(x+9)(x−1)'], answer: 0,
      why: 'Diferença de quadrados: a² − b² = (a−b)(a+b).' },

    /* ---------------- Nível 2 · Funções ---------------- */
    { id: 'c1', level: 'funcoes', d: 1, skill: 'notação',
      prompt: 'Se f(x) = 3x + 1, quanto vale f(4)?',
      opts: ['12', '13', '7', '34'], answer: 1,
      why: 'Troque todo x por 4: 3×4 + 1 = 13.' },

    { id: 'c2', level: 'funcoes', d: 2, skill: 'gráfico',
      prompt: 'O gráfico de f(x) = 2x + 1 é:',
      opts: ['Uma parábola', 'Uma reta', 'Um círculo', 'Uma curva exponencial'], answer: 1,
      why: 'Toda função do tipo ax + b é uma reta. O a controla a inclinação.' },

    { id: 'c3', level: 'funcoes', d: 2, skill: 'quadrática',
      prompt: 'O gráfico de f(x) = x² tem seu ponto mais baixo em:',
      opts: ['x = 1', 'x = 0', 'x = −1', 'Não tem ponto mais baixo'], answer: 1,
      why: 'Qualquer número ao quadrado é ≥ 0, e só dá 0 quando x = 0.' },

    { id: 'c4', level: 'funcoes', d: 3, skill: 'domínio',
      prompt: 'Qual valor de x NÃO pode entrar em f(x) = 1/(x − 2)?',
      opts: ['x = 0', 'x = 1', 'x = 2', 'Todos podem'], answer: 2,
      why: 'Em x = 2 o denominador vira zero, e divisão por zero não existe.' },

    /* ---------------- Nível 3 · Pré-Cálculo ---------------- */
    { id: 'd1', level: 'precalculo', d: 1, skill: 'potências',
      prompt: 'Quanto é 2³ × 2²?',
      opts: ['2⁵', '2⁶', '4⁵', '2⁹'], answer: 0,
      why: 'Mesma base multiplicando: some os expoentes. 3 + 2 = 5.' },

    { id: 'd2', level: 'precalculo', d: 2, skill: 'logaritmo',
      prompt: 'log₂ 8 é igual a:',
      opts: ['2', '3', '4', '8'], answer: 1,
      why: 'A pergunta do log é "2 elevado a quanto dá 8?". Resposta: 3.' },

    { id: 'd3', level: 'precalculo', d: 3, skill: 'trigonometria',
      prompt: 'Quanto vale sen(0)?',
      opts: ['0', '1', '−1', 'Indefinido'], answer: 0,
      why: 'No círculo trigonométrico, o seno é a altura. No ângulo 0 a altura é 0.' },

    /* ---------------- Nível 4 · Cálculo ---------------- */
    { id: 'e1', level: 'calculo', d: 1, skill: 'limites',
      prompt: 'Quanto é lim (x→2) de (x + 3)?',
      opts: ['2', '3', '5', 'Não existe'], answer: 2,
      why: 'A função é bem-comportada em x=2, então basta substituir: 2+3 = 5.' },

    { id: 'e2', level: 'calculo', d: 2, skill: 'derivadas',
      prompt: 'Qual é a derivada de f(x) = x³?',
      opts: ['3x²', 'x²', '3x', 'x⁴/4'], answer: 0,
      why: 'Regra da potência: desce o expoente e diminui um. x³ → 3x².' },

    { id: 'e3', level: 'calculo', d: 2, skill: 'aplicações',
      prompt: 'Se f′(a) = 0, o que costuma acontecer em x = a?',
      opts: ['A função vale zero', 'A curva tem um pico ou vale', 'A função não existe', 'O gráfico é vertical'], answer: 1,
      why: 'Inclinação zero significa que a curva parou de subir ou de descer.' },


    /* ---------------- Nível 5 · Vetores ---------------- */
    { id: 'f1', level: 'vetores', d: 1, skill: 'conceito',
      prompt: 'O que diferencia um vetor de um número comum (escalar)?',
      opts: ['O vetor é sempre maior', 'O vetor tem direção e sentido', 'O vetor é sempre negativo', 'Não há diferença'], answer: 1,
      why: 'Escalar tem só tamanho. Vetor tem tamanho, direção e sentido.' },

    { id: 'f2', level: 'vetores', d: 1, skill: 'operações',
      prompt: 'Se u = (2, 1) e v = (1, 3), quanto é u + v?',
      opts: ['(3, 4)', '(2, 3)', '(1, 2)', '(3, 3)'], answer: 0,
      why: 'Soma de vetores é componente a componente: (2+1, 1+3).' },

    { id: 'f3', level: 'vetores', d: 2, skill: 'módulo',
      prompt: 'Qual é o módulo do vetor u = (3, 4)?',
      opts: ['7', '5', '12', '25'], answer: 1,
      why: 'Módulo é Pitágoras: √(3² + 4²) = √25 = 5.' },

    { id: 'f4', level: 'vetores', d: 2, skill: 'produto escalar',
      prompt: 'Quanto é ⟨u, v⟩ para u = (2, 3) e v = (1, −1)?',
      opts: ['5', '−1', '1', '(2, −3)'], answer: 1,
      why: 'Multiplique componente a componente e some: 2·1 + 3·(−1) = 2 − 3 = −1.' },

    { id: 'f5', level: 'vetores', d: 3, skill: 'ortogonalidade',
      prompt: 'Dois vetores são perpendiculares quando o produto escalar entre eles é:',
      opts: ['Máximo', 'Igual a 1', 'Igual a zero', 'Negativo'], answer: 2,
      why: 'u·v = |u||v|cos θ. Em 90° o cosseno é zero, então o produto todo zera.' },

    { id: 'f6', level: 'vetores', d: 3, skill: 'LI/LD',
      prompt: 'Os vetores (1, 2) e (2, 4) são:',
      opts: ['LI — independentes', 'LD — um é múltiplo do outro', 'Perpendiculares', 'Uma base do R²'], answer: 1,
      why: '(2,4) = 2·(1,2). Um é múltiplo do outro, então são LD e só alcançam uma reta.' },

    { id: 'e4', level: 'calculo', d: 3, skill: 'integrais',
      prompt: 'Qual função tem derivada igual a 2x?',
      opts: ['2', 'x²', '2x²', 'x³'], answer: 1,
      why: 'A derivada de x² é 2x. Integrar é fazer essa pergunta ao contrário.' }
  ];

  const ORDER = ['aritmetica', 'algebra', 'funcoes', 'precalculo', 'calculo', 'vetores'];

  CZ.diagnosticBank = { QUESTIONS, ORDER };
})(window.CZ);
