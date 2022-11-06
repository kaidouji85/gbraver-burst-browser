// @flow

import type { Resources } from "../../../../resource";
import { shinBraverBackStep } from "../mesh/back-step";
import { shinBraverBurstDown } from "../mesh/burst-down";
import { shinBraverBurstUp } from "../mesh/burst-up";
import { shinBraverDown } from "../mesh/down";
import { shinBraverFrontStep } from "../mesh/front-step";
import { shinBraverGuard } from "../mesh/guard";
import { shinBraverGutsDown } from "../mesh/guts-down";
import { shinBraverGutsUp } from "../mesh/guts-up";
import { shinBraverKnockBack } from "../mesh/knock-back";
import { shinBraverSPAttack } from "../mesh/sp-attack";
import { shinBraverSPCharge } from "../mesh/sp-charge";
import { shinBraverSPToStand } from "../mesh/sp-to-stand";
import { shinBraverStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
  return [
    { type: "STAND", mesh: shinBraverStand(resources) },
    { type: "SP_CHARGE", mesh: shinBraverSPCharge(resources) },
    { type: "SP_ATTACK", mesh: shinBraverSPAttack(resources) },
    { type: "SP_TO_STAND", mesh: shinBraverSPToStand(resources) },
    { type: "KNOCK_BACK", mesh: shinBraverKnockBack(resources) },
    { type: "GUARD", mesh: shinBraverGuard(resources) },
    { type: "DOWN", mesh: shinBraverDown(resources) },
    { type: "GUTS_UP", mesh: shinBraverGutsUp(resources) },
    { type: "GUTS_DOWN", mesh: shinBraverGutsDown(resources) },
    { type: "BURST_UP", mesh: shinBraverBurstUp(resources) },
    { type: "BURST_DOWN", mesh: shinBraverBurstDown(resources) },
    { type: "BACK_STEP", mesh: shinBraverBackStep(resources) },
    { type: "FRONT_STEP", mesh: shinBraverFrontStep(resources) },
  ];
}
