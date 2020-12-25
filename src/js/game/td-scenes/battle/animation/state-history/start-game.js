// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, StartGame} from "gbraver-burst-core";
import {delay, empty} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../td-camera";
import {turnStartAnimation, turnStartToStandAnimation} from "../turn-start";
import type {MyTurnAnimationParam} from "../my-turn/animation-param";
import {myTurnAnimation} from "../my-turn";

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
  const activeHUDArmdozer = view.hud.armdozers.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeTDArmdozer || !activeHUDArmdozer) {
    return empty();
  }

  const param: MyTurnAnimationParam = {
    tdArmdozer: activeTDArmdozer,
    hudArmdozer: activeHUDArmdozer,
    tdPlayer: activeTDPlayer
  };
  const effects = empty();
  return myTurnAnimation(param, effects);

  // return all(
  //   turnStartAnimation(activeTDArmdozer.sprite(), activeTDPlayer.turnStart),
  //   attentionArmDozer(view.td.camera, activeTDArmdozer.sprite(), 500)
  // )
  //   .chain(delay(500))
  //   .chain(all(
  //     turnStartToStandAnimation(activeTDArmdozer.sprite()),
  //     toInitial(view.td.camera, 500)
  //   ))
  //   .chain(delay(500));
}