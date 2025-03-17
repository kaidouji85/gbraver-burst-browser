import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { ArmdozerIcon } from "./armdozer-icon";
import { SimpleArmdozerIcon } from "./simple-armdozer-icon";

/**
 * ネオランドーザアイコンを生成する
 * @param resources リソース管理オブジェクト
 * @returns ネオランドーザアイコン
 */
export const createNeoLandozerIcon = (resources: Resources): ArmdozerIcon =>
  new SimpleArmdozerIcon({
    resources,
    size: 350,
    x: 0,
    y: 160,
    textureId: TEXTURE_IDS.NEO_LANDOZER_BURST_BUTTON_ICON,
  });

/** @deprecated ネオランドーザアイコン */
export class NeoLandozerIcon implements ArmdozerIcon {
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
        (v) => v.id === TEXTURE_IDS.NEO_LANDOZER_BURST_BUTTON_ICON,
      )?.texture ?? new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture: neoLandozer,
      maxAnimation: 1,
      width: 350,
      height: 350,
    });
    this.#mesh.animate(1);
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
