// @flow

import {ShinyaCutIn} from "./shinya";
import type {Resources} from "../../../resource";
import {PlayerShinyaView} from "./view/player-shinya-view";
import {EnemyShinyaView} from "./view/enemy-shinya-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側 シンヤ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return シンヤ カットイン
 */
export function playerShinyaCutIn(resources: Resources, listener: Stream<GameObjectAction>): ShinyaCutIn {
  const view = new PlayerShinyaView(resources);
  return new ShinyaCutIn(view, resources, listener);
}

/**
 * 敵側 シンヤ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return シンヤ カットイン
 */
export function enemyShinyaCutIn(resources: Resources, listener: Stream<GameObjectAction>): ShinyaCutIn {
  const view = new EnemyShinyaView(resources);
  return new ShinyaCutIn(view, resources, listener);
}
