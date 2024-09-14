/**
 * クロージャーを取得する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractCloser = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="qr-code-reader-closer"]`) ??
  document.createElement("div");

/**
 * カメラキャンバスを取得する
 * @param root ルート要素
 * @returns 取得結果
 */
export const extractCameraCanvas = (root: HTMLElement): HTMLCanvasElement => {
  const extractedCameraCanvas = root.querySelector(
    `[data-id="camera-canvas"]`,
  ) as HTMLCanvasElement;
  return extractedCameraCanvas instanceof HTMLCanvasElement
    ? extractedCameraCanvas
    : document.createElement("canvas");
};
