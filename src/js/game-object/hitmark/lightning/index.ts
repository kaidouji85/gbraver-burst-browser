import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { Lightning } from "./lightning";
import { EnemyLightningView } from "./view/enemy-lightning-view";
import { PlayerLightningView } from "./view/player-lightning-view";

/** 電撃ヒットマーク生成パラメータ */
export type LightningCreatorParams = ResourcesContainer & SEPlayerContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 電撃ヒットマーク
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerLightning(params: LightningCreatorParams): Lightning {
  const { resources } = params;
  const view = new PlayerLightningView(resources);
  return new Lightning({ ...params, view });
}

/**
 * 敵側 電撃ヒットマーク
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyLightning(params: LightningCreatorParams): Lightning {
  const { resources } = params;
  const view = new EnemyLightningView(resources);
  return new Lightning({ ...params, view });
}
