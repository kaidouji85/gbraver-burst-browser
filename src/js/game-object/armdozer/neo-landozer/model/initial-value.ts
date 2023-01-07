import { ARMDOZER_SPRITE_STANDARD_X, ARMDOZER_SPRITE_STANDARD_Y, ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import type { NeoLandozerModel } from "./neo-landozer-model";

/**
 * モデルの初期値を生成する
 * @return 生成結果
 */
export function createInitialValue(): NeoLandozerModel {
  return {
    position: {
      x: ARMDOZER_SPRITE_STANDARD_X,
      y: ARMDOZER_SPRITE_STANDARD_Y,
      z: ARMDOZER_SPRITE_STANDARD_Z
    },
    animation: {
      type: "STAND",
      frame: 0
    },
    active: {
      strength: 0,
      opacity: 0
    }
  };
}