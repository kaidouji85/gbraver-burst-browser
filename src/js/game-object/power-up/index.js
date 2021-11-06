// @flow

import type {Resources} from "../../resource";
import {PlayerPowerUpView} from "./view/player-power-up-view";
import {EnemyPowerUpView} from "./view/enemy-power-up-view";
import {PowerUp} from "./power-up";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

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