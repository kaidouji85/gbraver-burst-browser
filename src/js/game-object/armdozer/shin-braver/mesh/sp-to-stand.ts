import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { createMeshesForAnimation } from "./create-meshes-for-animation";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_SP_TO_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 8;

/**
 * ストレートパンチ -> 立ち メッシュ群を生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function spToStand(resources: Resources): AnimationMeshMapping[] {
  return createMeshesForAnimation({
    resources,
    animationType: "SP_TO_STAND",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
