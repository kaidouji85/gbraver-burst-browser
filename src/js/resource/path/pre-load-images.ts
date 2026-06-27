import { Resources } from "..";
import { PathId } from "./resource";

/**
 * 画像をプリロードする
 * @param src 画像のパス
 * @returns プリロードが完了したら発火するPromise
 */
const preLoadImage = (src: string) => {
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

/**
 * 指定されたパスIDの画像をプリロードする
 * @param resources リソース管理オブジェクト
 * @param pathIds プリロードするパスIDの配列
 * @returns プリロードが完了したら発火するPromise
 */
export const preLoadImages = (resources: Resources, pathIds: PathId[]) => {
  const uniquePathIds = Array.from(new Set(pathIds));
  return Promise.all(
    uniquePathIds
      .map((pathId) => resources.paths.find((p) => p.id === pathId)?.path)
      .filter((p) => p !== undefined)
      .map((path) => preLoadImage(path)),
  );
};
