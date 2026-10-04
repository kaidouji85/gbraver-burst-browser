import type { TurnIndicatorModel } from "./turn-indicator-model";

/**
 * ターンインジケーターの初期値を生成する
 *
 * @returns 初期値
 */
export function createInitialValue(): TurnIndicatorModel {
  return {
    isPlayerTurn: true,
    opacity: 0,
    animation: 0,
  };
}
