// @flow

import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameOver, GameEnd, GameEndX, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import {toGameOverParam} from "./game-over/game-over-param";
import type {EvenMatch} from "gbraver-burst-core/lib";
import {gameOverAnimation} from "./game-over/game-over";
import {evenMatchAnimation} from "./even-match/even-match";

/**
 * ゲーム終了アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function gameEndAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<GameEnd>): Animate {
  const evenMatch = castEvenMatch(gameState);
  if (evenMatch) {
    return evenMatchAnimation();
  }

  const gameOver = castGameOver(gameState);
  if (gameOver) {
    const param = toGameOverParam(view, gameOver);
    return param ? gameOverAnimation(param) : empty();
  }
  
  return empty();
}

/**
 * EvenMatchにキャストするヘルパー関数
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
function castEvenMatch(origin: GameStateX<GameEnd>): ?GameStateX<GameEndX<EvenMatch>> {
  if (origin.effect.result.type !== 'EvenMatch') {
    return null;
  }

  const evenMatch: EvenMatch = origin.effect.result;
  return ((origin: any): GameStateX<GameEndX<typeof evenMatch>>);
}

/**
 * GameOverにキャストするヘルパー関数
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
function castGameOver(origin: GameStateX<GameEnd>): ?GameStateX<GameEndX<GameOver>> {
  if (origin.effect.result.type !== 'GameOver') {
    return null;
  }

  const gameOver: GameOver = origin.effect.result;
  return ((origin: any): GameStateX<GameEndX<typeof gameOver>>);
}