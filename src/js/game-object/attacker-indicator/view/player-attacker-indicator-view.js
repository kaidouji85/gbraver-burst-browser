// @flow

import * as THREE from "three";
import type {AttackerIndicatorView} from "./attacker-indicator-view";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";
import type {AttackerIndicatorModel} from "../model/attacker-indicator-model";
import {SPRITE_RENDER_ORDER} from "../../../render-order/td-render-order";

export const MESH_SIZE = 400;
export const CANVAS_SIZE = 512;

/** プレイヤー側アタッカーインジケータのビュー */
export class PlayerAttackerIndicatorView implements AttackerIndicatorView {
  _canvas: CanvasMesh;

  constructor(resources: Resources) {
    this._canvas = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._canvas.mesh.renderOrder = SPRITE_RENDER_ORDER;

    const indicatorResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ATTACKER_INDICATOR);
    const indicator: Image = indicatorResource
      ? indicatorResource.image
      : new Image();
    this._canvas.draw(context => {
      const dx = context.canvas.width / 2;
      const dy = context.canvas.height / 2;
      drawImageInCenter(context, indicator, dx, dy);
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._canvas.destructor();
  }

  /** モデルをビューに反映させる */
  engage(model: AttackerIndicatorModel): void {
    this._refreshPos();
  }

  /** カメラの真正面を向く */
  lookAt(camera: THREE.Camera): void {
    this._canvas.getObject3D().quaternion.copy(camera.quaternion);
  }

  /** 座標を更新する */
  _refreshPos(): void {
    const target = this._canvas.getObject3D();
    target.position.x = 150;
    target.position.y = 150;
    target.position.z = 40;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._canvas.getObject3D();
  }
}