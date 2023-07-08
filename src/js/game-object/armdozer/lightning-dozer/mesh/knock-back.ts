import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createLightningDozerActiveMesh } from "./create-active-mesh";
import { createLightningDozerMesh } from "./create-mesh";
import { createLightningDozerOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_KNOCK_BACK;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ライトニングドーザ ノックバック メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerKnockBack(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アクティブ ノックバック メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerActiveKnockBack(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ライトニングドーザ アウトライン ノックバック メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerOutlineKnockBack(
  resources: Resources,
): ArmdozerAnimation {
  return createLightningDozerOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
