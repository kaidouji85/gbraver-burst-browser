import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { TextureId } from "../../../resource/texture/resource";
import { ArmdozerAnimation } from "./armdozer-animation";

/** オプション */
type Options = ResourcesContainer & {
  /** テクスチャID */
  textureId: TextureId;
  /** 最大アニメーション枚数 */
  maxAnimation: number;
  /** メッシュ幅 */
  width: number;
  /** メッシュ高 */
  height: number;
  /** オフセット */
  offset: {
    /** オフセット X座標 */
    x?: number;
    /** オフセット Y座標 */
    y?: number;
  };
};

/**
 * 標準メッシュを生成する
 * @param options オプション
 * @returns 生成結果
 */
export function createStandardMesh(options: Options): ArmdozerAnimation {
  const { resources, textureId, offset } = options;
  const texture =
    resources.textures.find((v) => v.id === textureId)?.texture ??
    new THREE.Texture();
  const ret = new HorizontalAnimationMesh({
    ...options,
    texture,
  });
  const object = ret.getObject3D();
  object.position.x = offset.x ?? 0;
  object.position.y = offset.y ?? 0;
  return ret;
}
