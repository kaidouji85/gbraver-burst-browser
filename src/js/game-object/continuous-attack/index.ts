import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import type { GameObjectAction } from "../action/game-object-action";
import { ContinuousAttackIndicator } from "./continuous-attack-indicator";
import { EnemyContinuousAttackView } from "./view/enemy-continuous-attack-view";
import { PlayerContinuousAttackView } from "./view/player-continuous-attack-view";

/** 連続攻撃生成パラメータ */
export type ContinuousAttackCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * プレイヤー側 連続攻撃
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerContinuousAttack(
  params: ContinuousAttackCreatorParams,
): ContinuousAttackIndicator {
  const { resources } = params;
  const view = new PlayerContinuousAttackView(resources);
  return new ContinuousAttackIndicator({ ...params, view });
}

/**
 * 敵側 連続攻撃
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyContinuousAttack(
  params: ContinuousAttackCreatorParams,
): ContinuousAttackIndicator {
  const { resources } = params;
  const view = new EnemyContinuousAttackView(resources);
  return new ContinuousAttackIndicator({ ...params, view });
}
