import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import type { GameObjectAction } from "../action/game-object-action";
import { RecoverBattery } from "./recover-battery";
import { EnemyRecoverBatteryView } from "./view/enemy-recover-battery-view";
import { PlayerRecoverBatteryView } from "./view/player-recover-battery-view";

/** 生成パラメータ */
export type RecoverBatteryCreatorParams = ResourcesContainer & SEPlayerContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 バッテリー回復
 * @param params 生成パラメータ
 * @return バッテリー回復
 */
export function playerRecoverBattery(
  params: RecoverBatteryCreatorParams,
): RecoverBattery {
  const { resources } = params;
  const view = new PlayerRecoverBatteryView(resources);
  return new RecoverBattery({ ...params, view });
}

/**
 * 敵側 バッテリー回復
 * @param params 生成パラメータ
 * @return バッテリー回復
 */
export function enemyRecoverBattery(
  params: RecoverBatteryCreatorParams,
): RecoverBattery {
  const { resources } = params;
  const view = new EnemyRecoverBatteryView(resources);
  return new RecoverBattery({ ...params, view });
}
