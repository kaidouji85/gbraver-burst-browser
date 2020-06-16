// @flow

import type {WingDozerCutInModel} from "./wing-dozer-cutin-model";

/**
 * モデルの初期値を生成する
 *
 * @return 生成結果
 */
export function createInitialValue(): WingDozerCutInModel {
  return {
    tracking: {
      x: 0,
      y: 0,
    }
  }
}