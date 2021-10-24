// @flow

import {WingDozerCutIn} from "./wing-dozer-cutin";
import type {Resources} from "../../../resource";
import {PlayerWingDozerCutInView} from "./view/player-wing-dozer-cutin-view";
import {EnemyWingDozerCutInView} from "./view/enemy-wing-dozer-cutin-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側 ウィングドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerWingDozerCutIn(resources: Resources, gameObjectAction: Stream<GameObjectAction>): WingDozerCutIn {
  const view = new PlayerWingDozerCutInView(resources);
  return new WingDozerCutIn(view, gameObjectAction);
}

/**
 * 敵側 ウィングドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyWingDozerCutIn(resources: Resources, gameObjectAction: Stream<GameObjectAction>): WingDozerCutIn {
  const view = new EnemyWingDozerCutInView(resources);
  return new WingDozerCutIn(view, gameObjectAction);
}