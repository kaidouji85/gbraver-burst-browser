import * as THREE from "three";

import type { ResourceRoot } from "../resource-root";
import type { TextureConfig, TextureResource } from "./resource";

/**
 * テクスチャを読み込む
 *
 * @param resourceRoot リソースルート
 * @param config テクスチャ設定
 * @returns 読み込み結果
 */
export function loadTexture(
  resourceRoot: ResourceRoot,
  config: TextureConfig,
): Promise<TextureResource> {
  const loader = new THREE.TextureLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      `${resourceRoot.get()}/${config.path}`,
      (texture) =>
        resolve({
          id: config.id,
          texture,
        }),
      undefined,
      (error) => {
        reject(error);
      },
    );
  });
}
