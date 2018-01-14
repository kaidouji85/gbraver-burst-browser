// @flow
import type {Resources} from '../../../../resource/resource-manager';
import * as R from 'ramda';
import {drawImage} from '../image-drawer';
import {trapezoid} from '../../clip/trapezoid';
import type {CanvasImageResource} from "../../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../../resource/canvas-image";

/**
 * バッテリーバーの目盛りを描画する
 * ローカル座標原点は中心
 *
 * @param context 描画対象のCANVAS
 * @param width バッテリーバー幅
 * @param height バッテリーバー高
 * @param dx 描画位置X
 * @param dy 描画位置Y
 * @param value 現在の値
 * @param maxValue 目盛り数
 */
function barScale(context: CanvasRenderingContext2D, width: number, height: number, dx: number, dy: number, value:number, maxValue: number) {
  context.save();
  context.strokeStyle = '#8b4513';

  const scaleSize = width / maxValue;
  R.range(1, value).forEach(v => {
    context.beginPath();
    context.moveTo(dx - width / 2 + scaleSize * v, dy + height / 2);
    context.lineTo(dx - width / 2 + scaleSize * v + 10, dy - height / 2);
    context.closePath();
    context.stroke();
  });

  context.restore();
}

/**
 * バッテリーバーを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param value バッテリーの値
 * @param maxValue バッテリーの最大値
 */
export function BatteryBar(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, value: number, maxValue: number): void {
  const batteryBarUpResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_BAR_UP);
  const batteryBarUp: Image = batteryBarUpResource ? batteryBarUpResource.image : new Image();
  const batteryBarDownResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_BAR_DOWN);
  const batteryBarDown: Image = batteryBarDownResource ? batteryBarDownResource.image : new Image();

  drawImage(context, batteryBarDown, dx, dy);

  context.save();

  trapezoid(context, batteryBarUp.width, batteryBarUp.height, dx, dy, value / maxValue);
  drawImage(context, batteryBarUp, dx, dy);

  context.restore();

  barScale(context, batteryBarUp.width, batteryBarUp.height, dx, dy, value, maxValue);
}