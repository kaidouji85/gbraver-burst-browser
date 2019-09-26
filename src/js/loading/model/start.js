// @flow

import type {LoadingModel} from "./loading-model";

/**
 * 読み込み開始
 *
 * @param model 更新前
 * @return 更新結果
 */
export function start(model: LoadingModel): LoadingModel {
  return {
    ...model,
    completedRate: {
      isVisible: true,
      value: 0
    }
  }
}