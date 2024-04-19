import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { TsubasaCutIn } from "./tsubasa";
import { EnemyTsubasaView } from "./view/enemy-tsubasa-view";
import { PlayerTsubasaView } from "./view/player-tsubasa-view";

/** 生成パラメータ */
export type TsubasaCutInCreatorParams = ResourcesContainer & SEPlayerContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ツバサ カットイン
 * @param params 生成パラメータ
 * @return ツバサ カットイン
 */
export function playerTsubasaCutIn(
  params: TsubasaCutInCreatorParams,
): TsubasaCutIn {
  const { resources } = params;
  const view = new PlayerTsubasaView(resources);
  return new TsubasaCutIn({ ...params, view });
}

/**
 * 敵側 ツバサ カットイン
 * @param params 生成パラメータ
 * @return ツバサ カットイン
 */
export function enemyTsubasaCutIn(
  params: TsubasaCutInCreatorParams,
): TsubasaCutIn {
  const { resources } = params;
  const view = new EnemyTsubasaView(resources);
  return new TsubasaCutIn({ ...params, view });
}
