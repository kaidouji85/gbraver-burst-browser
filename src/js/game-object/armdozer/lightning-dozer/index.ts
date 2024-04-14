import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { LightningDozer } from "./lightning-dozer";
import { EnemyLightningDozerView } from "./view/enemy-lightning-dozer-view";
import { PlayerLightingDozerView } from "./view/player-lighting-dozer-view";
import {SEPlayer} from "../../../se/se-player";

/** ライトニングドーザ生成関数パラメータ */
type GenerateLightningDozerParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生 */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側のライトニングドーザを生成する
 * @param params 生成パラメータ
 * @return プレイヤー側のライトニングドーザ
 */
export function PlayerLightningDozer(
  params: GenerateLightningDozerParams,
): LightningDozer {
  const { resources } = params;
  const view = new PlayerLightingDozerView(resources);
  return new LightningDozer({ ...params, view });
}

/**
 * 敵側のライトニングドーザを生成する
 * @param params 生成パラメータ
 * @return 敵側のライトニングドーザ
 */
export function EnemyLightningDozer(
  params: GenerateLightningDozerParams,
): LightningDozer {
  const { resources } = params;
  const view = new EnemyLightningDozerView(resources);
  return new LightningDozer({ ...params, view });
}
