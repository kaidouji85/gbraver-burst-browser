import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { TsubasaCutIn } from "./tsubasa";
import { EnemyTsubasaView } from "./view/enemy-tsubasa-view";
import { PlayerTsubasaView } from "./view/player-tsubasa-view";

/** 生成パラメータ */
export type GenerateTsubasaCutInParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ツバサ カットイン
 * @param params 生成パラメータ
 * @return ツバサ カットイン
 */
export function playerTsubasaCutIn(
  params: GenerateTsubasaCutInParams,
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
  params: GenerateTsubasaCutInParams,
): TsubasaCutIn {
  const { resources } = params;
  const view = new EnemyTsubasaView(resources);
  return new TsubasaCutIn({ ...params, view });
}
