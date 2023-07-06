import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createWingDozerMesh } from "./create-mesh";
import { createWingDozerActiveMesh } from "./create-active-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.WING_DOZER_DASH_UP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ウィングドーザ ダッシュアップ メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerDashUp(resources: Resources): ArmdozerAnimation {
  return createWingDozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ウィングドーザ アクティブダッシュアップ メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerActiveDashUp(resources: Resources): ArmdozerAnimation {
  return createWingDozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
