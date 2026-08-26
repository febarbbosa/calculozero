/* ==========================================================================
   pages/lesson.js — o player de aula.

   Percorre os 7 passos, injeta a visualização quando existe, monta os
   exercícios e hospeda o botão "Não entendi".
   ========================================================================== */
window.CZ = window.CZ || {};

(function (CZ) {
  'use strict';

  const { h, clear } = CZ.dom;
  const { KIND_LABEL } = CZ.lessons;

  function render(params) {
    const state = CZ.store.get();
    const lesson = CZ.lessons.byId[params.lessonId];
    if (!lesson) return h('div.wrap', h('div.card', h('h3', 'Aula não encontrada')));

    const topic = CZ.curriculum.byId[lesson.topic];
    const lessonsOfTopic = CZ.lessons.byTopic(topic.id);
    const idx = lessonsOfTopic.findIndex((l) => l.id === lesson.id);

    let step = 0;
    const body = h('div');
    const dots = h('div.stepdots');

    /* "por que aprender isso" adaptado à área escolhida */
    const whyText = (lesson.whyByArea && lesson.whyByArea[state.area]) || lesson.why;

    function drawDots() {
      clear(dots);
      lesson.steps.forEach((_, i) => dots.appendChild(
        h('div.stepdot', { 'data-on': i === step, 'data-done': i < step })));
    }

    /* ---------------- "Não entendi" ----------------
       Antes eram seis reescritas de texto do mesmo passo. Agora são lentes
       de naturezas diferentes, montadas de tudo que existe sobre o assunto
       — inclusive da ficha da base curricular, quando o tópico da trilha
       está ligado a ela. */
    function helpBar(stepData, indice) {
      const doCurriculo = CZ.syllabus.allTopics()
        .find((t) => t.lesson === lesson.id || (t.track === topic.id && CZ.sheets.has(t.id)));

      return CZ.explainer.ExplainerDobrado({
        lessonId: lesson.id,
        stepIndex: indice,
        topicId: doCurriculo ? doCurriculo.id : null,
        trackTopic: topic.id
      }, { onSOS: () => CZ.app.openSOS(topic.id) });
    }

    /* ---------------- desenha um passo ---------------- */
    function draw() {
      drawDots();
      clear(body);
      const s = lesson.steps[step];
      const card = h('div.card');

      // o tutor acompanha o passo atual, para responder sobre o que está na tela
      CZ.tutor.setContext({
        topic: topic.id, lesson: lesson.id, step,
        exercise: s.exercise || null
      });

      card.appendChild(h('div.step-kind', `${step + 1}/${lesson.steps.length} · ${KIND_LABEL[s.kind]}`));

      if (s.kind === 'guiado' || s.kind === 'sozinho') {
        const ex = CZ.exercises.byId[s.exercise];
        if (!ex) {
          card.appendChild(h('p.muted', 'Exercício indisponível.'));
          card.appendChild(h('button.btn.btn-primary.mt-16', { onClick: forward }, 'Continuar'));
        } else {
          card.appendChild(h('p.muted', { style: { fontSize: '14px', marginBottom: '14px' } },
            s.kind === 'guiado'
              ? 'Vamos fazer este junto — a primeira dica já aparece sozinha.'
              : 'Agora sem rede. Se travar, peça dica: pedir dica não é trapaça.'));
          card.appendChild(CZ.ui.Exercise(ex, {
            guided: s.kind === 'guiado',
            onDone: () => forward(),
            nextLabel: step === lesson.steps.length - 1 ? 'Finalizar aula' : 'Continuar'
          }));
        }
      } else {
        if (s.html) card.appendChild(h('div.step-body', { html: s.html }));
        if (s.viz) {
          const v = CZ.viz.build(s.viz);
          if (v) card.appendChild(v);
        }
        card.appendChild(helpBar(s, step));
        card.appendChild(h('div.row.gap-10.mt-24.wrapf',
          step > 0 ? h('button.btn.btn-ghost', { onClick: back }, '← Voltar') : null,
          h('button.btn.btn-primary.grow', { onClick: forward },
            step === lesson.steps.length - 1 ? 'Finalizar aula' : 'Continuar')
        ));
      }

      body.appendChild(card);
      CZ.dom.scrollTop();
    }

    let passoAbertoEm = Date.now();
    function marcaTempo() {
      if (CZ.profile) CZ.profile.registrarTempo((Date.now() - passoAbertoEm) / 1000, { topicId: topic.id });
      passoAbertoEm = Date.now();
    }

    function back() { if (step > 0) { marcaTempo(); step--; draw(); } }

    function forward() {
      marcaTempo();
      if (step < lesson.steps.length - 1) { step++; draw(); return; }
      finish();
    }

    /* ---------------- fim da aula ---------------- */
    function finish() {
      const fresh = CZ.engine.completeLesson(topic.id, lesson.id);
      fresh.forEach((a) => CZ.ui.toast(`${a.em} ${a.name}`));

      const st = CZ.store.get();
      const nextLesson = lessonsOfTopic[idx + 1];
      const mastery = CZ.engine.mastery(st, topic.id);

      clear(body);
      body.appendChild(h('div.card.center',
        h('div', { style: { fontSize: '40px' } }, '🎉'),
        h('h2', { style: { margin: '10px 0 6px' } }, 'Aula concluída'),
        h('p.muted', `+${CZ.engine.XP_LESSON} XP · ${topic.name} agora em ${mastery}% de domínio`),
        h('div.mt-16', { style: { maxWidth: '320px', margin: '18px auto 0' } }, CZ.ui.Bar(mastery)),
        h('div.row.gap-10.mt-24.wrapf', { style: { justifyContent: 'center' } },
          nextLesson
            ? h('button.btn.btn-primary', { onClick: () => CZ.router.go(`/aula/${nextLesson.id}`) },
                'Próxima aula: ' + nextLesson.title)
            : h('button.btn.btn-primary', { onClick: () => CZ.router.go(`/praticar/${topic.id}`) },
                'Praticar este tópico'),
          h('button.btn.btn-ghost', { onClick: () => CZ.router.go('/painel') }, 'Voltar ao painel')
        )
      ));
      CZ.dom.scrollTop();
    }

    draw();

    return h('div.wrap',
      h('div.lesson-shell',
        h('div.lesson-head',
          h('button.btn.btn-sm.btn-quiet', { onClick: () => CZ.router.go('/mapa') }, '← ' + topic.name),
          dots
        ),
        h('h2', lesson.title),
        h('div.card.card-flat.card-pad-sm.mt-16', { style: { background: 'var(--primary-soft)', border: 0 } },
          h('div.eyebrow', 'Por que aprender isso'),
          h('p', { style: { margin: '6px 0 0', fontSize: '14.5px' } }, whyText)
        ),
        h('div.mt-24', body)
      )
    );
  }

  CZ.pages = CZ.pages || {};
  CZ.pages.lesson = render;
})(window.CZ);
