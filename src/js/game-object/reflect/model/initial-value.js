// @flow

import type {ReflectModel} from "./reflect-model";

/**
 * モデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): ReflectModel {
  return {
    opacity: 0,
    scale: 1,
  };
}