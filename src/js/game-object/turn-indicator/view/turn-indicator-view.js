// @flow

import * as THREE from 'three';
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {ARMDOZER_EFFECT_STANDARD_Y, ARMDOZER_EFFECT_STANDARD_Z} from "../../armdozer/position";

export const MESH_SIZE = 200;
export const CANVAS_SIZE = 512;

/** ターンインジケータービュー */
export class TurnIndicatorView {
  _canvasMesh: CanvasMesh;

  constructor(resources: Resources) {
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._canvasMesh.draw(context => {
      const turnIndicatorResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TURN_INDICATOR);
      const turnIndicatorImage: Image = turnIndicatorResource ? turnIndicatorResource.image : new Image();
      const dx = context.canvas.width / 2;
      const dy = context.canvas.height / 2;
      drawImageInCenter(context, turnIndicatorImage, dx, dy);
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._canvasMesh.destructor();
  }

  /** モデルをビューに反映させる */
  engage(model: TurnIndicatorModel): void {
    const scale = (model.animation * 0.3 + 0.7);
    this._canvasMesh.mesh.scale.x = model.isPlayerTurn
      ? scale
      : -scale;
    this._canvasMesh.mesh.scale.y = scale;

    const x = 40 - 60 * model.animation;
    this._canvasMesh.mesh.position.x = model.isPlayerTurn
      ? x
      : -x;
    this._canvasMesh.mesh.position.y = ARMDOZER_EFFECT_STANDARD_Y;
    this._canvasMesh.mesh.position.z = ARMDOZER_EFFECT_STANDARD_Z + 20;

    this._canvasMesh.setOpacity(model.opacity);
  }

  /** カメラの方向を向く */
  lookAt(camera: typeof THREE.Camera): void {
    this._canvasMesh.mesh.quaternion.copy(camera.quaternion);
  }

  /** ビューで使うthree.jsを返す */
  getObject3D(): typeof THREE.Object3D {
    return this._canvasMesh.getObject3D();
  }
}
