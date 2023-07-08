import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createLightningDozerActiveMesh } from "./create-active-mesh";
import { createLightningDozerMesh } from "./create-mesh";
import { createLightningDozerOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_GUARD;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ライトニングドーザ ガード メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerGuard(resources: Resources): ArmdozerAnimation {
  return createLightningDozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アクティブガード メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerActiveGuard(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アウトラインガード メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerOutlineGuard(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
