import * as PreCaching from 'workbox-precaching';

PreCaching.precacheAndRoute([
  {url: "index.html"},
  {url: "index.js"}
]);