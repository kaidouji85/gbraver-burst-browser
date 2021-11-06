// @flow

import {BatteryNumber} from "./battery-number";
import type {Resources} from "../../resource";
import {PlayerBatteryNumberView} from "./view/player-battery-number-view";
import {EnemyBatteryNumberView} from "./view/enemy-battery-number-view";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

/**
 * プレイヤーのバッテリービュー
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バッテリービュー
 */
export function playerBatteryNumber(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BatteryNumber {
  const view = new PlayerBatteryNumberView(resources);
  return new BatteryNumber(view, gameObjectAction);
}

/**
 * 敵のバッテリービュー
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バッテリービュー
 */
export function enemyBatteryNumber(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BatteryNumber {
  const view = new EnemyBatteryNumberView(resources);
  return new BatteryNumber(view, gameObjectAction);
}