// @flow

import type {BatterySelectorModel} from "./index";
import {MAX_BATTERY} from "./index";

/**
 * バッテリープラスボタンが操作可能か否かを判定する
 *
 * @param model 判定対象モデル
 * @return 半手結果、trueで操作可能
 */
export function isBatteryPlusDisabled(model: BatterySelectorModel): boolean {
  return MAX_BATTERY <= model.battery;
}