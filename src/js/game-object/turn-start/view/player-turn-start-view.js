// @flow

import * as THREE from "three";
import type {TurnStartView} from "./turn-start-view";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {TurnStartModel} from "../model/turn-start-model";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";

export const MESH_SIZE = 300;
export const CANVAS_SIZE = 512;

/** プレイヤーターンスタートビュー */
export class PlayerTurnStartView implements TurnStartView {
  _mesh: SimpleImageMesh;

  constructor(resources: Resources) {
    const indicatorResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.PLAYER_TURN);
    const indicator: Image = indicatorResource
      ? indicatorResource.image
      : new Image();
    this._mesh = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: MESH_SIZE,
      image: indicator,
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._mesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
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
    this._mesh.getObject3D().quaternion.copy(camera.quaternion);
  }

  /**
   * 透明度を更新する
   *
   * @param model モデル
   */
  _refreshOpacity(model: TurnStartModel): void {
    this._mesh.setOpacity(model.opacity);
  }

  /** 座標を更新する */
  _refreshPos(): void {
    const target = this._mesh.getObject3D();
    target.position.x = ARMDOZER_EFFECT_STANDARD_X;
    target.position.y = ARMDOZER_EFFECT_STANDARD_Y +10;
    target.position.z = ARMDOZER_EFFECT_STANDARD_Z + 40;
  }

  /**
   * スケールを更新する
   *
   * @param model モデル
   */
  _refreshScale(model: TurnStartModel): void {
    const target = this._mesh.getObject3D();
    target.scale.x = model.scale;
    target.scale.y = model.scale;
  }
}