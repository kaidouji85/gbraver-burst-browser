import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { NeoLandozerCutIn } from "./neo-landozer-cutin";
import { EnemyNeoLandozerCutInView } from "./view/enemy-neo-landozer-cutin-view";
import { PlayerNeoLandozerCutInView } from "./view/player-neo-landozer-cutin-view";

/**
 * プレイヤー側 ネオランドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerNeoLandozerCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): NeoLandozerCutIn {
  const view = new PlayerNeoLandozerCutInView(resources);
  return new NeoLandozerCutIn(view, gameObjectAction);
}

/**
 * 敵側 ネオランドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyNeoLandozerCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): NeoLandozerCutIn {
  const view = new EnemyNeoLandozerCutInView(resources);
  return new NeoLandozerCutIn(view, gameObjectAction);
}
