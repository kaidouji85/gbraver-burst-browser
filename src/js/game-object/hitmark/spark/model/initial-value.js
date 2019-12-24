// @flow
import type {SparkModel} from "./spark-model";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../armdozer/position";

/** 火花ヒットマークモデルの初期値を生成 */
export function createInitialValue(): SparkModel {
  return {
    position: {
      x: ARMDOZER_EFFECT_STANDARD_X,
      y: ARMDOZER_EFFECT_STANDARD_Y,
      z: ARMDOZER_EFFECT_STANDARD_Z + 10,
    },
    animation: {
      frame: 0,
    },
    opacity: 0
  };
}