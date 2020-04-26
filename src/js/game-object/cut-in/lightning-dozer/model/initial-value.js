// @flow

import type {LightningDozeCutInModel} from "./lightning-doze-cutin-model";

/**
 * モデルの初期値を生成する
 *
 * @return 生成した初期値
 */
export function createInitialValue(): LightningDozeCutInModel {
  return {
    animation: {
      type: 'CUT_IN_DOWN',
      frame: 1,
    },
    tracking: {
      x: 0,
      y: 0,
    },
    opacity: 1,
    scale: 1,
  };
}