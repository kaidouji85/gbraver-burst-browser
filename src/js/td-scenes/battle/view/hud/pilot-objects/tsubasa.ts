import type { Player, PlayerId } from "gbraver-burst-core";
import * as THREE from "three";
import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import { enemyTsubasaCutIn, playerTsubasaCutIn } from "../../../../../game-object/cut-in/tsubasa";
import { TsubasaCutIn } from "../../../../../game-object/cut-in/tsubasa/tsubasa";
import type { Resources } from "../../../../../resource";
import type { Stream } from "../../../../../stream/stream";
import type { HUDPilotObjects } from "./hud-pilot-objects";

/**
 * コンストラクタのパラメータ
 */
type Params = {
  playerId: PlayerId;
  cutIn: TsubasaCutIn;
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
  getObject3Ds(): THREE.Object3D[] {
    return [this.cutIn.getObject3D()];
  }

}

/**
 * プレイヤー側 ツバサHUD
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return ツバサHUD
 */
export function playerTsubasaHUD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): TsubasaHUD {
  return new TsubasaHUD({
    playerId: state.playerId,
    cutIn: playerTsubasaCutIn(resources, gameObjectAction)
  });
}

/**
 * 敵側 ツバサHUD
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return ツバサHUD
 */
export function enemyTsubasaHUD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): TsubasaHUD {
  return new TsubasaHUD({
    playerId: state.playerId,
    cutIn: enemyTsubasaCutIn(resources, gameObjectAction)
  });
}