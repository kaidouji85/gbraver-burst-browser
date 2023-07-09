import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createGenesisBraverMesh } from "./create-mesh";
import {createGenesisBraverActiveMesh} from "./create-active-mesh";
import {createGenesisBraverOutlineMesh} from "./create-outline-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.GENESIS_BRAVER_BURST_DOWN;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ジェネシスブレイバー バーストダウン スプライトを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverBurstDown(
  resources: Resources,
): ArmdozerAnimation {
  return createGenesisBraverMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ジェネシスブレイバー アクティブ バーストダウン スプライトを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverActiveBurstDown(
  resources: Resources,
): ArmdozerAnimation {
  return createGenesisBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ジェネシスブレイバー アウトライン バーストダウン スプライトを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverOutlineBurstDown(
  resources: Resources,
): ArmdozerAnimation {
  return createGenesisBraverOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}