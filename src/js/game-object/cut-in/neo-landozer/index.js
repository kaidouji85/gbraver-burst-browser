// @flow

import {NeoLandozerCutIn} from "./neo-landozer-cutin";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import {PlayerNeoLandozerCutInView} from "./view/player-neo-landozer-cutin-view";
import {EnemyNeoLandozerCutInView} from "./view/enemy-neo-landozer-cutin-view";
import type {GameObjectAction} from "../../action/game-object-action";

/**
 * プレイヤー側 ネオランドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerNeoLandozerCutIn(resources: Resources, listener: Observable<GameObjectAction>): NeoLandozerCutIn {
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
export function enemyNeoLandozerCutIn(resources: Resources, listener: Observable<GameObjectAction>): NeoLandozerCutIn {
  const view = new EnemyNeoLandozerCutInView(resources);
  return new NeoLandozerCutIn(view, listener);
}