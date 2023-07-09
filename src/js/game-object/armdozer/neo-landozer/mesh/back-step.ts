import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createNeoLandozerMesh } from "./create-mesh";
import {createNeoLandozerActiveMesh} from "./create-active-mesh";
import {createNeoLandozerOutlineMesh} from "./create-outline-mesh";

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
  return createNeoLandozerMesh({
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
export function neoLandozerActiveBackStep(resources: Resources): ArmdozerAnimation {
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
export function neoLandozerOutlineBackStep(resources: Resources): ArmdozerAnimation {
  return createNeoLandozerOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}