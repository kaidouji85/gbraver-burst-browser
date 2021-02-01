// @flow

import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameEnd, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import {castShinBraverGameOver, shinBraverWin} from "./shin-braver";
import {toGameOverParam} from "./animation-param";
import type {GameOver} from "gbraver-burst-core/lib/game/end-judging/game-end-judging";

/**
 * ゲーム終了アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function gameEndAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<GameEnd>): Animate {
  const effect: GameEnd = gameState.effect;
  if (effect.result.type !== 'GameOver') {
    return empty();
  }

  const gameOver: GameOver = effect.result;
  const animationParam = toGameOverParam(view, gameOver);
  if (!animationParam) {
    return empty();
  }

  const shinBraver = castShinBraverGameOver(animationParam);
  if (shinBraver) {
    return shinBraverWin(shinBraver);
  }

  return empty();
}