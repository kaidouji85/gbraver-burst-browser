// @flow
import type {SparkModel} from "./spark-model";

/** 火花ヒットマークモデルの初期値を生成 */
export function createInitialValue(): SparkModel {
  return {
    position: {
      x: 150,
      y: 150,
      z: 410,
    },
    animation: {
      frame: 0,
    },
    opacity: 0
  };
}