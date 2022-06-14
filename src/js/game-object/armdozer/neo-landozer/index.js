// @flow

import type {Resources} from "../../../resource";
import type {Stream} from "../../../stream/stream";
import type {GameObjectAction} from "../../action/game-object-action";
import {NeoLandozer} from './neo-landozer';
import {EnemyNeoLandozerView} from "./view/enemy-neo-landozer-view";
import {PlayerNeoLandozerView} from "./view/player-neo-landozer-view";

/**
 * プレイヤー側ネオランドーザ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ネオランドーザ
 */
export function PlayerNeoLandozer(resources: Resources, gameObjectAction: Stream<GameObjectAction>): NeoLandozer {
  const view = new PlayerNeoLandozerView(resources);
  return new NeoLandozer(view, resources, gameObjectAction);
}

/**
 * 敵側ネオランドーザ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return ネオランドーザ
 */
export function EnemyNeoLandozer(resources: Resources, gameObjectAction: Stream<GameObjectAction>): NeoLandozer {
  const view = new EnemyNeoLandozerView(resources);
  return new NeoLandozer(view, resources, gameObjectAction);
}