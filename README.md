# 🌿 Lazy-Coders

> A lightweight, luxury, nature-themed static educational platform designed to teach computer science and programming fundamentals with zero cognitive friction, zero backend overhead, and low-bandwidth resilience.

---

## 📖 Overview

**Lazy-Coders** is a distraction-free digital learning environment modeled as a "Digital Forest." It bridges the gap between abstract computer science concepts and beginner intuition by pairing every topic with concrete real-world physical analogies, execution models, interactive zero-dependency client-side sandboxes, and diagnostic checks.

Built strictly on a **Zero-Backend Architecture**, the entire platform runs client-side inside any modern standards-compliant web browser. Progress tracking, XP progression, and theme settings persist locally without requiring logins, cookies, or remote server dependencies.

---

## ✨ Key Features

* **🌲 Dual Luxury Themes:**
  * **Dark Mode:** Deep Forest Emerald palette (`#0b1d13` base with `#34d399` glow).
  * **Light Mode:** Gradient-Pink Rose Quartz palette (`#fff1f5` base with `#e11d48` highlights).
* **🧠 13-Stage Instructional Sequence:** Every module transitions systematically from intuitive physical analogies to formal syntax, stack frame visualization, and diagnostic quizzes.
* **⚡ Ultra-Low Bandwidth Footprint:** Sub-150 KB static core payload. Remote videos utilize click-to-load facades to prevent unsolicited iframe and tracker downloads.
* **🎮 Client-Side Gamification Engine:** Built-in Experience Point (XP) accumulation, level scaling, unlockable achievement badges, and celebratory confetti animations.
* **🔍 Global Command Palette (`Ctrl+K` / `Cmd+K`):** Instant search traversal across all lessons, concepts, and practical laboratories.
* **📱 Responsive & PWA Ready:** Mobile dock navigation, service worker application shell caching for full offline reliability, and web manifest integration.
* **♿ WCAG 2.1 AA Accessibility:** Skip links, high-contrast modes, base font scaling, and OpenDyslexic typography support.
* **✨ Smooth Micro-Interactions:** Hardware-accelerated GPU animations, designed scrollbars, interactive particle field, and smooth lerp custom cursor.

---

## 🗂️ Project Structure

```text
Lazy-Coders/
├── index.html                  # Home Dashboard, KPI Radial Progress & Track Overview
├── programming.html            # Foundations: Programming vs Coding & Classification Game
├── python.html                 # Python Ecology, Interpreter Model & CS Field Explorer
├── functions.html              # Functions, Parameter Binding & Live Execution Simulator
├── function-types.html         # Built-in Matrix, UDFs & Interactive Anatomy Inspector
├── variables.html              # Variable Scopes, LEGB Rule & Stack Memory Visualizer
├── practical.html              # Hands-on Labs 1–4 (UDF, Return, Call-by-Sharing, OOP)
├── resources.html              # Bandwidth-Optimized Video Facades & Official Portals
├── about.html                  # Platform Mission, 13-Stage Loop & SDLC Roadmap
│
├── css/
│   ├── style.css               # Design tokens, themes, typography, and base layout
│   ├── responsive.css          # Breakpoints, mobile bottom dock, and responsive adaptations
│   ├── animations.css          # Keyframes, hover motion, and custom cursor styles
│   └── components.css          # Badges, buttons, KPI radial gauges, drawers, and accordions
│
├── js/
│   ├── app.js                  # Master state manager, XP progression, and video facades
│   ├── navigation.js           # Auto-hiding header and command palette (Ctrl+K)
│   ├── theme.js                # Dark/Light/System theme synchronization
│   ├── dashboard.js            # KPI progress calculations and lesson recommender
│   ├── quiz.js                 # Diagnostic quiz validation and instant feedback
│   ├── progress.js             # Achievement milestones and confetti canvas engine
│   ├── accessibility.js        # Font scaling, dyslexia font, and contrast modes
│   └── performance.js          # Ambient particle canvas, FPS throttle, and custom cursor
│
├── manifest.json               # Web App Manifest metadata
└── service-worker.js           # Progressive Web App offline caching engine
