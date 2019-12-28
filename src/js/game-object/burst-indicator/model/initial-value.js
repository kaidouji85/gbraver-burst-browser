// @flow

import type {BurstIndicatorModel} from "./burst-indicator-model";

/**
 * 初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): BurstIndicatorModel {
  return {
    opacity: 0
  };
}