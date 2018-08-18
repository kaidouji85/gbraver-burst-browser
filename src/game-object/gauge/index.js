// @flow

import {Gauge} from "./gauge";
import type {Resources} from "../../resource";
import {PlayerGaugeView} from "./view/player-gauge-view";
import {EnemyGaugeView} from "./view/enemy-gauge-view";

type Param  = {
  resources: Resources,
  hp: number,
  battery: number
};

/** プレイヤーゲージを生成する */
export function PlayerGauge(param: Param): Gauge {
  const view = new PlayerGaugeView(param.resources);
  return new Gauge({
    view: view,
    resources: param.resources,
    hp: param.hp,
    battery: param.battery
  });
}

/** 敵ゲージを生成する */
export function EnemyGauge(param: Param): Gauge {
  const view = new EnemyGaugeView(param.resources);
  return new Gauge({
    view: view,
    resources: param.resources,
    hp: param.hp,
    battery: param.battery
  });
}