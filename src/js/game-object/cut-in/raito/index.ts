import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { RaitoCutIn } from "./raito";
import { EnemyRaitoView } from "./view/enemy-raito-view";
import { PlayerRaitoView } from "./view/player-raito-view";

/**
 * プレイヤー側 ライト カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ライト カットイン
 */
export function playerRaitoCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): RaitoCutIn {
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
export function enemyRaitoCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): RaitoCutIn {
  const view = new EnemyRaitoView(resources);
  return new RaitoCutIn(view, resources, gameObjectAction);
}
