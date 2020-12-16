// @flow

import type {DamageDecreaseModel} from "./damage-decrease-model";

/**
 * モデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): DamageDecreaseModel {
  return {
    opacity: 0,
    scale: 1,
  };
}