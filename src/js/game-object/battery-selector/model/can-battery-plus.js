// @flow

import type {BatterySelectorModel} from "./index";
import {MAX_BATTERY} from "./index";

/**
 * バッテリーメーター+1できるか否かを判定する
 *
 * @param model 判定対象モデル
 * @return 半手結果、trueで+1できる
 */
export function canBatteryPlus(model: BatterySelectorModel): boolean {
  return model.battery < Math.min(MAX_BATTERY, model.enableMaxBattery);
}