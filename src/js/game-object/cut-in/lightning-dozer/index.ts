import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { LightningDozerCutIn } from "./lightning-dozer-cutin";
import { EnemyLightningDozerCutInView } from "./view/enemy-lightning-dozer-cutin-view";
import { PlayerLightningDozerCutInView } from "./view/player-lightning-dozer-cutin-view";

/** ライトニングドーザ カットイン生成パラメータ */
export type GenerateLightningDozerCutInParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー ライトニングドーザ カットイン
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerLightningDozerCutIn(
  params: GenerateLightningDozerCutInParams,
): LightningDozerCutIn {
  const { resources } = params;
  const view = new PlayerLightningDozerCutInView(resources);
  return new LightningDozerCutIn({ ...params, view });
}

/**
 * 敵 ライトニングドーザ カットイン
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyLightningiDozerCutIn(
  params: GenerateLightningDozerCutInParams,
): LightningDozerCutIn {
  const { resources } = params;
  const view = new EnemyLightningDozerCutInView(resources);
  return new LightningDozerCutIn({ ...params, view });
}
