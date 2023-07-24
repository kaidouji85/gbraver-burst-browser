import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { CUBE_TEXTURE_IDS } from "../../../../resource/cube-texture";

/**
 * スカイボックスを生成するヘルパー関数
 *
 * @param resources リソース管理オブジェクト
 * @return スカイボックス用のCubeTexture
 */
export function skyBox(resources: Resources): THREE.CubeTexture {
  const cubeTextureResource = resources.cubeTextures.find(
    (v) => v.id === CUBE_TEXTURE_IDS.BlueSky,
  );
  const cubeTexture = cubeTextureResource
    ? cubeTextureResource.texture
    : new THREE.CubeTexture();
  return cubeTexture;
}
