// @flow

import {ContinuousAttackIndicator} from "./continuous-attack-indicator";
import type {Resources} from "../../resource";
import {PlayerContinuousAttackView} from "./view/player-continuous-attack-view";
import {EnemyContinuousAttackView} from "./view/enemy-continuous-attack-view";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

/**
 * プレイヤー側 連続攻撃
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerContinuousAttack(resources: Resources, listener: Stream<GameObjectAction>): ContinuousAttackIndicator {
  const view = new PlayerContinuousAttackView(resources);
  return new ContinuousAttackIndicator(view, resources, listener);
}

/**
 * 敵側 連続攻撃
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyContinuousAttack(resources: Resources, listener: Stream<GameObjectAction>): ContinuousAttackIndicator {
  const view = new EnemyContinuousAttackView(resources);
  return new ContinuousAttackIndicator(view, resources, listener);
}