/**
 * CANVAS用画像ファイルを読み込む
 *
 * @param path ファイルパス
 * @return 読み込み結果
 */
export async function loadCanvasImage(path: string): Promise<Image> {
  const img = new Image();
  img.src = path;
  return new Promise(resolve => img.onload = () => resolve(img));
}