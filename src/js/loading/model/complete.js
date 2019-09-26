// @flow

import type {LoadingModel} from "./loading-model";

/**
 * ローディング読み込み完了
 *
 * @param model 更新前
 * @return 更新結果
 */
export function complete(model: LoadingModel): LoadingModel {
  return {
    ...model,
    isVisible: false
  };
}