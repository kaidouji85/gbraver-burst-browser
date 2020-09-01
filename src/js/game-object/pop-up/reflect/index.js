// @flow

import {PopUp} from "../pop-up/pop-up";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {PlayerReflectView} from "./view/player-reflect-view";
import {EnemyReflectView} from "./view/enemy-reflect-view";

/**
 * プレイヤー ダメージ反射
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerReflect(resources: Resources, listener: Observable<GameObjectAction>): PopUp {
  const view = new PlayerReflectView(resources);
  return new PopUp(view, resources, listener);
}

/**
 * 敵 ダメージ反射
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyReflect(resources: Resources, listener: Observable<GameObjectAction>): PopUp {
  const view = new EnemyReflectView(resources);
  return new PopUp(view, resources, listener);
}