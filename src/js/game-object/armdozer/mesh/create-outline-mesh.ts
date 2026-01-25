import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TextureId } from "../../../resource/texture/resource";
import { outlineShader } from "../../../shader/outline-shader";
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
  const ret = new HorizontalAnimationMesh({
    ...options,
    width: options.width + options.outlineWidth,
    height: options.height + options.outlineWidth,
    texture,
    maxAnimation,
    blending: THREE.AdditiveBlending,
    shader: outlineShader,
  });
  ret.color(
    options.color.r / 255,
    options.color.g / 255,
    options.color.b / 255,
  );
  const object = ret.getObject3D();
  object.position.x = offset.x ?? 0;
  object.position.y = offset.y ?? 0;
  object.position.z = -0.01;
  return ret;
}
