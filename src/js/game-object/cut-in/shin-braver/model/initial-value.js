// @flow

import type {ShinBraverCutInModel} from "./shin-braver-cutin-model";

/**
 * モデルの初期値を生成する
 *
 * @return 生成した初期値
 */
export function createInitialValue(): ShinBraverCutInModel {
  return {
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    animation: {
      type: 'BurstCharge',
      frame: 0
    },
    opacity: 0,
    scale: 1,
  };
}