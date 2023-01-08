import type { Battle3DCameraModel } from "./model";

/** 初期値を生成する */
export function createInitialValue(): Battle3DCameraModel {
  return {
    position: {
      x: 0,
      y: 220,
      z: 300,
    },
    target: {
      x: 0,
      y: 200,
      z: 0,
    },
  };
}
