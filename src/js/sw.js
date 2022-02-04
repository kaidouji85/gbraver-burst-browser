// @flow

import * as Routing from 'workbox-routing';
import * as PreCaching from 'workbox-precaching';
import * as Strategies from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

PreCaching.precacheAndRoute([
  {url: "./index.html", revision: GBRAVER_BURST_SW_BUILD_HASH},
  {url: "./manifest.json", revision: GBRAVER_BURST_SW_BUILD_HASH},
  {url: "./favicon.ico", revision: GBRAVER_BURST_SW_BUILD_HASH},
  {url: "./favicon-16x16.png", revision: GBRAVER_BURST_SW_BUILD_HASH},
  {url: "./favicon-32x32.png", revision: GBRAVER_BURST_SW_BUILD_HASH},
  {url: "./app-icon-180x180.png", revision: GBRAVER_BURST_SW_BUILD_HASH},
  {url: "./app-icon-192x192.png", revision: GBRAVER_BURST_SW_BUILD_HASH},
  {url: "./app-icon-512x512.png", revision: GBRAVER_BURST_SW_BUILD_HASH},
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
  /\/resources\/.*\.(?:png|glb|mp3|svg|webp)$/,
  new Strategies.CacheFirst({
    cacheName: 'resource-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 3 * 24 * 60 * 60,
      }),
    ],
  })
);