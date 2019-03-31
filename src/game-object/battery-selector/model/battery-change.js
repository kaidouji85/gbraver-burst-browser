// @flow

import type {BatterySelectorModel} from "./index";
import {MIN_BATTERY} from "./index";

/**
 * プラスボタンを押した際のバッテリー値を計算する
 *
 * @param model モデル
 * @return 計算結果
 */
export function plusBattery(model: BatterySelectorModel): number {
  return Math.min(model.battery + 1, model.enableMaxBattery);
}

/**
 * マイナスボタンを押した際のバッテリー値を計算する
 *
 * @param model モデル
 * @return 計算結果
 */
export function minusBattery(model: BatterySelectorModel): number {
  return Math.max(model.battery - 1, MIN_BATTERY);
}