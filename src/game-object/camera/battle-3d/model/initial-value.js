// @flow

import type {Battle3DCameraModel} from "./model";

/** 初期値を生成する */
export function createInitialValue(): Battle3DCameraModel {
  return {
    position: {
      x: 0,
      y: 300,
      z: 800
    },
    target: {
      x: 0,
      y: 0,
      z: 0
    }
  };
}