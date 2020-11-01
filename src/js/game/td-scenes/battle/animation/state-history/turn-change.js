// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, TurnChange} from "gbraver-burst-core";
import {all} from "../../../../../animation/all";
import {delay, empty} from "../../../../../animation/delay";
import {attentionArmDozer, toInitial} from "../td-camera";
import {turnStartAnimation, turnStartToStandAnimation} from "../turn-start";

/**
 * ターン変更のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーン状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<TurnChange>): Animate {
  const turnChange: TurnChange = gameState.effect;
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeTDArmdozer = view.td.armdozerObjects.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeTDArmdozer || !activeHUDPlayer || !activeStatus) {
    return empty();
  }

  return all(
    turnStartAnimation(activeTDArmdozer.sprite(), activeTDPlayer.turnStart),
    attentionArmDozer(view.td.camera, activeTDArmdozer.sprite(), 500)
  )
    .chain(delay(500))
    .chain((0 < turnChange.recoverBattery)
      ? all(
        activeTDPlayer.recoverBattery.popUp(turnChange.recoverBattery),
        activeHUDPlayer.gauge.battery(activeStatus.armdozer.battery)
      )
      : empty()
    )
    .chain(delay(500))
    .chain(all(
      turnStartToStandAnimation(activeTDArmdozer.sprite()),
      toInitial(view.td.camera, 500))
    )
    .chain(delay(500));
}