// @flow

import type {LoadingModel} from "./loading-model";

/**
 * 読み込み進捗に変化があった
 *
 * @param model 更新前
 * @param itemsLoaded 読み込み済みのリソース数
 * @param itemsTotal リソースのトータル数
 * @return 更新結果
 */
export function progress(model: LoadingModel, itemsLoaded: number, itemsTotal: number): LoadingModel {
  return {
    ... model,
    completedRate: {
      ...model.completedRate,
      isVisible: true,
      value: itemsLoaded / itemsTotal
    }
  }
}