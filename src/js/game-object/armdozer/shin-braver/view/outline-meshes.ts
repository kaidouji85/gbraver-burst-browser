import { Resources } from "../../../../resource";
import { shinBraverOutlineBackStep } from "../mesh/back-step";
import { shinBraverOutlineBurstDown } from "../mesh/burst-down";
import { shinBraverOutlineBurstUp } from "../mesh/burst-up";
import { shinBraverOutlineDown } from "../mesh/down";
import { shinBraverOutlineFrontStep } from "../mesh/front-step";
import { shinBraverOutlineGuard } from "../mesh/guard";
import { shinBraverOutlineGutsDown } from "../mesh/guts-down";
import { shinBraverOutlineGutsUp } from "../mesh/guts-up";
import { shinBraverOutlineKnockBack } from "../mesh/knock-back";
import { shinBraverOutlineSPAttack } from "../mesh/sp-attack";
import { shinBraverOutlineSPCharge } from "../mesh/sp-charge";
import { shinBraverOutlineSPToStand } from "../mesh/sp-to-stand";
import { shinBraverOutlineStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

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
      type: "DOWN",
      mesh: shinBraverOutlineDown(resources),
    },
    {
      type: "GUTS_UP",
      mesh: shinBraverOutlineGutsUp(resources),
    },
    {
      type: "GUTS_DOWN",
      mesh: shinBraverOutlineGutsDown(resources),
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
      type: "BACK_STEP",
      mesh: shinBraverOutlineBackStep(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: shinBraverOutlineFrontStep(resources),
    },
  ];
}
