import { Resources } from "../../../../resource";
import { genesisBraverOutlineBackStep } from "../mesh/back-step";
import { genesisBraverOutlineBurstDown } from "../mesh/burst-down";
import { genesisBraverOutlineBurstUp } from "../mesh/burst-up";
import { genesisBraverOutlineDown } from "../mesh/down";
import { genesisBraverOutlineFrontStep } from "../mesh/front-step";
import { genesisBraverOutlineGuard } from "../mesh/guard";
import { genesisBraverOutlineKnockBack } from "../mesh/knock-back";
import { genesisBraverOutlineSPAttack } from "../mesh/sp-attack";
import { genesisBraverOutlineSPCharge } from "../mesh/sp-charge";
import { genesisBraverOutlineSPToStand } from "../mesh/sp-to-stand";
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
      type: "SP_CHARGE",
      mesh: genesisBraverOutlineSPCharge(resources),
    },
    {
      type: "SP_ATTACK",
      mesh: genesisBraverOutlineSPAttack(resources),
    },
    {
      type: "SP_TO_STAND",
      mesh: genesisBraverOutlineSPToStand(resources),
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
      type: "DOWN",
      mesh: genesisBraverOutlineDown(resources),
    },
    {
      type: "BACK_STEP",
      mesh: genesisBraverOutlineBackStep(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: genesisBraverOutlineFrontStep(resources),
    },
    {
      type: "BURST_UP",
      mesh: genesisBraverOutlineBurstUp(resources),
    },
    {
      type: "BURST_DOWN",
      mesh: genesisBraverOutlineBurstDown(resources),
    },
  ];
}
