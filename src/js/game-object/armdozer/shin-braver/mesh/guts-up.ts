import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createShinBraverActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_GUTS_UP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ガッツアップ
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function shinBraverGutsUp(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アクティブ ガッツアップ
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function shinBraverActiveGutsUp(
  resources: Resources,
): ArmdozerAnimation {
  return createShinBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * アウトライン ガッツアップ
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function shinBraverOutlineGutsUp(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
