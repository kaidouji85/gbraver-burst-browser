// @flow

import type {BurstAnimationParam} from "./animation-param";
import {Animate} from "../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {delay, empty} from "../../../../../../animation/delay";
import type {Burst, RecoverBattery} from "gbraver-burst-core";
import {all} from "../../../../../../animation/all";
import {ShinBraverCutIn} from "../../../../../../game-object/cut-in/shin-braver/shin-braver-cutin";

/**
 * シンブレイバーのバーストアニメーション
 *
 * @param param バーストアニメーションパラメータ
 * @return バーストアニメーション
 */
export function shinBraverBurst(param: BurstAnimationParam<ShinBraver, ShinBraverCutIn, Burst>): Animate {
  if (param.burst.type === 'RecoverBattery') {
    const castBurst = (param.burst: RecoverBattery);
    const castParam = ((param: any): BurstAnimationParam<ShinBraver, ShinBraverCutIn, typeof castBurst>);
    return recoverBattery(castParam);
  }

  return empty();
}

/**
 * バッテリー回復バースト
 *
 * @param param アニメーションパラメータ
 * @return アニメーション
 */
function recoverBattery(param: BurstAnimationParam<ShinBraver, ShinBraverCutIn, RecoverBattery>): Animate {
  return all(
    param.hudObjects.rearmostFader.fadeOut(),
    param.burstPlayerHUD.cutIn.play(),
    param.tdObjects.turnIndicator.invisible()
  ).chain(delay(800)
  ).chain(all(
    param.hudObjects.rearmostFader.fadeIn(),
    param.burstPlayerHUD.cutIn.hidden(),
  )).chain(delay(800)
  ).chain(all(
    param.burstPlayerTD.gauge.battery(param.burstPlayerState.armdozer.battery),
    param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
  ));
}
