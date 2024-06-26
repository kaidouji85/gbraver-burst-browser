import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { NeoLandozerCutIn } from "./neo-landozer-cutin";
import { EnemyNeoLandozerCutInView } from "./view/enemy-neo-landozer-cutin-view";
import { PlayerNeoLandozerCutInView } from "./view/player-neo-landozer-cutin-view";

/** 生成パラメータ */
export type NeoLandozerCutInCreatorParams = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ネオランドーザ カットイン
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerNeoLandozerCutIn(
  params: NeoLandozerCutInCreatorParams,
): NeoLandozerCutIn {
  const { resources } = params;
  const view = new PlayerNeoLandozerCutInView(resources);
  return new NeoLandozerCutIn({ ...params, view });
}

/**
 * 敵側 ネオランドーザ カットイン
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyNeoLandozerCutIn(
  params: NeoLandozerCutInCreatorParams,
): NeoLandozerCutIn {
  const { resources } = params;
  const view = new EnemyNeoLandozerCutInView(resources);
  return new NeoLandozerCutIn({ ...params, view });
}
