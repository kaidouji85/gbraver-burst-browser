// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, StartGame} from "gbraver-burst-core";
import {empty} from "../../../../../animation/delay";
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
    tdPlayer: activeTDPlayer,
    tdCamera: view.td.camera,
  };
  const effects = empty();
  return myTurnAnimation(param, effects);
}