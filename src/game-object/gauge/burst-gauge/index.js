// @flow

import {BurstGauge} from "./burst-gauge";
import type {Resources} from "../../../resource";
import {PlayerBurstGaugeView} from "./view/player-burst-gauge-view";
import {EnemyBurstGaugeView} from "./view/enemy-burst-gauge-view";
import {getGaugeScale} from "../../../device-scale/gauge-scale";

/** プレイヤーのバーストゲージ */
export function PlayerBurstGauge(resources: Resources, isActive: boolean): BurstGauge {
  return new BurstGauge({
    isActive,
    view: new PlayerBurstGaugeView(resources, getGaugeScale())
  })
}

/** 敵バーストゲージ */
export function EnemyBurstGauge(resources: Resources, isActive: boolean): BurstGauge {
  return new BurstGauge({
    isActive,
    view: new EnemyBurstGaugeView(resources, getGaugeScale())
  })
}