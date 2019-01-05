// @flow

import type {BattleObjects} from "./battle-objects";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-breaver/shin-braver";
import {Animate} from "../../../../../animation/animate";
import {delay} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {damageIndicatorAnimation} from "./damage-indicator";

/** シンブレイバーの攻撃アニメーション */
export function shinBraverAttack(attacker: ShinBraver, objects: BattleObjects): Animate {
  return all(
    attacker.straightPunch(),
    delay(700)
      .chain(
        damageIndicatorAnimation(objects.defender.damageIndicator, objects.effect.result),
        objects.defender.sprite.knockBack(),
        objects.defender.gauge.hp(objects.defenderState.armdozer.hp)
      )
  ).chain(
    all(
      objects.defender.sprite.knockBackToStand()
    )
  ).chain(
    delay(500)
  );
}