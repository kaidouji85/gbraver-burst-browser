// @flow


import {Animate} from "../../../../../animation/animate";
import type {BattleObjects} from "./battle-objects";
import {all} from "../../../../../animation/all";
import {damageIndicatorAnimation} from "./damage-indicator";

/**
 * ダメージ数字だけを表示する戦闘アニメーション
 *
 * @param objects 戦闘アニメーションオブジェクト
 * @return 戦闘アニメーション
 */
export function emptyBattleAnimation(objects: BattleObjects): Animate {
  return all(
    damageIndicatorAnimation(objects.defender.damageIndicator, objects.effect.result),
    objects.defender.sprite.knockBack(),
    objects.defender.gauge.hp(objects.defenderState.armdozer.hp)
  );
}