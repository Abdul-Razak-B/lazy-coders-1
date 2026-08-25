/**
 * ==========================================================================
 * LAZY-CODERS: QUIZ ENGINE (js/quiz.js)
 * Immediate Feedback, Explanations & Gamified XP Awarding
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  document.querySelectorAll(".quiz-box").forEach((quiz) => {
    const options = quiz.querySelectorAll(".quiz-option");
    const explanation = quiz.querySelector(".quiz-explanation");

    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        if (quiz.dataset.answered === "true") return;
        quiz.dataset.answered = "true";

        const isCorrect = opt.dataset.correct === "true";

        if (isCorrect) {
          opt.classList.add("correct");
          opt.innerHTML +=
            '<span style="font-weight:800; color:var(--accent-glow);"> ✓ Correct</span>';
          if (typeof LazyCoders !== "undefined") {
            LazyCoders.addXP(25, "Quiz Mastered");
          }
        } else {
          opt.classList.add("incorrect");
          opt.innerHTML +=
            '<span style="font-weight:800; color:var(--accent-rose);"> ✕ Incorrect</span>';
          options.forEach((o) => {
            if (o.dataset.correct === "true") o.classList.add("correct");
          });
        }

        if (explanation) explanation.style.display = "block";
      });
    });
  });
});
