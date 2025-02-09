import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * タックルメッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function tackle(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "TACKLE",
    textureId: TEXTURE_IDS.GRAN_DOZER_TACKLE,
    maxAnimation: 4,
  });
}
