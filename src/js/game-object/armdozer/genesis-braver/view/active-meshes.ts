import { Resources } from "../../../../resource";
import { genesisBraverActiveBurstUp } from "../mesh/burst-up";
import { genesisBraverActiveFrontStep } from "../mesh/front-step";
import { genesisBraverActiveGuard } from "../mesh/guard";
import { genesisBraverActiveKnockBack } from "../mesh/knock-back";
import { genesisBraverActiveStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションアクティブメッシュマッピング生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createActiveMeshes(
  resources: Resources
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: genesisBraverActiveStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: genesisBraverActiveKnockBack(resources),
    },
    {
      type: "GUARD",
      mesh: genesisBraverActiveGuard(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: genesisBraverActiveFrontStep(resources),
    },
    {
      type: "BURST_UP",
      mesh: genesisBraverActiveBurstUp(resources),
    },
  ];
}
