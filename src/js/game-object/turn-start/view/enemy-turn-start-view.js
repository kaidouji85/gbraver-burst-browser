// @flow

import * as THREE from "three";
import type {TurnStartView} from "./turn-start-view";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";
import type {TurnStartModel} from "../model/turn-start-model";
import {SPRITE_RENDER_ORDER} from "../../../render-order/td-render-order";

export const MESH_SIZE = 400;
export const CANVAS_SIZE = 512;

/** 敵ターンスタートビュー */
export class EnemyTurnStartView implements TurnStartView {
  _canvas: CanvasMesh;

  constructor(resources: Resources) {
    this._canvas = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._canvas.mesh.renderOrder = SPRITE_RENDER_ORDER;

    const indicatorResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ENEMY_TURN);
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

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._canvas.getObject3D();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: TurnStartModel): void {
    this._refreshOpacity(model);
    this._refreshScale(model);
    this._refreshPos();
  }

  /**
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void {
    this._canvas.getObject3D().quaternion.copy(camera.quaternion);
  }

  /**
   * 透明度を更新する
   *
   * @param model モデル
   */
  _refreshOpacity(model: TurnStartModel): void {
    this._canvas.setOpacity(model.opacity);
  }

  /** 座標を更新する */
  _refreshPos(): void {
    const target = this._canvas.getObject3D();
    target.position.x = -150;
    target.position.y = 160;
    target.position.z = 40;
  }

  /**
   * スケールを更新する
   *
   * @param model モデル
   */
  _refreshScale(model: TurnStartModel): void {
    const target = this._canvas.getObject3D();
    target.scale.x = model.scale;
    target.scale.y = model.scale;
  }
}