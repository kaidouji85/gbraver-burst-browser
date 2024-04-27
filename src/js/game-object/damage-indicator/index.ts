import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { DamageIndicator } from "./damage-indicator";
import { EnemyDamageIndicatorView } from "./view/enemy-damage-indicator-view";
import { PlayerDamageIndicatorView } from "./view/player-damage-indicator-view";

/** 生成パラメータ */
export type DamageIndicatorCreatprParams = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤーのダメージインジケータ
 * @param params 生成パラメータ
 * @returns ダメージインジケータ
 */
export function playerDamageIndicator(
  params: DamageIndicatorCreatprParams,
): DamageIndicator {
  const { resources } = params;
  const view = new PlayerDamageIndicatorView(resources);
  return new DamageIndicator({ ...params, view });
}

/**
 * 敵のダメージインジケータ
 * @param params 生成パラメータ
 * @returns ダメージインジケータ
 */
export function enemyDamageIndicator(
  params: DamageIndicatorCreatprParams,
): DamageIndicator {
  const { resources } = params;
  const view = new EnemyDamageIndicatorView(resources);
  return new DamageIndicator({ ...params, view });
}
