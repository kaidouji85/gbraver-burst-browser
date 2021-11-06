// @flow

import type {Resources} from "../../../../../../resource";
import type {Player} from "gbraver-burst-core";
import {PilotIds} from "gbraver-burst-core";
import type {HUDPilotObjects} from "./hud-pilot-objects";
import {enemyGaiHUD, playerGaiHUD} from "./gai";
import {enemyShinyaHUD, playerShinyaHUD} from "./shinya";
import {enemyRaitoHUD, playerRaitoHUD} from "./raito";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {Stream} from "../../../../../../stream/core";
import {enemyTsubasaHUD, playerTsubasaHUD} from "./tsubasa";

/**
 * プレイヤー側 HUDパイロット
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー状態
 * @return HUDパイロット
 */
export function playerHUDPilotObjects(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): HUDPilotObjects {
  switch (state.pilot.id) {
    case PilotIds.SHINYA:
      return playerShinyaHUD(resources, gameObjectAction, state);
    case PilotIds.GAI:
      return playerGaiHUD(resources, gameObjectAction, state);
    case PilotIds.RAITO:
      return playerRaitoHUD(resources, gameObjectAction, state);
    case PilotIds.TSUBASA:
      return playerTsubasaHUD(resources, gameObjectAction, state);
    default:
      return playerShinyaHUD(resources, gameObjectAction, state);
  }
}

/**
 * 敵側 HUDパイロット
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー状態
 * @return HUDパイロット
 */
export function enemyHUDPilotObjects(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): HUDPilotObjects {
  switch (state.pilot.id) {
    case PilotIds.SHINYA:
      return enemyShinyaHUD(resources, gameObjectAction, state);
    case PilotIds.GAI:
      return enemyGaiHUD(resources, gameObjectAction, state);
    case PilotIds.RAITO:
      return enemyRaitoHUD(resources, gameObjectAction, state);
    case PilotIds.TSUBASA:
      return enemyTsubasaHUD(resources, gameObjectAction, state);
    default:
      return enemyShinyaHUD(resources, gameObjectAction, state);
  }
}
