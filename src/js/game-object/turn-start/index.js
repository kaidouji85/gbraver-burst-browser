// @flow

import {TurnStart} from "./turn-start";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import {PlayerTurnStartView} from "./view/player-turn-start-view";
import {EnemyTurnStartView} from "./view/enemy-turn-start-view";

/**
 * プレイヤー側ターンスタート
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナー
 * @return 生成結果
 */
export function playerTurnStart(resources: Resources, listener: Observable<GameObjectAction>): TurnStart {
  const view = new PlayerTurnStartView(resources);
  return new TurnStart(view, listener);
}

/**
 * 敵側ターンスタート
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナー
 * @return 生成結果
 */
export function enemyTurnStart(resources: Resources, listener: Observable<GameObjectAction>): TurnStart {
  const view = new EnemyTurnStartView(resources);
  return new TurnStart(view, listener);
}