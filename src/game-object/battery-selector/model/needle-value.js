// @flow

import {MAX_BATTERY} from "./index";

/**
 * メーター針の値を計算する
 *
 * @param battery 現在のバッテリー
 * @return メーター針の値
 */
export function getNeedleValue(battery: number): number {
  return battery / MAX_BATTERY;
}