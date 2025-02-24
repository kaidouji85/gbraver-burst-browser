import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * ノックバック メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function knockBack(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "KNOCK_BACK",
    textureId: TEXTURE_IDS.GRAN_DOZER_KNOCK_BACK,
    maxAnimation: 4,
  });
}
