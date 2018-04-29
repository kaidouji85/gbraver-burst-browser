// @flow

import type {Resources} from "../../../../resource/index";
import {PlayerBatteryGauge} from "../../../../game-object/gauge/battery-gauge";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";
import type {Player} from "gbraver-burst-core/lib/player/player";

/**
 * ゲームの状態からプレイヤーバッテリーゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲーム状態
 */
export function createPlayerBatteryGauge(resources: Resources, playerInfo: Player): BatteryGauge {
  return PlayerBatteryGauge(resources, playerInfo.armdozer.maxBattery, playerInfo.armdozer.maxBattery);
}