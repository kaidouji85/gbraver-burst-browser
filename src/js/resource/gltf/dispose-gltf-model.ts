import * as THREE from "three";

import { GlTFResource } from "./resource";

/**
 * GLTFリソースを解放する
 *
 * @param target 解放対象
 */
export function disposeGltfModel(target: GlTFResource): void {
  target.object.traverse((v) => {
    if (v instanceof THREE.Mesh) {
      v.geometry.dispose();
      v.material.dispose();

      if (v.material.map instanceof THREE.Texture) {
        v.material.map.dispose();
      }
    }
  });
}
