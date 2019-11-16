// @flow

import type {TurnIndicatorModel} from "./turn-indicator-model";

/**
 * ターンインジケーターの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): TurnIndicatorModel {
  return {
    isPlayerTurn: true,
    opacity: 0,
    x: 30
  };
}