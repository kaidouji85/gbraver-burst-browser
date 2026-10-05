import type { BatteryEnhancementModel } from "./battery-enhancement-model";

/**
 * モデルの初期値を生成する
 *
 * @returns 初期値
 */
export function createInitialValue(): BatteryEnhancementModel {
  return {
    opacity: 0,
    scale: 1,
  };
}
