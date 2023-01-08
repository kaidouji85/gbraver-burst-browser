import type { Player, PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import {
  enemyShinyaCutIn,
  playerShinyaCutIn,
} from "../../../../../game-object/cut-in/shinya";
import { ShinyaCutIn } from "../../../../../game-object/cut-in/shinya/shinya";
import type { Resources } from "../../../../../resource";
import type { Stream } from "../../../../../stream/stream";
import type { HUDPilotObjects } from "./hud-pilot-objects";

/**
 * コンストラクタのパラメータ
 */
type Params = {
  playerId: PlayerId;
  cutIn: ShinyaCutIn;
};

/**
 * HUDレイヤー シンヤ固有のオブジェクトをあつめたもの
 */
export class ShinyaHUD implements HUDPilotObjects {
  playerId: PlayerId;
  cutIn: ShinyaCutIn;

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
    return [this.cutIn.getObject3D()];
  }
}

/**
 * プレイヤー側 シンヤHUD
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return シンヤHUD
 */
export function playerShinyaHUD(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>,
  state: Player
): ShinyaHUD {
  return new ShinyaHUD({
    playerId: state.playerId,
    cutIn: playerShinyaCutIn(resources, gameObjectAction),
  });
}

/**
 * 敵側 シンヤHUD
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return シンヤHUD
 */
export function enemyShinyaHUD(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>,
  state: Player
): ShinyaHUD {
  return new ShinyaHUD({
    playerId: state.playerId,
    cutIn: enemyShinyaCutIn(resources, gameObjectAction),
  });
}
