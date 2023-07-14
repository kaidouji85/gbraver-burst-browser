import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createLightningDozerActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_HM_CHARGE;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ライトニングドーザ アームハンマー チャージ
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerHmCharge(
  resources: Resources,
): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アームハンマー チャージ
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerActiveHmCharge(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アームハンマー チャージ
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerOutlineHmCharge(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
