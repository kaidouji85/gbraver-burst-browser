import * as THREE from "three";

import { ResourceType } from "../resource-type";

/** キューブテクスチャID */
export type CubeTextureId = string;

/** キューブテクスチャ設定 */
export type CubeTextureConfig = ResourceType & {
  id: CubeTextureId;
  px: string;
  nx: string;
  py: string;
  ny: string;
  pz: string;
  nz: string;
};

/** キューブテクスチャリソース */
export type CubeTextureResource = ResourceType & {
  id: CubeTextureId;
  texture: THREE.CubeTexture;
};
