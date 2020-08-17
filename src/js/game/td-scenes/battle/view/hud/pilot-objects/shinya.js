// @flow

import type {HUDPilotObjects} from "./index";
import type {Resources} from "../../../../../../resource";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Shinya} from "../../../../../../game-object/pilot/shinya/shinya";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import type {Player} from "gbraver-burst-core";
import {enemyShinya, playerShinya} from "../../../../../../game-object/pilot/shinya";

/**
 * コンストラクタのパラメータ
 */
type Params = {
  playerId: PlayerId,
  cutIn: Shinya
};

/**
 * HUDレイヤー シンヤ固有のオブジェクトをあつめたもの
 */
export class ShinyaHUD implements HUDPilotObjects {
  playerId: PlayerId;
  cutIn: Shinya;

  constructor(params: Params) {
    this.playerId = params.playerId;
    this.cutIn = params.cutIn;
  }

  destructor(): void {
    this.cutIn.destructor();
  }
}

/**
 * プレイヤー側 シンヤHUD
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return シンヤHUD
 */
export function playerShinyaHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): ShinyaHUD {
  return new ShinyaHUD( {
    playerId: state.playerId,
    cutIn: playerShinya(resources, listener)
  })
}

/**
 * 敵側 シンヤHUD
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return シンヤHUD
 */
export function enemyShinyaHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): ShinyaHUD {
  return new ShinyaHUD( {
    playerId: state.playerId,
    cutIn: enemyShinya(resources, listener)
  })
}