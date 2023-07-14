import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_HM_CHARGE;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * アームハンマーチャージ メッシュ群を生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function hmCharge(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "HM_CHARGE",
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
  });
}
