// @flow

import type {Resources} from "../../resource";
import {DamageIndicator} from "./damage-indicator";
import {PlayerDamageIndicatorView} from "./view/player-damage-indicator-view";
import {EnemyDamageIndicatorView} from "./view/enemy-damage-indicator-view";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

/**
 * プレイヤーのダメージインジケータ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ダメージインジケータ
 */
export function playerDamageIndicator(resources: Resources, gameObjectAction: Stream<GameObjectAction>): DamageIndicator {
  const view = new PlayerDamageIndicatorView(resources);
  return new DamageIndicator(view , gameObjectAction);
}

/**
 * 敵のダメージインジケータ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ダメージインジケータ
 */
export function enemyDamageIndicator(resources: Resources, gameObjectAction: Stream<GameObjectAction>): DamageIndicator {
  const view = new EnemyDamageIndicatorView(resources);
  return new DamageIndicator(view, gameObjectAction);
}
