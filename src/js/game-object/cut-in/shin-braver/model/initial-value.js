// @flow

import type {ShinBraverCutInModel} from "./shin-braver-cutin-model";
import {HUD_CUT_IN_ZNIDEX} from "../../../../zindex/hud-zindex";

/**
 * モデルの初期値を生成する
 *
 * @return 生成した初期値
 */
export function createInitialValue(): ShinBraverCutInModel {
  return {
    position: {
      x: 0,
      y: 0,
      z: HUD_CUT_IN_ZNIDEX
    },
    animation: {
      type: 'BurstCharge',
      frame: 0
    },
    opacity: 0,
    scale: 1,
  };
}