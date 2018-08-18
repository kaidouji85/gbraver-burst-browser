// @flow

import {Gauge} from "./gauge";
import type {Resources} from "../../resource";
import {PlayerGaugeView} from "./view/player-gauge-view";
import {EnemyGaugeView} from "./view/enemy-gauge-view";

/** プレイヤーゲージを生成する */
export function PlayerGauge(resources: Resources): Gauge {
  const view = new PlayerGaugeView(resources);
  return new Gauge({
    view: view,
    resources: resources
  });
}

/** 敵ゲージを生成する */
export function EnemyGauge(resources: Resources): Gauge {
  const view = new EnemyGaugeView(resources);
  return new Gauge({
    view: view,
    resources: resources
  });
}