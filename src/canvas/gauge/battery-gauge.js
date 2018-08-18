// @flow

import type {Param} from "./index";
import type {CanvasImageResource} from "../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import {drawImageInCenter} from "../draw/image-drawer";

const PADDING_TOP = 32;

/** バッテリーゲージを描画する */
export function drawBatteryGauge(param: Param): void {
  const disActiveBarResource: ?CanvasImageResource = param.resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.DIS_ACTIVE_BATTERY_BAR);
  const disActiveBar: Image = disActiveBarResource ? disActiveBarResource.image : new Image();
  const baseResource: ?CanvasImageResource = param.resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.GAUGE_BAR_BASE);
  const base: Image = baseResource ? baseResource.image : new Image();
  const dx = param.dx;
  const dy = param.dy + PADDING_TOP;

  drawImageInCenter(param.context, base, dx, dy);
  drawImageInCenter(param.context, disActiveBar, dx, dy);
  drawActiveBar(param);
}

/** アクティブバーを描画する */
function drawActiveBar(param: Param): void {
  const activeBarResource: ?CanvasImageResource = param.resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ACTIVE_BATTERY_BAR);
  const activeBar: Image = activeBarResource ? activeBarResource.image : new Image();
  const sx = 0;
  const sy = 0;
  const sw = activeBar.width * param.battery / param.maxBattery;
  const sh = activeBar.height;
  const dx = param.dx - activeBar.width / 2;
  const dy = param.dy - activeBar.height / 2 + PADDING_TOP;
  const dw =sw;
  const dh = sh;
  param.context.drawImage(activeBar, sx, sy, sw, sh, dx, dy, dw, dh);

}