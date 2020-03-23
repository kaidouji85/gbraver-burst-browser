// @flow

import * as R from 'ramda';
import type {ShockWaveModel} from "./shock-wave-model";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_SPRITE_STANDARD_Z
} from "../../../armdozer/position";

export const MAX_LINES = 32;

/**
 * 衝撃波モデルの初期値を生成する
 *
 * @return 生成した初期値
 */
export function initialValue(): ShockWaveModel {
  return {
    position: {
      x: ARMDOZER_EFFECT_STANDARD_X,
      y: ARMDOZER_EFFECT_STANDARD_Y,
      z: ARMDOZER_SPRITE_STANDARD_Z,
    },
    ring: {
      scale: 1,
      opacity: 0
    },
    lines: R.times(v => ({
      distance: 0,
      opacity: 0,
      rotate: 2 * v * Math.PI / MAX_LINES,
      scale: 1,
      maxScale: 1 + 3 * Math.random()
    }), MAX_LINES)
  };
}