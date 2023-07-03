import * as THREE from "three";

import { toSilhouette } from "../../../../canvas/to-silhouette";
import { CanvasDisposeTexture } from "../../../../texture/canvas-dispose-texture";

/** アクティブレイヤー Red */
export const ACTIVE_COLOR_R = 255;
/** アクティブレイヤー Green */
export const ACTIVE_COLOR_G = 127;
/** アクティブレイヤー Blue */
export const ACTIVE_COLOR_B = 255;

/**
 * シルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
export function createSilhouetteTexture(texture: THREE.Texture): THREE.Texture {
  const canvas = toSilhouette({
    image: texture.image,
    r: ACTIVE_COLOR_R,
    g: ACTIVE_COLOR_G,
    b: ACTIVE_COLOR_B
  });
  return new CanvasDisposeTexture(canvas);
}
