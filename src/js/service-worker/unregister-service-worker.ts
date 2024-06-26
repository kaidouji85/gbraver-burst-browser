/**
 * このサイトに登録されているサービスワーカーを全て削除する
 */
export async function unregisterServiceWorker(): Promise<void> {
  if (!navigator.serviceWorker) {
    return;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();

  for (const registration of registrations) {
    await registration.unregister();
  }
}
