import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createNeoLandozerActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_BACK_STEP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ネオランドーザ バックステップ
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerBackStep(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオランドーザ アクティブ バックステップ
 *
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerActiveBackStep(
  resources: Resources,
): ArmdozerAnimation {
  return createNeoLandozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオランドーザ アウトライン バックステップ
 *
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerOutlineBackStep(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
