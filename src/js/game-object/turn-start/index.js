// @flow

import type {Resources} from "../../resource";
import {PlayerTurnStartView} from "./view/player-turn-start-view";
import {EnemyTurnStartView} from "./view/enemy-turn-start-view";
import {TurnStart} from "./turn-start";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

/**
 * プレイヤーターン スタート
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerTurnStart(resources: Resources, gameObjectAction: Stream<GameObjectAction>): TurnStart {
  const view = new PlayerTurnStartView(resources);
  return new TurnStart(view, resources, gameObjectAction);
}

/**
 * 相手ターン スタート
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyTurnStart(resources: Resources, gameObjectAction: Stream<GameObjectAction>): TurnStart {
  const view = new EnemyTurnStartView(resources);
  return new TurnStart(view, resources, gameObjectAction);
}