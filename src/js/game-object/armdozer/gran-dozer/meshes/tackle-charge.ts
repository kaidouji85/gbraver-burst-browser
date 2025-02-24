import { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { AnimationMesh } from "./animation-mesh";
import { createAnimationMeshes } from "./create-animation-meshes";

/**
 * タックルチャージ メッシュを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function tackleCharge(resources: Resources): AnimationMesh[] {
  return createAnimationMeshes({
    resources,
    animationType: "TACKLE_CHARGE",
    textureId: TEXTURE_IDS.GRAN_DOZER_TACKLE_CHARGE,
    maxAnimation: 4,
  });
}
