import * as PreCaching from 'workbox-precaching';
import * as Routing from 'workbox-routing';
import * as Strategies from 'workbox-strategies';

PreCaching.precacheAndRoute([
  {url: "index.html"},
  {url: "index.js"}
]);

Routing.registerRoute(
  /\.(?:png|glb)$/,
  new Strategies.CacheFirst({
    cacheName: 'resource-cache'
  })
);