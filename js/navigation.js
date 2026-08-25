/**
 * ==========================================================================
 * LAZY-CODERS: NAVIGATION & COMMAND PALETTE (js/navigation.js)
 * Auto-Hiding Navbar, Responsive Dock, and Global Search (Ctrl+K)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // 1. Auto-Hiding Navbar
  let lastScrollY = window.scrollY;
  const header = document.querySelector(".glass-header");
  const SCROLL_THRESHOLD = 80;

  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        const current = window.scrollY;
        if (current > SCROLL_THRESHOLD) {
          if (
            current > lastScrollY &&
            !header.classList.contains("nav-hidden")
          ) {
            header.classList.add("nav-hidden");
          } else if (
            current < lastScrollY &&
            header.classList.contains("nav-hidden")
          ) {
            header.classList.remove("nav-hidden");
          }
        } else {
          header.classList.remove("nav-hidden");
        }
        lastScrollY = current;
      },
      { passive: true },
    );
  }

  // 2. Global Index & Search
  const searchableIndex = [
    {
      title: "Home Dashboard",
      url: "index.html",
      cat: "Page",
      desc: "Course track & overview",
    },
    {
      title: "Programming vs Coding",
      url: "programming.html",
      cat: "Foundations",
      desc: "Recipe analogy & mini-game",
    },
    {
      title: "Python Ecology & History",
      url: "python.html",
      cat: "Core",
      desc: "Interpreter model & field explorer",
    },
    {
      title: "Functions & Parameters",
      url: "functions.html",
      cat: "Functions",
      desc: "Coffee analogy & simulator",
    },
    {
      title: "Function Types & Anatomy",
      url: "function-types.html",
      cat: "Functions",
      desc: "Built-in matrix & signatures",
    },
    {
      title: "Variable Scope & Lifetime",
      url: "variables.html",
      cat: "Core",
      desc: "LEGB rule & namespace visualizer",
    },
    {
      title: "Practical 1: User-Defined Functions",
      url: "practical.html#lab1",
      cat: "Lab",
      desc: "Declaration & call",
    },
    {
      title: "Practical 2: Return Statements",
      url: "practical.html#lab2",
      cat: "Lab",
      desc: "Returning computed data",
    },
    {
      title: "Practical 3: Call-by-Sharing Semantics",
      url: "practical.html#lab3",
      cat: "Lab",
      desc: "Memory object references",
    },
    {
      title: "Practical 4: Classes & Objects",
      url: "practical.html#lab4",
      cat: "Lab",
      desc: "OOP blueprints & methods",
    },
    {
      title: "Curated Video & Web Resources",
      url: "resources.html",
      cat: "Resources",
      desc: "Bandwidth-friendly videos",
    },
    {
      title: "About Lazy-Coders Platform",
      url: "about.html",
      cat: "Page",
      desc: "Architecture & 13-stage loop",
    },
  ];

  const paletteModal = document.getElementById("command-palette-modal");
  const paletteInput = document.getElementById("palette-search-input");
  const paletteResults = document.getElementById("palette-results-list");

  const openPalette = () => {
    if (!paletteModal || !paletteInput) return;
    paletteModal.style.display = "flex";
    paletteInput.value = "";
    renderResults(searchableIndex);
    paletteInput.focus();
    document.body.style.overflow = "hidden";
  };

  const closePalette = () => {
    if (!paletteModal) return;
    paletteModal.style.display = "none";
    document.body.style.overflow = "";
  };

  const renderResults = (items) => {
    if (!paletteResults) return;
    paletteResults.innerHTML = "";

    if (items.length === 0) {
      paletteResults.innerHTML =
        '<li style="padding:1rem; text-align:center; color:var(--text-muted);">No lessons found.</li>';
      return;
    }

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.padding = "0.75rem 1rem";
      li.style.borderRadius = "6px";
      li.style.cursor = "pointer";
      li.style.transition = "background var(--transition-fast)";

      li.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:2px;">
          <span style="font-weight:600; color:var(--text-main);">${item.title}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${item.desc}</span>
        </div>
        <span class="badge badge-sky">${item.cat}</span>
      `;

      li.addEventListener(
        "mouseenter",
        () => (li.style.background = "var(--bg-surface-elevated)"),
      );
      li.addEventListener(
        "mouseleave",
        () => (li.style.background = "transparent"),
      );
      li.addEventListener("click", () => {
        closePalette();
        window.location.href = item.url;
      });

      paletteResults.appendChild(li);
    });
  };

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      paletteModal.style.display === "flex" ? closePalette() : openPalette();
    }
    if (
      e.key === "Escape" &&
      paletteModal &&
      paletteModal.style.display === "flex"
    ) {
      closePalette();
    }
  });

  document
    .querySelectorAll(".btn-cmd-palette")
    .forEach((btn) => btn.addEventListener("click", openPalette));

  if (paletteInput) {
    paletteInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = searchableIndex.filter(
        (i) =>
          i.title.toLowerCase().includes(query) ||
          i.desc.toLowerCase().includes(query) ||
          i.cat.toLowerCase().includes(query),
      );
      renderResults(filtered);
    });
  }

  if (paletteModal) {
    paletteModal.addEventListener("click", (e) => {
      if (e.target === paletteModal) closePalette();
    });
  }

  // 3. Highlight Active Navigation
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll(".nav-link, .mobile-dock-item a")
    .forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href === currentPath ||
        (currentPath === "" && href === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
});
