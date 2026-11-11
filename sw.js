var CACHE="weld-calc-v5";
var ASSETS=["./","./index.html","./manifest.json","./icon192.png","./icon512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(resp){var cl=resp.clone();caches.open(CACHE).then(function(c){c.put(e.request,cl);});return resp;});}));});