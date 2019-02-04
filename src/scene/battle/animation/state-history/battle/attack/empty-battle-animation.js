// @flow

import {Animate} from "../../../../../../animation/animate";
import {all} from "../../../../../../animation/all";
import {DamageIndicator} from "../../../../../../game-object/damage-indicator/damage-indicator";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {BattleSceneView} from "../../../../view";
import type {BattleSceneState} from "../../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {empty} from "../../../../../../animation/delay";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";

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

/** ダメージ数字だけを表示する戦闘アニメーション */
export function emptyBattleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'Battle') {
    return empty();
  }

  const effect: Battle = gameState.effect;
  const attackerArmdozer = view.td.armdozers.find(v => v.playerId === effect.attacker);
  const defenderArmdozer = view.td.armdozers.find(v => v.playerId !== effect.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker);

  if (!attackerArmdozer || !defenderArmdozer || !defenderState) {
    return empty();
  }

  return all(
    damageIndicatorAnimation(defenderArmdozer.damageIndicator, effect.result),
    defenderArmdozer.gauge.hp(defenderState.armdozer.hp)
  );
}