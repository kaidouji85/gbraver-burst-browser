// @flow

import type {CanvasImageResource} from "../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import {drawImageInCenter} from "../draw/image-drawer";
import type {Param} from "./index";

/** ウインドウを描画する */
export function drawWindow(param: Param): void {
  const windowResource: ?CanvasImageResource = param.resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.GAUGE_WINDOW);
  const windowImage: Image = windowResource ? windowResource.image : new Image();

  drawImageInCenter(param.context, windowImage, param.dx, param.dy);
}