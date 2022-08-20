// @flow
import type {EvenMatch, GameEnd, GameEndX, GameOver, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import type {StateAnimationProps} from "../state-animation-props";
import {evenMatchAnimation} from "./even-match/even-match";
import {gameOverAnimation} from "./game-over/game-over";
import {toGameOverParam} from "./game-over/game-over-param";

/**
 * ゲーム終了アニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function gameEndAnimation(props: StateAnimationProps, gameState: GameStateX<GameEnd>): Animate {
  const evenMatch = castEvenMatch(gameState);
  if (evenMatch) {
    return evenMatchAnimation(props);
  }

  const gameOver = castGameOver(gameState);
  if (gameOver) {
    const param = toGameOverParam(props, gameOver);
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