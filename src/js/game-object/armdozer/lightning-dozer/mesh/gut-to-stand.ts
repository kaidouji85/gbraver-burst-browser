import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_GUTS_TO_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ガッツ -> 立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function gutsToStand(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "GUTS_TO_STAND",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
