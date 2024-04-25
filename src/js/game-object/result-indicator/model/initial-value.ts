import type { ResultIndicatorModel } from "./result-indicator-model";

/**
 * モデルの初期値を生成する
 *
 * @returns 生成結果
 */
export function createInitialValue(): ResultIndicatorModel {
  return {
    scale: 1,
    opacity: 0,
    worldCoordinate: {
      x: 0,
      y: 0,
    },
    localCoordinate: {
      x: 0,
      y: 0,
    },
  };
}
