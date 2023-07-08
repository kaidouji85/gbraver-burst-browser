import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { LightningDozer } from "./lightning-dozer";
import { EnemyLightningDozerView } from "./view/enemy-lightning-dozer-view";
import { PlayerLightingDozerView } from "./view/player-lighting-dozer-view";

/**
 * プレイヤー側のライトニングドーザを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return プレイヤー側のライトニングドーザ
 */
export function PlayerLightningDozer(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): LightningDozer {
  const view = new PlayerLightingDozerView(resources);
  return new LightningDozer(resources, gameObjectAction, view);
}

/**
 * 敵側のライトニングドーザを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 敵側のライトニングドーザ
 */
export function EnemyLightningDozer(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): LightningDozer {
  const view = new EnemyLightningDozerView(resources);
  return new LightningDozer(resources, gameObjectAction, view);
}
