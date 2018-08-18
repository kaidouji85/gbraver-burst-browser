// @flow

import type {CanvasImageResource} from "../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import type {Param} from "./index";
import {drawImageInCenter} from "../draw/image-drawer";

/** HPゲージを描画する */
export function drawHpGauge(param: Param): void {
  const barResource: ?CanvasImageResource = param.resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ACTIVE_HP_BAR);
  const bar: Image = barResource ? barResource.image : new Image();

  drawImageInCenter(param.context, bar, param.dx, param.dy);
}