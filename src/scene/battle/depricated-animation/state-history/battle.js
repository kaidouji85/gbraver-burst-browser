// @flow

import {BattleSceneView} from "../../view/index";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import type {MultiTween} from "../../../../depricated-tween/multi-tween/multi-tween";
import {createEmptyTween} from "../../../../depricated-tween/empty-tween";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {DamageIndicator} from "../../../../game-object/damage-indicator/damage-indicator";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/common/armdozer-sprite";

export function battleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: Battle): MultiTween {
  const isAttacker = effect.attacker === sceneState.playerId;
  const playerBattery = isAttacker ? effect.attackerBattery : effect.defenderBattery;
  const enemyBattery = isAttacker ? effect.defenderBattery : effect.attackerBattery;
  const damageIndicator = isAttacker ? view.threeDimensionLayer.enemyDamageIndicator : view.threeDimensionLayer.playerDamageIndicator;

  const attacker = isAttacker ? view.threeDimensionLayer.playerSprite : view.threeDimensionLayer.enemySprite;
  const defender = isAttacker ? view.threeDimensionLayer.enemySprite : view.threeDimensionLayer.playerSprite;

  const start = createEmptyTween();
  const showPlayerBattery = view.threeDimensionLayer.playerBatteryNumber.popUp(playerBattery);
  const showEnemyBattery = view.threeDimensionLayer.enemyBatteryNumber.popUp(enemyBattery);
  const punch = attacker.punch();
  const showDamage = damageIndicatorAnimation(damageIndicator, effect.result);
  const end = createEmptyTween();

  start.chain(
    showPlayerBattery.start,
    showEnemyBattery.start
  );
  showPlayerBattery.end.chain(punch.start);
  punch.end.chain(
    showDamage.start,
  );
  showDamage.end.chain(end);

  return {
    start: start,
    end: end
  };
}

function damageIndicatorAnimation(damageIndicator: DamageIndicator, result: BattleResult): MultiTween {
  switch (result.name) {
    case 'NormalHit':
    case 'Guard':
    case 'CriticalHit':
      return damageIndicator.popUp(result.damage);
    default:
      return damageIndicator.popUp(0);
  }
}