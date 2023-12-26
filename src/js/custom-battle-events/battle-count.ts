import { GameState } from "gbraver-burst-core";

/**
 * 戦闘回数を計算するヘルパー関数
 * @param stateHistory ステートヒストリー
 * @return 戦闘回数
 */
export function battleCount(stateHistory: GameState[]): number {
  return stateHistory.filter((state) => state.effect.name === "Battle").length;
}
