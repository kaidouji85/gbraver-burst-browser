import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * タックルアタック メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function tackleAttack(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "TACKLE_ATTACK",
    textureId: TEXTURE_IDS.GRAN_DOZER_TACKLE_ATTACK,
    maxAnimation: 4,
  });
}
