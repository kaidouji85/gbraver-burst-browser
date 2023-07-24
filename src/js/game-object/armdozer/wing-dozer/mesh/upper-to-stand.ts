import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.WING_DOZER_UPPER_TO_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 8;

/**
 * アッパー -> 立ち メッシュ群を生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function upperToStand(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "UPPER_TO_STAND",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
