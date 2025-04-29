import * as R from "ramda";
import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { Resources } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../td-position";
import { DamageIndicatorModel } from "../model/damage-indicator-model";
import { DamageIndicatorView } from "./damage-indicator-view";

export const MESH_SIZE = 50;
export const MAX_NUMBER_SIZE = 4;
export const MAX_ANIMATION = 16;
export const GROUP_PADDING = 30;

/** プレイヤーのダメージインジケータビュー */
export class PlayerDamageIndicatorView implements DamageIndicatorView {
  #group: THREE.Group;
  #numbers: HorizontalAnimationMesh[];

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const damageNumber = findTextureOrThrow(
      resources,
      TEXTURE_IDS.DAMAGE_NUMBER,
    ).texture;
    this.#numbers = R.times(
      () =>
        new HorizontalAnimationMesh({
          texture: damageNumber,
          maxAnimation: MAX_ANIMATION,
          width: MESH_SIZE,
          height: MESH_SIZE,
        }),
      MAX_NUMBER_SIZE,
    );
    this.#numbers.forEach((v) => {
      this.#group.add(v.getObject3D());
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.#numbers.forEach((v) => {
      v.destructor();
    });
  }

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void {
    const values: number[] = String(model.damage)
      .split("")
      .map((v) => Number(v));
    this.#numbers.forEach((mesh, meshIndex) => {
      mesh.opacity(0);
      values
        .filter((value, valueIndex) => meshIndex === valueIndex)
        .forEach((value) => {
          mesh.animate(value / MAX_ANIMATION);
          mesh.opacity(model.opacity);
          mesh.getObject3D().position.x =
            MESH_SIZE * (meshIndex - values.length / 2) + GROUP_PADDING;
        });
    });
    this.#group.position.x = ARMDOZER_EFFECT_STANDARD_X;
    this.#group.position.y = 40;
    this.#group.position.z = ARMDOZER_EFFECT_STANDARD_Z + 2;
    this.#group.scale.set(model.scale, model.scale, model.scale);
  }

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
