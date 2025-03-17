import { ResourcesContainer } from "../../../resource";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { GranDozerCutIn } from "./gran-dozer-cut-in";
import { EnemyGranDozerCutInView } from "./view/enemy-gran-dozer-cut-in-view";
import { PlayerGranDozerCutInView } from "./view/player-gran-dozer-cut-in-view";

/** グランドーザ カットイン生成パラメータ */
export type GranDozerCutInCreatorParams = ResourcesContainer &
  GameObjectActionContainer;

/**
 * プレイヤー グランドーザ カットイン を生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerGranDozerCutIn(
  params: GranDozerCutInCreatorParams,
): GranDozerCutIn {
  const { resources } = params;
  const view = new PlayerGranDozerCutInView(resources);
  return new GranDozerCutIn({ ...params, view });
}

/**
 * 敵 グランドーザ カットイン を生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyGranDozerCutIn(
  params: GranDozerCutInCreatorParams,
): GranDozerCutIn {
  const { resources } = params;
  const view = new EnemyGranDozerCutInView(resources);
  return new GranDozerCutIn({ ...params, view });
}
