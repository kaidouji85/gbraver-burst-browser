// @flow

import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import type {AttackObjects} from "./attack-objects";
import {all} from "../../../../../animation/all";

/** 攻撃、防御側のバッテリーを表示する */
export function visibleBattery(objects: AttackObjects): Animate {
  return empty()
    .chain(
      all(
        objects.attacker.batteryNumber.popUp(objects.effect.attackerBattery),
        objects.attacker.gauge.battery(objects.attackerState.armdozer.battery),
        objects.defender.batteryNumber.popUp(objects.effect.defenderBattery),
        objects.defender.gauge.battery(objects.defenderState.armdozer.battery),
        delay(1200).chain(
          objects.view.td.turnIndicator.invisible()
        )
      )
    )
}