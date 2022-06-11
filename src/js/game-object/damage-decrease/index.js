// @flow

import type {Resources} from "../../resource";
import type {Stream} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import {DamageDecrease} from "./damage-decrease";
import {EnemyDamageDecreaseView} from "./view/enemy-damage-decrease-view";
import {PlayerDamageDecreaseView} from "./view/player-damage-decrease-view";

/**
 * プレイヤー ダメージ減少 ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerDamageDecrease(resources: Resources, gameObjectAction: Stream<GameObjectAction>): DamageDecrease {
  const view = new PlayerDamageDecreaseView(resources);
  return new DamageDecrease(view, resources, gameObjectAction);
}

/**
 * 敵 ダメージ減少 ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyDamageDecrease(resources: Resources, gameObjectAction: Stream<GameObjectAction>): DamageDecrease {
  const view = new EnemyDamageDecreaseView(resources);
  return new DamageDecrease(view, resources, gameObjectAction);
}