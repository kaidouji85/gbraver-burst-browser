// @flow

import {Gauge} from "./gauge";
import type {Resources} from "../../resource";
import {PlayerGaugeView} from "./view/player-gauge-view";
import {EnemyGaugeView} from "./view/enemy-gauge-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>,
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