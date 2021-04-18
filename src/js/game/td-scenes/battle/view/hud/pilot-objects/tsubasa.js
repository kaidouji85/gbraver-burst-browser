// @flow

import type {Resources} from "../../../../../../resource";
import type {Player, PlayerId} from "gbraver-burst-core";
import * as THREE from "three";
import type {HUDPilotObjects} from "./hud-pilot-objects";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {Stream} from "../../../../../../stream/core";
import {TsubasaCutIn} from "../../../../../../game-object/cut-in/tsubasa/tsubasa";
import {playerTsubasaCutIn} from "../../../../../../game-object/cut-in/tsubasa";

/**
 * コンストラクタのパラメータ
 */
type Params = {
  playerId: PlayerId,
  cutIn: TsubasaCutIn
};

/**
 * HUDレイヤー ツバサ固有のオブジェクトをあつめたもの
 */
export class TsubasaHUD implements HUDPilotObjects {
  playerId: PlayerId;
  cutIn: TsubasaCutIn;

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
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.cutIn.getObject3D()
    ];
  }
}

/**
 * プレイヤー側 ツバサHUD
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return ツバサHUD
 */
export function playerTsubasaHUD(resources: Resources, listener: Stream<GameObjectAction>, state: Player): TsubasaHUD {
  return new TsubasaHUD( {
    playerId: state.playerId,
    cutIn: playerTsubasaCutIn(resources, listener)
  })
}

/**
 * 敵側 ツバサHUD
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return ツバサHUD
 */
export function enemyTsubasaHUD(resources: Resources, listener: Stream<GameObjectAction>, state: Player): TsubasaHUD {
  return new TsubasaHUD( {
    playerId: state.playerId,
    cutIn: playerTsubasaCutIn(resources, listener)
  })
}