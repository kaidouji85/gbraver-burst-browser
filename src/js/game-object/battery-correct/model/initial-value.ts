import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
} from "../../armdozer/position";
import type { BatteryCorrectModel } from "./battery-correct-model";

/**
 * モデルの初期値を生成する
 *
 * @returns 生成結果
 */
export function initialValue(): BatteryCorrectModel {
  return {
    correctValue: 0,
    opacity: 0,
    scale: 1,
    position: {
      x: ARMDOZER_EFFECT_STANDARD_X,
      y: ARMDOZER_EFFECT_STANDARD_Y,
    },
  };
}
