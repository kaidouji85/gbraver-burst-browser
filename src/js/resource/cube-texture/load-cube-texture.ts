import * as THREE from "three";

import type { ResourceRoot } from "../resource-root";
import { CubeTextureConfig, CubeTextureResource } from "./resource";

/**
 * キューブテクスチャを読み込み
 *
 * @param resourceRoot リソースルート
 * @param config キューブテクスチャ設定
 * @returns キューブテクスチャリソース
 */
export function loadCubeTexture(
  resourceRoot: ResourceRoot,
  config: CubeTextureConfig,
): Promise<CubeTextureResource> {
  return new Promise((resolve, reject) => {
    const loader = new THREE.CubeTextureLoader();
    loader.load(
      [
        `${resourceRoot.get()}/${config.px}`,
        `${resourceRoot.get()}/${config.nx}`,
        `${resourceRoot.get()}/${config.py}`,
        `${resourceRoot.get()}/${config.ny}`,
        `${resourceRoot.get()}/${config.pz}`,
        `${resourceRoot.get()}/${config.nz}`,
      ],
      (texture: THREE.CubeTexture) => {
        texture.colorSpace = THREE.LinearSRGBColorSpace;
        resolve({
          id: config.id,
          texture: texture,
        });
      },
      () => {
        // NOP
      },
      (e) => {
        reject(e);
      },
    );
  });
}
