import { Observable } from "rxjs";

import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { DamageHalved } from "./damage-halved";
import { EnemyDamageHalvedView } from "./view/enemy-damage-halved-view";
import { PlayerDamageHalvedView } from "./view/player-damage-halved-view";

/**
 * プレイヤー ダメージ半減 ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerDamageHalved(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): DamageHalved {
  const view = new PlayerDamageHalvedView(resources);
  return new DamageHalved(view, resources, gameObjectAction);
}

/**
 * 敵 ダメージ半減 ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyDamageHalved(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): DamageHalved {
  const view = new EnemyDamageHalvedView(resources);
  return new DamageHalved(view, resources, gameObjectAction);
}
