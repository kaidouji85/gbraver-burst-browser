// @flow

import * as THREE from 'three';
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";

export const MESH_SIZE = 1024;
export const CANVAS_SIZE = 1024;

/** ターンインジケータービュー */
export class TurnIndicatorView {
  _canvasMesh: CanvasMesh;
  _resources: Resources;

  constructor(resources: Resources) {
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._resources = resources;
  }

  /** モデルをビューに反映させる */
  engage(model: TurnIndicatorModel): void {
    this._refresh(model);
  }

  /** キャンバスを更新する */
  _refresh(model: TurnIndicatorModel) {
    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, context.canvas.height, context.canvas.height);
      context.save();

      const turnIndicatorResource: ?CanvasImageResource = this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TURN_INDICATOR);
      const turnIndicatorImage: Image = turnIndicatorResource ? turnIndicatorResource.image : new Image();
      const dx = context.canvas.width / 2;
      const dy = context.canvas.height / 2;
      drawImageInCenter(context, turnIndicatorImage, dx, dy);

      context.restore();
    });
  }

  /** ビューで使うthree.jsを返す */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }
}