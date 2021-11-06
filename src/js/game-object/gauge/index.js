// @flow

import {Gauge} from "./gauge";
import type {Resources} from "../../resource";
import {PlayerGaugeView} from "./view/player-gauge-view";
import {EnemyGaugeView} from "./view/enemy-gauge-view";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

/** ゲージのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** 最大HP */
  hp: number,
  /** 最大バッテリー */
  battery: number
};

/**
 * プレイヤーゲージを生成する
 *
 * @param param パラメータ
 * @return ゲージ
 */
export function playerGauge(param: Param): Gauge {
  const view = new PlayerGaugeView(param.resources);
  return new Gauge({
    view: view,
    resources: param.resources,
    gameObjectAction: param.gameObjectAction,
    hp: param.hp,
    battery: param.battery
  });
}

/**
 * 敵ゲージを生成する
 *
 * @param param パラメータ
 * @return ゲージ
 */
export function enemyGauge(param: Param): Gauge {
  const view = new EnemyGaugeView(param.resources);
  return new Gauge({
    view: view,
    gameObjectAction: param.gameObjectAction,
    resources: param.resources,
    hp: param.hp,
    battery: param.battery
  });
}