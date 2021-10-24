// @flow

import {Lightning} from "./lightning";
import type {Resources} from "../../../resource";
import {PlayerLightningView} from "./view/player-lightning-view";
import {EnemyLightningView} from "./view/enemy-lightning-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側 電撃ヒットマーク
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerLightning(resources: Resources, gameObjectAction: Stream<GameObjectAction>): Lightning {
  const view = new PlayerLightningView(resources);
  return new Lightning(view, resources, gameObjectAction);
}

/**
 * 敵側 電撃ヒットマーク
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyLightning(resources: Resources, gameObjectAction: Stream<GameObjectAction>): Lightning {
  const view = new EnemyLightningView(resources);
  return new Lightning(view, resources, gameObjectAction);
}