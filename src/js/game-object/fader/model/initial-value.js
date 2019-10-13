// @flow

import type {FaderModel} from "./fader-model";

/**
 * モデルの初期値を生成する
 *
 * @return モデルの初期値
 */
export function createInitialValue(): FaderModel {
  return {
    opacity: 0,
    width: 1,
    height: 1,
  };
}