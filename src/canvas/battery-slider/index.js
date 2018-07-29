// @flow

import type {Resources} from "../../resource";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import type {CanvasImageResource} from "../../resource/canvas-image";
import {drawImageInCenter} from "../draw/image-drawer";

/** 描画パラメータ */
export type Param = {
  /** 現在のバッテリー値 */
  battery: number,
  /** 選択可能なバッテリーの最大値 */
  maxEnableBattery: number,
  /** 最大バッテリー値 */
  maxBattery: number,
  /** 描画位置X */
  dx: number,
  /** 描画位置Y */
  dy: number
};

/**
 * バッテリースライダーを描画する
 *
 * @param context 描画対象のキャンバス
 * @param resources リソース管理オブジェクト
 * @param param バッテリースライダー描画パラメータ
 */
export function drawBatterySlider(context: CanvasRenderingContext2D, resources: Resources, param: Param): void {
  const sliderBaseResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SLIDER_BASE);
  const sliderBase: Image = sliderBaseResource ? sliderBaseResource.image : new Image();

  drawImageInCenter(context, sliderBase, param.dx, param.dy);
}