/**
 * ワーキング領域を抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractWorking = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="working"]`) ?? document.createElement("div");

/**
 * セレクター領域を抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractSelector = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="selector"]`) ?? document.createElement("div");
