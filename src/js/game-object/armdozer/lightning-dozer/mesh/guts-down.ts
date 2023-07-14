import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { createMeshesForAnimation } from "./create-meshes-for-animation";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_GUTS_DOWN;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ガッツダウン メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果 
 */
export function gutsDown(resources: Resources): AnimationMeshMapping[] {
  return createMeshesForAnimation({
    resources,
    animationType: "GUTS_DOWN",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
