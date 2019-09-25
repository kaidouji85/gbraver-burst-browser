// @flow

/**
 * 指定した画像をキャンバスに描画する
 * 画像のローカル座標原点は画像中心
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image canvas用画像
 * @param dx 描画X
 * @param dy 描画Y
 * @param scale 拡大率
 */
export function drawImageInCenter(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, scale: number = 1) {
  const width = image.width * scale;
  const height = image.height * scale;
  const x = dx - width / 2;
  const y = dy - height / 2;
  context.drawImage(image, x, y, width, height);
}