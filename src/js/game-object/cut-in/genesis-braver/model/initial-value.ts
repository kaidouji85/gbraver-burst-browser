import { GenesisBraverCutInModel } from "./genesis-braver-cutin-model";

/**
 * モデルの初期化を生成する
 * @return 生成結果
 */
export function createInitialValue(): GenesisBraverCutInModel {
  return {
    animation: {
      type: "BURST_UP",
      frame: 0,
    },
    tracking: {
      x: 0,
      y: 0,
    },
    opacity: 1,
    scale: 1,
  };
}