// @flow

import type {AttackerIndicatorModel} from "./attacker-indicator-model";

/**
 * モデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): AttackerIndicatorModel {
  return {
    opacity: 0.5
  };
}