import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { Resources } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { hudScale } from "../../scale";
import { TurnStartModel } from "../model/turn-start-model";
import { TurnStartView } from "./turn-start-view";

/** メッシュサイズ */
export const MESH_SIZE = 400;

/** 敵ターンスタートビュー */
export class EnemyTurnStartView implements TurnStartView {
  #mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const enemyTurn = findTextureOrThrow(
      resources,
      TEXTURE_IDS.ENEMY_TURN,
    ).texture;
    this.#mesh = new HorizontalAnimationMesh({
      texture: enemyTurn,
      maxAnimation: 1,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#mesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー
   */
  engage(model: TurnStartModel, preRender: PreRender): void {
    const target = this.#mesh.getObject3D();
    const devicePerScale = hudScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    target.position.x =
      -preRender.rendererDOM.clientWidth / 2 +
      preRender.safeAreaInset.left +
      (MESH_SIZE / 2 - model.position.x) * devicePerScale;
    target.position.y =
      -preRender.rendererDOM.clientHeight / 2 +
      preRender.safeAreaInset.bottom +
      (model.position.y + 60) * devicePerScale;
    target.position.z = 0;
    target.scale.x = model.scale * devicePerScale;
    target.scale.y = model.scale * devicePerScale;
    this.#mesh.opacity(model.opacity);
    this.#mesh.getObject3D().quaternion.copy(preRender.camera.quaternion);
  }
}
