import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * アームハンマーチャージ メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function hmCharge(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "HM_CHARGE",
    textureId: TEXTURE_IDS.GRAN_DOZER_HM_CHARGE,
    maxAnimation: 4,
  });
}
