import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import {createGenesisBraverMesh} from "./create-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.GENESIS_BRAVER_SP_TO_STAND;

/** アニメーション枚数 */
export const MAX_ANIMATION = 8;

/**
 * ジェネシスブレイバー ストレートパンチ -> 立ち スプライトを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverSPToStand(
  resources: Resources
): ArmdozerAnimation {
  return createGenesisBraverMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
