import type { Resources } from "../../resource";
import type { Stream } from "../../stream/stream";
import type { GameObjectAction } from "../action/game-object-action";
import { DamageIndicator } from "./damage-indicator";
import { EnemyDamageIndicatorView } from "./view/enemy-damage-indicator-view";
import { PlayerDamageIndicatorView } from "./view/player-damage-indicator-view";

/**
 * プレイヤーのダメージインジケータ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ダメージインジケータ
 */
export function playerDamageIndicator(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>
): DamageIndicator {
  const view = new PlayerDamageIndicatorView(resources);
  return new DamageIndicator(view, gameObjectAction);
}

/**
 * 敵のダメージインジケータ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ダメージインジケータ
 */
export function enemyDamageIndicator(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>
): DamageIndicator {
  const view = new EnemyDamageIndicatorView(resources);
  return new DamageIndicator(view, gameObjectAction);
}
