// @flow
import type {ResultIndicatorModel} from "./result-indicator-model";

/**
 * モデルの初期値を生成する
 *
 * @return 生成結果
 */
export function createInitialValue(): ResultIndicatorModel {
  return {
    position: {x: 0, y: 0}
  };
}