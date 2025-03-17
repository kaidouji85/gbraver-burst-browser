import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { ArmdozerIcon } from "./armdozer-icon";

/** グランドーザアイコン */
export class GranDozerIcon implements ArmdozerIcon {
  #mesh: HorizontalAnimationMesh;
  #group: THREE.Group;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const lightningDozer =
      resources.textures.find(
        (v) => v.id === TEXTURE_IDS.GRAN_DOZER_BURST_BUTTON_ICON,
      )?.texture ?? new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture: lightningDozer,
      maxAnimation: 1,
      width: 420,
      height: 420,
    });
    this.#mesh.animate(1);
    this.#mesh.getObject3D().position.x = -15;
    this.#mesh.getObject3D().position.y = 150;
    this.#group.add(this.#mesh.getObject3D());
  }

  /** @override */
  destructor(): void {
    this.#mesh.destructor();
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /** @override */
  setOpacity(opacity: number): void {
    this.#mesh.opacity(opacity);
  }
}
