// @flow
import type {Resources} from "../../../resource";
import * as THREE from 'three';
import type {GlTFResource} from "../../../resource/gltf";
import {disposeGltfModel, GLTF_IDS} from "../../../resource/gltf";

/** 商店街 */
export class City {
  _gltf: GlTFResource;

  constructor(resources: Resources) {
    const resource = resources.gltfs.find(v => v.id === GLTF_IDS.SHOPPING_STREET);
    this._gltf = resource ? resource : {
      id: "",
      object: new THREE.Scene()
    };
    this._gltf.object.scale.set(100, 100, 100);
  }

  /** デストラクタ */
  destructor(): void {
    disposeGltfModel(this._gltf);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._gltf.object;
  }
}