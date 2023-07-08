import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { LightningDozerCutIn } from "./lightning-dozer-cutin";
import { EnemyLightningDozerCutInView } from "./view/enemy-lightning-dozer-cutin-view";
import { PlayerLightningDozerCutInView } from "./view/player-lightning-dozer-cutin-view";

/**
 * プレイヤー ライトニングドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerLightningDozerCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): LightningDozerCutIn {
  const view = new PlayerLightningDozerCutInView(resources);
  return new LightningDozerCutIn(view, gameObjectAction);
}

/**
 * 敵 ライトニングドーザ カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyLightningiDozerCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): LightningDozerCutIn {
  const view = new EnemyLightningDozerCutInView(resources);
  return new LightningDozerCutIn(view, gameObjectAction);
}
