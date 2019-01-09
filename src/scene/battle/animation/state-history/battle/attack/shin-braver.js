// @flow

import type {BattleAnimationObjects} from "../animation-objects";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import type {
  CriticalHit,
  Feint,
  Guard,
  Miss,
  NormalHit
} from "gbraver-burst-core/lib/effect/battle/result/battle-result";

/** シンブレイバーの攻撃アニメーション */
export function shinBraverAttack(objects: BattleAnimationObjects<ShinBraver>): Animate {
  switch(objects.effect.result.name) {
    case 'NormalHit':
      return normalHit(objects, objects.effect.result);
    case 'Guard':
      return guard(objects, objects.effect.result);
    case 'CriticalHit':
      return criticalHit(objects, objects.effect.result);
    case 'Miss':
      return miss(objects, objects.effect.result);
    case 'Feint':
      return feint(objects, objects.effect.result);
    default:
      return empty();
  }
}

/** ノーマルヒット */
export function normalHit(objects: BattleAnimationObjects<ShinBraver>, result: NormalHit): Animate {
  return all(
    objects.attacker.sprite.straightPunch(),
    delay(700)
      .chain(
        objects.defender.damageIndicator.popUp(result.damage),
        objects.defender.sprite.knockBack(),
        objects.defender.gauge.hp(objects.defenderState.armdozer.hp)
      )
  ).chain(
    objects.defender.sprite.knockBackToStand()
  );
}

/** ガード */
export function guard(objects: BattleAnimationObjects<ShinBraver>, result: Guard): Animate {
  return all(
    objects.attacker.sprite.straightPunch(),
    delay(700)
      .chain(
        objects.defender.damageIndicator.popUp(result.damage),
        objects.defender.sprite.guard(),
        objects.defender.gauge.hp(objects.defenderState.armdozer.hp)
      )
  ).chain(
    objects.defender.sprite.guardToStand()
  );
}

/** クリティカルヒット */
export function criticalHit(objects: BattleAnimationObjects<ShinBraver>, result: CriticalHit): Animate {
  return all(
    objects.attacker.sprite.straightPunch(),
    delay(700)
      .chain(
        objects.defender.damageIndicator.popUp(result.damage),
        objects.defender.sprite.knockBack(),
        objects.defender.gauge.hp(objects.defenderState.armdozer.hp)
      )
  ).chain(
    objects.defender.sprite.knockBackToStand()
  );
}

/** ミス */
export function miss(objects: BattleAnimationObjects<ShinBraver>, effect: Miss): Animate {
  return all(
    objects.attacker.sprite.straightPunch(),
    delay(700)
      .chain(
        objects.defender.sprite.avoid()
      )
  )
}

/** フェイント */
export function feint(objects: BattleAnimationObjects<ShinBraver>, effect: Feint): Animate {
  if (!effect.isDefenderMoved) {
    return empty();
  }

  return objects.defender.sprite.avoid();
}