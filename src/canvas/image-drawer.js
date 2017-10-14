// @flow
import type {Resources} from '../resource/resource-manager';

/**
 * 指定した画像をキャンバスに描画する
 * 画像のローカル座標原点は画像中心
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param resources リソース管理オブジェクト
 * @param imagePath 画像パス
 * @param dx 描画X
 * @param dy 描画Y
 */
export function drawImage(context: CanvasRenderingContext2D, resources: Resources, imagePath: string, dx: number, dy: number): void {
  const image = resources.canvasImages.find(v => v.path === imagePath) || {};
  const x = dx - image.image.width / 2;
  const y = dy - image.image.height / 2;
  context.drawImage(image.image, x, y);
}