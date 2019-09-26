// @flow

/**
 * サービスワーカーを登録する
 *
 * @return 登録したサービスワーカー
 */
export async function loadServiceWorker(): Promise<ServiceWorkerRegistration|null> {
  try {
    if (!navigator.serviceWorker) {
      return null;
    }

    const sw = await navigator.serviceWorker.register('./sw.js');
    console.log('service worker register success!');
    return sw;
  } catch (e) {
    console.log('service worker register failed');
    console.log(e);
    return null;
  }
}