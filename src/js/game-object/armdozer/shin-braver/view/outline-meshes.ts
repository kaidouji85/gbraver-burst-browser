import { Resources } from "../../../../resource";
import { shinBraverOutlineBurstDown } from "../mesh/burst-down";
import { shinBraverOutlineBurstUp } from "../mesh/burst-up";
import { shinBraverOutlineFrontStep } from "../mesh/front-step";
import { shinBraverOutlineGuard } from "../mesh/guard";
import { shinBraverOutlineKnockBack } from "../mesh/knock-back";
import { shinBraverOutlineStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アウトラインメッシュマッピング生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createOutlineMeshes(
  resources: Resources
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: shinBraverOutlineStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: shinBraverOutlineKnockBack(resources),
    },
    {
      type: "GUARD",
      mesh: shinBraverOutlineGuard(resources),
    },
    {
      type: "BURST_UP",
      mesh: shinBraverOutlineBurstUp(resources),
    },
    {
      type: "BURST_DOWN",
      mesh: shinBraverOutlineBurstDown(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: shinBraverOutlineFrontStep(resources),
    },
  ];
}
