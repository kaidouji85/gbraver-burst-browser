import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { ShinyaCutIn } from "./shinya";
import { EnemyShinyaView } from "./view/enemy-shinya-view";
import { PlayerShinyaView } from "./view/player-shinya-view";

/** 生成パラメータ */
export type ShinyaCutInCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * プレイヤー側 シンヤ カットイン
 * @param params 生成パラメータ
 * @return シンヤ カットイン
 */
export function playerShinyaCutIn(
  params: ShinyaCutInCreatorParams,
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
  params: ShinyaCutInCreatorParams,
): ShinyaCutIn {
  const { resources } = params;
  const view = new EnemyShinyaView(resources);
  return new ShinyaCutIn({ ...params, view });
}
