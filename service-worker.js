const cacheName = 'article-reader-v1';
const staticAssets = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
    // Add paths to other static assets if you have them
];

self.addEventListener('install', async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        return response || fetch(event.request);
    }));
});
