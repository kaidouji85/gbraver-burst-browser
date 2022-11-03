// @flow

import type { Resources } from "../../../resource";
import type { Stream } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import { TsubasaCutIn } from "./tsubasa";
import { EnemyTsubasaView } from "./view/enemy-tsubasa-view";
import { PlayerTsubasaView } from "./view/player-tsubasa-view";

/**
 * プレイヤー側 ツバサ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ツバサ カットイン
 */
export function playerTsubasaCutIn(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>
): TsubasaCutIn {
  const view = new PlayerTsubasaView(resources);
  return new TsubasaCutIn(view, resources, gameObjectAction);
}

/**
 * 敵側 ツバサ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ツバサ カットイン
 */
export function enemyTsubasaCutIn(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>
): TsubasaCutIn {
  const view = new EnemyTsubasaView(resources);
  return new TsubasaCutIn(view, resources, gameObjectAction);
}
