// @flow

import {BattleSceneView} from "../view";
import type {BattleSceneState} from "../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {createEmptyTween} from "../../../tween/empty-tween";

export function battleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: Battle): MultiTween {
  const isAttacker = effect.attacker === sceneState.playerId;
  const playerBattery = isAttacker ? effect.attackerBattery : effect.defenderBattery;
  const enemyBattery = isAttacker ? effect.defenderBattery : effect.attackerBattery;

  const start = createEmptyTween();
  const showPlayerBattery = view.hudLayer.playerBatteryNumber.show(playerBattery);
  const showEnemyBattery = view.hudLayer.enemyBatteryNumber.show(enemyBattery);
  const end = createEmptyTween();

  start.chain(
    showPlayerBattery.start,
    showEnemyBattery.start
  );
  showPlayerBattery.end.chain(end);

  return {
    start: start,
    end: end
  };
}