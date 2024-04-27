import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { LightningDozerCutIn } from "./lightning-dozer-cutin";
import { EnemyLightningDozerCutInView } from "./view/enemy-lightning-dozer-cutin-view";
import { PlayerLightningDozerCutInView } from "./view/player-lightning-dozer-cutin-view";

/** ライトニングドーザ カットイン生成パラメータ */
export type LightningDozerCutInCreatorParams = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー ライトニングドーザ カットイン
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerLightningDozerCutIn(
  params: LightningDozerCutInCreatorParams,
): LightningDozerCutIn {
  const { resources } = params;
  const view = new PlayerLightningDozerCutInView(resources);
  return new LightningDozerCutIn({ ...params, view });
}

/**
 * 敵 ライトニングドーザ カットイン
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyLightningDozerCutIn(
  params: LightningDozerCutInCreatorParams,
): LightningDozerCutIn {
  const { resources } = params;
  const view = new EnemyLightningDozerCutInView(resources);
  return new LightningDozerCutIn({ ...params, view });
}
