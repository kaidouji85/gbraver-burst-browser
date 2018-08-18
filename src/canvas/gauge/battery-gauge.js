// @flow

import type {Param} from "./index";
import type {CanvasImageResource} from "../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import {drawImageInCenter} from "../draw/image-drawer";

const PADDING_TOP = 32;
const NUMBER_COLOR = '#FDFDFD';

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
  drawNumber(param.context, dx + 128, dy - 16, param.battery);
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

/** バッテリーの数字を描画する */
function drawNumber(context: CanvasRenderingContext2D, dx: number, dy: number, value: number): void {
  context.save();

  context.font = "32px 'sans-serif'";
  context.fillStyle = NUMBER_COLOR;
  context.textAlign = 'right';
  context.textBaseline = 'middle';
  context.fillText(`${value}`, dx, dy);

  context.restore();
}