// @flow

import type {Resources} from "../../../resource/resource-manager";
import {PlayerBatteryGaugeView} from "./view/player-battery-gauge";
import {BatteryGauge} from "./base";

/** プレイヤーバッテリーゲージを生成する */
export function createPlayerBatteryGauge(resources: Resources, battery: number, maxBattery: number): BatteryGauge {
  const view = new PlayerBatteryGaugeView(resources);
  const gauge = new BatteryGauge({view, battery, maxBattery});
  return gauge;
}
