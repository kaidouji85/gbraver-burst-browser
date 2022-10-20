// @flow

import type { ContinuousAttackModel } from "./continuous-attack-model";

/**
 * モデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): ContinuousAttackModel {
  return {
    opacity: 0,
    scale: 1,
  };
}
