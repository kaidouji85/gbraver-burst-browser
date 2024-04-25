import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.GENESIS_BRAVER_SP_CHARGE;

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * チャージ メッシュ群を生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function spCharge(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "SP_CHARGE",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
