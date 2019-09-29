// @flow

import type {LoadingState} from "./loading-state";

/**
 * ローディング進捗に変化があった
 *
 * @param model 更新前
 * @param completedRate ローディング進捗率
 * @return 更新結果
 */
export function progress(model: LoadingState, completedRate: number): LoadingState {
  return {
    ... model,
    completedRate: completedRate
  }
}