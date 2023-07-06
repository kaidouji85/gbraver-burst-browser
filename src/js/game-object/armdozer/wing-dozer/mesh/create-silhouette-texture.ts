import * as THREE from "three";

import { toSilhouette } from "../../../../canvas/to-silhouette";
import { CanvasDisposeTexture } from "../../../../texture/canvas-dispose-texture";

/** アクティブレイヤー Red */
export const ACTIVE_COLOR_R = 127;
/** アクティブレイヤー Green */
export const ACTIVE_COLOR_G = 191;
/** アクティブレイヤー Blue */
export const ACTIVE_COLOR_B = 255;

/**
 * @deprecated
 * シルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
export function createSilhouetteTexture(texture: THREE.Texture): THREE.Texture {
  const canvas = toSilhouette({
    image: texture.image,
    r: ACTIVE_COLOR_R,
    g: ACTIVE_COLOR_G,
    b: ACTIVE_COLOR_B,
    scale: 0.5,
  });
  return new CanvasDisposeTexture(canvas);
}
