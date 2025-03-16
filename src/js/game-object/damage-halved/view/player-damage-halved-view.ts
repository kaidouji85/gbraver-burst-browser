import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../td-position";
import type { DamageHalvedModel } from "../model/damage-halved-model";
import type { DamageHalvedView } from "./damage-halved-view";
export const MESH_SIZE = 300;

/**プレイヤー ダメージ半減 ビュー*/
export class PlayerDamageHalvedView implements DamageHalvedView {
  #mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const playerTurn =
      resources.textures.find((v) => v.id === TEXTURE_IDS.DAMAGE_HALVED)
        ?.texture ?? new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture: playerTurn,
      maxAnimation: 1,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /** @override */
  destructor(): void {
    this.#mesh.destructor();
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }

  /** @override */
  engage(model: DamageHalvedModel): void {
    const target = this.#mesh.getObject3D();
    this.#mesh.opacity(model.opacity);
    target.position.x = ARMDOZER_EFFECT_STANDARD_X;
    target.position.y = ARMDOZER_EFFECT_STANDARD_Y + 10;
    target.position.z = ARMDOZER_EFFECT_STANDARD_Z + 40;
    target.scale.x = model.scale;
    target.scale.y = model.scale;
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.#mesh.getObject3D().quaternion.copy(camera.quaternion);
  }
}
