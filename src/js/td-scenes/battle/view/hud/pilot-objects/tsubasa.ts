import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyTsubasaCutIn,
  playerTsubasaCutIn,
} from "../../../../../game-object/cut-in/tsubasa";
import { TsubasaCutIn } from "../../../../../game-object/cut-in/tsubasa/tsubasa";
import { GenerateHUDLayerObjectParams } from "../generate-params";
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
 * @param params 生成パラメータ
 * @return ツバサHUD
 */
export function playerTsubasaHUD(
  params: GenerateHUDLayerObjectParams,
): TsubasaHUD {
  const { player } = params;
  return new TsubasaHUD({
    playerId: player.playerId,
    cutIn: playerTsubasaCutIn(params),
  });
}

/**
 * 敵側 ツバサHUD
 * @param params 生成パラメータ
 * @return ツバサHUD
 */
export function enemyTsubasaHUD(
  params: GenerateHUDLayerObjectParams,
): TsubasaHUD {
  const { enemy } = params;
  return new TsubasaHUD({
    playerId: enemy.playerId,
    cutIn: enemyTsubasaCutIn(params),
  });
}
