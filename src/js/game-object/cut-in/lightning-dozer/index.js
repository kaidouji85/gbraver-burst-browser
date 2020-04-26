// @flow

import {LightningDozerCutIn} from "./lightning-dozer-cutin";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {PlayerLightningDozerCutInView} from "./view/player-lightning-dozer-cutin-view";
import {EnemyLightningDozerCutInView} from "./view/enemy-lightning-dozer-cutin-view";

/**
 * プレイヤー ライトニングドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerLightningDozerCutIn(resources: Resources, listener: Observable<GameObjectAction>): LightningDozerCutIn {
  const view = new PlayerLightningDozerCutInView(resources);
  return new LightningDozerCutIn(view);
}

/**
 * 敵 ライトニングドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyLightningiDozerCutIn(resources: Resources, listener: Observable<GameObjectAction>): LightningDozerCutIn {
  const view = new EnemyLightningDozerCutInView(resources);
  return new LightningDozerCutIn(view);
}