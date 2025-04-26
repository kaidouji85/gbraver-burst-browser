import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * 礼 メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function bow(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "BOW",
    textureId: TEXTURE_IDS.GRAN_DOZER_BOW,
    maxAnimation: 4,
  });
}
