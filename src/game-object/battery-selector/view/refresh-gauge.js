// @flow

import {drawBatterySlider} from "../../../canvas/battery-slider";
import type {BatterySelectorModel} from "../model/battery-selector";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";

/**
 * バッテリーセレクタを再描画する
 *
 * @param context 描画対象キャンバス
 * @param resources リソース管理オブジェクト
 * @param model バッテリーセレクタモデル
 */
export function refreshGauge(context: CanvasRenderingContext2D, resources: Resources, model: BatterySelectorModel): void {
  context.clearRect(0, 0, context.canvas.height, context.canvas.height);
  context.save();
  context.globalAlpha = model.opacity;

  selectorWindow(context, resources);
  batterySlider(context, resources, model);
  okButton(context, resources, model);

  context.restore();
}

/** ウインドウ */
function selectorWindow(context: CanvasRenderingContext2D, resources: Resources): void {
  const windowResouece: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SELECTOR_WINDOW);
  const windowImage = windowResouece ? windowResouece.image : new Image();
  const dx = context.canvas.width / 2;
  const dy = context.canvas.height / 2;

  drawImageInCenter(context, windowImage, dx, dy);
}

/** スライダー */
function batterySlider(context: CanvasRenderingContext2D, resources: Resources, model: BatterySelectorModel): void {
  const dx = context.canvas.width / 2;
  const dy = context.canvas.height / 2 - 96;

  drawBatterySlider(context, resources, {
    battery: model.slider.battery,
    maxEnableBattery: model.slider.enableMax,
    maxBattery: model.slider.max,
    dx: dx,
    dy: dy
  });
}

/** OKボタン */
function okButton(context: CanvasRenderingContext2D, resources: Resources, model: BatterySelectorModel): void {
  const attackButtonResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SELECTOR_ATTACK_BUTTON);
  const attackButton: Image = attackButtonResource ? attackButtonResource.image : new Image();
  const dx = context.canvas.width / 2;
  const dy = context.canvas.height / 2 + 96;
  const scale = model.okButton.depth * 0.1 + 1;

  drawImageInCenter(context, attackButton, dx, dy, scale);
}