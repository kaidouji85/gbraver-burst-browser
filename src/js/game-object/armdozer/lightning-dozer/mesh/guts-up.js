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
import { ACTIVE_COLOR_B, ACTIVE_COLOR_G, ACTIVE_COLOR_R } from "./active-color";
import { MESH_Y } from "./position";

/** メッシュ幅 */
export const MESH_WIDTH = 600;
/** メッシュ高 */
export const MESH_HEIGHT = 600;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ライトニングドーザ ガッツアップ メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerGutsUp(resources: Resources): ArmdozerAnimation {
  const ret = createHorizontalAnimationFromResources({
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_UP,
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
 * ライトニングドーザ アクティブガッツアップ メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerActiveGutsUp(
  resources: Resources
): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.LIGHTNING_DOZER_GUTS_UP)
      ?.texture ?? new THREE.Texture();
  const canvas = toSilhouette(
    texture.image,
    ACTIVE_COLOR_R,
    ACTIVE_COLOR_G,
    ACTIVE_COLOR_B
  );
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
