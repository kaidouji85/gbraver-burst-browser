import * as THREE from "three";

import { toSilhouette } from "../../../canvas/to-silhouette";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TextureId } from "../../../resource/texture/resource";
import { CanvasDisposeTexture } from "../../../texture/canvas-dispose-texture";
import { ArmdozerAnimation } from "./armdozer-animation";

/** アウトラインカラー */
type OutlineColor = {
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
  texture: THREE.Texture;
  /** アウトラインカラー */
  color: OutlineColor;
};

/**
 * アウトライン用にシルエット化したテクスチャを生成する
 * @param options オプション
 * @returns シルエット化したテクスチャ
 */
function createOutlineSilhouetteTexture(
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

/** createOutlineMesh オプション */
type CreateOutlineMeshOptions = ResourcesContainer & {
  /** テクスチャID */
  textureId: TextureId;
  /** 最大アニメーション枚数 */
  maxAnimation: number;
  /** メッシュ幅 */
  width: number;
  /** メッシュ高 */
  height: number;
  /** アウトラインカラー */
  color: OutlineColor;
  /** アウトライン幅 */
  outlineWidth: number;
  /** オフセット */
  offset: {
    /** オフセット x座標 */
    x?: number;
    /** オフセット y座標 */
    y?: number;
  };
};

/**
 * アウトラインメッシュを生成する
 * @param options オプション
 * @returns 生成結果
 */
export function createOutlineMesh(
  options: CreateOutlineMeshOptions,
): ArmdozerAnimation {
  const { resources, textureId, maxAnimation, offset } = options;
  const { texture } = findTextureOrThrow(resources, textureId);
  const silhouetteTexture = createOutlineSilhouetteTexture({
    ...options,
    texture,
  });
  const ret = new HorizontalAnimationMesh({
    ...options,
    width: options.width + options.outlineWidth,
    height: options.height + options.outlineWidth,
    texture: silhouetteTexture,
    maxAnimation,
    blending: THREE.AdditiveBlending,
  });
  const object = ret.getObject3D();
  object.position.x = offset.x ?? 0;
  object.position.y = offset.y ?? 0;
  object.position.z = -0.01;
  return ret;
}
