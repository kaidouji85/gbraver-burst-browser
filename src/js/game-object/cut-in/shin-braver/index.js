// @flow

import type {Resources} from "../../../resource";
import {ShinBraverCutIn} from "./shin-braver-cutin";
import {PlayerShinBraverCutInView} from "./view/player-shin-braver-cutin-view";
import {EnemyShinBraverCutInView} from "./view/enemy-shin-braver-cutin-view";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/**
 * プレイヤー側 シンブレイバー カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerShinBraverCutIn(resources: Resources, listener: Stream<GameObjectAction>): ShinBraverCutIn {
  const view = new PlayerShinBraverCutInView(resources);
  return new ShinBraverCutIn(view, listener);
}

/**
 * 敵側 シンブレイバー カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyShinBraverCutIn(resources: Resources, listener: Stream<GameObjectAction>): ShinBraverCutIn {
  const view = new EnemyShinBraverCutInView(resources);
  return new ShinBraverCutIn(view, listener);
}