import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverActiveMesh } from "./create-active-mesh";
import { createShinBraverMesh } from "./create-mesh";
import { createShinBraverOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_BURST_DOWN;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * バーストダウンメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverBurstDown(resources: Resources): ArmdozerAnimation {
  return createShinBraverMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アクティブバーストダウンメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverActiveBurstDown(
  resources: Resources
): ArmdozerAnimation {
  return createShinBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アウトラインバーストダウンメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverOutlineBurstDown(
  resources: Resources
): ArmdozerAnimation {
  return createShinBraverOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
