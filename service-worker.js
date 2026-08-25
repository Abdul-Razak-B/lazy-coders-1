/**
 * ==========================================================================
 * LAZY-CODERS: PWA SERVICE WORKER (service-worker.js)
 * Full Static Shell Pre-Caching & Low-Bandwidth Offline Engine
 * ==========================================================================
 */

const CACHE_NAME = "lazy-coders-v1.1.0";

const APP_SHELL = [
  "./",
  "./index.html",
  "./programming.html",
  "./python.html",
  "./functions.html",
  "./function-types.html",
  "./variables.html",
  "./practical.html",
  "./resources.html",
  "./about.html",
  "./css/style.css",
  "./css/responsive.css",
  "./css/animations.css",
  "./css/components.css",
  "./js/app.js",
  "./js/navigation.js",
  "./js/theme.js",
  "./js/dashboard.js",
  "./js/quiz.js",
  "./js/progress.js",
  "./js/accessibility.js",
  "./js/performance.js",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === "basic"
          ) {
            const responseToCache = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    }),
  );
});
