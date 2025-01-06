import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * アームハンマー -> 立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function hmToStand(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "HM_TO_STAND",
    textureId: TEXTURE_IDS.GRAN_DOZER_HM_TO_STAND,
    maxAnimation: 4,
  });
}
