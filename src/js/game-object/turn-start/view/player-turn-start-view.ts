import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { HUDCutInScale } from "../../scale";
import type { TurnStartModel } from "../model/turn-start-model";
import type { TurnStartView } from "./turn-start-view";

/** メッシュサイズ */
export const MESH_SIZE = 400;

/** プレイヤーターンスタートビュー */
export class PlayerTurnStartView implements TurnStartView {
  #mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const playerTurnResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.PLAYER_TURN,
    );
    const playerTurn = playerTurnResource
      ? playerTurnResource.texture
      : new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture: playerTurn,
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
   * @param preRender プリレンダー情報
   */
  engage(model: TurnStartModel, preRender: PreRender): void {
    const target = this.#mesh.getObject3D();
    const devicePerScale = HUDCutInScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    target.position.x =
      preRender.rendererDOM.clientWidth / 2 -
      preRender.safeAreaInset.right +
      (model.position.x - MESH_SIZE / 2) * devicePerScale;
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
