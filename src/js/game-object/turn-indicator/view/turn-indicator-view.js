// @flow

import * as THREE from 'three';
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";

export const MESH_SIZE = 200;
export const CANVAS_SIZE = 512;
export const CANVAS_NUM = 3;

/** ターンインジケータービュー */
export class TurnIndicatorView {
  _canvasMesh: CanvasMesh;

  constructor(resources: Resources) {
    this._canvasMesh = createCanvasMesh(resources);
  }

  /** デストラクタ */
  destructor(): void {
    this._canvasMesh.destructor();
  }

  /** モデルをビューに反映させる */
  engage(model: TurnIndicatorModel): void {
    engageMesh(this._canvasMesh, model);
  }

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void {
    this._canvasMesh.mesh.quaternion.copy(camera.quaternion);
  }

  /** ビューで使うthree.jsを返す */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.getObject3D();
  }
}

/** キャンバスメッシュを生成するヘルパー関数 */
function createCanvasMesh(resources: Resources): CanvasMesh {
  const mesh = new CanvasMesh({
    canvasWidth: CANVAS_SIZE,
    canvasHeight: CANVAS_SIZE,
    meshWidth: MESH_SIZE,
    meshHeight: MESH_SIZE,
  });
  mesh.draw(context => {
    const turnIndicatorResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TURN_INDICATOR);
    const turnIndicatorImage: Image = turnIndicatorResource ? turnIndicatorResource.image : new Image();
    const dx = context.canvas.width / 2;
    const dy = context.canvas.height / 2;
    drawImageInCenter(context, turnIndicatorImage, dx, dy);
  });
  return mesh;
}

/**
 * キャンバスメッシュにモデルを反省させる
 *
 * @param canvasMesh
 * @param model
 */
function engageMesh(canvasMesh: CanvasMesh, model: TurnIndicatorModel): void {
  const scale = (model.animation * 0.3 + 0.7);
  canvasMesh.mesh.scale.x = model.isPlayerTurn
    ? scale
    : -scale;
  canvasMesh.mesh.scale.y = scale;

  const x = 70 - 120 * model.animation;
  canvasMesh.mesh.position.x = model.isPlayerTurn
    ? x
    : -x;
  canvasMesh.mesh.position.y = 150;
  canvasMesh.mesh.position.z = 20;

  canvasMesh.setOpacity(model.opacity);
}