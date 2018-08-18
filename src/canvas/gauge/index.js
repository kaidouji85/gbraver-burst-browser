// @flow

import type {Resources} from "../../resource";
import {drawImageInCenter} from "../draw/image-drawer";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import type {CanvasImageResource} from "../../resource/canvas-image";

type Param = {
  /** 描画対象 */
  context: CanvasRenderingContext2D,
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 描画位置X */
  dx: number,
  /** 描画位置Y */
  dy: number
};

/**
 * ゲージを描画する
 *
 * @param param パラメータ
 */
export function drawGauge(param: Param): void {
  const windowResource: ?CanvasImageResource = param.resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.GAUGE_WINDOW);
  const windowImage: Image = windowResource ? windowResource.image : new Image();

  drawImageInCenter(param.context, windowImage, param.dx, param.dy);
}