// @flow
import type {Battle, GameEnd, GameState, GameStateX} from "gbraver-burst-core";

/**
 * GameStateX<Battle>にキャストする
 * キャストできない場合はnullを返す
 *
 * @param state キャスト元
 * @return キャスト結果
 */
export function castBattle(state: GameState): ?GameStateX<Battle> {
  if (state.effect.name === 'Battle') {
    const effect: Battle = state.effect;
    return {...state, effect};
  }
  return null;
}

/**
 * ステートヒストリーからGameStateX<Battle>を抽出する
 * 抽出できない場合はnullを返す
 *
 * @param stateHistory ステートヒストリー
 * @return 抽出結果
 */
export function extractBattle(stateHistory: GameState[]): ?GameStateX<Battle> {
  const foundState = stateHistory.find(v => v.effect.name === 'Battle');
  return foundState ? castBattle(foundState) : null;
}

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