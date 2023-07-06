import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createWingDozerActiveMesh } from "./create-active-mesh";
import { createWingDozerMesh } from "./create-mesh";
import { createWingDozerOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.WING_DOZER_DASH_TO_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 8;

/**
 * ウィングドーザ ダッシュ->立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerDashToStand(resources: Resources): ArmdozerAnimation {
  return createWingDozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ウィングドーザ アクティブ ダッシュ->立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerActiveDashToStand(
  resources: Resources
): ArmdozerAnimation {
  return createWingDozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ウィングドーザ アウトライン ダッシュ->立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerOutlineDashToStand(
  resources: Resources
): ArmdozerAnimation {
  return createWingDozerOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
