import type { BurstButtonModel } from "./burst-button-model";

/**
 * モデルの初期値を生成する
 * @return 生成結果
 */
export function createInitialValue(): BurstButtonModel {
  return {
    opacity: 0,
    isPushNotifierDisabled: true,
    scale: 1,
    canBurst: false,
    disabled: false,
  };
}
