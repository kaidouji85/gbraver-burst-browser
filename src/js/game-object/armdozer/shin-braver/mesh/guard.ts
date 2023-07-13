import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_GUARD;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ガードメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverGuard(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アクティブガードメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverActiveGuard(resources: Resources): ArmdozerAnimation {
  return createShinBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アウトラインガードメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverOutlineGuard(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
