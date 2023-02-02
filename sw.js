const PATH = "app-pomerano"
this.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      return cache.addAll([
        `${PATH}/`,
        `${PATH}/images/resized_images/`,
        `${PATH}/index.html`,
        `${PATH}/sobre.html`,
        `${PATH}/styles/`,
        `${PATH}/scripts/`,
        `${PATH}/scripts/index.js`,
        `${PATH}/categories.json`,
        `${PATH}/sounds/`
      ]);
    })
  );
});

this.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        caches.open("v1").then(function(cache) {
          cache.put(event.request, response.clone());
        });
        return response;
      });
    }).catch(function() {
      console.log("error cache");
      return caches.match("/");
    })
  );
});