import { Observable } from "rxjs";

import type { Resources } from "../../resource";
import { SEPlayer } from "../../se/se-player";
import type { GameObjectAction } from "../action/game-object-action";
import { PowerUp } from "./power-up";
import { EnemyPowerUpView } from "./view/enemy-power-up-view";
import { PlayerPowerUpView } from "./view/player-power-up-view";

/** 生成パラメータ */
export type GeneratePowerUpParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー 攻撃アップ ポップアップ
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerPowerUp(params: GeneratePowerUpParams): PowerUp {
  const { resources } = params;
  const view = new PlayerPowerUpView(resources);
  return new PowerUp({ ...params, view });
}

/**
 * 敵 攻撃アップ ポップアップ
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyPowerUp(params: GeneratePowerUpParams): PowerUp {
  const { resources } = params;
  const view = new EnemyPowerUpView(resources);
  return new PowerUp({ ...params, view });
}
