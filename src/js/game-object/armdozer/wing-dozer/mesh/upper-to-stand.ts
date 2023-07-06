import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createWingDozerMesh } from "./create-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.WING_DOZER_UPPER_TO_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 8;

/**
 * ウィングドーザ アッパー -> 立ち
 *
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerUpperToStand(resources: Resources): ArmdozerAnimation {
  return createWingDozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
