// @flow

import {WingDozer} from "./wing-dozer";
import type {Resources} from "../../../resource";
import {PlayerWingDozerView} from "./view/player-wing-dozer-view";
import {EnemyWingDozerView} from "./view/enemy-wing-dozer-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側 ウィングドーザを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function PlayerWingDozer(resources: Resources, gameObjectAction: Stream<GameObjectAction>): WingDozer {
  const view = new PlayerWingDozerView(resources);
  return new WingDozer(view, resources, gameObjectAction);
}

/**
 * 敵側 ウィングドーザを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function EnemyWingDozer(resources: Resources, gameObjectAction: Stream<GameObjectAction>): WingDozer {
  const view = new EnemyWingDozerView(resources);
  return new WingDozer(view, resources, gameObjectAction);
}
