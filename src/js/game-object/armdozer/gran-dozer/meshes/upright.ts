import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * 気をつけ メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function upright(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "UPRIGHT",
    textureId: TEXTURE_IDS.GRAN_DOZER_UPRIGHT,
    maxAnimation: 4,
  });
}
