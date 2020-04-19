// @flow

import {PopUp} from "../../pop-up/pop-up";
import type {Resources} from "../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../action/game-object-action";
import {PlayerTurnStartView} from "./player-turn-start-view";
import {EnemyTurnStartView} from "./enemy-turn-start-view";

/**
 * プレイヤーターン スタート
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerTurnStart(resources: Resources, listener: Observable<GameObjectAction>): PopUp {
  const view = new PlayerTurnStartView(resources);
  return new PopUp(view, listener);
}

/**
 * 相手ターン スタート
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyTurnStart(resources: Resources, listener: Observable<GameObjectAction>): PopUp {
  const view = new EnemyTurnStartView(resources);
  return new PopUp(view, listener);
}