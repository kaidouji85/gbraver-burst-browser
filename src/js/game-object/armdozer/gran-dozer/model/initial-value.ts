import {
  ARMDOZER_SPRITE_STANDARD_X,
  ARMDOZER_SPRITE_STANDARD_Y,
  ARMDOZER_SPRITE_STANDARD_Z,
} from "../../position";
import { GranDozerModel } from "./gran-dozer-model";

/**
 * グランドーザモデルの初期値を生成する
 * @returns 生成結果
 */
export function createInitialValue(): GranDozerModel {
  return {
    animation: {
      type: "STAND",
      frame: 0,
    },
    position: {
      x: ARMDOZER_SPRITE_STANDARD_X,
      y: ARMDOZER_SPRITE_STANDARD_Y,
      z: ARMDOZER_SPRITE_STANDARD_Z,
    },
    standard: {
      colorStrength: 1,
    },
    outline: {
      opacity: 0,
    },
  };
}
