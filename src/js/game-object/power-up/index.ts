import type { Resources } from "../../resource";
import type { Stream } from "../../stream/stream";
import type { GameObjectAction } from "../action/game-object-action";
import { PowerUp } from "./power-up";
import { EnemyPowerUpView } from "./view/enemy-power-up-view";
import { PlayerPowerUpView } from "./view/player-power-up-view";

/**
 * プレイヤー 攻撃アップ ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerPowerUp(resources: Resources, gameObjectAction: Stream<GameObjectAction>): PowerUp {
  const view = new PlayerPowerUpView(resources);
  return new PowerUp(view, resources, gameObjectAction);
}

/**
 * 敵 攻撃アップ ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyPowerUp(resources: Resources, gameObjectAction: Stream<GameObjectAction>): PowerUp {
  const view = new EnemyPowerUpView(resources);
  return new PowerUp(view, resources, gameObjectAction);
}