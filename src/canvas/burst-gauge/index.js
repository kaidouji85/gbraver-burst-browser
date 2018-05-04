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

  drawImageInCenter(context, burstGaugeImage, dx, dy);
}