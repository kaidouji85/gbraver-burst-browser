// @flow

import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import {PlayerTurnStartView} from "./view/player-turn-start-view";
import {EnemyTurnStartView} from "./view/enemy-turn-start-view";
import {TurnStart} from "./turn-start";
import type {GameObjectAction} from "../action/game-object-action";

/**
 * プレイヤーターン スタート
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerTurnStart(resources: Resources, listener: Observable<GameObjectAction>): TurnStart {
  const view = new PlayerTurnStartView(resources);
  return new TurnStart(view, resources, listener);
}

/**
 * 相手ターン スタート
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyTurnStart(resources: Resources, listener: Observable<GameObjectAction>): TurnStart {
  const view = new EnemyTurnStartView(resources);
  return new TurnStart(view, resources, listener);
}