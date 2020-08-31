// @flow

import * as THREE from "three";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import type {PopUpModel} from "../../pop-up/pop-up/model/pop-up-model";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";
import type {TurnStartView} from "./turn-start-view";

export const MESH_SIZE = 300;

/** プレイヤーターンスタートビュー */
export class PlayerTurnStartView implements TurnStartView {
  _mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const playerTurnResource = resources.textures.find(v => v.id === TEXTURE_IDS.PLAYER_TURN);
    const playerTurn = playerTurnResource
      ? playerTurnResource.texture
      : new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: playerTurn,
      maxAnimation: 1,
      width: MESH_SIZE,
      height: MESH_SIZE,
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
  getObject3D(): typeof THREE.Object3D {
    return this._mesh.getObject3D();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: PopUpModel): void {
    this._refreshOpacity(model);
    this._refreshScale(model);
    this._refreshPos();
  }

  /**
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: typeof THREE.Camera): void {
    this._mesh.getObject3D().quaternion.copy(camera.quaternion);
  }

  /**
   * 透明度を更新する
   *
   * @param model モデル
   */
  _refreshOpacity(model: PopUpModel): void {
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
  _refreshScale(model: PopUpModel): void {
    const target = this._mesh.getObject3D();
    target.scale.x = model.scale;
    target.scale.y = model.scale;
  }
}