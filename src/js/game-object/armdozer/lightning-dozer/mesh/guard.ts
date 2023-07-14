import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { createMeshesForAnimation } from "./create-meshes-for-animation";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.LIGHTNING_DOZER_GUARD;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ガード メッシュ群を生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function guard(resources: Resources): AnimationMeshMapping[] {
  return createMeshesForAnimation({
    resources,
    animationType: "GUARD",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
