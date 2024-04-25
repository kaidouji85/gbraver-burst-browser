import type { GameState } from "gbraver-burst-core";

/**
 * ターン数を計算するヘルパー関数
 *
 * @param stateHistory ステートヒストリー
 * @returns ターン数
 */
export function turnCount(stateHistory: GameState[]): number {
  return stateHistory.filter((v) => v.effect.name === "TurnChange").length + 1;
}
