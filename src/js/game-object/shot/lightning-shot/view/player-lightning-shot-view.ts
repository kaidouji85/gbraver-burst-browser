import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../td-position";
import { LightningShotModel } from "../model/lightning-shot-model";
import { LightningShotView } from "./lightning-shot-view";

/** メッシュのサイズ */
const MESH_SIZE = 360;

/** プレイヤーの電撃ショットビュー */
export class PlayerLightningShotView implements LightningShotView {
  /** メッシュ */
  #mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: ResourcesContainer) {
    const { resources } = options;
    const { texture } = findTextureOrThrow(
      resources,
      TEXTURE_IDS.LIGHTNING_SHOT,
    );
    this.#mesh = new HorizontalAnimationMesh({
      texture,
      maxAnimation: 8,
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
  engage(model: LightningShotModel) {
    this.#mesh.opacity(model.opacity);
    this.#mesh.animate(model.animation.frame);
    const target = this.#mesh.getObject3D();
    target.position.x = ARMDOZER_EFFECT_STANDARD_X - MESH_SIZE / 2 - 10;
    target.position.y = ARMDOZER_EFFECT_STANDARD_Y + 40;
    target.position.z = ARMDOZER_EFFECT_STANDARD_Z + 1;
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.getObject3D().quaternion.copy(camera.quaternion);
  }
}
