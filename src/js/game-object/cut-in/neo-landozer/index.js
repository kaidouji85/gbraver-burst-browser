// @flow

import {NeoLandozerCutIn} from "./neo-landozer-cutin";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

/**
 * プレイヤー側 ネオランドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerNeoLandozerCutIn(resources: Resources, listener: Observable<GameObjectAction>): NeoLandozerCutIn {
  return new NeoLandozerCutIn(resources);
}

/**
 * 敵側 ネオランドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyNeoLandozerCutIn(resources: Resources, listener: Observable<GameObjectAction>): NeoLandozerCutIn {
  return new NeoLandozerCutIn(resources);
}