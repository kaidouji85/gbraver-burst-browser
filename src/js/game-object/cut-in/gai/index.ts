import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { GaiCutIn } from "./gai";
import { EnemyGaiView } from "./view/enemy-gai-view";
import { PlayerGaiView } from "./view/player-gai-view";

/** 生成パラメータ */
export type GenerateGaiCutInParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** 効果音再生オブジェクト */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ガイ カットイン
 * @param params 生成パラメータ
 * @return ガイ カットイン
 */
export function playerGaiCutIn(params: GenerateGaiCutInParams): GaiCutIn {
  const { resources } = params;
  const view = new PlayerGaiView(resources);
  return new GaiCutIn({ ...params, view });
}

/**
 * 敵側 ガイ カットイン
 * @param params 生成パラメータ
 * @return ガイ カットイン
 */
export function enemyGaiCutIn(params: GenerateGaiCutInParams): GaiCutIn {
  const { resources } = params;
  const view = new EnemyGaiView(resources);
  return new GaiCutIn({ ...params, view });
}
