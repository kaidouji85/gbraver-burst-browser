// @flow

import {AttackerIndicator} from "./attacker-indicator";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import {PlayerAttackerIndicatorView} from "./view/player-attacker-indicator-view";
import {EnemyAttackerIndicatorView} from "./view/enemy-attacker-indicator-view";

/**
 * プレイヤー側のアタッカーインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナー
 * @return アタッカーインジケータ
 */
export function playerAttackerIndicator(resources: Resources, listener: Observable<GameObjectAction>): AttackerIndicator {
  const view = new PlayerAttackerIndicatorView(resources);
  return new AttackerIndicator(view, listener);
}

/**
 * 敵側のアタッカーインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナー
 * @return アタッカーインジケータ
 */
export function enemyAttackerIndicator(resources: Resources, listener: Observable<GameObjectAction>): AttackerIndicator {
  const view = new EnemyAttackerIndicatorView(resources);
  return new AttackerIndicator(view, listener);
}