// @flow

import {Animate} from "../../../../../../../../animation/animate";
import {delay} from "../../../../../../../../animation/delay";
import {all} from "../../../../../../../../animation/all";
import type {BattleAnimationParam} from "./animation-param";
import type {ArmDozerSprite} from "../../../../../../../../game-object/armdozer/armdozer-sprite";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";

/**
 * 攻撃、防御側のバッテリーを表示する
 *
 * @param param 戦闘アニメパラメータ
 * @return アニメーション
 */
export function visibleBattery(param: BattleAnimationParam<ArmDozerSprite, BattleResult>): Animate {
  return all(
    all(
      param.attackerTD.batteryNumber.popUp(param.attackerBattery),
      param.attackerTD.gauge.battery(param.attackerState.armdozer.battery),
      param.defenderTD.batteryNumber.popUp(param.defenderBattery),
      param.defenderTD.gauge.battery(param.defenderState.armdozer.battery),
    ),

    delay(1200).chain(
      param.tdObjects.turnIndicator.invisible()
    )
  );

}