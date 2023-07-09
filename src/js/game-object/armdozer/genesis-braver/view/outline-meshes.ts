import { Resources } from "../../../../resource";
import { genesisBraverOutlineBurstUp } from "../mesh/burst-up";
import { genesisBraverOutlineFrontStep } from "../mesh/front-step";
import { genesisBraverOutlineGuard } from "../mesh/guard";
import { genesisBraverOutlineKnockBack } from "../mesh/knock-back";
import { genesisBraverOutlineStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションアクティブメッシュマッピング生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createOutlineMeshes(
  resources: Resources,
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: genesisBraverOutlineStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: genesisBraverOutlineKnockBack(resources),
    },
    {
      type: "GUARD",
      mesh: genesisBraverOutlineGuard(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: genesisBraverOutlineFrontStep(resources),
    },
    {
      type: "BURST_UP",
      mesh: genesisBraverOutlineBurstUp(resources),
    },
  ];
}
