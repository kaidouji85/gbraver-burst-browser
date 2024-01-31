import {
  ARMDOZER_SPRITE_STANDARD_X,
  ARMDOZER_SPRITE_STANDARD_Y,
  ARMDOZER_SPRITE_STANDARD_Z,
} from "../../position";
import type { GenesisBraverModel } from "./genesis-braver-model";

/**
 * ジェネシスブレイバーモデル初期値生成
 * @return 生成結果
 */
export function createInitialValue(): GenesisBraverModel {
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
