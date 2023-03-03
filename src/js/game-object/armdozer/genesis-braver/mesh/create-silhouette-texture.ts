import * as THREE from "three";

import { toSilhouette } from "../../../../canvas/silhouette/to-silhouette";
import { CanvasDisposeTexture } from "../../../../texture/canvas-dispose-texture";

/** アクティブレイヤー Red */
export const ACTIVE_COLOR_R = 240;
/** アクティブレイヤー Green */
export const ACTIVE_COLOR_G = 240;
/** アクティブレイヤー Blue */
export const ACTIVE_COLOR_B = 240;

/**
 * シルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
export function createSilhouetteTexture(texture: THREE.Texture): THREE.Texture {
  const canvas = toSilhouette(
    texture.image,
    ACTIVE_COLOR_R,
    ACTIVE_COLOR_G,
    ACTIVE_COLOR_B
  );
  return new CanvasDisposeTexture(canvas);
}
