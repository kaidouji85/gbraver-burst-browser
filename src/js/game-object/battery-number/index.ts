import { Observable } from "rxjs";

import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { BatteryNumber } from "./battery-number";
import { EnemyBatteryNumberView } from "./view/enemy-battery-number-view";
import { PlayerBatteryNumberView } from "./view/player-battery-number-view";

/** 生成パラメータ */
export type BatteryNumberCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤーのバッテリービュー
 * @param params 生成パラメータ
 * @return バッテリービュー
 */
export function playerBatteryNumber(
  params: BatteryNumberCreatorParams,
): BatteryNumber {
  const { resources } = params;
  const view = new PlayerBatteryNumberView(resources);
  return new BatteryNumber({ ...params, view });
}

/**
 * 敵のバッテリービュー
 * @param params 生成パラメータ
 * @return バッテリービュー
 */
export function enemyBatteryNumber(
  params: BatteryNumberCreatorParams,
): BatteryNumber {
  const { resources } = params;
  const view = new EnemyBatteryNumberView(resources);
  return new BatteryNumber({ ...params, view });
}
