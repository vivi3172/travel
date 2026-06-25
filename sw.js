const CORE = 'nl-hu-core-v12';
const RUNTIME = 'nl-hu-runtime-v12';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CORE && k !== RUNTIME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // 自家檔案
  if (url.origin === location.origin) {
    const isDoc = e.request.mode === 'navigate'
      || url.pathname.endsWith('/') || url.pathname.endsWith('index.html');
    if (isDoc) {
      // index.html：線上時一律抓最新（避免重新整理拿到舊版），離線才退回快取
      e.respondWith(
        fetch(e.request).then(res => {
          const copy = res.clone();
          caches.open(CORE).then(c => c.put(e.request, copy));
          return res;
        }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
      );
    } else {
      e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
    }
    return;
  }

  // 外部資源（Google 字型等）：快取優先，第一次線上抓到就存起來供離線使用
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => {
          const copy = res.clone();
          caches.open(RUNTIME).then(c => c.put(e.request, copy));
          return res;
        }).catch(() => cached)
      )
    );
  }
});
