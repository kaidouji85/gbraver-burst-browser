// @flow

import type {PlayerSelectState} from "./player-select-state";

/**
 * プレイヤーセレクト 初期ステートを生成する
 *
 * @return 生成結果
 */
export function createInitialState(): PlayerSelectState {
  return {
    canOperation: true
  };
}