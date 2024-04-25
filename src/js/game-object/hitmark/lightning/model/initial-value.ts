import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../armdozer/position";
import type { LightningModel } from "./lightning-model";

/**
 * 電撃ヒットマークモデルの初期値を生成する
 *
 * @returns 生成結果
 */
export function createInitialValue(): LightningModel {
  return {
    position: {
      x: ARMDOZER_EFFECT_STANDARD_X,
      y: ARMDOZER_EFFECT_STANDARD_Y,
      z: ARMDOZER_EFFECT_STANDARD_Z,
    },
    animation: {
      frame: 0,
    },
    opacity: 0,
  };
}
