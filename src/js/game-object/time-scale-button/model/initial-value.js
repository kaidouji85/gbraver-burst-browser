// @flow
import type { TimeScaleButtonModel } from "./time-scale-button-model";

/**
 * モデルの初期値を生成する
 *
 * @return 生成結果
 */
export function createInitialValue(): TimeScaleButtonModel {
  return {
    timeScale: 1,
    scale: 1,
    opacity: 0,
    disabled: true,
  };
}
