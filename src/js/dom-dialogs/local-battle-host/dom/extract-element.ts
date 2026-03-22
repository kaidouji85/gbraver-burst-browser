/**
 * クロージャーを抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractCloser = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="closer"]`) ?? document.createElement("div");

/**
 * バックグラウンドを抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractBackGround = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="background"]`) ?? document.createElement("div");
