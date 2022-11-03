// @flow
import * as THREE from "three";

import type { Resources } from "../../../resource";
import type { GlTFResource } from "../../../resource/gltf";
import { disposeGltfModel, GLTF_IDS } from "../../../resource/gltf";
import type { Stage } from "../stage";

/** 商店街 */
export default class ShoppingStreet implements Stage {
  #gltf: GlTFResource;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const resource = resources.gltfs.find(
      (v) => v.id === GLTF_IDS.SHOPPING_STREET
    );
    this.#gltf = resource ? resource : { id: "", object: new THREE.Scene() };
    this.#gltf.object.scale.set(100, 100, 100);
    this.#gltf.object.position.z = -50;
  }

  /** デストラクタ */
  destructor(): void {
    disposeGltfModel(this.#gltf);
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  getThreeJsObjects(): typeof THREE.Object3D[] {
    return [this.#gltf.object];
  }
}
