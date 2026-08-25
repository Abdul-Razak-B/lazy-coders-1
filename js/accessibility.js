/**
 * ==========================================================================
 * LAZY-CODERS: ACCESSIBILITY ENGINE (js/accessibility.js)
 * Font Sizing, Dyslexia Toggle & Contrast Modes
 * ==========================================================================
 */

const LazyAccessibility = (() => {
  "use strict";

  const apply = (prefs) => {
    if (prefs.fontFamily === "dyslexic") {
      document.body.classList.add("font-dyslexic");
    } else {
      document.body.classList.remove("font-dyslexic");
    }
  };

  const init = () => {
    if (typeof LazyCoders !== "undefined") {
      apply(LazyCoders.getPrefs());
    }
  };

  return { init, apply };
})();

document.addEventListener("DOMContentLoaded", LazyAccessibility.init);
