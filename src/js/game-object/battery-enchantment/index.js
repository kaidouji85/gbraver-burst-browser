// @flow

import type {Resources} from "../../resource";
import {PlayerBatteryEnchantmentView} from "./view/player-battery-enchantment-view";
import {EnemyBatteryEnchantmentView} from "./view/enemy-battery-enchantment-view";
import {BatteryEnchantment} from "./battery-enchantment";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

/**
 * プレイヤー バッテリー増強 ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerBatteryEnchantment(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BatteryEnchantment {
  const view = new PlayerBatteryEnchantmentView(resources);
  return new BatteryEnchantment(view, resources, gameObjectAction);
}

/**
 * 敵 バッテリー増強 ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyBatteryEnchantment(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BatteryEnchantment {
  const view = new EnemyBatteryEnchantmentView(resources);
  return new BatteryEnchantment(view, resources, gameObjectAction);
}