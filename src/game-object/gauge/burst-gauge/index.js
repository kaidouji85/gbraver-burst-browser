// @flow

import {BurstGauge} from "./burst-gauge";
import type {Resources} from "../../../resource";
import {PlayerBurstGaugeView} from "./view/player-burst-gauge-view";

/** プレイヤーのバーストゲージ */
export function PlayerBurstGauge(resources: Resources, isActive: boolean): BurstGauge {
  return new BurstGauge({
    isActive,
    view: new PlayerBurstGaugeView(resources)
  })
}