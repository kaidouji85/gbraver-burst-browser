// @flow
import type {SparkModel} from "./spark-model";

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
    opacity: 1
  };
}