import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createNeoLandozerActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_GUARD;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ネオラインドーザ ガード メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerGuard(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオラインドーザ アクティブガードメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerActiveGuard(
  resources: Resources,
): ArmdozerAnimation {
  return createNeoLandozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオラインドーザ アウトラインガードメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerOutlineGuard(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
