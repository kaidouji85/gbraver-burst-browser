import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { Lightning } from "./lightning";
import { EnemyLightningView } from "./view/enemy-lightning-view";
import { PlayerLightningView } from "./view/player-lightning-view";

/** 電撃ヒットマーク生成パラメータ */
export type GenerateLightningParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 電撃ヒットマーク
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerLightning(params: GenerateLightningParams): Lightning {
  const { resources } = params;
  const view = new PlayerLightningView(resources);
  return new Lightning({ ...params, view });
}

/**
 * 敵側 電撃ヒットマーク
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyLightning(params: GenerateLightningParams): Lightning {
  const { resources } = params;
  const view = new EnemyLightningView(resources);
  return new Lightning({ ...params, view });
}
