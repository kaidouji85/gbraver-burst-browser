import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { EnemyWingDozerCutInView } from "./view/enemy-wing-dozer-cutin-view";
import { PlayerWingDozerCutInView } from "./view/player-wing-dozer-cutin-view";
import { WingDozerCutIn } from "./wing-dozer-cutin";

/** 生成パラメータ */
export type WingDozerCutInCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ウィングドーザ カットイン
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerWingDozerCutIn(
  params: WingDozerCutInCreatorParams,
): WingDozerCutIn {
  const { resources } = params;
  const view = new PlayerWingDozerCutInView(resources);
  return new WingDozerCutIn({ ...params, view });
}

/**
 * 敵側 ウィングドーザ カットイン
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyWingDozerCutIn(
  params: WingDozerCutInCreatorParams,
): WingDozerCutIn {
  const { resources } = params;
  const view = new EnemyWingDozerCutInView(resources);
  return new WingDozerCutIn({ ...params, view });
}
