// @flow

import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import {PlayerReflectView} from "./view/player-reflect-view";
import {EnemyReflectView} from "./view/enemy-reflect-view";
import {ReflectIndicator} from './reflectIndicator';

/**
 * プレイヤー ダメージ反射
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerReflectIndicator(resources: Resources, listener: Observable<GameObjectAction>): ReflectIndicator {
  const view = new PlayerReflectView(resources);
  return new ReflectIndicator(view, resources, listener);
}

/**
 * 敵 ダメージ反射
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyReflectIndicator(resources: Resources, listener: Observable<GameObjectAction>): ReflectIndicator {
  const view = new EnemyReflectView(resources);
  return new ReflectIndicator(view, resources, listener);
}