// @flow

import {Gauge} from "./gauge";
import type {Resources} from "../../resource";
import {PlayerGaugeView} from "./view/player-gauge-view";
import {EnemyGaugeView} from "./view/enemy-gauge-view";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable} from "rxjs";

type Param  = {
  resources: Resources,
  listener: Observable<GameLoop>,
  hp: number,
  battery: number
};

/** プレイヤーゲージを生成する */
export function PlayerGauge(param: Param): Gauge {
  const view = new PlayerGaugeView(param.resources);
  return new Gauge({
    view: view,
    resources: param.resources,
    listener: param.listener,
    hp: param.hp,
    battery: param.battery
  });
}

/** 敵ゲージを生成する */
export function EnemyGauge(param: Param): Gauge {
  const view = new EnemyGaugeView(param.resources);
  return new Gauge({
    view: view,
    listener: param.listener,
    resources: param.resources,
    hp: param.hp,
    battery: param.battery
  });
}