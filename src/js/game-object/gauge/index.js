// @flow

import {Gauge} from "./gauge";
import type {Resources} from "../../resource";
import {PlayerGaugeView} from "./view/player-gauge-view";
import {EnemyGaugeView} from "./view/enemy-gauge-view";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

type Param = {
  resources: Resources,
  listener: Stream<GameObjectAction>,
  hp: number,
  battery: number
};

/** プレイヤーゲージを生成する */
export function playerGauge(param: Param): Gauge {
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
export function enemyGauge(param: Param): Gauge {
  const view = new EnemyGaugeView(param.resources);
  return new Gauge({
    view: view,
    listener: param.listener,
    resources: param.resources,
    hp: param.hp,
    battery: param.battery
  });
}