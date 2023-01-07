/**
 * 指定した画像のシルエットを抽出する
 * 透明色以外を指定した色で塗りつぶし、抽出結果は新規作成したCanvasとして返す
 * @param image シルエット抽出する画像
 * @param r 塗りつぶしRed
 * @param g 塗りつぶしGreen
 * @param b 塗りつぶしBlue
 * @return 生成したCanvas
 */
export function toSilhouette(image: Image, r: number, g: number, b: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pix = imageData.data;

  for (let i = 0; i < pix.length; i += 4) {
    pix[i] = r;
    pix[i + 1] = g;
    pix[i + 2] = b;
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
}