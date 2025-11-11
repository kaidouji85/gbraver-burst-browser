import * as THREE from "three";

import { toSilhouette } from "../canvas/to-silhouette";
import { CanvasDisposeTexture } from "./canvas-dispose-texture";

/** アウトラインカラー */
export type OutlineColor = {
  /** アウトライン Red */
  r: number;
  /** アウトライン Green */
  g: number;
  /** アウトライン Blue */
  b: number;
};

/** createOutlineSilhouetteTexture オプション */
type CreateOutlineSilhouetteTextureOptions = {
  /** 加工前のテクスチャ */
  texture: THREE.Texture<HTMLImageElement>;
  /** アウトラインカラー */
  color: OutlineColor;
};

/**
 * アウトライン用にシルエット化したテクスチャを生成する
 * @param options オプション
 * @returns シルエット化したテクスチャ
 */
export function createOutlineSilhouetteTexture(
  options: CreateOutlineSilhouetteTextureOptions,
): THREE.Texture {
  const { texture, color } = options;
  const canvas = toSilhouette({
    ...color,
    image: texture.image,
    scale: 0.5,
  });
  return new CanvasDisposeTexture(canvas);
}
