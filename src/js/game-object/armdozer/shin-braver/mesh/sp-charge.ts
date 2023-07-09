import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverMesh } from "./create-mesh";
import {createShinBraverActiveMesh} from "./create-active-mesh";
import {createShinBraverOutlineMesh} from "./create-outline-mesh";

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
  });
}

/**
 * アクティブ ストレートパンチため
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverActiveSPCharge(resources: Resources): ArmdozerAnimation {
  return createShinBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アウトライン ストレートパンチため
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverOutlineSPCharge(resources: Resources): ArmdozerAnimation {
  return createShinBraverOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}