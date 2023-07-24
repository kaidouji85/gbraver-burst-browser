import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { EnemyYuuyaView } from "./view/enemy-yuuya-view";
import { PlayerYuuyaView } from "./view/player-yuuya-view";
import { YuuyaCutIn } from "./yuuya";

/**
 * プレイヤー側 ユウヤ カットイン
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ユウヤ カットイン
 */
export function playerYuuyaCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): YuuyaCutIn {
  const view = new PlayerYuuyaView(resources);
  return new YuuyaCutIn(view, resources, gameObjectAction);
}

/**
 * 敵側 ユウヤ カットイン
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ユウヤ カットイン
 */
export function enemyYuuyaCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): YuuyaCutIn {
  const view = new EnemyYuuyaView(resources);
  return new YuuyaCutIn(view, resources, gameObjectAction);
}
