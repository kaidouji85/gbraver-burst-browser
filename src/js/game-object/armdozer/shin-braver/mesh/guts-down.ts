import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverMesh } from "./create-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_GUTS_DOWN;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ガッツダウン
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function shinBraverGutsDown(resources: Resources): ArmdozerAnimation {
  return createShinBraverMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
