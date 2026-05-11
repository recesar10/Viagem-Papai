const CACHE_NAME='viagem-papai-premium-v2';
const URLS=['./','./index.html','./manifest.json','./icon-192-premium.png','./icon-512-premium.png'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(URLS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request)));});