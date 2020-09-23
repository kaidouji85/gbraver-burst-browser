// @flow

import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import type {Player} from "gbraver-burst-core";
import {PilotIds} from "gbraver-burst-core";
import {enemyShinyaHUD, playerShinyaHUD} from "./shinya";
import type {HUDPilotObjects} from "./hud-pilot-objects";

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
    default:
      return playerShinyaHUD(resources, listener, state);
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
    default:
      return enemyShinyaHUD(resources, listener, state);
  }
}
