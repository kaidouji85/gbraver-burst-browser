import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * 攻撃 -> ニュートラル メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function attackToNeutral(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "ATTACK_TO_NEUTRAL",
    textureId: TEXTURE_IDS.GRAN_DOZER_ATTACK_TO_NEUTRAL,
    maxAnimation: 4,
  });
}
