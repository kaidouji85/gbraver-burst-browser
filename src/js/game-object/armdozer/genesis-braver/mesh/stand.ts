import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createGenesisBraverActiveMesh } from "./create-active-mesh";
import { createStandardMesh } from "./create-standard-mesh";
import { createOutlineMesh } from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.GENESIS_BRAVER_STAND;

/** アニメーション枚数 */
export const MAX_ANIMATION = 1;

/**
 * ジェネシスブレイバー 立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverStand(resources: Resources): ArmdozerAnimation {
  return createStandardMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ジェネシスブレイバー アクティブ立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverActiveStand(
  resources: Resources,
): ArmdozerAnimation {
  return createGenesisBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ジェネシスブレイバー アウトライン立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverOutlineStand(
  resources: Resources,
): ArmdozerAnimation {
  return createOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
