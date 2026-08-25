/**
 * ==========================================================================
 * LAZY-CODERS: PROGRESSION & CONFETTI ENGINE (js/progress.js)
 * Particle Bursts, Milestones & Achievement Unlocks
 * ==========================================================================
 */

const LazyProgress = (() => {
  "use strict";

  const triggerCelebration = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: "100000",
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#10b981", "#34d399", "#38bdf8", "#fbbf24", "#f43f5e"];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 2,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      particles.forEach((p) => {
        if (p.life > 0) {
          alive++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.2;
          p.life -= p.decay;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });
      if (alive > 0) requestAnimationFrame(render);
      else canvas.remove();
    };
    requestAnimationFrame(render);
  };

  return { triggerCelebration };
})();
