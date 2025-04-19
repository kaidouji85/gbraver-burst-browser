import * as THREE from "three";

/** キューブテクスチャID */
export type CubeTextureId = string;

/** キューブテクスチャ設定 */
export type CubeTextureConfig = {
  id: CubeTextureId;
  px: string;
  nx: string;
  py: string;
  ny: string;
  pz: string;
  nz: string;
};

/** キューブテクスチャリソース */
export type CubeTextureResource = {
  id: CubeTextureId;
  texture: THREE.CubeTexture;
};
