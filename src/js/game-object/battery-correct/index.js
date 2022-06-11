// @flow

import type {Resources} from "../../resource";
import type {Stream} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import {BatteryCorrect} from "./battery-correct";
import {EnemyBatteryCorrectView} from "./view/enemy-battery-correct-view";
import {PlayerBatteryCorrectView} from "./view/player-battery-correct-view";

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