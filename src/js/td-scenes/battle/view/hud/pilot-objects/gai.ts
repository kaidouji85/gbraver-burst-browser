import type { Player, PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import {
  enemyGaiCutIn,
  playerGaiCutIn,
} from "../../../../../game-object/cut-in/gai";
import { GaiCutIn } from "../../../../../game-object/cut-in/gai/gai";
import type { Resources } from "../../../../../resource";
import type { Stream } from "../../../../../stream/stream";
import type { HUDPilotObjects } from "./hud-pilot-objects";

/**
 * コンストラクタのパラメータ
 */
type Params = {
  playerId: PlayerId;
  cutIn: GaiCutIn;
};

/**
 * HUDレイヤー ガイ固有のオブジェクトをあつめたもの
 */
export class GaiHUD implements HUDPilotObjects {
  playerId: PlayerId;
  cutIn: GaiCutIn;

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
 * プレイヤー側 ガイHUD
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return ガイHUD
 */
export function playerGaiHUD(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>,
  state: Player
): GaiHUD {
  return new GaiHUD({
    playerId: state.playerId,
    cutIn: playerGaiCutIn(resources, gameObjectAction),
  });
}

/**
 * 敵側 ガイHUD
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return ガイHUD
 */
export function enemyGaiHUD(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>,
  state: Player
): GaiHUD {
  return new GaiHUD({
    playerId: state.playerId,
    cutIn: enemyGaiCutIn(resources, gameObjectAction),
  });
}
