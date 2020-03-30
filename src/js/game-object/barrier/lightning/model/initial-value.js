// @flow

import type {LightningBarrierModel} from "./lightning-barrier-model";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../armdozer/position";

/**
 * 初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): LightningBarrierModel {
  return {
    position: {
      x: 0,
      y: ARMDOZER_EFFECT_STANDARD_Y,
      z: 32
    }
  };
}