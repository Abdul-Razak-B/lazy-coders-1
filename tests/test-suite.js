/**
 * LAZY-CODERS: AUTOMATED IN-BROWSER VALIDATION TEST SUITE
 * Run directly inside DevTools Console on any page.
 */
(function runPlatformTests() {
  "use strict";
  console.group("🌿 [Lazy-Coders] Automated Test Runner");
  let passCount = 0;
  let failCount = 0;

  function assert(testName, condition, details = "") {
    if (condition) {
      console.log(
        `%c✓ PASS: ${testName}`,
        "color: #10b981; font-weight: bold;",
      );
      passCount++;
    } else {
      console.error(`✕ FAIL: ${testName} -> ${details}`);
      failCount++;
    }
  }

  // 1. Verify Global State Engine
  assert(
    "Global LazyCoders Namespace Exists",
    typeof LazyCoders !== "undefined",
  );
  if (typeof LazyCoders !== "undefined") {
    const initialXP = LazyCoders.getState().xp;
    LazyCoders.addXP(10, "Automated Test");
    assert(
      "XP Accumulation Works",
      LazyCoders.getState().xp === initialXP + 10,
    );
  }

  // 2. Verify Theme Engine
  assert("Theme Engine Exists", typeof LazyTheme !== "undefined");
  if (typeof LazyTheme !== "undefined") {
    LazyTheme.setTheme("dark");
    assert(
      "Dark Theme Class Binding",
      document.body.classList.contains("theme-dark"),
    );
    LazyTheme.setTheme("light");
    assert(
      "Light Theme Class Binding",
      document.body.classList.contains("theme-light"),
    );
    LazyTheme.setTheme("dark"); // reset
  }

  // 3. Verify Accessibility DOM Nodes & Skip Links
  const skipLink = document.querySelector(".skip-nav");
  assert(
    "WCAG Skip-to-Main Link Exists",
    skipLink !== null && skipLink.getAttribute("href") === "#main-content",
  );

  // 4. Verify Responsive Breakpoints & Viewport Meta
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  assert(
    "Mobile Viewport Meta Configured",
    viewportMeta !== null &&
      viewportMeta.content.includes("width=device-width"),
  );

  // 5. Verify Service Worker Registration
  assert("Service Worker Supported in Navigator", "serviceWorker" in navigator);

  console.groupEnd();
  console.log(
    `%cTest Summary: ${passCount} Passed, ${failCount} Failed`,
    `color: ${failCount === 0 ? "#10b981" : "#f43f5e"}; font-size: 1.1rem; font-weight: bold;`,
  );
})();
