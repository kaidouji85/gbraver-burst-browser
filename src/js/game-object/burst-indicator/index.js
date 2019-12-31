//@flow

import {BurstIndicator} from "./burst-indicator";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import {PlayerBurstIndicatorView} from "./view/player-burst-indicator-view";
import {EnemyBurstIndicatorView} from "./view/enemy-burst-indicator-view";

/**
 * プレイヤーバーストインジケータ
 *
 * @param resources リソース管理オブジェクト
 * @param listener ストリーム
 * @return 生成結果
 */
export function playerBurstIndicator(resources: Resources, listener: Observable<GameObjectAction>): BurstIndicator {
  const view = new PlayerBurstIndicatorView(resources);
  const ret = new BurstIndicator(view, listener);
  return ret;
}

/**
 * 敵バーストインジケータ
 *
 * @param resources リソース管理オブジェクト
 * @param listener ストリーム
 * @return 生成結果
 */
export function enemyBurstIndicator(resources: Resources, listener: Observable<GameObjectAction>): BurstIndicator {
  const view = new EnemyBurstIndicatorView(resources);
  const ret = new BurstIndicator(view, listener);
  return ret;
}