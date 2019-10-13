// @flow

import type {FaderModel} from "./fader-model";

/**
 * モデルの初期値を生成する
 *
 * @return モデルの初期値
 */
export function createInitialValue(): FaderModel {
  return {
    opacity: 0
  };
}