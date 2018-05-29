// @flow
import type {Resources} from "../../resource";
import type {CanvasImageResource} from "../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import {drawImageInCenter} from "../draw/image-drawer";
import {drawBatterySliderGauge} from "./gauge";

export const SHADOW_PADDING_BOTTOM = 8;

/**
 * バッテリースライダーを描画する
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param battery 現在のバッテリー値
 * @param maxBattery 最大バッテリー値
 * @param dx 描画位置X
 * @param dy 描画位置Y
 */
export function drawBatterySlider(context: CanvasRenderingContext2D, resources: Resources, battery: number, maxBattery: number, dx: number, dy: number): void {
  const sliderBaseResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SLIDER_BASE);
  const sliderBase: Image = sliderBaseResource ? sliderBaseResource.image : new Image();
  const sliderBackResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SLIDER_BACK);
  const sliderBack: Image = sliderBackResource ? sliderBackResource.image : new Image();
  const sliderShadowResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SLIDER_SHADOW);
  const sliderShadowImage: Image = sliderShadowResource ? sliderShadowResource.image : new Image();

  //drawImageInCenter(context, sliderShadowImage, dx, dy + SHADOW_PADDING_BOTTOM);
  drawImageInCenter(context, sliderBack, dx, dy);
  drawBatterySliderGauge(context, resources, battery, maxBattery, dx, dy);
  drawImageInCenter(context, sliderBase, dx, dy);
}