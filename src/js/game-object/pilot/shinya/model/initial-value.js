// @flow

import type {ShinyaModel} from "./shinya-model";

/**
 * モデルの初期値を生成する
 *
 * @return モデルの初期値
 */
export function createInitialValue(): ShinyaModel {
  return {
    tracking: {
      x: 0,
      y: 0
    }
  };
}