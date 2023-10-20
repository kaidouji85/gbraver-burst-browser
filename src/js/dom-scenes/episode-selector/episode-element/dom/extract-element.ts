/**
 * チェックを抽出する
 * @param root ルート要素
 * @return 抽出結果
 */
export const extractChecker = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="checker"]`) ?? document.createElement("div");
