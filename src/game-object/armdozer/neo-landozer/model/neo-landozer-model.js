// @flow

import type {AnimationType} from "./animation-type";

/** ネオランドーザのモデル */
export interface NeoLandozerModel {
  position: {
    x: number,
    y: number,
    z: number
  },
  animation: {
    type: AnimationType,
    frame: number,
  }
}