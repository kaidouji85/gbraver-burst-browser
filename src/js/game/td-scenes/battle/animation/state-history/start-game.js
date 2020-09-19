// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX} from "gbraver-burst-core";
import {delay, empty} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../td-camera";
import {turnStartAnimation, turnStartToStandAnimation} from "../turn-start";
import type {StartGame} from "gbraver-burst-core";

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
  const activeTDSprite = view.td.sprites.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeTDSprite || !activeStatus) {
    return empty();
  }

  return all(
    turnStartAnimation(activeTDSprite.sprite, activeTDPlayer.turnStart),
    attentionArmDozer(view.td.camera, activeTDSprite.sprite, 500)
  )
    .chain(delay(500))
    .chain(all(
      turnStartToStandAnimation(activeTDSprite.sprite),
      toInitial(view.td.camera, 500)
    ))
    .chain(delay(500));
}