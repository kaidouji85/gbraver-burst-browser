// @flow

import type {RaitoModel} from "./raito-model";

/**
 * モデルの初期値を生成する
 *
 * @return モデルの初期値
 */
export function createInitialValue(): RaitoModel {
  return {
    opacity: 0,
    scale: 1,
    tracking: {
      x: 0,
      y: 0
    }
  };
}