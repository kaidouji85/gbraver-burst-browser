import { GameState } from "gbraver-burst-core";

/**
 * 連続行動中のターンかどうかを判定する
 * 連続行動中のターンとは、再度のTurnChangeのreasonが"ContinuousActive" であるターンを指す
 * @param stateHistory ゲーム状態の履歴
 * @returns 連続行動中のターンであればtrue、そうでなければfalse
 */
export const isContinuousActiveTurn = (stateHistory: GameState[]): boolean => {
  const lastTurnChange = stateHistory.findLast(
    (s) => s.effect.name === "TurnChange",
  );
  return (
    lastTurnChange?.effect.name === "TurnChange" &&
    lastTurnChange.effect.reason === "ContinuousActive"
  );
};
