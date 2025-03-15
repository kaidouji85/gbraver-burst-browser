import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { LightningShotModel } from "../model/lightning-shot-model";
import { LightningShotView } from "./lightning-shot-view";

/** メッシュのサイズ */
const MESH_SIZE = 400;

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
    const texture =
      resources.textures.find((t) => t.id === TEXTURE_IDS.LIGHTNING_SHOT)
        ?.texture ?? new THREE.Texture();
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
    this.#mesh.getObject3D().position.x = model.position.x;
    this.#mesh.getObject3D().position.y = model.position.y;
    this.#mesh.animate(model.animation.frame);
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.getObject3D().quaternion.copy(camera.quaternion);
  }
}
