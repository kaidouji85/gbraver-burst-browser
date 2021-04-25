// @flow

import type {TsubasaModel} from "./tsubasa-model";

/**
 * モデルの初期値を生成する
 *
 * @return モデルの初期値
 */
export function createInitialValue(): TsubasaModel {
  return {
    opacity: 0,
    scale: 1,
    tracking: {
      x: 0,
      y: 0
    }
  };
}