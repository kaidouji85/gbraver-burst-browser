import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_BACK_STEP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * シンブレイバー バックステップメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverBackStep(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * シンブレイバー アクティブ バックステップメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverActiveBackStep(
  resources: Resources,
): ArmdozerAnimation {
  return createShinBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * シンブレイバー アウトライン バックステップメッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverOutlineBackStep(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
