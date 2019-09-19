import * as PreCaching from 'workbox-precaching';
import * as Routing from 'workbox-routing';
import * as Strategies from 'workbox-strategies';
import * as Expiration from 'workbox-expiration';

PreCaching.precacheAndRoute([
  {url: "index.html", revision: REVISION_INDEX_HTML}
]);

Routing.registerRoute(
  /\/index\.js$/,
  new Strategies.NetworkFirst({
    cacheName: 'js-cache',
    plugins: [
      new Expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
      }),
    ]
  })
);

Routing.registerRoute(
  /\.(?:png|glb)$/,
  new Strategies.CacheFirst({
    cacheName: 'resource-cache',
    plugins: [
      new Expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
      }),
    ]
  })
);