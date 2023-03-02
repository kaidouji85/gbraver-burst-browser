import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { Lightning } from "./lightning";
import { EnemyLightningView } from "./view/enemy-lightning-view";
import { PlayerLightningView } from "./view/player-lightning-view";

/**
 * プレイヤー側 電撃ヒットマーク
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerLightning(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): Lightning {
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
export function enemyLightning(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): Lightning {
  const view = new EnemyLightningView(resources);
  return new Lightning(view, resources, gameObjectAction);
}
