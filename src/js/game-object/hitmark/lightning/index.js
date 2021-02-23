// @flow

import {Lightning} from "./lightning";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import {PlayerLightningView} from "./view/player-lightning-view";
import {EnemyLightningView} from "./view/enemy-lightning-view";
import type {GameObjectAction} from "../../action/game-object-action";

/**
 * プレイヤー側 電撃ヒットマーク
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerLightning(resources: Resources, listener: Observable<GameObjectAction>): Lightning {
  const view = new PlayerLightningView(resources);
  return new Lightning(view, resources, listener);
}

/**
 * 敵側 電撃ヒットマーク
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyLightning(resources: Resources, listener: Observable<GameObjectAction>): Lightning {
  const view = new EnemyLightningView(resources);
  return new Lightning(view, resources, listener);
}