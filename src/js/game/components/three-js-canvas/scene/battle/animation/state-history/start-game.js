// @flow

import {Animate} from "../../../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {delay, empty} from "../../../../../../../animation/delay";
import {all} from "../../../../../../../animation/all";

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
  if (!activeTDPlayer || !activeHUDPlayer || !activeStatus) {
    return empty();
  }

  const cameraX = activeTDPlayer.sprite.getObject3D().position.x;
  return all(
    all(
      view.td.camera.moveViewPoint({x: cameraX}, 300),
      view.td.camera.moveCamera({x: cameraX, z: '-50'}, 300)
    ).chain(
      delay(1300)
    ).chain(
      view.td.camera.moveViewPoint({x: 0}, 300),
      view.td.camera.moveCamera({x: 0, z: '+50'}, 300)
    )
  ).chain(
    delay(800)
  );
}