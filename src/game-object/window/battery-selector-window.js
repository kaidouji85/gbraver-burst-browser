// @flow

import type {Resources} from "../../resource";
import {CanvasMesh} from "../../mesh/canvas-mesh";
import {drawImageInCenter} from "../../canvas/draw/image-drawer";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import type {CanvasImageResource} from "../../resource/canvas-image";
import * as THREE from 'three';

export const CANVAS_SIZE = 1024;
export const MESH_SIZE = 512;

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources
};

/** バッテリースライダーのウインドウ */
export class BatterySelectorWindow {
  _resources: Resources;
  _canvasMesh: CanvasMesh;

  constructor(param: Param) {
    this._resources = param.resources;
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._drawWindow();
  }

  /** ウインドウを描画する */
  _drawWindow() {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      const windowResource: ?CanvasImageResource = this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SLIDER_WINDOW);
      const window: Image = windowResource ? windowResource.image : new Image();
      drawImageInCenter(context, window, CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    });
  }

  /** 本クラスのthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }
}