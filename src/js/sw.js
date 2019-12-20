import * as Core from 'workbox-core';
import * as PreCaching from 'workbox-precaching';
import * as Routing from 'workbox-routing';
import * as Strategies from 'workbox-strategies';

PreCaching.precacheAndRoute([
  {url: "index.html", revision: REVISION_INDEX_HTML}
]);

/**
 * ランタイムキャッシュのキー
 * 末尾にビルドごとのハッシュ値を追加して、現行バージョンのキャッシュか否かを判別できるようにしている
 */
const RUNTIME_CACHE_KEY = `RUNTIME_CACHE_KEY_-${RUNTIME_CACHE_HASH}`;
const NETWORK_FIRST_LIST = [
  '/app-icon.png',
  '/manifest.json'
];
Routing.registerRoute(
  context => NETWORK_FIRST_LIST.includes(context.url),
  new Strategies.NetworkFirst({
    cacheName: RUNTIME_CACHE_KEY
  })
);

const CACHE_FIRST_MATCH = /\.(?:png|glb|css|js)$/;
Routing.registerRoute(
  context => {
    if (NETWORK_FIRST_LIST.includes(context.url)) {
      return false;
    } else {
      return CACHE_FIRST_MATCH.test(context.url);
    }
  },
  new Strategies.CacheFirst({
    cacheName: RUNTIME_CACHE_KEY
  })
);


self.addEventListener('activate', e => {
  e.waitUntil(clearOldRuntimeCache());
});

/** 古いランタイムキャッシュを削除する */
async function clearOldRuntimeCache() {
  try {
    const keys = await caches.keys();
    const deleteKeys = keys
      .filter(v => v !== RUNTIME_CACHE_KEY)
      .filter(v => v!== Core.cacheNames.precache);
    await Promise.all(deleteKeys.map(v => {
      console.log(`delete cache ${v}`);
      return caches.delete(v);
    }
    ));
  } catch(e) {
    throw e;
  }
}