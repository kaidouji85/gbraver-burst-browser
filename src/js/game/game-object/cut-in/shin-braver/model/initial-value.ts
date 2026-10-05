import type { ShinBraverCutInModel } from "./shin-braver-cutin-model";

/**
 * モデルの初期値を生成する
 *
 * @returns 生成した初期値
 */
export function createInitialValue(): ShinBraverCutInModel {
  return {
    animation: {
      type: "CUT_IN_DOWN",
      frame: 1,
    },
    tracking: {
      x: 0,
      y: 0,
    },
    opacity: 0,
    scale: 1,
  };
}
