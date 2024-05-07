import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import type { GameObjectAction } from "../action/game-object-action";
import { BatteryEnhancement } from "./battery-enhancement";
import { EnemyBatteryEnhancementView } from "./view/enemy-battery-enhancement-view";
import { PlayerBatteryEnhancementView } from "./view/player-battery-enhancement-view";

/** 生成パラメータ */
export type BatteryEnhancementCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * プレイヤー バッテリー増強 ポップアップ
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerBatteryEnhancement(
  params: BatteryEnhancementCreatorParams,
): BatteryEnhancement {
  const { resources } = params;
  const view = new PlayerBatteryEnhancementView(resources);
  return new BatteryEnhancement({ ...params, view });
}

/**
 * 敵 バッテリー増強 ポップアップ
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyBatteryEnhancement(
  params: BatteryEnhancementCreatorParams,
): BatteryEnhancement {
  const { resources } = params;
  const view = new EnemyBatteryEnhancementView(resources);
  return new BatteryEnhancement({ ...params, view });
}
