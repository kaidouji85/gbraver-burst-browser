// @flow

import {ARMDOZER_SPRITE_STANDARD_X, ARMDOZER_SPRITE_STANDARD_Y, ARMDOZER_SPRITE_STANDARD_Z} from "../../position";
import type {LightningDozerModel} from "./lightning-dozer-model";

/**
 * ライトニングドーザモデルの初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): LightningDozerModel {
  return {
    position: {
      x: ARMDOZER_SPRITE_STANDARD_X,
      y: ARMDOZER_SPRITE_STANDARD_Y,
      z: ARMDOZER_SPRITE_STANDARD_Z,
    },
    animation: {
      type: 'STAND',
      frame: 0
    }
  };
}