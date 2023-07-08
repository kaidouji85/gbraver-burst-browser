import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createLightningDozerActiveMesh } from "./create-active-mesh";
import { createLightningDozerMesh } from "./create-mesh";
import { createLightningDozerOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_GUTS_DOWN;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ライトニングドーザ ガッツダウン メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerGutsDown(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アクティブガッツダウン メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerActiveGutsDown(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アウトラインガッツダウン メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerOutlineGutsDown(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
