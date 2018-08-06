// @flow

import type {Resources} from "../../resource";
import {CanvasMesh} from "../../mesh/canvas-mesh";
import {drawImageInCenter} from "../../canvas/draw/image-drawer";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";

export const CANVAS_SIZE = 1024;
export const MESH_SIZE = 512;

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources
};

export class BatterySelectorWindow {
  _resources: Resources;
  _canvasMesh: CanvasMesh;

  constructor(param: Param) {
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
  }

  _drawWindow() {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_NUMBER)
      //drawImageInCenter()
    });
  }

  getObject3D(): void {
    return this._canvasMesh.mesh;
  }
}