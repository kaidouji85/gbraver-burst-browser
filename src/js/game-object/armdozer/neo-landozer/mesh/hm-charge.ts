import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createNeoLandozerActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_HM_CHARGE;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ネオラインドーザ アームハンマーチャージ
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function neoLandozerHMCharge(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオラインドーザ アクティブ アームハンマーチャージ
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function neoLandozerActiveHMCharge(
  resources: Resources,
): ArmdozerAnimation {
  return createNeoLandozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオラインドーザ アウトライン アームハンマーチャージ
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function neoLandozerOutlineHMCharge(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
