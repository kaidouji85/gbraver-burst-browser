// @flow

import type {TurnStartModel} from "./turn-start-model";

/**
 * モデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): TurnStartModel {
  return {
    opacity: 0,
    scale: 1,
  };
}