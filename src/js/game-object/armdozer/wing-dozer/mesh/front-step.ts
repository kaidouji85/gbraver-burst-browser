import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { createMeshesForAnimation } from "./create-meshes-for-animation";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.WING_DOZER_FRONT_STEP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * フロントステップ
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function frontStep(resources: Resources): AnimationMeshMapping[] {
  return createMeshesForAnimation({
    resources,
    animationType: "FRONT_STEP",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
