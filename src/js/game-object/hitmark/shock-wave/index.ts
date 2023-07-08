import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { initialValue } from "./model/initial-value";
import { ShockWave } from "./shock-wave";
import { EnemyShockWaveView } from "./view/enemy-shock-wave-view";
import { PlayerShockWaveView } from "./view/player-shock-wave-view";

/**
 * プレイヤーの衝撃波を生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 衝撃波
 */
export function playerShockWave(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): ShockWave {
  const model = initialValue();
  const view = new PlayerShockWaveView(resources, model);
  return new ShockWave(view, model, resources, gameObjectAction);
}

/**
 * 敵の衝撃波を生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 衝撃波
 */
export function enemyShockWave(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): ShockWave {
  const model = initialValue();
  const view = new EnemyShockWaveView(resources, model);
  return new ShockWave(view, model, resources, gameObjectAction);
}
