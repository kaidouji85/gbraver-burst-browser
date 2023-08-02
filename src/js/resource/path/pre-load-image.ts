import { Path } from "./resource";

/**
 * 画像をプリロードする
 * @param path パス情報
 */
export function preLoadImage(path: Path): void {
  const image = new Image();
  image.src = path.path;
}