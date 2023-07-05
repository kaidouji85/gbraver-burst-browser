import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { OutlineWidth } from "./outline-width";
import { MESH_Y } from "./position";
import {
  createActiveSilhouetteTexture,
  createOutlineSilhouetteTexture,
} from "./silhouette-texture";

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;
/** メッシュ幅 */
export const MESH_WIDTH = 600;
/** メッシュ高 */
export const MESH_HEIGHT = 600;

/**
 * ネオラインドーザ ノックバック メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerKnockBack(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.NEO_LANDOZER_KNOCK_BACK)
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
 * ネオラインドーザ アクティブノックバック メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerActiveKnockBack(
  resources: Resources
): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.NEO_LANDOZER_KNOCK_BACK)
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
 * ネオラインドーザ アウトラインノックバック メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerOutlineKnockBack(
  resources: Resources
): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.NEO_LANDOZER_KNOCK_BACK)
      ?.texture ?? new THREE.Texture();
  const silhouetteTexture = createOutlineSilhouetteTexture(texture);
  const ret = createHorizontalAnimation({
    texture: silhouetteTexture,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH + OutlineWidth,
    height: MESH_HEIGHT + OutlineWidth,
    blending: THREE.AdditiveBlending,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  object.position.z = -0.01;
  return ret;
}
