// @flow
import type {GameEnd, GameState, GameStateX} from "gbraver-burst-core";

/**
 * GameStateX<GameEnd>にキャストする
 * キャストできない場合はnullを返す
 *
 * @param state キャスト元
 * @return キャスト結果
 */
export function castGameEnd(state: GameState): ?GameStateX<GameEnd> {
  if (state.effect.name === 'GameEnd') {
    const effect: GameEnd = state.effect;
    return {...state, effect};
  }
  return null;
}

/**
 * ステートヒストリーからGameStateX<GameEnd>を抽出する
 * 抽出できない場合はnullを返す
 *
 * @param stateHistory ステートヒストリー
 * @return 抽出結果
 */
export function extractGameEnd(stateHistory: GameState[]): ?GameStateX<GameEnd> {
  const foundState = stateHistory.find(v => v.effect.name === 'GameEnd');
  return foundState ? castGameEnd(foundState) : null;
}