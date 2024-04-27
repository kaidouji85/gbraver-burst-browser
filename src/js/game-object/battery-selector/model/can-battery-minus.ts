import type { BatterySelectorModel } from "./index";
import { MIN_BATTERY } from "./index";

/**
 * バッテリーメーター1できるか否かを判定する
 *
 * @param model 判定対象のモデル
 * @returns 判定結果、trueで-1できる
 */
export function canBatteryMinus(model: BatterySelectorModel): boolean {
  return MIN_BATTERY < model.battery;
}
