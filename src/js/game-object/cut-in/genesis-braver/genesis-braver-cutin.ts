import * as THREE from "three";

import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture/ids";

/** ジェネシスブレイバー カットイン */
export class GenesisBraverCutIn {
  #mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const texture = resources.textures.find(v => v.id === TEXTURE_IDS.GENESIS_BRAVER_CUTIN_BURST_UP)?.texture
      ?? new THREE.Texture();
    this.#mesh = new HorizontalAnimationMesh({
      texture,
      maxAnimation: 4,
      width: 800,
      height: 800,
    });
  }

  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }
}