/**
 * ==========================================================================
 * LAZY-CODERS: DASHBOARD & METRICS CONTROLLER (js/dashboard.js)
 * Progress Calculations, KPI Radial Gauges, Streaks & Next Step Flow
 * ==========================================================================
 */

const LazyDashboard = (() => {
  "use strict";

  const CURRICULUM = [
    { id: "prog-01", title: "Programming vs Coding", url: "programming.html" },
    { id: "py-01", title: "Python Ecology", url: "python.html" },
    { id: "fn-01", title: "Functions & Parameters", url: "functions.html" },
    {
      id: "fn-types-01",
      title: "Function Types & Anatomy",
      url: "function-types.html",
    },
    { id: "var-01", title: "Variables & Scope", url: "variables.html" },
  ];

  const render = () => {
    if (typeof LazyCoders === "undefined") return;
    const state = LazyCoders.getState();
    const completed = state.completedLessons || [];
    const percent = Math.round((completed.length / CURRICULUM.length) * 100);

    document
      .querySelectorAll("[data-dashboard-progress-text]")
      .forEach((el) => {
        el.textContent = `${percent}%`;
      });

    document.querySelectorAll(".kpi-gauge-bar").forEach((bar) => {
      const radius = 40;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;
      bar.style.strokeDasharray = `${circumference} ${circumference}`;
      bar.style.strokeDashoffset = offset;
    });
  };

  const init = () => {
    render();
    window.addEventListener("lazyStateUpdated", render);
  };

  return { init, refresh: render };
})();

document.addEventListener("DOMContentLoaded", LazyDashboard.init);
