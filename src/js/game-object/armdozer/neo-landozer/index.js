// @flow

import type {Resources} from "../../../resource";
import {NeoLandozer} from './neo-landozer';
import {PlayerNeoLandozerView} from "./view/player-neo-landozer-view";
import {EnemyNeoLandozerView} from "./view/enemy-neo-landozer-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

/**
 * プレイヤー側ネオランドーザ
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return ネオランドーザ
 */
export function PlayerNeoLandozer(resources: Resources, listener: Observable<GameObjectAction>): NeoLandozer {
  const view = new PlayerNeoLandozerView(resources);
  return new NeoLandozer(view, resources, listener);
}

/**
 * 敵側ネオランドーザ
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return ネオランドーザ
 */
export function EnemyNeoLandozer(resources: Resources, listener: Observable<GameObjectAction>): NeoLandozer {
  const view = new EnemyNeoLandozerView(resources);
  return new NeoLandozer(view, resources, listener);
}