// @flow

/**
 * サービスワーカーを登録する
 *
 * @return 登録したサービスワーカー
 */
export async function loadServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  try {
    if (!navigator.serviceWorker) {
      return null;
    }

    const sw = await navigator.serviceWorker.register('./sw.js');
    return sw;
  } catch (e) {
    //console.error('service worker register failed');
    //console.error(e);
    return null;
  }
}