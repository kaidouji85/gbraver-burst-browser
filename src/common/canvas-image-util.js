// @flow
import type {Resources} from './resource-manager';

/**
 * 指定した画像をキャンバスに描画する
 * 画像のローカル座標原点は画像中心
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param imagePath 画像パス
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 */
export function drawImage(context: CanvasRenderingContext2D, imagePath: string, resources: Resources, dx: number, dy: number): void {
  const image = resources.canvasImages.find(v => v.path === imagePath) || {};
  const x = dx - image.image.width / 2;
  const y = dy - image.image.height / 2;
  context.drawImage(image.image, x, y);
}