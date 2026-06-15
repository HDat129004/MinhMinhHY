const CACHE_NAME = 'mm-store-v1';
const ASSETS = [
  'index.html',
  'products.html',
  'product.html',
  'cart.html',
  'booking.html',
  'contact.html',
  'survey.html',
  'compare.html',
  'css/main.css',
  'css/admin.css',
  'js/app.js',
  'js/admin.js',
  'assets/images/logo-192.png',
  'assets/images/logo-512.png',
  'assets/images/hero-banner.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((response) => {
        return response;
      }).catch(() => {
        if (e.request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});
