// @flow

import type {Resources} from "../../resource";
import {PlayerReflectIndicatorView} from "./view/player-reflect-indicator-view";
import {EnemyReflectIndicatorView} from "./view/enemy-reflect-indicator-view";
import {ReflectIndicator} from './reflect-indicator';
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

/**
 * プレイヤー ダメージ反射
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerReflectIndicator(resources: Resources, listener: Stream<GameObjectAction>): ReflectIndicator {
  const view = new PlayerReflectIndicatorView(resources);
  return new ReflectIndicator(view, listener);
}

/**
 * 敵 ダメージ反射
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyReflectIndicator(resources: Resources, listener: Stream<GameObjectAction>): ReflectIndicator {
  const view = new EnemyReflectIndicatorView(resources);
  return new ReflectIndicator(view, listener);
}