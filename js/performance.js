/**
 * ==========================================================================
 * LAZY-CODERS: PERFORMANCE, CANVAS & CURSOR ENGINE (js/performance.js)
 * Ambient Nature Particles, Throttling & Lerp Custom Cursor
 * ==========================================================================
 */

const LazyPerformance = (() => {
  "use strict";

  let canvas, ctx, animationId;
  let particles = [];

  const initCanvas = () => {
    canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const count = window.innerWidth < 768 ? 20 : 40;
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }
    render();
  };

  const resize = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const render = () => {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
      ctx.fill();
    });
    animationId = requestAnimationFrame(render);
  };

  const initCursor = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    const dot = document.createElement("div");
    dot.id = "cursor-dot";
    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    let mouseX = 0,
      mouseY = 0,
      curX = 0,
      curY = 0;
    window.addEventListener(
      "mousemove",
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      },
      { passive: true },
    );

    const move = () => {
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
      cursor.style.transform = `translate(${curX}px, ${curY}px)`;
      requestAnimationFrame(move);
    };
    requestAnimationFrame(move);

    document
      .querySelectorAll("a, button, input, .quiz-option")
      .forEach((el) => {
        el.addEventListener("mouseenter", () =>
          document.body.classList.add("cursor-hover"),
        );
        el.addEventListener("mouseleave", () =>
          document.body.classList.remove("cursor-hover"),
        );
      });
  };

  const init = () => {
    initCanvas();
    initCursor();
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", LazyPerformance.init);
