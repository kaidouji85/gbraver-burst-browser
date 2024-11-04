/**
 * ルート要素からメニューを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractMenu = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="menu"]`) ?? document.createElement("div");

/**
 * ルート要素からリトライを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractRetry = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="retry"]`) ?? document.createElement("div");

/**
 * ルート要素からバトル終了を抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractEndBattle = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="end-battle"]`) ?? document.createElement("div");
