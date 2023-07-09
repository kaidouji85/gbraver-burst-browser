import { Resources } from "../../../../resource";
import { genesisBraverActiveBackStep } from "../mesh/back-step";
import { genesisBraverActiveBurstDown } from "../mesh/burst-down";
import { genesisBraverActiveBurstUp } from "../mesh/burst-up";
import { genesisBraverActiveDown } from "../mesh/down";
import { genesisBraverActiveFrontStep } from "../mesh/front-step";
import { genesisBraverActiveGuard } from "../mesh/guard";
import { genesisBraverActiveKnockBack } from "../mesh/knock-back";
import { genesisBraverActiveSPAttack } from "../mesh/sp-attack";
import { genesisBraverActiveSPCharge } from "../mesh/sp-charge";
import { genesisBraverActiveSPToStand } from "../mesh/sp-to-stand";
import { genesisBraverActiveStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションアクティブメッシュマッピング生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createActiveMeshes(
  resources: Resources,
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: genesisBraverActiveStand(resources),
    },
    {
      type: "SP_CHARGE",
      mesh: genesisBraverActiveSPCharge(resources),
    },
    {
      type: "SP_ATTACK",
      mesh: genesisBraverActiveSPAttack(resources),
    },
    {
      type: "SP_TO_STAND",
      mesh: genesisBraverActiveSPToStand(resources),
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
      type: "DOWN",
      mesh: genesisBraverActiveDown(resources),
    },
    {
      type: "BACK_STEP",
      mesh: genesisBraverActiveBackStep(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: genesisBraverActiveFrontStep(resources),
    },
    {
      type: "BURST_UP",
      mesh: genesisBraverActiveBurstUp(resources),
    },
    {
      type: "BURST_DOWN",
      mesh: genesisBraverActiveBurstDown(resources),
    },
  ];
}
