import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-meshes-for-animation";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.GENESIS_BRAVER_SP_ATTACK;

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * アタック メッシュ群を生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function spAttack(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "SP_ATTACK",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
