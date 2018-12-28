// @flow

import {DamageIndicator} from "../../../../../game-object/damage-indicator/damage-indicator";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {Animate} from "../../../../../animation/animate";

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