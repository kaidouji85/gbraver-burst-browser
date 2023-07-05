import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverMesh } from "./create-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_SP_TO_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 8;

/**
 * ストレートパンチ -> 立ち
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function shinBraverSPToStand(resources: Resources): ArmdozerAnimation {
  return createShinBraverMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
