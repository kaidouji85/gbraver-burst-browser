// @flow

import type {BurstAnimationParam} from "./animation-param";
import {Animate} from "../../../../../animation/animate";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import {empty} from "../../../../../animation/delay";
import type {Burst, RecoverBattery} from "gbraver-burst-core/lib/armdozer/burst";
import {overWriteBurst} from "./animation-param";

/**
 * シンブレイバーのバーストアニメーション
 *
 * @param param バーストアニメーションパラメータ
 * @return バーストアニメーション
 */
export function shinBraverBurst(param: BurstAnimationParam<ShinBraver, Burst>): Animate {
  const burst = param.burst;
  if (burst.type === 'RecoverBattery') {
    return recoverBattery(overWriteBurst(param, burst));
  }
  return empty();
}

/**
 * バッテリー回復バースト
 *
 * @param param アニメーションパラメータ
 * @return アニメーション
 */
function recoverBattery(param: BurstAnimationParam<ShinBraver, RecoverBattery>): Animate {
  return empty();
}
