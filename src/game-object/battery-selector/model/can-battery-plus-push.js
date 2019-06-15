// @flow

import type {BatterySelectorModel} from "./index";
import {MAX_BATTERY} from "./index";

/**
 * バッテリープラスボタンが操作可能か否かを判定する
 *
 * @param model 判定対象モデル
 * @return 半手結果、trueで操作可能
 */
export function canBatteryPlusPush(model: BatterySelectorModel): boolean {
  return Math.min(MAX_BATTERY, model.enableMaxBattery) <= model.battery;
}