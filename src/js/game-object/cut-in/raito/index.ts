import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { RaitoCutIn } from "./raito";
import { EnemyRaitoView } from "./view/enemy-raito-view";
import { PlayerRaitoView } from "./view/player-raito-view";

/** 生成パラメータ */
export type GenerateRaitoCutInParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ライト カットイン
 * @param params 生成パラメータ
 * @return ライト カットイン
 */
export function playerRaitoCutIn(params: GenerateRaitoCutInParams): RaitoCutIn {
  const { resources } = params;
  const view = new PlayerRaitoView(resources);
  return new RaitoCutIn({ ...params, view });
}

/**
 * 敵側 ライト カットイン
 * @param params 生成パラメータ
 * @return ライト カットイン
 */
export function enemyRaitoCutIn(params: GenerateRaitoCutInParams): RaitoCutIn {
  const { resources } = params;
  const view = new EnemyRaitoView(resources);
  return new RaitoCutIn({ ...params, view });
}
