// @flow

import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {BattleSceneView} from "../view";
import type {BattleSceneState} from "../state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import {createEmptyMultiTween} from "../../../tween/multi-tween/empty-multi-tween";
import {createEmptyTween} from "../../../tween/empty-tween";

export function battle(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: Battle): MultiTween {
  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
  const enemy = gameState.players.find(v => v.playerId !== sceneState.playerId);

  if (!player || !enemy) {
    return createEmptyMultiTween();
  }

  return refreshGauge(view, player, enemy);
}

/** ゲージを更新する */
function refreshGauge(view: BattleSceneView, player: PlayerState, enemy: PlayerState): MultiTween {
  const start = createEmptyTween();
  const refreshPlayer = view.hudLayer.playerGauge.refresh(player.armdozer.hp, player.armdozer.battery);
  const refreshEnemy = view.hudLayer.enemyGauge.refresh(enemy.armdozer.hp, enemy.armdozer.battery);
  const end = createEmptyTween();

  start.chain(refreshPlayer, refreshEnemy);
  refreshPlayer.chain(end);

  return {
    start: start,
    end: end
  };
}