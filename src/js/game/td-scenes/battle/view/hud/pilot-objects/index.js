// @flow

import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {Player} from "gbraver-burst-core";
import {PilotIds} from "gbraver-burst-core";
import type {HUDPilotObjects} from "./hud-pilot-objects";
import {enemyGaiHUD, playerGaiHUD} from "./gai";
import {enemyShinyaHUD, playerShinyaHUD} from "./shinya";
import {enemyRaitoHUD, playerRaitoHUD} from "./raito";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import {toStream} from "../../../../../../stream/rxjs";

/**
 * プレイヤー側 HUDパイロット
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー状態
 * @return HUDパイロット
 */
export function playerHUDPilotObjects(resources: Resources, listener: Observable<GameObjectAction>, state: Player): HUDPilotObjects {
  switch (state.pilot.id) {
    case PilotIds.SHINYA:
      return playerShinyaHUD(resources, toStream(listener), state);
    case PilotIds.GAI:
      return playerGaiHUD(resources, toStream(listener), state);
    case PilotIds.RAITO:
      return playerRaitoHUD(resources, toStream(listener), state);
    default:
      return playerShinyaHUD(resources, toStream(listener), state);
  }
}

/**
 * 敵側 HUDパイロット
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー状態
 * @return HUDパイロット
 */
export function enemyHUDPilotObjects(resources: Resources, listener: Observable<GameObjectAction>, state: Player): HUDPilotObjects {
  switch (state.pilot.id) {
    case PilotIds.SHINYA:
      return enemyShinyaHUD(resources, toStream(listener), state);
    case PilotIds.GAI:
      return enemyGaiHUD(resources, toStream(listener), state);
    case PilotIds.RAITO:
      return enemyRaitoHUD(resources, toStream(listener), state);
    default:
      return enemyShinyaHUD(resources, toStream(listener), state);
  }
}
