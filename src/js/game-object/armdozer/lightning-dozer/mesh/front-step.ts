import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_FRONT_STEP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * フロントステップ メッシュ群を生成
 * @param resource リソース管理オブジェクト
 * @returns 生成結果
 */
export function frontStep(resource: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources: resource,
    animationType: "FRONT_STEP",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
