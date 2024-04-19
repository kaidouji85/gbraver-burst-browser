import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { BatteryCorrect } from "./battery-correct";
import { EnemyBatteryCorrectView } from "./view/enemy-battery-correct-view";
import { PlayerBatteryCorrectView } from "./view/player-battery-correct-view";

/** 生成パラメータ */
export type BatteryCorrectCreatorParams = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 バッテリー補正
 * @param params パラメータ
 * @return バッテリー補正
 */
export function playerBatteryCorrect(
  params: BatteryCorrectCreatorParams,
): BatteryCorrect {
  const { resources } = params;
  const view = new PlayerBatteryCorrectView(resources);
  return new BatteryCorrect({ ...params, view });
}

/**
 * 敵側 バッテリー補正
 * @param params パラメータ
 * @return バッテリー補正
 */
export function enemyBatteryCorrect(
  params: BatteryCorrectCreatorParams,
): BatteryCorrect {
  const { resources } = params;
  const view = new EnemyBatteryCorrectView(resources);
  return new BatteryCorrect({ ...params, view });
}
