import * as THREE from "three";

import type { Resources } from "../../../resource";
import { disposeGltfModel } from "../../../resource/gltf/dispose-gltf-model";
import { GLTF_IDS } from "../../../resource/gltf/ids";
import { GlTFResource } from "../../../resource/gltf/resource";
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
      (v) => v.id === GLTF_IDS.SHOPPING_STREET,
    );
    this.#gltf = resource
      ? resource
      : {
          id: "",
          object: new THREE.Group(),
          type: "Shared",
        };
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
   * @returns 配列にまとめた結果
   */
  getThreeJsObjects(): THREE.Object3D[] {
    return [this.#gltf.object];
  }
}
