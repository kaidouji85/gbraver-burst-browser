// @flow

import {Animate} from "../../../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {delay, empty} from "../../../../../../../animation/delay";
import {all} from "../../../../../../../animation/all";
import {lookAtPlayer, zoomIn} from "../td-camera";

/**
 * ゲーム開始時のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 */
export function startGameAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  const player = view.td.players.find(v => v.playerId === sceneState.playerId);
  if (!activeTDPlayer || !activeHUDPlayer || !activeStatus || !player) {
    return empty();
  }

  const attackerX = activeTDPlayer.sprite.getObject3D().position.x;
  const playerX = player.sprite.getObject3D().position.x;
  return all(
    zoomIn(view.td.camera, attackerX, 500)
      .chain(delay(2000))
      .chain(lookAtPlayer(view.td.camera, playerX, 500)),

    delay(700)
      .chain(activeTDPlayer.attackerIndicator.show())
      .chain(delay(1000))
      .chain(activeTDPlayer.attackerIndicator.hidden())
  ).chain(
    delay(800)
  );
}