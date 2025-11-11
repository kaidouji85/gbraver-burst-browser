import * as THREE from "three";

import { ResourceType } from "../resource-type";

/** テクスチャID */
export type TextureId = string;

/** テクスチャ設定 */
export type TextureConfig = ResourceType & {
  id: TextureId;
  path: string;
};

/** テクスチャリソース */
export type TextureResource = ResourceType & {
  id: TextureId;
  texture: THREE.Texture<HTMLImageElement>;
};
