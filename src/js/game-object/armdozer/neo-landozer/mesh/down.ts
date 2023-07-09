import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createNeoLandozerActiveMesh } from "./create-active-mesh";
import { createNeoLandozerMesh } from "./create-mesh";
import { createNeoLandozerOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_DOWN;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ネオラインドーザ 立ち -> ダウン
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function neoLandozerDown(resources: Resources): ArmdozerAnimation {
  return createNeoLandozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオラインドーザ アクティブ 立ち -> ダウン
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function neoLandozerActiveDown(resources: Resources): ArmdozerAnimation {
  return createNeoLandozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ネオラインドーザ アウトライン 立ち -> ダウン
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function neoLandozerOutlineDown(
  resources: Resources,
): ArmdozerAnimation {
  return createNeoLandozerOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
