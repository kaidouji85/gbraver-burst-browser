import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { ShinBraverCutIn } from "./shin-braver-cutin";
import { EnemyShinBraverCutInView } from "./view/enemy-shin-braver-cutin-view";
import { PlayerShinBraverCutInView } from "./view/player-shin-braver-cutin-view";

/** 生成パラメータ */
export type ShinBraverCutInCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 シンブレイバー カットイン
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerShinBraverCutIn(
  params: ShinBraverCutInCreatorParams,
): ShinBraverCutIn {
  const { resources } = params;
  const view = new PlayerShinBraverCutInView(resources);
  return new ShinBraverCutIn({ ...params, view });
}

/**
 * 敵側 シンブレイバー カットイン
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyShinBraverCutIn(
  params: ShinBraverCutInCreatorParams,
): ShinBraverCutIn {
  const { resources } = params;
  const view = new EnemyShinBraverCutInView(resources);
  return new ShinBraverCutIn({ ...params, view });
}
