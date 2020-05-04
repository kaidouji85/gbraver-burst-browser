// @flow

import type {LoadingState} from "./loading-state";

/**
 * ローディング進捗に変化があった
 *
 * @param state 更新前
 * @param completedRate ローディング進捗率
 * @return 更新結果
 */
export function progress(state: LoadingState, completedRate: number): LoadingState {
  const newCompletedRate = Math.max(state.completedRate, completedRate)
  return {
    ... state,
    completedRate: newCompletedRate
  }
}