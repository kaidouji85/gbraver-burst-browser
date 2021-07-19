// @flow

import {BatteryCorrect} from "./battery-correct";
import type {Resources} from "../../resource";
import {PlayerBatteryCorrectView} from "./view/player-battery-correct-view";
import {EnemyBatteryCorrectView} from "./view/enemy-battery-correct-view";

/**
 * プレイヤー側 バッテリー補正
 *
 * @param resources リソースか管理オブジェクト
 * @return バッテリー補正
 */
export function playerBatteryCorrect(resources: Resources): BatteryCorrect {
  const view = new PlayerBatteryCorrectView(resources);
  return new BatteryCorrect(view);
}

/**
 * 敵側 バッテリー補正
 *
 * @param resources リソースか管理オブジェクト
 * @return バッテリー補正
 */
export function enemyBatteryCorrect(resources: Resources): BatteryCorrect {
  const view = new EnemyBatteryCorrectView(resources);
  return new BatteryCorrect(view);
}