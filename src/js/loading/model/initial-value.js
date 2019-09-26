// @flow

import type {LoadingModel} from "./loading-model";

/**
 * 初期値を生成する
 *
 * @return 生成結果
 */
export function createInitialValue(): LoadingModel {
  return {
    isVisible: true,
    caption: {
      isVisible: false,
      value: ''
    },
    completedRate: {
      isVisible: false,
      value: 0
    }
  };
}