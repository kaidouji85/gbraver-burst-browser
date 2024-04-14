import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { ShinyaCutIn } from "./shinya";
import { EnemyShinyaView } from "./view/enemy-shinya-view";
import { PlayerShinyaView } from "./view/player-shinya-view";

/** 生成パラメータ */
export type GenerateShinyaCutInParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 シンヤ カットイン
 * @param params 生成パラメータ
 * @return シンヤ カットイン
 */
export function playerShinyaCutIn(
  params: GenerateShinyaCutInParams,
): ShinyaCutIn {
  const { resources } = params;
  const view = new PlayerShinyaView(resources);
  return new ShinyaCutIn({ ...params, view });
}

/**
 * 敵側 シンヤ カットイン
 * @param params 生成パラメータ
 * @return シンヤ カットイン
 */
export function enemyShinyaCutIn(
  params: GenerateShinyaCutInParams,
): ShinyaCutIn {
  const { resources } = params;
  const view = new EnemyShinyaView(resources);
  return new ShinyaCutIn({ ...params, view });
}
