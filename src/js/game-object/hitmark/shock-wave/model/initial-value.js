// @flow

import type {ShockWaveModel} from "./shock-wave-model";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_SPRITE_STANDARD_Z
} from "../../../armdozer/position";

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
    }
  };
}