// @flow

import type {LoadingModel} from "./loading-model";

/**
 * 読み込み進捗に変化があった
 *
 * @param model 更新前
 * @param completedRate 読み込み進捗率
 * @return 更新結果
 */
export function progress(model: LoadingModel, completedRate: number): LoadingModel {
  return {
    ... model,
    completedRate: {
      ...model.completedRate,
      isVisible: true,
      value: completedRate
    }
  }
}