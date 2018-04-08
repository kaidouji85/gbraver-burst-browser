// @flow

import type {Resources} from "../../../resource/index";
import {PlayerBatteryGaugeView} from "./view/player-battery-gauge-view";
import {BatteryGauge} from "./battery-gauge";
import {EnemyBatteryGaugeView} from "./view/enemy-battery-gauge-view";
import {getGaugeScale} from "../../../device-scale/gauge-scale";

/** プレイヤーバッテリーゲージを生成する */
export function PlayerBatteryGauge(resources: Resources, battery: number, maxBattery: number): BatteryGauge {
  const view = new PlayerBatteryGaugeView(resources, getGaugeScale());
  const gauge = new BatteryGauge({view, battery, maxBattery});
  return gauge;
}

/** 敵バッテリーゲージを生成する */
export function EnemyBatteryGauge(resources: Resources, battery: number, maxBattery: number): BatteryGauge {
  const view = new EnemyBatteryGaugeView(resources, getGaugeScale());
  const gauge = new BatteryGauge({view, battery, maxBattery});
  return gauge;
}