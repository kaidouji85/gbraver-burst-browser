// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, TurnChange} from "gbraver-burst-core";
import {all} from "../../../../../animation/all";
import {delay, empty} from "../../../../../animation/delay";
import type {MyTurnAnimationParam} from "../my-turn/animation-param";
import {myTurnAnimation} from "../my-turn";

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
  const activeTDArmdozer = view.td.armdozerObjects.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDArmdozer = view.hud.armdozers.find(v => v.playerId === gameState.activePlayerId);
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDArmdozer || !activeHUDArmdozer || !activeTDPlayer || !activeHUDPlayer || !activeStatus) {
    return empty();
  }

  const myTurnParam: MyTurnAnimationParam = {
    tdArmdozer: activeTDArmdozer,
    hudArmdozer: activeHUDArmdozer,
    tdPlayer: activeTDPlayer,
    tdCamera: view.td.camera,
  };

  const recoverBattery = all(
    activeTDPlayer.recoverBattery.popUp(turnChange.recoverBattery),
    activeHUDPlayer.gauge.battery(activeStatus.armdozer.battery)
  )
    .chain(delay(500));
  const effects = (0 < turnChange.recoverBattery)
    ? recoverBattery
    : empty();
  return myTurnAnimation(myTurnParam, effects);
}