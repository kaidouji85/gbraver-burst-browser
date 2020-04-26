// @flow

import {LightningDozerCutIn} from "./lightning-dozer/lightning-dozer-cutin";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

/**
 * プレイヤー ライトニングドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerLightningDozerCutIn(resources: Resources, listener: Observable<GameObjectAction>): LightningDozerCutIn {
  return new LightningDozerCutIn(resources);
}

/**
 * 敵 ライトニングドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyLightningiDozerCutIn(resources: Resources, listener: Observable<GameObjectAction>): LightningDozerCutIn {
  return new LightningDozerCutIn(resources);
}