/* ==========================================================================
   data/exams.js — simulados.

   O simulado é declarado, não escrito questão a questão: cada um define um
   escopo (disciplina, módulo ou lista de tópicos) e um plano de prova —
   quantas questões de cada nível. As questões saem das fichas daquele
   escopo.

   A vantagem é que o simulado cresce junto com o conteúdo: escrever uma
   ficha nova aumenta automaticamente o banco de onde o simulado sorteia,
   sem que ninguém precise editar este arquivo.

   A montagem em si está em core/exams.js — aqui é só conteúdo.
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  CZ.examBank = {
    EXAMS: [
      {
        id: 'sim-mat-basica',
        name: 'Simulado — Matemática Básica',
        blurb: 'Sinais, ordem das operações, frações, porcentagem, potências e proporção.',
        scope: { discipline: 'mat-basica' },
        minutes: 40,
        blueprint: { basico: 6, intermediario: 5, avancado: 3, desafio: 1 },
        passing: 70,
        nota: 'Se você errar mais de duas de fração, volte para o módulo de frações antes de seguir para Álgebra.'
      },
      {
        id: 'sim-algebra',
        name: 'Simulado — Álgebra',
        blurb: 'Expressões, equações, inequações, produtos notáveis, fatoração e sistemas.',
        scope: { discipline: 'algebra' },
        minutes: 45,
        blueprint: { basico: 5, intermediario: 6, avancado: 4, desafio: 1 },
        passing: 70,
        nota: 'Fatoração é o que mais aparece em limite. Se ela cair aqui, vai cair de novo em Cálculo.'
      },
      {
        id: 'sim-funcoes',
        name: 'Simulado — Funções',
        blurb: 'Domínio, reta, parábola, exponencial, logaritmo, composição e inversa.',
        scope: { discipline: 'funcoes' },
        minutes: 45,
        blueprint: { basico: 5, intermediario: 6, avancado: 4, desafio: 1 },
        passing: 70
      },
      {
        id: 'sim-trigonometria',
        name: 'Simulado — Trigonometria',
        blurb: 'Radianos, razões, círculo trigonométrico, identidades e equações.',
        scope: { discipline: 'trigonometria' },
        minutes: 35,
        blueprint: { basico: 4, intermediario: 5, avancado: 3, desafio: 1 },
        passing: 70
      },
      {
        id: 'sim-precalculo',
        name: 'Simulado — Pronto para Cálculo I?',
        blurb: 'A prova de porta: fatoração, domínio, composição, trigonometria e comportamento no infinito.',
        scope: { disciplines: ['algebra', 'funcoes', 'trigonometria', 'precalculo'] },
        minutes: 50,
        blueprint: { basico: 4, intermediario: 7, avancado: 5, desafio: 2 },
        passing: 75,
        nota: 'Este é o simulado que decide se vale a pena começar Cálculo agora ou reforçar a base por mais duas semanas.'
      },
      {
        id: 'sim-calculo-limites',
        name: 'Simulado — Limites e continuidade',
        blurb: 'Cálculo de limites, indeterminações, limites no infinito e continuidade.',
        scope: { modules: ['c1.limites', 'c1.continuidade'] },
        minutes: 40,
        blueprint: { basico: 4, intermediario: 5, avancado: 4, desafio: 1 },
        passing: 70
      },
      {
        id: 'sim-calculo-derivadas',
        name: 'Simulado — Derivadas',
        blurb: 'Definição, regras, cadeia, e aplicações em máximos, mínimos e otimização.',
        scope: { modules: ['c1.derivadas', 'c1.aplicDerivadas'] },
        minutes: 45,
        blueprint: { basico: 4, intermediario: 6, avancado: 4, desafio: 2 },
        passing: 70
      },
      {
        id: 'sim-calculo-integrais',
        name: 'Simulado — Integrais',
        blurb: 'Antiderivada, integral definida, Teorema Fundamental e técnicas de integração.',
        scope: { modules: ['c1.integrais'] },
        minutes: 45,
        blueprint: { basico: 4, intermediario: 5, avancado: 4, desafio: 2 },
        passing: 70
      },
      {
        id: 'sim-probabilidade',
        name: 'Simulado — Probabilidade',
        blurb: 'Contagem, probabilidade condicional, Bayes e distribuições.',
        scope: { discipline: 'probabilidade' },
        minutes: 40,
        blueprint: { basico: 4, intermediario: 5, avancado: 4, desafio: 1 },
        passing: 70
      },
      {
        id: 'sim-estatistica',
        name: 'Simulado — Estatística',
        blurb: 'Medidas descritivas, dispersão, correlação, regressão e inferência.',
        scope: { discipline: 'estatistica' },
        minutes: 40,
        blueprint: { basico: 4, intermediario: 5, avancado: 4, desafio: 1 },
        passing: 70
      },
      {
        id: 'sim-algebra-linear',
        name: 'Simulado — Vetores e Álgebra Linear',
        blurb: 'Vetores, produtos, matrizes, determinantes, sistemas e base.',
        scope: { discipline: 'algebra-linear' },
        minutes: 45,
        blueprint: { basico: 4, intermediario: 6, avancado: 4, desafio: 1 },
        passing: 70,
        nota: 'Cobre o conteúdo das Listas 01 a 09 da disciplina Física das Variações.'
      }
    ]
  };
})(window.CZ);
