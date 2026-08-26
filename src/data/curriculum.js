/* ==========================================================================
   data/curriculum.js — a árvore de conhecimento.

   Cada tópico declara `requires`: os tópicos que precisam estar dominados
   antes. É esse grafo que alimenta o mapa, o desbloqueio e o modo
   "Estou completamente perdido".
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  /** Níveis usados pelo diagnóstico e pelo relatório. */
  const LEVELS = [
    { id: 'aritmetica', n: 0, name: 'Aritmética',  blurb: 'Contas, sinais, ordem das operações' },
    { id: 'algebra',    n: 1, name: 'Álgebra',     blurb: 'Letras no lugar de números' },
    { id: 'funcoes',    n: 2, name: 'Funções',     blurb: 'Entrada, saída, gráfico' },
    { id: 'precalculo', n: 3, name: 'Pré-Cálculo', blurb: 'Exponencial, logaritmo, trigonometria' },
    { id: 'calculo',    n: 4, name: 'Cálculo I',   blurb: 'Limites, derivadas, integrais' },
    { id: 'vetores',    n: 5, name: 'Vetores',      blurb: 'Vetores, produtos e espaços vetoriais' }
  ];

  /**
   * Trilhas. A grade de Física das Variações roda cálculo e vetores em
   * paralelo, então o mapa mostra dois caminhos que partem da mesma base
   * de álgebra em vez de uma fila única.
   */
  const TRACKS = [
    { id: 'calculo', name: 'Cálculo', blurb: 'Da aritmética ao Teorema Fundamental do Cálculo.' },
    { id: 'vetores', name: 'Vetores e Álgebra Linear', blurb: 'De seta no papel até base e dimensão.' }
  ];

  /** Tópicos na ordem da trilha. `level` liga o tópico ao nível do diagnóstico. */
  const TOPICS = [
    {
      id: 'aritmetica', track: 'calculo', level: 'aritmetica', requires: [],
      name: 'Aritmética essencial',
      desc: 'Sinais, ordem das operações e porcentagem — a base de tudo que vem depois.',
      icon: '＋'
    },
    {
      id: 'fracoes', track: 'calculo', level: 'aritmetica', requires: ['aritmetica'],
      name: 'Frações',
      desc: 'O assunto que mais derruba gente em Cálculo. Vale a pena resolver agora.',
      icon: '½'
    },
    {
      id: 'algebra', track: 'calculo', level: 'algebra', requires: ['fracoes'],
      name: 'Álgebra e equações',
      desc: 'Descobrir um número escondido. É daqui que sai toda a manipulação do Cálculo.',
      icon: '𝑥'
    },
    {
      id: 'funcoes', track: 'calculo', level: 'funcoes', requires: ['algebra'],
      name: 'Funções',
      desc: 'Máquinas de número e seus gráficos. Sem isso, limite e derivada não fazem sentido.',
      icon: 'ƒ'
    },
    {
      id: 'precalculo', track: 'calculo', level: 'precalculo', requires: ['funcoes'],
      name: 'Pré-Cálculo',
      desc: 'Potências, exponencial e logaritmo — as funções que mais aparecem nas provas.',
      icon: '𝑒'
    },
    {
      id: 'limites', track: 'calculo', level: 'calculo', requires: ['funcoes'],
      name: 'Limites',
      desc: 'Para onde um valor aponta quando você chega perto sem poder tocar.',
      icon: '→'
    },
    {
      id: 'derivadas', track: 'calculo', level: 'calculo', requires: ['limites'],
      name: 'Derivadas',
      desc: 'Velocidade instantânea, inclinação exata, máximos e mínimos.',
      icon: '∂'
    },
    {
      id: 'integrais', track: 'calculo', level: 'calculo', requires: ['derivadas'],
      name: 'Integrais',
      desc: 'Somar infinitas fatias para achar área — e desfazer a derivada.',
      icon: '∫'
    },

    /* ---------------- Trilha de vetores ---------------- */
    {
      id: 'vetores-geo', track: 'vetores', level: 'vetores', requires: ['algebra'],
      name: 'Vetores geométricos',
      desc: 'A seta no papel: direção, sentido e módulo. Somar sem coordenada nenhuma.',
      icon: '↗'
    },
    {
      id: 'vetores-alg', track: 'vetores', level: 'vetores', requires: ['vetores-geo'],
      name: 'Vetores algébricos',
      desc: 'A mesma seta virando par ordenado. Aqui a conta fica fácil.',
      icon: '⟨⟩'
    },
    {
      id: 'produto-escalar', track: 'vetores', level: 'vetores', requires: ['vetores-alg'],
      name: 'Produto escalar',
      desc: 'Multiplicar dois vetores e sair um número. Serve para ângulo e perpendicularidade.',
      icon: '·'
    },
    {
      id: 'produto-vetorial', track: 'vetores', level: 'vetores', requires: ['produto-escalar'],
      name: 'Produto vetorial',
      desc: 'Multiplicar dois vetores e sair um vetor perpendicular aos dois. Dá área de brinde.',
      icon: '×'
    },
    {
      id: 'produto-misto', track: 'vetores', level: 'vetores', requires: ['produto-vetorial'],
      name: 'Produto misto',
      desc: 'Três vetores, um determinante, e a resposta é volume. Zero significa coplanares.',
      icon: '▱'
    },
    {
      id: 'espaco-vetorial', track: 'vetores', level: 'vetores', requires: ['vetores-alg'],
      name: 'Combinação linear e LI/LD',
      desc: 'Quando um vetor é feito de outros. Gerador, base e dimensão saem daqui.',
      icon: 'Σ'
    }
  ];

  const byId = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
  const byTrack = (trackId) => TOPICS.filter((t) => t.track === trackId);

  /** Modo faculdade: adapta os exemplos ao curso do aluno. */
  const AREAS = [
    { id: 'geral',  name: 'Ainda não sei',            ex: 'Exemplos do dia a dia' },
    { id: 'compe',  name: 'Eng. da Computação',       ex: 'Sensores, dados, desempenho' },
    { id: 'eng',    name: 'Engenharia',               ex: 'Movimento, forças, estruturas' },
    { id: 'cc',     name: 'Ciência da Computação',    ex: 'Algoritmos, complexidade' },
    { id: 'econ',   name: 'Economia',                 ex: 'Custo, receita, juros' },
    { id: 'fisica', name: 'Física',                   ex: 'Velocidade, energia, campos' },
    { id: 'mat',    name: 'Matemática',               ex: 'Rigor e demonstração' }
  ];

  /** Retorna, em ordem, a cadeia completa de pré-requisitos de um tópico. */
  function prereqChain(topicId, seen = []) {
    const t = byId[topicId];
    if (!t) return seen;
    for (const dep of t.requires) {
      if (!seen.includes(dep)) {
        prereqChain(dep, seen);
        seen.push(dep);
      }
    }
    return seen;
  }

  CZ.curriculum = { LEVELS, TRACKS, TOPICS, AREAS, byId, byTrack, prereqChain };
})(window.CZ);
