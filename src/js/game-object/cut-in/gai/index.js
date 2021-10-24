// @flow

import {GaiCutIn} from "./gai";
import type {Resources} from "../../../resource";
import {PlayerGaiView} from "./view/player-gai-view";
import {EnemyGaiView} from "./view/enemy-gai-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側 ガイ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ガイ カットイン
 */
export function playerGaiCutIn(resources: Resources, gameObjectAction: Stream<GameObjectAction>): GaiCutIn {
  const view = new PlayerGaiView(resources);
  return new GaiCutIn(view, resources, gameObjectAction);
}

/**
 * 敵側 ガイ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ガイ カットイン
 */
export function enemyGaiCutIn(resources: Resources, gameObjectAction: Stream<GameObjectAction>): GaiCutIn {
  const view = new EnemyGaiView(resources);
  return new GaiCutIn(view, resources, gameObjectAction);
}
