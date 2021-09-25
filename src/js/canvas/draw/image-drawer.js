// @flow

/**
 * 指定した画像をキャンバスに描画する
 *
 * 画像のローカル座標原点は画像中心である
 * widthを指定しなかった場合、オリジナル画像のwidthを使用する
 * またheightはオリジナル画像のアスペクト比から自動計算される
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image canvas用画像
 * @param dx 描画X
 * @param dy 描画Y
 * @param width 描画する横幅(ピクセル)
 */
export function drawImageInCenter(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, width?: number): void {
  const correctWidth = width ?? image.width;
  const correctHeight = image.height * correctWidth / image.width;
  const x = dx - correctWidth / 2;
  const y = dy - correctHeight / 2;
  context.drawImage(image, x, y, correctWidth, correctHeight);
}