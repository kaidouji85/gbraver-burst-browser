import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createWingDozerMesh } from "./create-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.WING_DOZER_DOWN;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ウィングドーザ ダウン
 *
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerDown(resources: Resources): ArmdozerAnimation {
  return createWingDozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
