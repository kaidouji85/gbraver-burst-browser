// @flow

import type {PopUpModel} from "./pop-up-model";

/**
 * モデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): PopUpModel {
  return {
    opacity: 0,
    scale: 1,
  };
}