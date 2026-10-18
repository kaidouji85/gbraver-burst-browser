/**
 * クローザー要素を抽出する
 * @param root ルート要素
 * @returns クローザー要素
 */
export const extractCloser = (root: HTMLElement): HTMLImageElement => {
  const extracted = root.querySelector('[data-id="closer"]');
  return extracted instanceof HTMLImageElement
    ? extracted
    : document.createElement("img");
};

/**
 * バックグラウンド要素を抽出する
 * @param root ルート要素
 * @returns バックグラウンド要素
 */
export const extractBackGround = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="background"]') ?? document.createElement("div");
