// @flow

import type {Resources} from "../../../../resource";
import {shinBraverBackStep} from "../mesh/back-step";
import {shinBraverActiveBurstDown} from "../mesh/burst-down";
import {shinBraverActiveBurstUp} from "../mesh/burst-up";
import {shinBraverActiveFrontStep} from "../mesh/front-step";
import {shinBraverActiveGuard} from "../mesh/guard";
import {shinBraverActiveKnockBack} from "../mesh/knock-back";
import {shinBraverActiveStand} from "../mesh/stand";
import type {AnimationMeshMapping} from "./animation-mesh-mapping";

/**
 * アニメーションアクティブメッシュマッピング生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createActiveMeshes(resources: Resources): AnimationMeshMapping[] {
  return [
    {type: "STAND", mesh: shinBraverActiveStand(resources)},
    {type: "KNOCK_BACK", mesh: shinBraverActiveKnockBack(resources)},
    {type: "GUARD", mesh: shinBraverActiveGuard(resources)},
    {type: "BURST_UP", mesh: shinBraverActiveBurstUp(resources)},
    {type: "BURST_DOWN", mesh: shinBraverActiveBurstDown(resources)},
    {type: "BACK_STEP", mesh: shinBraverBackStep(resources)},
    {type: "FRONT_STEP", mesh: shinBraverActiveFrontStep(resources)}
  ];
}