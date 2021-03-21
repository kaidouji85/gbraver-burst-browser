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
 * @param listener イベントリスナ
 * @return ライト カットイン
 */
export function playerRaitoCutIn(resources: Resources, listener: Stream<GameObjectAction>): RaitoCutIn {
  const view = new PlayerRaitoView(resources);
  return new RaitoCutIn(view, resources, listener);
}

/**
 * 敵側 ライト カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return ライト カットイン
 */
export function enemyRaitoCutIn(resources: Resources, listener: Stream<GameObjectAction>): RaitoCutIn {
  const view = new EnemyRaitoView(resources);
  return new RaitoCutIn(view, resources, listener);
}
