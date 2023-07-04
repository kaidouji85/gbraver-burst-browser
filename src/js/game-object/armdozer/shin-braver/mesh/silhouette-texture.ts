import * as THREE from "three";

import { toSilhouette } from "../../../../canvas/to-silhouette";
import { CanvasDisposeTexture } from "../../../../texture/canvas-dispose-texture";

/** アクティブレイヤー Red */
export const ACTIVE_COLOR_R = 0;
/** アクティブレイヤー Green */
export const ACTIVE_COLOR_G = 255;
/** アクティブレイヤー Blue */
export const ACTIVE_COLOR_B = 127;

/**
 * アクティブ用にシルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
export function createActiveSilhouetteTexture(texture: THREE.Texture): THREE.Texture {
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
export const OUTLINE_COLOR_R = 0;
/** アウトラインレイヤー Green */
export const OUTLINE_COLOR_G = 0;
/** アウトラインレイヤー Blue */
export const OUTLINE_COLOR_B = 0;

/**
 * アウトライン用にシルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
export function createOutlineSilhouetteTexture(texture: THREE.Texture): THREE.Texture {
  const canvas = toSilhouette({
    image: texture.image,
    r: OUTLINE_COLOR_R,
    g: OUTLINE_COLOR_G,
    b: OUTLINE_COLOR_B,
    scale: 0.5,
  });
  return new CanvasDisposeTexture(canvas);
}