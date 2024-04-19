import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import type { GameObjectAction } from "../action/game-object-action";
import { BatteryEnchantment } from "./battery-enchantment";
import { EnemyBatteryEnchantmentView } from "./view/enemy-battery-enchantment-view";
import { PlayerBatteryEnchantmentView } from "./view/player-battery-enchantment-view";

/** 生成パラメータ */
export type BatteryEnchantmentCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * プレイヤー バッテリー増強 ポップアップ
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerBatteryEnchantment(
  params: BatteryEnchantmentCreatorParams,
): BatteryEnchantment {
  const { resources } = params;
  const view = new PlayerBatteryEnchantmentView(resources);
  return new BatteryEnchantment({ ...params, view });
}

/**
 * 敵 バッテリー増強 ポップアップ
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyBatteryEnchantment(
  params: BatteryEnchantmentCreatorParams,
): BatteryEnchantment {
  const { resources } = params;
  const view = new EnemyBatteryEnchantmentView(resources);
  return new BatteryEnchantment({ ...params, view });
}
