/** パラメータ */
type Params = {
  /** シルエット抽出する画像 */
  image: HTMLImageElement;
  /** 塗りつぶしRed */
  r: number;
  /** 塗りつぶしGreen */
  g: number;
  /** 塗りつぶしBlue */
  b: number;
  /** canvas後の画像スケール */
  scale?: number;
};

/**
 * 指定した画像のシルエットを抽出する
 * 透明色以外を指定した色で塗りつぶし、抽出結果は新規作成したCanvasとして返す
 * @param param パラメータ
 * @returns 生成したCanvas
 */
export function toSilhouette(params: Params): HTMLCanvasElement {
  const { image, r, g, b } = params;
  const scale = params?.scale ?? 1;
  const canvas = document.createElement("canvas");
  canvas.width = image.width * scale;
  canvas.height = image.height * scale;
  const context = canvas.getContext("2d") || new CanvasRenderingContext2D();
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
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
