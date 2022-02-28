// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, StartGame} from "gbraver-burst-core";
import {delay, empty} from "../../../../../animation/delay";

/**
 * ゲーム開始時のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function startGameAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<StartGame>): Animate {
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeHUDPlayer) {
    return empty();
  }

  return activeHUDPlayer.turnStart.show()
    .chain(delay(600))
    .chain(delay(200), activeHUDPlayer.turnStart.hidden());
}