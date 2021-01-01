// @flow

import * as THREE from "three";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";
import type {TurnStartView} from "./turn-start-view";
import type {TurnStartModel} from "../model/turn-start-model";
import type {PreRender} from "../../../action/game-loop/pre-render";

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
   * @param preRender プリレンダー情報
   */
  engage(model: TurnStartModel, preRender: PreRender): void {
    this._refreshOpacity(model);
    this._refreshScale(model);
    this._refreshPos();
    this._mesh.getObject3D().quaternion.copy(preRender.camera.quaternion);
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
    target.position.x = ARMDOZER_EFFECT_STANDARD_X + 200;
    target.position.y = ARMDOZER_EFFECT_STANDARD_Y +10 - 100;
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