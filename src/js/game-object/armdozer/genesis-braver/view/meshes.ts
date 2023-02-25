import type { Resources } from "../../../../resource";
import { genesisBraverBackStep } from "../mesh/back-step";
import { genesisBraverDown } from "../mesh/down";
import { genesisBraverFrontStep } from "../mesh/front-step";
import { genesisBraverKnockBack } from "../mesh/knock-back";
import { genesisBraverSPAttack } from "../mesh/sp-attack";
import { genesisBraverSPCharge } from "../mesh/sp-charge";
import { genesisBraverSPToStand } from "../mesh/sp-to-stand";
import { genesisBraverStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";
import {genesisBraverBurstUp} from "../mesh/burst-up";
import {genesisBraverBurstDown} from "../mesh/burst-down";

/**
 * アニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: genesisBraverStand(resources),
    },
    {
      type: "SP_CHARGE",
      mesh: genesisBraverSPCharge(resources),
    },
    {
      type: "SP_ATTACK",
      mesh: genesisBraverSPAttack(resources),
    },
    {
      type: "SP_TO_STAND",
      mesh: genesisBraverSPToStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: genesisBraverKnockBack(resources),
    },
    {
      type: "DOWN",
      mesh: genesisBraverDown(resources),
    },
    {
      type: "BACK_STEP",
      mesh: genesisBraverBackStep(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: genesisBraverFrontStep(resources),
    },
    {
      type: "BURST_UP",
      mesh: genesisBraverBurstUp(resources),
    },
    {
      type: "BURST_DOWN",
      mesh: genesisBraverBurstDown(resources),
    }
  ];
}
