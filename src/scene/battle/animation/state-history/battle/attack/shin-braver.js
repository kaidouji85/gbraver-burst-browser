// @flow

import type {BattleObjects} from "../battle-objects";
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
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";

/** シンブレイバーの攻撃アニメーション */
export function shinBraverAttack(attacker: ShinBraver, objects: BattleObjects<ArmDozerSprite>): Animate {
  switch(objects.effect.result.name) {
    case 'NormalHit':
      return normalHit(attacker, objects, objects.effect.result);
    case 'Guard':
      return guard(attacker, objects, objects.effect.result);
    case 'CriticalHit':
      return criticalHit(attacker, objects, objects.effect.result);
    case 'Miss':
      return miss(attacker, objects, objects.effect.result);
    case 'Feint':
      return feint(attacker, objects, objects.effect.result);
    default:
      return empty();
  }
}

/** ノーマルヒット */
export function normalHit(attacker: ShinBraver, objects: BattleObjects<ArmDozerSprite>, result: NormalHit): Animate {
  return all(
    attacker.straightPunch(),
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
export function guard(attacker: ShinBraver, objects: BattleObjects<ArmDozerSprite>, result: Guard): Animate {
  return all(
    attacker.straightPunch(),
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
export function criticalHit(attacker: ShinBraver, objects: BattleObjects<ArmDozerSprite>, result: CriticalHit): Animate {
  return all(
    attacker.straightPunch(),
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
export function miss(attacker: ShinBraver, objects: BattleObjects<ArmDozerSprite>, effect: Miss): Animate {
  return all(
    attacker.straightPunch(),
    delay(700)
      .chain(
        objects.defender.sprite.avoid()
      )
  )
}

/** フェイント */
export function feint(attacker: ShinBraver, objects: BattleObjects<ArmDozerSprite>, result: Feint): Animate {
  if (!result.isDefenderMoved) {
    return empty();
  }

  return objects.defender.sprite.avoid();
}