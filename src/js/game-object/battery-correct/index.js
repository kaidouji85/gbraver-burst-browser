// @flow

import {BatteryCorrect} from "./battery-correct";
import type {Resources} from "../../resource";

/**
 * プレイヤー側 バッテリー補正
 *
 * @param resources リソースか管理オブジェクト
 * @return バッテリー補正
 */
export function playerBatteryCorrect(resources: Resources): BatteryCorrect {
  return new BatteryCorrect(resources);
}

/**
 * 敵側 バッテリー補正
 *
 * @param resources リソースか管理オブジェクト
 * @return バッテリー補正
 */
export function enemyBatteryCorrect(resources: Resources): BatteryCorrect {
  return new BatteryCorrect(resources);
}