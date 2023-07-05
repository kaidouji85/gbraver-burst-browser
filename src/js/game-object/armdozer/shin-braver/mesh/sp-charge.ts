import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { MESH_Y } from "./position";
import { createShinBraverMesh } from "./create-mesh";
import { Resources } from "../../../../resource";

/** メッシュ幅 */
export const MESH_WIDTH = 600;
/** メッシュ高 */
export const MESH_HEIGHT = 600;
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
