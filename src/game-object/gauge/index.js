// @flow

import {Gauge} from "./gauge";
import type {Resources} from "../../resource";
import {PlayerGaugeView} from "./view/player-gauge-view";

/** プレイヤーゲージを生成する */
export function PlayerGauge(resources: Resources): Gauge {
  const view = new PlayerGaugeView(resources);
  return new Gauge({
    view: view,
    resources: resources
  });
}