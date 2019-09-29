// @flow

import type {LoadingState} from "./loading-state";

/**
 * ローディング完了
 *
 * @param model 更新前
 * @return 更新結果
 */
export function complete(model: LoadingState): LoadingState {
  return {
    ...model,
    isVisible: false
  };
}