const FILES_TO_CACHE = [
    '/',
    '/assets/js/db.js',
    '/assets/css/styles.css',
    '/assets/js/index.js',
    '/dist/assets/icons/icon_192x192.png',
    '/dist/assets/icons/icon_512x512.png',
    '/dist/manifest.json'
];

const CACHE_NAME = 'my-site-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
                return fetch(event.request)
                .then((response) =>{
                    if (response.status = 200){
                        cache.put(event.request.url, response.clone())
                    }
                    return response;
                }).catch((error) =>{
                    return cache.match(event.request)
                })
            }).catch((error) =>{
                return console.log(error);
            })
        );
        return;
    }
    event.respondWith(
        fetch(event.request).catch(()=>{
            return caches.match(event.request).then((response)=>{
                if (response){
                    return response;
                }else if(event.request.headers.get('accept').includes('text/html')){
                    return caches.match('/')
                }
            })
        })
    )
});
