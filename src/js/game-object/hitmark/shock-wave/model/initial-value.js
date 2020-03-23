// @flow

import * as R from 'ramda';
import type {ShockWaveModel} from "./shock-wave-model";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_SPRITE_STANDARD_Z
} from "../../../armdozer/position";
import {MAX_PARTICLE} from "../max-particle";

/**
 * 衝撃波モデルの初期値を生成する
 *
 * @param maxLines 軌跡の最大値
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
      rotate: 2 * v * Math.PI / MAX_PARTICLE.LINES,
      scale: 1
    }), MAX_PARTICLE.LINES)
  };
}