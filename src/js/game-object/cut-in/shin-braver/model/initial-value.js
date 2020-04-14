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
    animation: {
      type: 'CUT_IN_UP',
      frame: 0
    },
    tracking: {
      x: 0,
      y: 0
    },
    opacity: 0,
    scale: 1,
  };
}