// @flow


import {Animate} from "../../../../../../animation/animate";
import type {BattleAnimationObjects} from "../battle-animation-objects";
import {all} from "../../../../../../animation/all";
import {DamageIndicator} from "../../../../../../game-object/damage-indicator/damage-indicator";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";

/** 戦闘結果に応じたダメージ表示を行う */
export function damageIndicatorAnimation(damageIndicator: DamageIndicator, result: BattleResult): Animate {
  switch (result.name) {
    case 'NormalHit':
    case 'Guard':
    case 'CriticalHit':
      return damageIndicator.popUp(result.damage);
    default:
      return damageIndicator.popUp(0);
  }
}

/**
 * ダメージ数字だけを表示する戦闘アニメーション
 *
 * @param objects 戦闘アニメーションオブジェクト
 * @return 戦闘アニメーション
 */
export function emptyBattleAnimation(objects: BattleAnimationObjects<ArmDozerSprite>): Animate {
  return all(
    damageIndicatorAnimation(objects.defender.damageIndicator, objects.effect.result),
    objects.defender.sprite.knockBack(),
    objects.defender.gauge.hp(objects.defenderState.armdozer.hp)
  );
}