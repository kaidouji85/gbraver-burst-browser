// @flow

import type {Resources} from "../../../resource";
import {ShockWave} from "./shock-wave";
import {PlayerShockWaveView} from "./view/player-shock-wave-view";
import {EnemyShockWaveView} from "./view/enemy-shock-wave-view";
import {initialValue} from "./model/initial-value";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤーの衝撃波を生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 衝撃波
 */
export function playerShockWave(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ShockWave {
  const model = initialValue();
  const view = new PlayerShockWaveView(resources, model);
  return new ShockWave(view, model, resources, gameObjectAction);
}

/**
 * 敵の衝撃波を生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 衝撃波
 */
export function enemyShockWave(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ShockWave {
  const model = initialValue();
  const view = new EnemyShockWaveView(resources, model);
  return new ShockWave(view, model, resources, gameObjectAction);
}