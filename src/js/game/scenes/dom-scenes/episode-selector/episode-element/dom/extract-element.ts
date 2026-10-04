/**
 * チェックを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractChecker = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="checker"]`) ?? document.createElement("div");
