import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import type { GameObjectAction } from "../action/game-object-action";
import { PowerUp } from "./power-up";
import { EnemyPowerUpView } from "./view/enemy-power-up-view";
import { PlayerPowerUpView } from "./view/player-power-up-view";

/** 生成パラメータ */
export type PowerUpCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * プレイヤー 攻撃アップ ポップアップ
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerPowerUp(params: PowerUpCreatorParams): PowerUp {
  const { resources } = params;
  const view = new PlayerPowerUpView(resources);
  return new PowerUp({ ...params, view });
}

/**
 * 敵 攻撃アップ ポップアップ
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyPowerUp(params: PowerUpCreatorParams): PowerUp {
  const { resources } = params;
  const view = new EnemyPowerUpView(resources);
  return new PowerUp({ ...params, view });
}
