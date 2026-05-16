/**
 * Service Worker — caches app shell for offline use.
 * Bump CACHE_VERSION when you ship updates so old caches are purged.
 */
const CACHE_VERSION = 'reset-v2';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './content.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css',
  'https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&family=Montserrat:wght@600;700&display=swap'
];

const RUNTIME_CACHE_HOSTS = [
  self.location.origin,
  'cdn.jsdelivr.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS.filter(a => !a.startsWith('https://fonts.gstatic.com'))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (response.ok && RUNTIME_CACHE_HOSTS.some(h => event.request.url.includes(h))) {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
