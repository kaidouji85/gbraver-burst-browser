import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { Resources } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { PilotIcon } from "./pilot-icon";

/** ユウヤ パイロットアイコン */
export class YuuyaIcon implements PilotIcon {
  /** グループ */
  #group: THREE.Group;
  /** メッシュ */
  #mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const { texture } = findTextureOrThrow(resources, TEXTURE_IDS.YUUYA_CUTIN);
    this.#mesh = new HorizontalAnimationMesh({
      texture,
      maxAnimation: 1,
      width: 400,
      height: 400,
    });
    this.#mesh.getObject3D().position.x = 0;
    this.#mesh.getObject3D().position.y = 90;
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
