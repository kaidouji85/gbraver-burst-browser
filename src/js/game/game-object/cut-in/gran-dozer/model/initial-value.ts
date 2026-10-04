import { GranDozerCutInModel } from "./gran-dozer-cut-in-model";

/**
 * モデルの初期化を生成する
 * @returns 生成結果
 */
export function createInitialValue(): GranDozerCutInModel {
  return {
    animation: {
      type: "BURST_UP",
      frame: 0,
    },
    tracking: {
      x: 0,
      y: 0,
    },
    opacity: 0,
    scale: 1,
  };
}
