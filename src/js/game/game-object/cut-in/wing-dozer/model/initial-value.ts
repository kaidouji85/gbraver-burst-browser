import type { WingDozerCutInModel } from "./wing-dozer-cutin-model";

/**
 * モデルの初期値を生成する
 *
 * @returns 生成結果
 */
export function createInitialValue(): WingDozerCutInModel {
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
