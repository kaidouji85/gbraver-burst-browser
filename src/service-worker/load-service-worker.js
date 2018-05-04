// @flow

/**
 * サービスワーカーを登録する
 *
 * @return 実行結果
 */
export async function loadServiceWorker() {
  try {
    if (!navigator.serviceWorker) {
      return;
    }

    await navigator.serviceWorker.register('./sw.js');
    console.log('service worker register success!');
  } catch (e) {
    console.log('service worker register failed');
    console.log(e);
  }
}