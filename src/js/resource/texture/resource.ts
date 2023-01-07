import * as THREE from "three";

/** テクスチャID */
export type TextureId = string;

/** テクスチャ設定 */
export type TextureConfig = {
  id: TextureId;
  path: string;
};

/** テクスチャリソース */
export type TextureResource = {
  id: TextureId;
  texture: typeof THREE.Texture;
};