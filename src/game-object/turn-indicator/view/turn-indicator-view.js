// @flow

import * as THREE from 'three';
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";

export const MESH_SIZE = 160;
export const CANVAS_SIZE = 128;

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
    this._setScale(model);
    this._setPos();
    this._setOpacity(model);
  }

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void {
    this._canvasMesh.mesh.quaternion.copy(camera.quaternion);
  }

  /** ビューで使うthree.jsを返す */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }

  /** 全体の拡大率を変更 */
  _setScale(model: TurnIndicatorModel): void {
    this._canvasMesh.mesh.scale.x = model.isPlayerTurn ? 1 : -1;
  }

  /** 位置調整 */
  _setPos(): void {
    this._canvasMesh.mesh.position.x = 0;
    this._canvasMesh.mesh.position.y = 150;
    this._canvasMesh.mesh.position.z = 20;
  }

  /** 透明度を設定 */
  _setOpacity(model: TurnIndicatorModel): void {
    this._canvasMesh.setOpacity(model.opacity);
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