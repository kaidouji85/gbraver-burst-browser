import { Battle, GameState, GameStateX, PlayerId } from "gbraver-burst-core";

/**
 * ステートヒストリーから戦闘を抽出する
 * @param stateHistory ステートヒストリー
 * @returns 抽出結果
 */
function extractBattle(stateHistory: GameState[]): GameStateX<Battle>[] {
  return stateHistory.reduce(
    (battles: GameStateX<Battle>[], state: GameState) =>
      state.effect.name === "Battle"
        ? [...battles, { ...state, effect: state.effect }]
        : battles,
    [],
  );
}

/**
 * 戦闘回数を計算するヘルパー関数
 * @param stateHistory ステートヒストリー
 * @returns 戦闘回数
 */
export function battleCount(stateHistory: GameState[]): number {
  return extractBattle(stateHistory).length;
}

/**
 * 指定したプレイヤーの戦闘回数を計算するヘルパー関数
 * @param stateHistory ステートヒストリー
 * @param playerId プレイヤーID
 * @returns 戦闘回数
 */
export function playerBattleCount(
  stateHistory: GameState[],
  playerId: PlayerId,
): number {
  return extractBattle(stateHistory).filter(
    (battle) => battle.effect.attacker === playerId,
  ).length;
}
