// @flow

import type {Param} from "./param";

/** アクティブバーのパデイング */
export const PADDING_LEFT = 8;

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
 * @param sliderBase バッテリースライダーのベース画像
 * @param bar バーの画像
 * @param param スライダーバー系描画パラメータ
 */
function drawBar(context: CanvasRenderingContext2D, sliderBase: Image, bar: Image, param: DrawBarParam): void {
  const sx = 0;
  const sy = 0;
  const sw = bar.width * param.value / param.maxValue;
  const sh = bar.height;
  const dx = param.dx - sliderBase.width / 2 + PADDING_LEFT;
  const dy = param.dy - sh / 2;
  const dw = sw;
  const dh = sh;
  context.drawImage(bar, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * アクティブバーを描画する
 *
 * @param context 描画対象のキャンバス
 * @param sliderBase バッテリースライダーのベース画像
 * @param activeBar バッテリースライダーのアクティブバー画像
 * @param param バッテリースライダー描画パラメータ
 */
export function drawActiveBar(context: CanvasRenderingContext2D, sliderBase: Image, activeBar: Image, param: Param): void {
  drawBar(context, sliderBase, activeBar, {
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
 * @param sliderBase バッテリースライダーのベース画像
 * @param activeBar バッテリースライダーのアクティブバー画像
 * @param param バッテリースライダー描画パラメータ
 */
export function drawDisActiveBar(context: CanvasRenderingContext2D, sliderBase: Image, disActiveBar: Image, param: Param): void {
  drawBar(context, sliderBase, disActiveBar, {
    value: param.maxEnableBattery,
    maxValue: param.maxBattery,
    dx: param.dx,
    dy: param.dy
  });
}