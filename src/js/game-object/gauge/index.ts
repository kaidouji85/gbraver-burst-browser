import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { Gauge } from "./gauge";
import { EnemyGaugeView } from "./view/enemy-gauge-view";
import { PlayerGaugeView } from "./view/player-gauge-view";

/** ゲージのパラメータ */
type Param = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
  /** 最大HP */
  hp: number;
  /** 最大バッテリー */
  battery: number;
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
    gameObjectAction: param.gameObjectAction,
    hp: param.hp,
    battery: param.battery,
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
    hp: param.hp,
    battery: param.battery,
  });
}
