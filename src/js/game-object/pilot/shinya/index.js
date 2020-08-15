// @flow

import {Shinya} from "./shinya";
import type {Resources} from "../../../resource";
import {PlayerShinyaView} from "./view/player-shinya-view";
import {EnemyShinyaView} from "./view/enemy-shinya-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

/**
 * プレイヤー側 シンヤ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return シンヤ カットイン
 */
export function playerShinya(resources: Resources, listener: Observable<GameObjectAction>): Shinya {
  const view = new PlayerShinyaView(resources);
  return new Shinya(view, listener);
}

/**
 * 敵側 シンヤ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return シンヤ カットイン
 */
export function enemyShinya(resources: Resources, listener: Observable<GameObjectAction>): Shinya {
  const view = new EnemyShinyaView(resources);
  return new Shinya(view, listener);
}
