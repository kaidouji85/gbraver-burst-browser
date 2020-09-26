// @flow

/**
 * サービスワーカーを登録する
 * 登録できない場合はnullを返す
 *
 * @return 登録したサービスワーカー
 */
export async function loadServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!navigator.serviceWorker) {
    return null;
  }

  const sw = await navigator.serviceWorker.register('./sw.js');
  return sw;
}