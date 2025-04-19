import * as THREE from "three";

/** キューブテクスチャID */
export type CuteTextureId = string;

/** キューブテクスチャ設定 */
export type CubeTextureConfig = {
  id: CuteTextureId;
  px: string;
  nx: string;
  py: string;
  ny: string;
  pz: string;
  nz: string;
};

/** キューブテクスチャリソース */
export type CubeTextureResource = {
  id: CuteTextureId;
  texture: THREE.CubeTexture;
};
