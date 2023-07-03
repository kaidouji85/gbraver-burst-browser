import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { createSilhouetteTexture } from "./create-silhouette-texture";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { MESH_HEIGHT, MESH_WIDTH } from "./mesh-size";
import { MESH_Y } from "./position";

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ウィングドーザ ガード メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerGuard(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.WING_DOZER_GUARD)
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
 * ウィングドーザ アクティブガード メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerActiveGuard(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.WING_DOZER_GUARD)
      ?.texture ?? new THREE.Texture();
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
