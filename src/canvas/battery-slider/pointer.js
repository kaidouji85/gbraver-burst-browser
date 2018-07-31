// @flow
import type {BatterySliderParam} from "./param";
import {drawImageInCenter} from "../draw/image-drawer";

/**
 * スライダーポインタを描画する
 *
 * @param context 描画対象のキャンバス
 * @param pointer ポインタ画像
 * @param sliderWidth スライダーバーの横幅
 * @param param バッテリースライダー描画パラメータ
 */
export function drawPointer(context: CanvasRenderingContext2D, pointer: Image, sliderWidth: number, param: BatterySliderParam): void {
  const dx = param.dx - sliderWidth / 2 + param.battery / param.maxBattery * sliderWidth;
  const dy = param.dy;
  drawImageInCenter(context, pointer, dx, dy);
}