import type {
  BatteryDeclaration,
  GameEnd,
  GameState,
  GameStateX,
  InputCommand,
} from "gbraver-burst-core";

/**
 * @deprecated
 * GameStateX<InputCommand>にキャストする
 * キャストできない場合はnullを返す
 *
 * @param state キャスト元
 * @returns キャスト結果
 */
export function castInputCommand(
  state: GameState,
): GameStateX<InputCommand> | null | undefined {
  if (state.effect.name === "InputCommand") {
    const effect: InputCommand = state.effect;
    return { ...state, effect };
  }

  return null;
}

/**
 * @deprecated
 * ステートヒストリーからGameStateX<InputCommand>を抽出する
 * 抽出できない場合はnullを返す
 *
 * @param stateHistory ステートヒストリー
 * @returns 抽出結果
 */
export function extractInputCommand(
  stateHistory: GameState[],
): GameStateX<InputCommand> | null | undefined {
  const foundState = stateHistory.find((v) => v.effect.name === "InputCommand");
  return foundState ? castInputCommand(foundState) : null;
}

/**
 * @deprecated
 * GameStateX<BatteryDeclaration>にキャストする
 * キャストできない場合はnullを返す
 *
 * @param state キャスト元
 * @returns キャスト結果
 */
export function castBatteryDeclaration(
  state: GameState,
): GameStateX<BatteryDeclaration> | null | undefined {
  if (state.effect.name === "BatteryDeclaration") {
    const effect: BatteryDeclaration = state.effect;
    return { ...state, effect };
  }

  return null;
}

/**
 * @deprecated
 * ステートヒストリーからGameStateX<BatteryDeclaration>を抽出する
 * 抽出できない場合はnullを返す
 *
 * @param stateHistory ステートヒストリー
 * @returns 抽出結果
 */
export function extractBatteryDeclaration(
  stateHistory: GameState[],
): GameStateX<BatteryDeclaration> | null | undefined {
  const foundState = stateHistory.find(
    (v) => v.effect.name === "BatteryDeclaration",
  );
  return foundState ? castBatteryDeclaration(foundState) : null;
}

/**
 * @deprecated
 * GameStateX<GameEnd>にキャストする
 * キャストできない場合はnullを返す
 *
 * @param state キャスト元
 * @returns キャスト結果
 */
export function castGameEnd(
  state: GameState,
): GameStateX<GameEnd> | null | undefined {
  if (state.effect.name === "GameEnd") {
    const effect: GameEnd = state.effect;
    return { ...state, effect };
  }

  return null;
}

/**
 * @deprecated
 * ステートヒストリーからGameStateX<GameEnd>を抽出する
 * 抽出できない場合はnullを返す
 *
 * @param stateHistory ステートヒストリー
 * @returns 抽出結果
 */
export function extractGameEnd(
  stateHistory: GameState[],
): GameStateX<GameEnd> | null | undefined {
  const foundState = stateHistory.find((v) => v.effect.name === "GameEnd");
  return foundState ? castGameEnd(foundState) : null;
}
