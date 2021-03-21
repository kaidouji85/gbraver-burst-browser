// @flow

import {GaiCutIn} from "./gai";
import type {Resources} from "../../../resource";
import {PlayerGaiView} from "./view/player-gai-view";
import {EnemyGaiView} from "./view/enemy-gai-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側 ガイ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return ガイ カットイン
 */
export function playerGaiCutIn(resources: Resources, listener: Stream<GameObjectAction>): GaiCutIn {
  const view = new PlayerGaiView(resources);
  return new GaiCutIn(view, resources, listener);
}

/**
 * 敵側 ガイ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return ガイ カットイン
 */
export function enemyGaiCutIn(resources: Resources, listener: Stream<GameObjectAction>): GaiCutIn {
  const view = new EnemyGaiView(resources);
  return new GaiCutIn(view, resources, listener);
}
