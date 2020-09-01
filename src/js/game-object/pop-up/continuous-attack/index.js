// @flow

import {PopUp} from "../pop-up/pop-up";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {PlayerContinuousAttackView} from "./view/player-continuous-attack-view";
import {EnemyContinuousAttackView} from "./view/enemy-continuous-attack-view";

/**
 * プレイヤー側 連続攻撃
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerContinuousAttack(resources: Resources, listener: Observable<GameObjectAction>): PopUp {
  const view = new PlayerContinuousAttackView(resources);
  return new PopUp(view, resources, listener);
}

/**
 * 敵側 連続攻撃
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyContinuousAttack(resources: Resources, listener: Observable<GameObjectAction>): PopUp {
  const view = new EnemyContinuousAttackView(resources);
  return new PopUp(view, resources, listener);
}