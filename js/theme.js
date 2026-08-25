/**
 * ==========================================================================
 * LAZY-CODERS: THEME & COLOR PALETTE CONTROLLER (js/theme.js)
 * Light (Gradient-Pink) and Dark (Deep Forest) Themes with Real-Time Sync
 * ==========================================================================
 */

const LazyTheme = (() => {
  "use strict";

  const STORAGE_KEY = "lazy_coders_theme_choice";
  const THEMES = ["dark", "light", "system"];
  let currentTheme = "dark";

  const getSystemPreference = () => {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };

  const applyTheme = (themeName) => {
    const resolved = themeName === "system" ? getSystemPreference() : themeName;
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(`theme-${resolved}`);
    document.documentElement.setAttribute("data-theme", resolved);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        "content",
        resolved === "light" ? "#fff1f5" : "#0b1d13",
      );
    }
  };

  const setTheme = (themeName) => {
    if (!THEMES.includes(themeName)) return;
    currentTheme = themeName;
    try {
      localStorage.setItem(STORAGE_KEY, themeName);
    } catch (e) {}
    applyTheme(themeName);
  };

  const cycleTheme = () => {
    const next = currentTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  const init = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES.includes(saved)) currentTheme = saved;
    } catch (e) {
      currentTheme = "dark";
    }

    applyTheme(currentTheme);

    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", cycleTheme);
    });
  };

  return { init, setTheme, cycleTheme, getCurrentTheme: () => currentTheme };
})();

document.addEventListener("DOMContentLoaded", LazyTheme.init);
