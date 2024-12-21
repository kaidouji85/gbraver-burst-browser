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
    standard: {
      colorStrength: 1,
    },
    outline: {
      opacity: 0,
    },
  };
}
