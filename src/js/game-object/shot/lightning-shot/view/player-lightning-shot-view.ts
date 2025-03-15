import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { LightningShotModel } from "../model/lightning-shot-model";
import { LightningShotView } from "./lightning-shot-view";

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
      width: 200,
      height: 200,
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
    // NOP
    // TODO あとで実装する
  }
}
