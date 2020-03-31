// @flow

import {LightningBarrierGameEffect} from "./lightning-barrier";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {PlayerLightningBarrierView} from "./view/player-lightning-barrier-view";
import {EnemyLightningBarrier} from "./view/enemy-lightning-barrier";

/**
 * プレイヤー側 電撃バリア
 *
 * @param resources リソース管理オブジェクト
 * @return 電撃バリア
 */
export function playerLightningBarrier(resources: Resources, listener: Observable<GameObjectAction>): LightningBarrierGameEffect {
  const view = new PlayerLightningBarrierView(resources);
  return new LightningBarrierGameEffect(view, listener);
}

/**
 * 敵側 電撃バリア
 *
 * @param resources リソース管理オブジェクト
 * @return 電撃バリア
 */
export function enemyLightningBarrier(resources: Resources, listener: Observable<GameObjectAction>): LightningBarrierGameEffect {
  const view = new PlayerLightningBarrierView(resources);
  return new LightningBarrierGameEffect(view, listener);
}