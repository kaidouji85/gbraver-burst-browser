/**
 * クロージャー画像を抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractCloser = (root: HTMLElement): HTMLImageElement =>
  root.querySelector<HTMLImageElement>('[data-id="closer"]') ??
  document.createElement("img");

/**
 * 「チュートリアルをはじめる」ボタンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractStartTutorialButton = (
  root: HTMLElement,
): HTMLButtonElement =>
  root.querySelector<HTMLButtonElement>('[data-id="start-tutorial"]') ??
  document.createElement("button");

/**
 * 「閉じる」ボタンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractCloseButton = (root: HTMLElement): HTMLButtonElement =>
  root.querySelector<HTMLButtonElement>('[data-id="close"]') ??
  document.createElement("button");

/**
 * バックグラウンドを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractBackGround = (root: HTMLElement): HTMLDivElement =>
  root.querySelector<HTMLDivElement>('[data-id="background"]') ??
  document.createElement("div");
