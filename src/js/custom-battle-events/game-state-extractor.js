// @flow
import type {Battle,BatteryDeclaration, GameEnd, GameState, GameStateX, InputCommand} from "gbraver-burst-core";

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
 * GameStateX<InputCommand>にキャストする
 * キャストできない場合はnullを返す
 *
 * @param state キャスト元
 * @return キャスト結果
 */
export function castInputCommand(state: GameState): ?GameStateX<InputCommand> {
  if (state.effect.name === 'InputCommand') {
    const effect: InputCommand = state.effect;
    return {...state, effect};
  }
  return null;
}

/**
 * ステートヒストリーからGameStateX<InputCommand>を抽出する
 * 抽出できない場合はnullを返す
 *
 * @param stateHistory ステートヒストリー
 * @return 抽出結果
 */
export function extractInputCommand(stateHistory: GameState[]): ?GameStateX<InputCommand> {
  const foundState = stateHistory.find(v => v.effect.name === 'InputCommand');
  return foundState ? castInputCommand(foundState) : null;
}

/**
 * GameStateX<BatteryDeclaration>にキャストする
 * キャストできない場合はnullを返す
 *
 * @param state キャスト元
 * @return キャスト結果
 */
export function castBatteryDeclaration(state: GameState): ?GameStateX<BatteryDeclaration> {
  if (state.effect.name === 'BatteryDeclaration') {
    const effect: BatteryDeclaration = state.effect;
    return {...state, effect};
  }
  return null;
}

/**
 * ステートヒストリーからGameStateX<BatteryDeclaration>を抽出する
 * 抽出できない場合はnullを返す
 *
 * @param stateHistory ステートヒストリー
 * @return 抽出結果
 */
export function extractBatteryDeclaration(stateHistory: GameState[]): ?GameStateX<BatteryDeclaration> {
  const foundState = stateHistory.find(v => v.effect.name === 'BatteryDeclaration');
  return foundState ? castBatteryDeclaration(foundState) : null;
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