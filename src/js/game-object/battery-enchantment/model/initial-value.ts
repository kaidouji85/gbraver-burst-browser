import type { BatteryEnchantmentModel } from "./battery-enchantment-model";

/**
 * モデルの初期値を生成する
 *
 * @returns 初期値
 */
export function createInitialValue(): BatteryEnchantmentModel {
  return {
    opacity: 0,
    scale: 1,
  };
}
