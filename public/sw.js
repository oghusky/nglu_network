// what happens when browser "installs" service worker
// "self" refers to service worker
// service worker installs once unless something changes in the code
// even comments
// service workers install first and wait on activation
// activation on new changes only happen after current instances are all closed
// for a user to be able to install your app:
// 1. the app cannot already be installed
// 2. user must engage for at least 30 seconds
// 3. manifest.json must include short_name or name, icons 192px and a 512px, start_url, and display fullscreen, standalone, minimal-ui
// 4. served over https(required for service workers)
// 5. has registered service worker with a fetch event
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/assets/css/style.css",
  "/assets/pages/player2.html",
  "/assets/pages/tumblr.html",
  "/manifest.json",
  "/favicon.ico",
  "/assets/images/icons/icon-72x72.png",
  "/assets/images/icons/icon-96x96.png",
  "/assets/images/icons/icon-128x128.png",
  "/assets/images/icons/icon-144x144.png",
  "/assets/images/icons/icon-152x152.png",
  "/assets/images/icons/icon-192x192.png",
  "/assets/images/icons/icon-384x384.png",
  "/assets/images/icons/icon-512x512.png",
];
const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// activate service worker eventlistener
self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keylist => {
      return Promise.all(
        keylist.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data: ", key);
            return caches.delete(key);
          }
        })
      )
    })
  );
  self.clients.claim();
});

//fetch
self.addEventListener("fetch", evt => {
  console.log("FETCH EVENT:", evt);
});