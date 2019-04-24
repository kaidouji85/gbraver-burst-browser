// @flow

import type {NeoLandozerModel} from "./neo-landozer-model";

/** モデルの初期値を生成する */
export function createInitialValue(): NeoLandozerModel {
  return {
    position: {
      x: 150,
      y: 0,
      z: 0
    },
    animation: {
      type: 'STAND',
      frame: 0
    }
  }
}