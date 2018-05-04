// @flow
import type {Resources} from "../../resource";
import type {CanvasImageResource} from "../../resource/canvas-image";
import {drawImageInCenter} from "../draw/image-drawer";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";

/**
 * バーストゲージを描画する
 *
 * @param context 描画対象のキャンバス
 * @param resources リソース管理オブジェクト
 * @param isActive バーストゲージがアクティブか否か、trueでアクティブ
 * @param dx 描画位置X
 * @param dy 描画位置Y
 */
export function drawBurstGauge(context: CanvasRenderingContext2D, resources: Resources, isActive: boolean, dx: number, dy: number): void {
  const imageId = isActive ? CANVAS_IMAGE_IDS.BURST_GAUGE_ACTIVE : CANVAS_IMAGE_IDS.BURST_GAUGE_DISACTIVE;
  const burstGaugeResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === imageId);
  const burstGaugeImage: Image = burstGaugeResource ? burstGaugeResource.image : new Image();

  // バーストゲージ画像は、他ゲージに比べて解像度が高い
  // 大きさの見た目をゲージ間でそれえるため、あえて縮小表示している
  const scale = 0.5;
  const width = burstGaugeImage.width * scale;
  const height = burstGaugeImage.height * scale;
  const x = dx - width / 2;
  const y = dy - height / 2;

  context.drawImage(burstGaugeImage, x, y, width, height);
}