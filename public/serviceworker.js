const STATIC_CACHE = "static"
// array of static files to cache while on installing
var static_url = [
  "/",
  "/offline.html",
  "/register.js",
  "/static/js/0.chunk.js",
  "/static/js/1.chunk.js",
  "/static/js/2.chunk.js",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/vendors~main.chunk.js",
  "/static/media/background.bf9ba933.jpg"
]

// install
self.addEventListener("install", e=>{
  //cache the intial
  e.waitUntil(
    caches.open(STATIC_CACHE)
    .then(cache=>{
      return cache.addAll(static_url);
    })
    .catch(err=>{
      console.log("Installing SW failed !", err);
      // fail silently
    })
  )
});

// fetch request
self.addEventListener("fetch", e=>{
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  // skip the request. if request is not made with http protocol
  if (!(e.request.url.indexOf('http') === 0)) return;
  e.respondWith(
    caches.match(e.request)
    .then(respond=>{
      if(respond)
      return respond
      else if (navigator.onLine) {
        return fetch(e.request).then(dataResponse=>{

          // check if the data received id valid to store in cache
          if(!dataResponse || dataResponse.status !== 200 || dataResponse.type !== 'basic') {
              return dataResponse;
            }
            // clone the received data to store a copy in cache
            var cloneResponse = dataResponse.clone();
            // store the cloned data
            caches.open("OnGo")
              .then((cache)=>{
                cache.put(e.request, cloneResponse);
              });
              // return the data to the main stream
              return dataResponse;
        })
      }
      else{
        // fallback page return
        return caches.match("/offline.html");
      }
    })
  )
}
  );

// activate new SW
  self.addEventListener('activate', function(event) {
    // a list of cache not to delete
    var whitelist = ["static"];

  event.waitUntil(
    caches.keys().then((keyList)=>{
      return Promise.all(
        keyList.map((cacheName)=>{
          if (!whitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
