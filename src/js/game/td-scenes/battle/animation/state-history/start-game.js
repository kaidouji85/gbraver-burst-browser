// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {delay, empty} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../td-camera";

/**
 * ゲーム開始時のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function startGameAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeTDSprite = view.td.sprites.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeTDSprite || !activeStatus) {
    return empty();
  }

  return all(
    attentionArmDozer(view.td.camera, activeTDSprite.sprite, 500)
      .chain(delay(500))
      .chain(activeTDPlayer.turnStart.popUp()),
    activeTDSprite.sprite.turnStart()
  ).chain(all(
    activeTDSprite.sprite.turnStartToStand(),
    toInitial(view.td.camera, 500)
  )).chain(delay(500))
}