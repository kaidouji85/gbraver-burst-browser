import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createNeoLandozerActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 1;

/**
 * ネオラインドーザ 立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerStand(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオラインドーザ アクティブ立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerActiveStand(
  resources: Resources,
): ArmdozerAnimation {
  return createNeoLandozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオラインドーザ アウトライン立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerOutlineStand(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
