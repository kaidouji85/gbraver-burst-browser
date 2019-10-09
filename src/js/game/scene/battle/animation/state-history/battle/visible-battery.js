// @flow

import {Animate} from "../../../../../../animation/animate";
import {delay} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import type {BattleAnimationParam} from "./animation-param";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
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
      param.tdCamera.moveViewPoint({x: 0}, 300),
      param.tdCamera.moveCamera({x: 0, z: 300}, 300),
    ),

    delay(600).chain(all(
      param.attackerTD.batteryNumber.popUp(param.attackerBattery),
      param.attackerHUD.gauge.battery(param.attackerState.armdozer.battery),
      param.defenderTD.batteryNumber.popUp(param.defenderBattery),
      param.defenderHUD.gauge.battery(param.defenderState.armdozer.battery),

    )),

    delay(1500).chain(
      param.tdObjects.turnIndicator.invisible()
    )
  );

}