import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createLightningDozerMesh } from "./create-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_HM_TO_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 8;

/**
 * ライトニングドーザ アームハンマー -> 立ち
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerHmToStand(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
