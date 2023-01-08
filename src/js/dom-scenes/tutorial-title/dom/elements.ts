import type { DataIDs } from "./data-ids";

/** ルートHTML要素の子孫要素 */
export type Elements = {
  stand: HTMLImageElement;
  bustShot: HTMLImageElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const foundStand = root.querySelector(`[data-id="${ids.stand}"]`);
  const stand =
    foundStand instanceof HTMLImageElement ? foundStand : new Image();
  const foundBustShot = root.querySelector(`[data-id="${ids.bustShot}"]`);
  const bustShot =
    foundBustShot instanceof HTMLImageElement ? foundBustShot : new Image();
  return {
    stand,
    bustShot,
  };
}
