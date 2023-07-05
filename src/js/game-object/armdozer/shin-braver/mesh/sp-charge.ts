import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverMesh } from "./create-mesh";
import { MESH_HEIGHT, MESH_WIDTH } from "./mes-size";
import { MESH_Y } from "./position";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_SP_CHARGE;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ストレートパンチため
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverSPCharge(resources: Resources): ArmdozerAnimation {
  return createShinBraverMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
    positionY: MESH_Y,
  });
}
