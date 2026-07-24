const CACHE='mariam-ultimate-v1';
const ASSETS=["./", "./index.html", "./manifest.json", "./offline.html", "./assets/IMG_8029.JPG", "./assets/IMG_8040.JPG", "./assets/IMG_7980.jpeg", "./assets/IMG_8004.jpeg", "./assets/IMG_8043.JPG", "./assets/IMG_8042.JPG", "./assets/IMG_7989.jpeg", "./assets/IMG_8003.JPG", "./assets/IMG_8008.JPG", "./assets/IMG_8036.JPG", "./assets/IMG_8038.JPG", "./assets/IMG_8041.JPG", "./assets/IMG_8005.JPG", "./assets/IMG_8056.JPG", "./assets/IMG_8030.JPG", "./assets/IMG_7982.jpeg", "./assets/IMG_8039.JPG", "./assets/IMG_8031.JPG", "./assets/IMG_8017.JPG"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;
  }).catch(()=>caches.match('./offline.html'))));
});