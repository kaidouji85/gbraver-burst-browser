// @flow

import * as THREE from "three";

import { toSilhouette } from "../../../../canvas/silhouette/to-silhouette";
import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import {
  createHorizontalAnimation,
  createHorizontalAnimationFromResources,
} from "../../mesh/horizontal-animation";
import { MESH_Y } from "./position";

/** アニメーション枚数 */
export const MAX_ANIMATION = 1;
/** メッシュ幅 */
export const MESH_WIDTH = 600;
/** メッシュ高 */
export const MESH_HEIGHT = 600;

/**
 * ネオラインドーザ立ちポーズメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerStand(resources: Resources): ArmdozerAnimation {
  const ret = createHorizontalAnimationFromResources({
    id: TEXTURE_IDS.NEO_LANDOZER_STAND,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  return ret;
}

/**
 * ネオラインドーザアクティブ立ちポーズメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerActiveStand(
  resources: Resources
): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.NEO_LANDOZER_STAND)
      ?.texture ?? new THREE.Texture();
  const canvas = toSilhouette(texture.image, 255, 255, 255);
  const silhouetteTexture = new THREE.Texture(canvas);
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
