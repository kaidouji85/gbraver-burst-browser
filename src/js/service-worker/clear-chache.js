// @flow

/**
 * このサイトのキャッシュストレージを全て削除する
 */
export async function clearCache(): Promise<void> {
  try {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(v => v)
      .map(v => caches.delete(v))
    );
  } catch(e) {
    throw e;
  }
}