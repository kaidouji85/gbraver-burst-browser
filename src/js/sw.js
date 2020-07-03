import * as Routing from 'workbox-routing';
import * as PreCaching from 'workbox-precaching';
import * as Strategies from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

PreCaching.precacheAndRoute([
  {url: "./index.html", revision: BUILD_HASH},
  {url: "./manifest.json", revision: BUILD_HASH},
  {url: "./favicon.ico", revision: BUILD_HASH},
  {url: "./favicon-16x16.png", revision: BUILD_HASH},
  {url: "./favicon-32x32.png", revision: BUILD_HASH},
  {url: "./app-icon.png", revision: BUILD_HASH},
]);

Routing.registerRoute(
  /\.(?:js)$/,
  new Strategies.NetworkFirst({
    cacheName: 'js-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 3 * 24 * 60 * 60,
      }),
    ],
  })
);

Routing.registerRoute(
  /\/resources\/.*\.(?:png|glb|mp3|svg)$/,
  new Strategies.CacheFirst({
    cacheName: 'resource-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 3 * 24 * 60 * 60,
      }),
    ],
  })
);