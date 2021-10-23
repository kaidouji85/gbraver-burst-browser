// @flow

import type {Resources} from "../../../resource";
import {ShinBraver} from './shin-braver';
import {PlayerShinBraverView} from "./view/player-shin-braver-view";
import {EnemyShinBraverView} from "./view/enemy-shin-braver-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側シンブレイバー
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return シンブレイバー
 */
export function PlayerShinBraver(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ShinBraver {
  const view = new PlayerShinBraverView(resources);
  return new ShinBraver(view, resources, gameObjectAction);
}

/**
 * 敵側シンブレイバー
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return シンブレイバー
 */
export function EnemyShinBraver(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ShinBraver {
  const view = new EnemyShinBraverView(resources);
  return new ShinBraver(view, resources, gameObjectAction);
}