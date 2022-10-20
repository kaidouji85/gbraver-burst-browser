// @flow

import { ARMDOZER_EFFECT_STANDARD_Y } from "../../../armdozer/position";
import type { LightningBarrierModel } from "./lightning-barrier-model";

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
      z: 1,
    },
    opacity: 0,
    scale: 1,
    animation: {
      frame: 0,
    },
  };
}
