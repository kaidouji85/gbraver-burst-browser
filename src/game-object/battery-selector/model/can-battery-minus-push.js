// @flow

import type {BatterySelectorModel} from "./index";
import {MIN_BATTERY} from "./index";

/**
 * バッテリーマイナスボタンが押下可能か否かを判定する
 *
 * @param model 判定対象のモデル
 * @return 判定結果、trueで操作可能
 */
export function canBatteryMinusPush(model: BatterySelectorModel): boolean {
  return model.battery <= MIN_BATTERY;
}