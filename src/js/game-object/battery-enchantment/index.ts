import { Observable } from "rxjs";

import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { BatteryEnchantment } from "./battery-enchantment";
import { EnemyBatteryEnchantmentView } from "./view/enemy-battery-enchantment-view";
import { PlayerBatteryEnchantmentView } from "./view/player-battery-enchantment-view";

/** 生成パラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー バッテリー増強 ポップアップ
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerBatteryEnchantment(params: Params): BatteryEnchantment {
  const { resources } = params;
  const view = new PlayerBatteryEnchantmentView(resources);
  return new BatteryEnchantment({ ...params, view });
}

/**
 * 敵 バッテリー増強 ポップアップ
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyBatteryEnchantment(params: Params): BatteryEnchantment {
  const { resources } = params;
  const view = new EnemyBatteryEnchantmentView(resources);
  return new BatteryEnchantment({ ...params, view });
}
