import { Resources } from "../../../../resource";
import { neoLandozerOutlineGuard } from "../mesh/guard";
import { neoLandozerOutlineKnockBack } from "../mesh/knock-back";
import { neoLandozerOutlineStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アウトラインアニメーションメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createOutlineMeshes(
  resources: Resources
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: neoLandozerOutlineStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: neoLandozerOutlineKnockBack(resources),
    },
    {
      type: "GUARD",
      mesh: neoLandozerOutlineGuard(resources),
    }
  ];
}