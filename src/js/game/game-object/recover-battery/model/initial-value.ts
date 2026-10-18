import type { RecoverBatteryModel } from "./recover-battery-model";

/**
 * バッテリー回復モデル 初期値を生成する
 *
 * @returns 生成結果
 */
export function createInitialValue(): RecoverBatteryModel {
  return {
    value: 3,
    opacity: 0,
    scale: 1,
  };
}
