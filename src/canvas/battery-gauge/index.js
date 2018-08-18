// @flow
import type {Resources} from '../../resource/index';
import {drawImageInCenter} from '../draw/image-drawer';
import {drawNumberLeft, drawNumberRight} from '../number/number';
import {BatteryBar} from './bar';
import type {CanvasImageResource} from "../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";

/**
 * プレイヤーのバッテリーゲージを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param value バッテリーの値
 * @param maxValue バッテリー最大値
 */
export function drawPlayerBatteryGauge(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, value: number, maxValue: number): void {
  const gaugeBaseResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.DEPRECATED_GAUGE_BASE);
  const gaugeBase: Image = gaugeBaseResource ? gaugeBaseResource.image : new Image();
  const batteryNumberResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.DEPRECATED_BATTERY_NUMBER);
  const batteryNumber: Image = batteryNumberResource ? batteryNumberResource.image : new Image();
  const batteryGaugeLabelResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.DEPRECATED_BATTERY_GAUGE_LABEL);
  const batteryGaugeLabel: Image = batteryGaugeLabelResource ? batteryGaugeLabelResource.image : new Image();

  drawImageInCenter(context, gaugeBase, dx, dy);
  BatteryBar(context, resources, dx - 8, dy + 8, Math.floor(value), Math.floor(maxValue));

  drawImageInCenter(context, batteryGaugeLabel , dx + 72, dy - 6);
  drawNumberLeft(context, batteryNumber, dx - 100, dy - 24 , Math.floor(value))
}

/**
 * 敵のバッテリーゲージを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param value バッテリーの値
 * @param maxValue バッテリー最大値
 */
export function drawEnemyBatteryGauge(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, value: number, maxValue: number): void {
  const gaugeBaseResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.DEPRECATED_GAUGE_BASE);
  const gaugeBase: Image = gaugeBaseResource ? gaugeBaseResource.image : new Image();
  const batteryNumberResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.DEPRECATED_BATTERY_NUMBER);
  const batteryNumber: Image = batteryNumberResource ? batteryNumberResource.image : new Image();
  const batteryGaugeLabelResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.DEPRECATED_BATTERY_GAUGE_LABEL);
  const batteryGaugeLabel: Image = batteryGaugeLabelResource ? batteryGaugeLabelResource.image : new Image();

  context.save();
  context.setTransform(-1, 0, 0, 1, 0, 0);

  drawImageInCenter(context, gaugeBase, -dx, dy);
  BatteryBar(context, resources, - dx - 8, dy + 8, Math.floor(value), Math.floor(maxValue));

  context.restore();

  drawImageInCenter(context, batteryGaugeLabel , dx - 64, dy - 6);
  drawNumberRight(context, batteryNumber, dx + 100, dy - 24 , Math.floor(value));
}