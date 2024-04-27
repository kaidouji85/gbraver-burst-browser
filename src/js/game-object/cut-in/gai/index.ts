import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { GaiCutIn } from "./gai";
import { EnemyGaiView } from "./view/enemy-gai-view";
import { PlayerGaiView } from "./view/player-gai-view";

/** 生成パラメータ */
export type GaiCutInCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * プレイヤー側 ガイ カットイン
 * @param params 生成パラメータ
 * @returns ガイ カットイン
 */
export function playerGaiCutIn(params: GaiCutInCreatorParams): GaiCutIn {
  const { resources } = params;
  const view = new PlayerGaiView(resources);
  return new GaiCutIn({ ...params, view });
}

/**
 * 敵側 ガイ カットイン
 * @param params 生成パラメータ
 * @returns ガイ カットイン
 */
export function enemyGaiCutIn(params: GaiCutInCreatorParams): GaiCutIn {
  const { resources } = params;
  const view = new EnemyGaiView(resources);
  return new GaiCutIn({ ...params, view });
}
