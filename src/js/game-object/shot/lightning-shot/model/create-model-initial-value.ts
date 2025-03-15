import { LightningShotModel } from "./lightning-shot-model";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
} from "../../../armdozer/position";

/**
 * 電撃ショットのモデルの初期値を生成する
 * @returns 電撃ショットのモデルの初期値
 */
export function createModelInitialValue(): LightningShotModel {
  return {
    position: { x: ARMDOZER_EFFECT_STANDARD_X, y: ARMDOZER_EFFECT_STANDARD_Y },
    animation: { frame: 0 },
    opacity: 0,
  };
}
