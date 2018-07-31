// @flow

import type {BatterySliderParam} from "./param";
import * as R from 'ramda';

export const PADDING_TOP = 24;
export const LINE_HEIGHT = 64;
export const METER_WIDTH = 721;

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
    const lineY = param.dy + PADDING_TOP;
    drawLine(context, lineX, lineY);

    //context.fillText(v, lineX, lineY + 100);
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
  context.strokeStyle = '#FDFDFD';
  context.beginPath();
  context.moveTo(dx, dy);
  context.lineTo(dx, dy + LINE_HEIGHT);
  context.closePath();
  context.stroke();

  context.restore();
}