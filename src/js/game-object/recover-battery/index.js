// @flow

import {RecoverBattery} from "./recover-battery";
import type {Resources} from "../../resource";
import {PlayerRecoverBatteryView} from "./view/player-recover-battery-view";
import {EnemyRecoverBatteryView} from "./view/enemy-recover-battery-view";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

/**
 * プレイヤー側 バッテリー回復
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バッテリー回復
 */
export function playerRecoverBattery(resources: Resources, gameObjectAction: Stream<GameObjectAction>): RecoverBattery {
  const view = new PlayerRecoverBatteryView(resources);
  return new RecoverBattery({
    resources: resources,
    gameObjectAction: gameObjectAction,
    view: view
  });
}

/**
 * 敵側 バッテリー回復
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バッテリー回復
 */
export function enemyRecoverBattery(resources: Resources, gameObjectAction: Stream<GameObjectAction>): RecoverBattery {
  const view = new EnemyRecoverBatteryView(resources);
  return new RecoverBattery({
    resources: resources,
    gameObjectAction: gameObjectAction,
    view: view
  });
}