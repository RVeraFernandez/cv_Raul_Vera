const CACHE_NAME = "v1_cache1_RFVF_PWA";

var urlsToCache = [
    "/",
    "./index.html",
    "css/styles.css",
    "./js/main.js",
    "img/Square44x44Logo.targetsize-32.png",
    "img/Square44x44Logo.targetsize-48.png",
    "img/Square44x44Logo.targetsize-64.png",
    "img/Square44x44Logo.targetsize-72.png",
    "img/Square44x44Logo.targetsize-96.png",
    "img/Square44x44Logo.targetsize-256.png",
    "img/android-launchericon-512-512.png",
    "img/android-launchericon-192-192.png",
    "img/android-launchericon-144-144.png",
    "img/android-launchericon-96-96.png",
    "img/android-launchericon-72-72.png",
    "img/android-launchericon-48-48.png",
    "img/40.png",
    "img/80.png",
    "img/256.png",
    "img/512.png",
    "img/1024.png",
];

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open('mi-cache').then(cache => {
            return cache.addAll(urlsToCache).then(()=>{
                self.skipWaiting()
            })
            .catch(err=>console.log('No se ha registrado el cache',err))
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then((response)=> {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate',event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhitelist.indexOf(cacheName)== -1){
                        return cache.delete(cacheName);
                    }
                })
            );
        })
        .then(()=> {
            self.clients.claim();
        })
    );
});
