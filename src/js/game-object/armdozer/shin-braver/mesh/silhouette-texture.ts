import * as THREE from "three";

import { toSilhouette } from "../../../../canvas/to-silhouette";
import { CanvasDisposeTexture } from "../../../../texture/canvas-dispose-texture";

/** アクティブレイヤー Red */
export const ACTIVE_COLOR_R = 100;
/** アクティブレイヤー Green */
export const ACTIVE_COLOR_G = 100;
/** アクティブレイヤー Blue */
export const ACTIVE_COLOR_B = 100;

/**
 * @deprecated
 * アクティブ用にシルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
export function createActiveSilhouetteTexture(
  texture: THREE.Texture
): THREE.Texture {
  const canvas = toSilhouette({
    image: texture.image,
    r: ACTIVE_COLOR_R,
    g: ACTIVE_COLOR_G,
    b: ACTIVE_COLOR_B,
    scale: 0.5,
  });
  return new CanvasDisposeTexture(canvas);
}

/** アウトラインレイヤー Red */
export const OUTLINE_COLOR_R = 255;
/** アウトラインレイヤー Green */
export const OUTLINE_COLOR_G = 0;
/** アウトラインレイヤー Blue */
export const OUTLINE_COLOR_B = 255;

/**
 * アウトライン用にシルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
export function createOutlineSilhouetteTexture(
  texture: THREE.Texture
): THREE.Texture {
  const canvas = toSilhouette({
    image: texture.image,
    r: OUTLINE_COLOR_R,
    g: OUTLINE_COLOR_G,
    b: OUTLINE_COLOR_B,
    scale: 0.5,
  });
  return new CanvasDisposeTexture(canvas);
}
