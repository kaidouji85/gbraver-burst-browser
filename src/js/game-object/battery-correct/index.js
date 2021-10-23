// @flow

import {BatteryCorrect} from "./battery-correct";
import type {Resources} from "../../resource";
import {PlayerBatteryCorrectView} from "./view/player-battery-correct-view";
import {EnemyBatteryCorrectView} from "./view/enemy-battery-correct-view";
import type {Stream} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";

/**
 * プレイヤー側 バッテリー補正
 *
 * @param resources リソースか管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バッテリー補正
 */
export function playerBatteryCorrect(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BatteryCorrect {
  const view = new PlayerBatteryCorrectView(resources);
  return new BatteryCorrect(view, gameObjectAction);
}

/**
 * 敵側 バッテリー補正
 *
 * @param resources リソースか管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バッテリー補正
 */
export function enemyBatteryCorrect(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BatteryCorrect {
  const view = new EnemyBatteryCorrectView(resources);
  return new BatteryCorrect(view, gameObjectAction);
}