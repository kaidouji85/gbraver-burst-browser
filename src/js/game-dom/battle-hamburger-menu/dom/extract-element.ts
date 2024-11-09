/**
 * ルート要素からハンバーガーアイコンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractHamburgerIcon = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="hamburger-icon"]`) ??
  document.createElement("div");

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

/**
 * ルート要素からバックグラウンドを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractBackGround = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="background"]`) ?? document.createElement("div");

/**
 * ルート要素からリトライ確認ダイアログを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractRetryConfirmDialog = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="retry-confirm-dialog"]`) ??
  document.createElement("div");

/**
 * ルート要素からリトライ確認ダイアログのクローザーを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractRetryConfirmDialogCloser = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector(`[data-id="retry-confirm-dialog-closer"]`) ??
  document.createElement("div");

/**
 * ルート要素からリトライボタンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractRetryButton = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="retry-button"]`) ??
  document.createElement("div");

/**
 * ルート要素からリトライキャンセルボタンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractRetryCancelButton = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="retry-cancel-button"]`) ??
  document.createElement("div");
