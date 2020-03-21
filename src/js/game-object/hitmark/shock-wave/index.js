// @flow

import type {Resources} from "../../../resource";
import {ShockWave} from "./shock-wave";
import {PlayerShockWaveView} from "./view/player-shock-wave-view";
import {EnemyShockWaveView} from "./view/enemy-shock-wave-view";

/**
 * プレイヤーの衝撃波を生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 衝撃波
 */
export function playerShockWave(resources: Resources): ShockWave {
  const view = new PlayerShockWaveView(resources);
  return new ShockWave(view);
}

/**
 * 敵の衝撃波を生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 衝撃波
 */
export function enemyShockWave(resources: Resources): ShockWave {
  const view = new EnemyShockWaveView(resources);
  return new ShockWave(view);
}