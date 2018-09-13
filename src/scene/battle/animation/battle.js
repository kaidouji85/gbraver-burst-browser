// @flow

import {BattleSceneView} from "../view";
import type {BattleSceneState} from "../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {createEmptyTween} from "../../../tween/empty-tween";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {DamageIndicator} from "../../../game-object/damage-indicator/damage-indicator";
import {createEmptyMultiTween} from "../../../tween/multi-tween/empty-multi-tween";

export function battleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: Battle): MultiTween {
  const isAttacker = effect.attacker === sceneState.playerId;
  const playerBattery = isAttacker ? effect.attackerBattery : effect.defenderBattery;
  const enemyBattery = isAttacker ? effect.defenderBattery : effect.attackerBattery;
  const damageIndicator = isAttacker ? view.hudLayer.enemyDamageIndicator : view.hudLayer.playerDamageIndicator;

  const start = createEmptyTween();
  const showPlayerBattery = view.hudLayer.playerBatteryNumber.popUp(playerBattery);
  const showEnemyBattery = view.hudLayer.enemyBatteryNumber.popUp(enemyBattery);
  const showDamage = damageIndicatorAnimation(damageIndicator, isAttacker, effect.result);
  const end = createEmptyTween();

  start.chain(
    showPlayerBattery.start,
    showEnemyBattery.start
  );
  showPlayerBattery.end.chain(showDamage.start);
  showDamage.end.chain(end);

  return {
    start: start,
    end: end
  };
}

function damageIndicatorAnimation(damageIndicator: DamageIndicator, isAttacker: boolean, result: BattleResult): MultiTween {
  switch (result.name) {
    case 'NormalHit':
    case 'Guard':
    case 'CriticalHit':
      return damageIndicator.popUp(result.damage);
    default:
      return damageIndicator.popUp(0);
  }
}