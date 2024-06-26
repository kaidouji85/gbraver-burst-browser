import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { LightningDozer } from "./lightning-dozer";
import { EnemyLightningDozerView } from "./view/enemy-lightning-dozer-view";
import { PlayerLightingDozerView } from "./view/player-lighting-dozer-view";

/** ライトニングドーザ生成関数パラメータ */
type LightningDozerCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * プレイヤー側のライトニングドーザを生成する
 * @param params 生成パラメータ
 * @returns プレイヤー側のライトニングドーザ
 */
export function PlayerLightningDozer(
  params: LightningDozerCreatorParams,
): LightningDozer {
  const { resources } = params;
  const view = new PlayerLightingDozerView(resources);
  return new LightningDozer({ ...params, view });
}

/**
 * 敵側のライトニングドーザを生成する
 * @param params 生成パラメータ
 * @returns 敵側のライトニングドーザ
 */
export function EnemyLightningDozer(
  params: LightningDozerCreatorParams,
): LightningDozer {
  const { resources } = params;
  const view = new EnemyLightningDozerView(resources);
  return new LightningDozer({ ...params, view });
}
