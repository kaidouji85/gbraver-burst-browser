/**
 * ルートHTML要素から立ち絵を抽出する
 * @param root ルートHTML要素
 * @return 抽出結果
 */
export function extractStand(root: HTMLElement): HTMLImageElement {
  const foundStand = root.querySelector(`[data-id="stand"]`);
  return foundStand instanceof HTMLImageElement ? foundStand : new Image();
}

/**
 * ルートHTML要素からバストショットを抽出する
 * @param root ルートHTML要素
 * @return 抽出結果
 */
export function extractBustShot(root: HTMLElement): HTMLImageElement {
  const foundBustShot = root.querySelector(`[data-id="bustShot"]`);
  return foundBustShot instanceof HTMLImageElement
    ? foundBustShot
    : new Image();
}
