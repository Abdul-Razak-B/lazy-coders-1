/**
 * ==========================================================================
 * LAZY-CODERS: MASTER APPLICATION CORE (js/app.js)
 * State Management, XP Gamification, Service Worker Registration & Video Facades
 * ==========================================================================
 */

const LazyCoders = (() => {
  'use strict';

  const STORAGE_KEY_STATE = 'lazy_coders_master_state';
  const STORAGE_KEY_PREFS = 'lazy_coders_user_preferences';

  const defaultState = {
    xp: 0,
    level: 1,
    completedLessons: [],
    completedLabs: [],
    quizScores: {},
    achievements: [],
    streak: { current: 1, lastActive: new Date().toISOString() }
  };

  const defaultPrefs = {
    theme: 'dark',
    fontSize: 16,
    fontFamily: 'sans-serif',
    contrast: 'standard',
    dataSaver: false
  };

  let state = { ...defaultState };
  let prefs = { ...defaultPrefs };

  const storageAvailable = (() => {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  })();

  const loadState = () => {
    if (storageAvailable) {
      try {
        const savedState = localStorage.getItem(STORAGE_KEY_STATE);
        const savedPrefs = localStorage.getItem(STORAGE_KEY_PREFS);
        if (savedState) state = { ...defaultState, ...JSON.parse(savedState) };
        if (savedPrefs) prefs = { ...defaultPrefs, ...JSON.parse(savedPrefs) };
      } catch (e) {
        console.warn('Storage parse error, fallback to defaults');
      }
    }
  };

  const saveState = () => {
    if (storageAvailable) {
      try {
        localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
        localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(prefs));
      } catch (e) {}
    }
    window.dispatchEvent(new CustomEvent('lazyStateUpdated', { detail: state }));
  };

  const calculateLevel = (totalXP) => {
    return Math.floor(Math.pow(totalXP / 100, 1 / 1.4)) + 1;
  };

  const addXP = (points, reason = 'Action Completed') => {
    state.xp += points;
    const newLevel = calculateLevel(state.xp);
    const leveledUp = newLevel > state.level;
    state.level = newLevel;
    saveState();
    updateUIElements();

    showToast(`+${points} XP: ${reason}`, 'xp');
    if (leveledUp) {
      showToast(`🎉 Level Up! You reached Level ${state.level}!`, 'levelup');
    }
  };

  const markLessonComplete = (lessonId) => {
    if (!state.completedLessons.includes(lessonId)) {
      state.completedLessons.push(lessonId);
      addXP(50, 'Lesson Mastered');
    }
  };

  const updateUIElements = () => {
    document.querySelectorAll('.xp-counter').forEach((el) => (el.textContent = `${state.xp} XP`));
    document.querySelectorAll('.level-badge').forEach((el) => (el.textContent = `Lvl ${state.level}`));
  };

  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `lazy-toast toast-${type}`;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      background: 'var(--bg-surface-elevated)',
      color: 'var(--text-main)',
      border: '1px solid var(--border-highlight)',
      borderRadius: '8px',
      padding: '0.75rem 1.25rem',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      zIndex: '99999',
      transition: 'all 0.3s ease',
      opacity: '0',
      transform: 'translateY(15px)'
    });
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  const initCopyButtons = () => {
    document.querySelectorAll('.btn-copy').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pre = btn.closest('.code-presenter').querySelector('pre');
        if (pre) {
          navigator.clipboard.writeText(pre.innerText).then(() => {
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => (btn.textContent = orig), 2000);
          });
        }
      });
    });
  };

  const initVideoFacades = () => {
    document.querySelectorAll('.video-facade-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-youtube-id');
        if (!id) return;
        card.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>`;
      });
    });
  };

  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').catch((err) => {
          console.warn('SW registration bypassed:', err);
        });
      });
    }
  };

  const init = () => {
    loadState();
    updateUIElements();
    initCopyButtons();
    initVideoFacades();
    registerServiceWorker();
  };

  return {
    init,
    addXP,
    markLessonComplete,
    getState: () => ({ ...state }),
    getPrefs: () => ({ ...prefs }),
    setPreference: (key, val) => {
      prefs[key] = val;
      saveState();
    }
  };
})();

document.addEventListener('DOMContentLoaded', LazyCoders.init);