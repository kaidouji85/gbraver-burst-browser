import { Resources } from "../../../../resource";
import { shinBraverOutlineBurstDown } from "../mesh/burst-down";
import { shinBraverOutlineBurstUp } from "../mesh/burst-up";
import { shinBraverOutlineFrontStep } from "../mesh/front-step";
import { shinBraverOutlineGuard } from "../mesh/guard";
import { shinBraverOutlineKnockBack } from "../mesh/knock-back";
import { shinBraverOutlineStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import {shinBraverOutlineSPCharge} from "../mesh/sp-charge";
import {shinBraverOutlineSPAttack} from "../mesh/sp-attack";
import {shinBraverOutlineSPToStand} from "../mesh/sp-to-stand";

/**
 * アウトラインメッシュマッピング生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createOutlineMeshes(
  resources: Resources,
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: shinBraverOutlineStand(resources),
    },
    {
      type: "SP_CHARGE",
      mesh: shinBraverOutlineSPCharge(resources),
    },
    {
      type: "SP_ATTACK",
      mesh: shinBraverOutlineSPAttack(resources),
    },
    {
      type: "SP_TO_STAND",
      mesh: shinBraverOutlineSPToStand(resources),
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
