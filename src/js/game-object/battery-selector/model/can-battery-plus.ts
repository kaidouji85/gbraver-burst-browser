import type { BatterySelectorModel } from "./index";

/**
 * バッテリーメーター+1できるか否かを判定する
 *
 * @param model 判定対象モデル
 * @returns 半手結果、trueで+1できる
 */
export function canBatteryPlus(model: BatterySelectorModel): boolean {
  return model.battery < Math.min(model.maxBattery, model.enableMaxBattery);
}
