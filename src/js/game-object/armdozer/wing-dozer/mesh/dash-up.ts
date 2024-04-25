import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.WING_DOZER_DASH_UP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ダッシュアップ メッシュ群を生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function dashUp(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "DASH_UP",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
