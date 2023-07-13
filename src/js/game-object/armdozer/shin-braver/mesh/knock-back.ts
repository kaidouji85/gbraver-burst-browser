import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_KNOCK_BACK;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ノックバックメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverKnockBack(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アクティブノックバックメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverActiveKnockBack(
  resources: Resources,
): ArmdozerAnimation {
  return createShinBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アウトラインノックバックメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverOutlineKnockBack(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
