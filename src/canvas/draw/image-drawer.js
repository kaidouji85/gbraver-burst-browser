// @flow

/**
 * 指定した画像をキャンバスに描画する
 * 画像のローカル座標原点は画像中心
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image canvas用画像
 * @param dx 描画X
 * @param dy 描画Y
 */
export function drawImageInCenter(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number) {
  const x = dx - image.width / 2;
  const y = dy - image.height / 2;
  context.drawImage(image, x, y);
}
