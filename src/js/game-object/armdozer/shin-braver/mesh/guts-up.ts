import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_GUTS_UP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ガッツアップ メッシュ群を生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function gutsUp(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "GUTS_UP",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
