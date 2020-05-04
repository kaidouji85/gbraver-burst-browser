import * as Routing from 'workbox-routing';
import * as PreCaching from 'workbox-precaching';
import * as Strategies from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

PreCaching.precacheAndRoute([
  {url: "index.html", revision: BUILD_HASH}
]);

Routing.registerRoute(
  /\.(?:js)$/,
  new Strategies.NetworkFirst({
    cacheName: 'js-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

Routing.registerRoute(
  /\.(?:png|glb|json)$/,
  new Strategies.CacheFirst({
    cacheName: 'resource-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);