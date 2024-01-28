import { ActiveArmdozerPointerModel } from "./active-armdozer-pointer-model";

/**
 * モデルの初期値を生成する
 * @return 生成結果
 */
export function createInitialValue(): ActiveArmdozerPointerModel {
  return {
    opacity: 0,
    position: {
      x: 0,
      y: 0,
    },
  };
}
