// @flow

import type {Resources} from "../../../../resource/index";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";
import {EnemyBatteryGauge} from "../../../../game-object/gauge/battery-gauge";
import type {Player} from "gbraver-burst-core/lib/player/player";

/**
 * ゲームの状態から敵バッテリーゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @returns 敵バッテリーゲージ
 */
export function createEnemyBatteryGauge(resources: Resources, enemyInfo: Player): BatteryGauge {
  return EnemyBatteryGauge(resources, enemyInfo.armdozer.maxBattery, enemyInfo.armdozer.maxBattery);
}