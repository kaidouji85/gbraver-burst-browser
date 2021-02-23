// @flow

import type {Resources} from "../../../resource";
import {ShinBraver} from './shin-braver';
import {PlayerShinBraverView} from "./view/player-shin-braver-view";
import {EnemyShinBraverView} from "./view/enemy-shin-braver-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

/**
 * プレイヤー側シンブレイバー
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return シンブレイバー
 */
export function PlayerShinBraver(resources: Resources, listener: Observable<GameObjectAction>): ShinBraver {
  const view = new PlayerShinBraverView(resources);
  return new ShinBraver(view, resources, listener);
}

/**
 * 敵側シンブレイバー
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return シンブレイバー
 */
export function EnemyShinBraver(resources: Resources, listener: Observable<GameObjectAction>): ShinBraver {
  const view = new EnemyShinBraverView(resources);
  return new ShinBraver(view, resources, listener);
}