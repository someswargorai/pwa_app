const CACHE_NAME = "taskmanager-cache-v1";

const urlsToCache = ["/", "/offline", "/manifest.json"];

/**
 * Install Service Worker
 */
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );

  self.skipWaiting();
});

/**
 * Activate Service Worker
 */
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );

  self.clients.claim();
});

/**
 * Fetch (Network First Strategy)
 */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        return caches.match(event.request).then((response) => {
          return response || caches.match("/offline");
        });
      }),
  );
});
