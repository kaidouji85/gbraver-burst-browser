// @flow

import {LightningDozer} from "./lightning-dozer";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {PlayerLightingDozerView} from "./view/player-lighting-dozer-view";
import {EnemyLightningDozerView} from "./view/enemy-lightning-dozer-view";

/**
 * プレイヤー側のライトニングドーザを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return プレイヤー側のライトニングドーザ
 */
export function playerLightningDozer(resources: Resources, listener: Observable<GameObjectAction>): LightningDozer {
  const view = new PlayerLightingDozerView(resources);
  return new LightningDozer(resources, listener, view);
}

/**
 * 敵側のライトニングドーザを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 敵側のライトニングドーザ
 */
export function enemyLightningDozer(resources: Resources, listener: Observable<GameObjectAction>): LightningDozer {
  const view = new EnemyLightningDozerView(resources);
  return new LightningDozer(resources, listener, view);
}