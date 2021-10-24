// @flow

import {RaitoCutIn} from "./raito";
import type {Resources} from "../../../resource";
import {PlayerRaitoView} from "./view/player-raito-view";
import {EnemyRaitoView} from "./view/enemy-raito-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側 ライト カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ライト カットイン
 */
export function playerRaitoCutIn(resources: Resources, gameObjectAction: Stream<GameObjectAction>): RaitoCutIn {
  const view = new PlayerRaitoView(resources);
  return new RaitoCutIn(view, resources, gameObjectAction);
}

/**
 * 敵側 ライト カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ライト カットイン
 */
export function enemyRaitoCutIn(resources: Resources, gameObjectAction: Stream<GameObjectAction>): RaitoCutIn {
  const view = new EnemyRaitoView(resources);
  return new RaitoCutIn(view, resources, gameObjectAction);
}
