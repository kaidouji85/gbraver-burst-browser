import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { EnemyYuuyaView } from "./view/enemy-yuuya-view";
import { PlayerYuuyaView } from "./view/player-yuuya-view";
import { YuuyaCutIn } from "./yuuya";

/** 生成パラメータ */
export type YuuyaCutInCreatorParams = ResourcesContainer & {
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ユウヤ カットイン
 * @param params 生成パラメータ
 * @return ユウヤ カットイン
 */
export function playerYuuyaCutIn(params: YuuyaCutInCreatorParams): YuuyaCutIn {
  const { resources } = params;
  const view = new PlayerYuuyaView(resources);
  return new YuuyaCutIn({ ...params, view });
}

/**
 * 敵側 ユウヤ カットイン
 * @param params 生成パラメータ
 * @return ユウヤ カットイン
 */
export function enemyYuuyaCutIn(params: YuuyaCutInCreatorParams): YuuyaCutIn {
  const { resources } = params;
  const view = new EnemyYuuyaView(resources);
  return new YuuyaCutIn({ ...params, view });
}
