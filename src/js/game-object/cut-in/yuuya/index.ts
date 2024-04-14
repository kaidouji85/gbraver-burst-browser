import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { EnemyYuuyaView } from "./view/enemy-yuuya-view";
import { PlayerYuuyaView } from "./view/player-yuuya-view";
import { YuuyaCutIn } from "./yuuya";

/** 生成パラメータ */
export type GenerateYuuyaCutInParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ユウヤ カットイン
 * @param params 生成パラメータ
 * @return ユウヤ カットイン
 */
export function playerYuuyaCutIn(params: GenerateYuuyaCutInParams): YuuyaCutIn {
  const { resources } = params;
  const view = new PlayerYuuyaView(resources);
  return new YuuyaCutIn({ ...params, view });
}

/**
 * 敵側 ユウヤ カットイン
 * @param params 生成パラメータ
 * @return ユウヤ カットイン
 */
export function enemyYuuyaCutIn(params: GenerateYuuyaCutInParams): YuuyaCutIn {
  const { resources } = params;
  const view = new EnemyYuuyaView(resources);
  return new YuuyaCutIn({ ...params, view });
}
