import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createLightningDozerMesh } from "./create-mesh";
import {createLightningDozerActiveMesh} from "./create-active-mesh";
import {createLightningDozerOutlineMesh} from "./create-outline-mesh";

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
  return createLightningDozerMesh({
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
  return createLightningDozerOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}