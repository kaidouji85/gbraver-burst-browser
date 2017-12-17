// @flow

import type {Resources} from "../../../resource/resource-manager";
import {PlayerBatteryGaugeView} from "./view/player-battery-gauge";
import {BatteryGauge} from "./base";
import {EnemyBatteryGaugeView} from "./view/enemy-battery-gauge";

/** プレイヤーバッテリーゲージを生成する */
export function PlayerBatteryGauge(resources: Resources, battery: number, maxBattery: number): BatteryGauge {
  const view = new PlayerBatteryGaugeView(resources);
  const gauge = new BatteryGauge({view, battery, maxBattery});
  return gauge;
}

/** 敵バッテリーゲージを生成する */
export function EnemyBatteryGauge(resources: Resources, battery: number, maxBattery: number): BatteryGauge {
  const view = new EnemyBatteryGaugeView(resources);
  const gauge = new BatteryGauge({view, battery, maxBattery});
  return gauge;
}