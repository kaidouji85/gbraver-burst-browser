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
import {HUDCutInScale} from "../../../hud-scale/hud-scale";

export const MESH_SIZE = 400;

/** 敵ターンスタートビュー */
export class EnemyTurnStartView implements TurnStartView {
  _mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const enemyTurnResource = resources.textures.find(v => v.id === TEXTURE_IDS.ENEMY_TURN);
    const enemyTurn = enemyTurnResource
      ? enemyTurnResource.texture
      : new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: enemyTurn,
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
   * @param preRender プリレンダー
   */
  engage(model: TurnStartModel, preRender: PreRender): void {
    const target = this._mesh.getObject3D();
    const devicePerScale = HUDCutInScale(preRender.rendererDOM, preRender.safeAreaInset);

    target.position.x = -model.position.x * devicePerScale;
    target.position.y =  -preRender.rendererDOM.clientHeight / 2
      + preRender.safeAreaInset.bottom
      + (model.position.y + 60) * devicePerScale;
    target.position.z = 0;

    target.scale.x = model.scale * devicePerScale;
    target.scale.y = model.scale * devicePerScale;

    this._mesh.setOpacity(model.opacity);
    this._mesh.getObject3D().quaternion.copy(preRender.camera.quaternion);
  }
}