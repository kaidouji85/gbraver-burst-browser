import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * フロントステップ メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function frontStep(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "FRONT_STEP",
    textureId: TEXTURE_IDS.GRAN_DOZER_FRONT_STEP,
    maxAnimation: 4,
  });
}
