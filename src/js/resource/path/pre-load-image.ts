/**
 * 画像をプリロードする
 * @param src 画像のパス
 * @returns プリロードが完了したら発火するPromise
 */
export const preLoadImage = (src: string) => {
  const img = new Image();
  let onLoad: null | (() => void) = null;
  let onError: null | ((e: Event) => void) = null;
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    onLoad = () => resolve();
    onError = (e) => reject(e);
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    img.src = src;
  }).finally(() => {
    if (onLoad) {
      img.removeEventListener("load", onLoad);
    }
    if (onError) {
      img.removeEventListener("error", onError);
    }
  });
};
