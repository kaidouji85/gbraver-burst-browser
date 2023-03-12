import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { createSilhouetteTexture } from "./create-silhouette-texture";
import { MESH_HEIGHT, MESH_WIDTH } from "./mesh-size";
import { MESH_Y } from "./position";

/** アニメーション枚数 */
export const MAX_ANIMATION = 8;

/**
 * ウィングドーザ ダッシュ->立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerDashToStand(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find(
      (v) => v.id === TEXTURE_IDS.WING_DOZER_DASH_TO_STAND
    )?.texture ?? new THREE.Texture();
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
 * ウィングドーザ アクティブダッシュ->立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerActiveDashToStand(
  resources: Resources
): ArmdozerAnimation {
  const texture =
    resources.textures.find(
      (v) => v.id === TEXTURE_IDS.WING_DOZER_DASH_TO_STAND
    )?.texture ?? new THREE.Texture();
  const silhouetteTexture = createSilhouetteTexture(texture);
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
