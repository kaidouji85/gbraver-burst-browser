// @flow

import type {Battle3DCameraModel} from "./model";

/** 初期値を生成する */
export function createInitialValue(): Battle3DCameraModel {
  return {
    position: {
      x: 0,
      y: 230,
      z: 400
    },
    target: {
      x: 0,
      y: 200,
      z: 0
    }
  };
}