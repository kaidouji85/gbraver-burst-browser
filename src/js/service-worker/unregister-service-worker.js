// @flow

/**
 * このサイトに登録されているサービスワーカーを全て削除する
 */
export async function unregisterServiceWorker(): Promise<void> {
  try {
    if (!navigator.serviceWorker) {
      return;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    for (let registration of registrations) {
      await registration.unregister();
    }
  } catch(e) {
    throw e;
  }
}