/**
 * ルート要素からコンテンツ要素を抽出する
 * @param root ルート要素
 * @returns 抽出されたコンテンツ要素
 */
export const extractContent = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="content"]') ?? document.createElement("div");
