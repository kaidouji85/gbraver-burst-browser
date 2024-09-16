/**
 * クロージャーを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractCloser = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="closer"]`) ?? document.createElement("div");

/**
 * QRコード表示キャンバスを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractQRCode = (root: HTMLElement): HTMLCanvasElement => {
  const extractedQRCode = root.querySelector(
    `[data-id="qr-code"]`,
  ) as HTMLCanvasElement;
  return extractedQRCode instanceof HTMLCanvasElement
    ? extractedQRCode
    : document.createElement("canvas");
};

/**
 * ルームIDコピーを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractCopyRoomID = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="copy-room-id"]`) ??
  document.createElement("div");
