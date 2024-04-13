import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { NeoLandozerCutIn } from "./neo-landozer-cutin";
import { EnemyNeoLandozerCutInView } from "./view/enemy-neo-landozer-cutin-view";
import { PlayerNeoLandozerCutInView } from "./view/player-neo-landozer-cutin-view";

/** 生成パラメータ */
export type GenerateNeoLandozerCutInParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ネオランドーザ カットイン
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerNeoLandozerCutIn(
  params: GenerateNeoLandozerCutInParams,
): NeoLandozerCutIn {
  const { resources } = params;
  const view = new PlayerNeoLandozerCutInView(resources);
  return new NeoLandozerCutIn({ ...params, view });
}

/**
 * 敵側 ネオランドーザ カットイン
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyNeoLandozerCutIn(
  params: GenerateNeoLandozerCutInParams,
): NeoLandozerCutIn {
  const { resources } = params;
  const view = new EnemyNeoLandozerCutInView(resources);
  return new NeoLandozerCutIn({ ...params, view });
}
