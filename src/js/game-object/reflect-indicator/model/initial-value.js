// @flow

import type {ReflectIndocatorModel} from "./reflect-indocator-model";

/**
 * モデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): ReflectIndocatorModel {
  return {
    opacity: 0,
    scale: 1,
  };
}