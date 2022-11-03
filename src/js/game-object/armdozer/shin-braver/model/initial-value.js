// @flow

import {
  ARMDOZER_SPRITE_STANDARD_X,
  ARMDOZER_SPRITE_STANDARD_Y,
  ARMDOZER_SPRITE_STANDARD_Z,
} from "../../position";
import type { ShinBraverModel } from "./shin-braver-model";

export function createInitialValue(): ShinBraverModel {
  return {
    position: {
      x: ARMDOZER_SPRITE_STANDARD_X,
      y: ARMDOZER_SPRITE_STANDARD_Y,
      z: ARMDOZER_SPRITE_STANDARD_Z,
    },
    animation: {
      type: "STAND",
      frame: 0,
    },
  };
}
