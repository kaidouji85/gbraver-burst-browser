import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../armdozer/position";
import type { PowerUpModel } from "../model/power-up-model";
import type { PowerUpView } from "./power-up-view";
export const MESH_SIZE = 300;

/**
 * プレイヤー 攻撃アップ ビュー
 */
export class PlayerPowerUpView implements PowerUpView {
  #mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const playerTurnResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.POWER_UP,
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
   */
  engage(model: PowerUpModel): void {
    const target = this.#mesh.getObject3D();
    this.#mesh.opacity(model.opacity);
    target.position.x = ARMDOZER_EFFECT_STANDARD_X;
    target.position.y = ARMDOZER_EFFECT_STANDARD_Y + 10;
    target.position.z = ARMDOZER_EFFECT_STANDARD_Z + 40;
    target.scale.x = model.scale;
    target.scale.y = model.scale;
  }

  /**
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void {
    this.#mesh.getObject3D().quaternion.copy(camera.quaternion);
  }
}
