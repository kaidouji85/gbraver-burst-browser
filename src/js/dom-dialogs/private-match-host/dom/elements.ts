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
export const extractQrCode = (root: HTMLElement): HTMLCanvasElement => {
  const extractedQrCode = root.querySelector(
    `[data-id="qr-code"]`,
  ) as HTMLCanvasElement;
  return extractedQrCode instanceof HTMLCanvasElement
    ? extractedQrCode
    : document.createElement("canvas");
};
