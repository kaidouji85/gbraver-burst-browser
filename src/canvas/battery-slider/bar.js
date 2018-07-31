// @flow

import type {BatterySliderParam} from "./param";

/** スライダーバー系描画パラメータ */
type DrawBarParam = {
  value: number,
  maxValue: number,
  dx: number,
  dy: number
};

/**
 * スライダーバー系を描画する
 * アクティブバー、ディスアクティブバーで共通となる部分が多いのでまとめた
 *
 * @param context 描画対象のキャンバス
 * @param sliderBar バーの画像
 * @param param スライダーバー系描画パラメータ
 */
function drawBar(context: CanvasRenderingContext2D, sliderBar: Image, param: DrawBarParam): void {
  const sx = 0;
  const sy = 0;
  const sw = sliderBar.width * param.value / param.maxValue;
  const sh = sliderBar.height;
  const dx = param.dx - sliderBar.width / 2;
  const dy = param.dy - sh / 2;
  const dw = sw;
  const dh = sh;
  context.drawImage(sliderBar, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * アクティブバーを描画する
 *
 * @param context 描画対象のキャンバス
 * @param activeBar バッテリースライダーのアクティブバー画像
 * @param param バッテリースライダー描画パラメータ
 */
export function drawActiveBar(context: CanvasRenderingContext2D, activeBar: Image, param: BatterySliderParam): void {
  drawBar(context, activeBar, {
    value: param.battery,
    maxValue: param.maxBattery,
    dx: param.dx,
    dy: param.dy
  });
}

/**
 * ディスアクティブバーを描画する
 *
 * @param context 描画対象のキャンバス
 * @param activeBar バッテリースライダーのアクティブバー画像
 * @param param バッテリースライダー描画パラメータ
 */
export function drawDisActiveBar(context: CanvasRenderingContext2D, disActiveBar: Image, param: BatterySliderParam): void {
  drawBar(context, disActiveBar, {
    value: param.maxEnableBattery,
    maxValue: param.maxBattery,
    dx: param.dx,
    dy: param.dy
  });
}