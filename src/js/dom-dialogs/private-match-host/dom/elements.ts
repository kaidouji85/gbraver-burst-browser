/**
 * クロージャーを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractCloser = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="closer"]`) ?? document.createElement("div");

/**
 * QRコード表示領域を抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractQRCode = (root: HTMLElement): HTMLImageElement => {
  const extractedQRCode = root.querySelector(
    `[data-id="qr-code"]`,
  ) as HTMLCanvasElement;
  return extractedQRCode instanceof HTMLImageElement
    ? extractedQRCode
    : document.createElement("img");
};

/**
 * ルームIDコピーを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractCopyRoomID = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="copy-room-id"]`) ??
  document.createElement("div");

/**
 * ルームIDコピー成功フラッシュメッセージを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractSuccessCopyRoomID = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="success-copy-room-id"]`) ??
  document.createElement("div");
