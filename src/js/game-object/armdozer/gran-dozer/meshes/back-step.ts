import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * バックステップ メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function backStep(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "BACK_STEP",
    textureId: TEXTURE_IDS.GRAN_DOZER_BACK_STEP,
    maxAnimation: 4,
  });
}
