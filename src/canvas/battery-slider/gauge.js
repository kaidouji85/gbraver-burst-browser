// @flow

import type {Resources} from "../../resource";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import type {CanvasImageResource} from "../../resource/canvas-image";

/**
 * バッテリースライダーのゲージ部分を描画する
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param battery 現在のバッテリー値
 * @param maxBattery 最大バッテリー値
 * @param dx 描画位置X
 * @param dy 描画位置Y
 */
export function drawBatterySliderGauge(context: CanvasRenderingContext2D, resources: Resources, battery: number, maxBattery: number, dx: number, dy: number) {
  const batterySliderGaugeResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SLIDER_GAUGE);
  const batterySliderGauge: Image = batterySliderGaugeResource ? batterySliderGaugeResource.image : new Image();
  const gaugeWidth = batterySliderGauge.width * battery / maxBattery;
  const gaugeHeight = batterySliderGauge.height;
  const drawX = dx - batterySliderGauge.width / 2;
  const drawY = dy - batterySliderGauge.height / 2;

  context.drawImage(batterySliderGauge, 0, 0, gaugeWidth, gaugeHeight, drawX, drawY, gaugeWidth, gaugeHeight);
}