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
import { MESH_HEIGHT, MESH_WIDTH } from "./mesh-size";
import { MESH_Y } from "./position";

/** アニメーション枚数 */
export const MAX_ANIMATION = 1;

/**
 * ウィングドーザ 立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerStand(resources: Resources): ArmdozerAnimation {
  const ret = createHorizontalAnimationFromResources({
    id: TEXTURE_IDS.WING_DOZER_STAND,
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
 * ウィングドーザ アクティブ立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerActiveStand(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.WING_DOZER_STAND)
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
