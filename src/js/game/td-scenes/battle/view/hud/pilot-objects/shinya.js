// @flow

import type {HUDPilotObjects} from "./index";
import type {Resources} from "../../../../../../resource";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Shinya} from "../../../../../../game-object/pilot/shinya/shinya";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import type {Player} from "gbraver-burst-core";
import {enemyShinya, playerShinya} from "../../../../../../game-object/pilot/shinya";
import * as THREE from "three";

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

  /**
   * コンストラクタ
   *
   * @param params パラメータ
   */
  constructor(params: Params) {
    this.playerId = params.playerId;
    this.cutIn = params.cutIn;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.cutIn.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [
      this.cutIn.getObject3D()
    ];
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