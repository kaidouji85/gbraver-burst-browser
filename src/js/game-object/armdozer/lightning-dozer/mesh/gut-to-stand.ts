import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createLightningDozerActiveMesh } from "./create-active-mesh";
import { createLightningDozerMesh } from "./create-mesh";
import { createLightningDozerOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_GUTS_TO_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ライトニングドーザ アクティブガッツ->立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerGutsToStand(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アクティブガッツ->立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerActiveGutsToStand(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アウトラインガッツ->立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerOutlineGutsToStand(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
