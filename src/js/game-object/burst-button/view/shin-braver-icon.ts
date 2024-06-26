import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { ArmdozerIcon } from "./armdozer-icon";

/** シンブレイバーアイコン */
export class ShinBraverIcon implements ArmdozerIcon {
  #mesh: HorizontalAnimationMesh;
  #group: THREE.Group;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const shinBraver =
      resources.textures.find(
        (v) => v.id === TEXTURE_IDS.SHIN_BRAVER_BURST_BUTTON_ICON,
      )?.texture ?? new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture: shinBraver,
      maxAnimation: 1,
      width: 350,
      height: 350,
    });
    this.#mesh.animate(1);
    this.#mesh.getObject3D().position.x = 0;
    this.#mesh.getObject3D().position.y = 160;
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
