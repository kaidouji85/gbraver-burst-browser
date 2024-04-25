/**
 * ダミーステータスを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractDummyStatus = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="dummyStatus"]`) ??
  document.createElement("div");

/**
 * OKボタンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractOkButton = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="okButton"]`) ??
  document.createElement("button");

/**
 * 戻るボタンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractPrevButton = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="prevButton"]`) ??
  document.createElement("button");

/**
 * アイコン集合を抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractIcons = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="icons"]`) ?? document.createElement("div");
