// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, StartGame} from "gbraver-burst-core";
import {delay, empty} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../td-camera";
import {turnStartAnimation, turnStartToStandAnimation} from "../turn-start";

/**
 * ゲーム開始時のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function startGameAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<StartGame>): Animate {
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeTDArmdozer = view.td.armdozerObjects.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeTDArmdozer || !activeStatus) {
    return empty();
  }

  return all(
    turnStartAnimation(activeTDArmdozer.sprite(), activeTDPlayer.turnStart),
    attentionArmDozer(view.td.camera, activeTDArmdozer.sprite(), 500)
  )
    .chain(delay(500))
    .chain(all(
      turnStartToStandAnimation(activeTDArmdozer.sprite()),
      toInitial(view.td.camera, 500)
    ))
    .chain(delay(500));
}