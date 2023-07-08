import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createGenesisBraverActiveMesh } from "./create-active-mesh";
import { createGenesisBraverMesh } from "./create-mesh";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.GENESIS_BRAVER_KNOCK_BACK;

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ジェネシスブレイバー ノックバック スプライトを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverKnockBack(
  resources: Resources,
): ArmdozerAnimation {
  return createGenesisBraverMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}

/**
 * ジェネシスブレイバー アクティブ ノックバック スプライトを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverActiveKnockBack(
  resources: Resources,
): ArmdozerAnimation {
  return createGenesisBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
