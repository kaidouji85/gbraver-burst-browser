import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { createMeshesForAnimation } from "./create-meshes-for-animation";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.GENESIS_BRAVER_BURST_UP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * バーストアップ メッシュ群を生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function burstUp(resources: Resources): AnimationMeshMapping[] {
  return createMeshesForAnimation({
    resources,
    animationType: "BURST_UP",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  })
}
