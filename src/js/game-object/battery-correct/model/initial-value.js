// @flow

import type {BatteryCorrectModel} from "./battery-correct-model";

/**
 * モデルの初期値を生成する
 *
 * @return 生成結果
 */
export function initialValue(): BatteryCorrectModel {
  return {
    correctValue: 0,
    opacity: 1,
    scale: 1,
    position: {
      x: 0,
      y: 0
    }
  };
}