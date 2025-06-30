import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * バーストアップ メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function burstUp(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "BURST_UP",
    textureId: TEXTURE_IDS.GRAN_DOZER_BURST_UP,
    maxAnimation: 4,
  });
}
