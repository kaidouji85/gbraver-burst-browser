// @flow

import type { PowerUpModel } from "./power-up-model";

/**
 * モデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): PowerUpModel {
  return {
    opacity: 0,
    scale: 1,
  };
}
