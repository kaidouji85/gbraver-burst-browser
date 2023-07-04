import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { createActiveSilhouetteTexture, createOutlineSilhouetteTexture } from "./silhouette-texture";
import { MESH_Y } from "./position";

/** メッシュ幅 */
export const MESH_WIDTH = 600;
/** メッシュ高 */
export const MESH_HEIGHT = 600;
/** アニメーション枚数 */
export const MAX_ANIMATION = 1;

/**
 * シンブレイバー立ちポーズメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverStand(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND)
      ?.texture ?? new THREE.Texture();
  const ret = createHorizontalAnimation({
    texture,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  return ret;
}

/**
 * シンブレイバーアクティブ立ちポーズメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverActiveStand(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND)
      ?.texture ?? new THREE.Texture();
  const silhouetteTexture = createActiveSilhouetteTexture(texture);
  const ret = createHorizontalAnimation({
    texture: silhouetteTexture,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  object.position.z = 0.01;
  return ret;
}

/**
 * シンブレイバーアウトライン立ちポーズメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverOutlineStand(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND)
      ?.texture ?? new THREE.Texture();
  const silhouetteTexture = createOutlineSilhouetteTexture(texture);
  const outlineWidth = 30;
  const ret = createHorizontalAnimation({
    texture: silhouetteTexture,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH + outlineWidth,
    height: MESH_HEIGHT + outlineWidth,
    blending: THREE.AdditiveBlending,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  object.position.z = -0.01;
  return ret;
}