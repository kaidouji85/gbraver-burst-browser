import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createNeoLandozerMesh } from "./create-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_HM_TO_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ネオラインドーザ アームハンマー -> 立ち
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function neoLandozerHMToStand(resources: Resources): ArmdozerAnimation {
  return createNeoLandozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
