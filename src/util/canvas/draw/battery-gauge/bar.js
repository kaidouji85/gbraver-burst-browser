// @flow
import type {Resources} from '../../../../resource/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../../../resource/loader/depricated-canvas-image-loader';
import * as R from 'ramda';
import {depuricated_drawImage} from '../image-drawer';
import {trapezoid} from '../../clip/trapezoid';


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
  depuricated_drawImage(context, resources, CANVAS_PICTURE_PATH.BATTERY_BAR_DOWN, dx, dy);

  const barUpImage = resources.depuricated_canvasImages.find(v => v.path === CANVAS_PICTURE_PATH.BATTERY_BAR_UP) || {};
  context.save();
  trapezoid(context, barUpImage.image.width, barUpImage.image.height, dx, dy, value / maxValue);
  depuricated_drawImage(context, resources, CANVAS_PICTURE_PATH.BATTERY_BAR_UP, dx, dy);
  context.restore();

  barScale(context, barUpImage.image.width, barUpImage.image.height, dx, dy, value, maxValue);
}