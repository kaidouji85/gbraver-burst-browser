// @flow

import type {BatterySliderParam} from "./param";
import * as R from 'ramda';

export const LINE_HEIGHT = 20;
export const METER_WIDTH = 384;
export const LINE_COLOR = '#FDFDFD';
export const NUMBER_COLOR = '#FDFDFD';

/**
 * バッテリースライダーの目盛りを描画する
 *
 * @param context 描画対象のキャンバス
 * @param meterWidth  メーターの横幅
 * @param param バッテリースライダー描画パラメータ
 */
export function drawMeterScale(context: CanvasRenderingContext2D, param: BatterySliderParam) {
  R.range(0, param.maxBattery + 1).forEach(v => {
    const lineX = param.dx - METER_WIDTH / 2 + METER_WIDTH / param.maxBattery * v;
    const lineY = param.dy;
    drawLine(context, lineX, lineY);

    const numberX = lineX;
    const numberY = lineY + LINE_HEIGHT + 16;
    drawNumber(context, v, numberX, numberY);
  });
}

/**
 * 縦にラインを引く
 *
 * @param context 描画対象のキャンバス
 * @param dx 描画位置X
 * @param dy 描画位置Y
 */
function drawLine(context: CanvasRenderingContext2D, dx: number, dy: number): void {
  context.save();

  context.lineWidth = 1;
  context.strokeStyle = LINE_COLOR;
  context.beginPath();
  context.moveTo(dx, dy);
  context.lineTo(dx, dy + LINE_HEIGHT);
  context.closePath();
  context.stroke();

  context.restore();
}

/**
 * 数字を描画する
 *
 * @param context 描画対象のキャンバス
 * @param value 描画する数字の値
 * @param dx 描画位置X
 * @param dy 描画位置Y
 */
function drawNumber(context: CanvasRenderingContext2D, value: number, dx: number, dy: number): void {
  context.save();

  context.font = "16px 'sans-serif'";
  context.fillStyle = NUMBER_COLOR;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(`${value}`, dx, dy);

  context.restore();
}