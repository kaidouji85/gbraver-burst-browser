import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverMesh } from "./create-mesh";
import {createShinBraverActiveMesh} from "./create-active-mesh";
import {createShinBraverOutlineMesh} from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_DOWN;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ダウン
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function shinBraverDown(resources: Resources): ArmdozerAnimation {
  return createShinBraverMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アクティブ ダウン
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function shinBraverActiveDown(resources: Resources): ArmdozerAnimation {
  return createShinBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アウトライン ダウン
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function shinBraverOutlineDown(resources: Resources): ArmdozerAnimation {
  return createShinBraverOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}