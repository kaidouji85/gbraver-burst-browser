import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { ArmdozerIcon } from "./armdozer-icon";

/** ウィングドーザアイコン */
export class WingDozerIcon implements ArmdozerIcon {
  #mesh: HorizontalAnimationMesh;
  #group: THREE.Group;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const neoLandozer =
      resources.textures.find(
        (v) => v.id === TEXTURE_IDS.WING_DOZER_BURST_BUTTON_ICON,
      )?.texture ?? new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture: neoLandozer,
      maxAnimation: 1,
      width: 280,
      height: 280,
    });
    this.#mesh.animate(1);
    this.#mesh.getObject3D().position.x = -20;
    this.#mesh.getObject3D().position.y = 120;
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
