// @flow

import type {LoadingState} from "./loading-state";

/**
 * 初期値を生成する
 *
 * @return 生成結果
 */
export function createInitialState(): LoadingState {
  return {
    completedRate: 0
  };
}