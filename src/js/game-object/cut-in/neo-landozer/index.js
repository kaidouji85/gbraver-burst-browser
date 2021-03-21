// @flow

import {NeoLandozerCutIn} from "./neo-landozer-cutin";
import type {Resources} from "../../../resource";
import {PlayerNeoLandozerCutInView} from "./view/player-neo-landozer-cutin-view";
import {EnemyNeoLandozerCutInView} from "./view/enemy-neo-landozer-cutin-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側 ネオランドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerNeoLandozerCutIn(resources: Resources, listener: Stream<GameObjectAction>): NeoLandozerCutIn {
  const view = new PlayerNeoLandozerCutInView(resources);
  return new NeoLandozerCutIn(view, listener);
}

/**
 * 敵側 ネオランドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyNeoLandozerCutIn(resources: Resources, listener: Stream<GameObjectAction>): NeoLandozerCutIn {
  const view = new EnemyNeoLandozerCutInView(resources);
  return new NeoLandozerCutIn(view, listener);
}