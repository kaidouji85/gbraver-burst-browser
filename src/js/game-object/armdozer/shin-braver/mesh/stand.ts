import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 1;

/**
 * シンブレイバー立ちポーズメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverStand(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * シンブレイバーアクティブ立ちポーズメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverActiveStand(resources: Resources): ArmdozerAnimation {
  return createShinBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * シンブレイバーアウトライン立ちポーズメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverOutlineStand(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
