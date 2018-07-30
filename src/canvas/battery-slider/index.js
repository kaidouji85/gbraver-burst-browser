// @flow

import type {Resources} from "../../resource";
import type {CanvasImageResource} from "../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import {drawImageInCenter} from "../draw/image-drawer";
import {drawActiveBar, drawDisActiveBar} from "./bar";
import type {Param} from "./param";
import {drawPointer} from "./pointer";

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
  const activeBarResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SLIDER_ACTIVE_BAR);
  const activeBar: Image = activeBarResource ? activeBarResource.image : new Image();
  const disActiveBarResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SLIDER_DIS_ACTIVE_BAR);
  const disActiveBar: Image = disActiveBarResource ? disActiveBarResource.image : new Image();
  const pointerResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SLIDER_POINTER);
  const pointer = pointerResource ? pointerResource.image : new Image();

  drawImageInCenter(context, sliderBase, param.dx, param.dy);
  drawDisActiveBar(context, disActiveBar, param);
  drawActiveBar(context, activeBar, param);
  drawPointer(context, pointer, activeBar.width, param);
}
