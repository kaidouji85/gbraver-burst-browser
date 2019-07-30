// @flow

import type {BurstAnimationParam} from "./animation-param";
import {Animate} from "../../../../../animation/animate";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import {delay, empty} from "../../../../../animation/delay";
import type {Burst, RecoverBattery} from "gbraver-burst-core/lib/armdozer/burst";
import {overWriteBurst} from "./animation-param";
import {all} from "../../../../../animation/all";

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
  return all(
    param.tdCamera.zoomIn(300)
      .chain(delay(2000))
      .chain(param.tdCamera.zoomOut(1000)),

    delay(800)
      .chain(param.burstPlayerHUD.gauge.battery(param.burstPlayerState.armdozer.battery))
  );
}
