import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * 立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function stand(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "STAND",
    textureId: TEXTURE_IDS.GRAN_DOZER_STAND,
    maxAnimation: 1,
  });
}
