import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyShinyaCutIn,
  playerShinyaCutIn,
} from "../../../../../game-object/cut-in/shinya";
import { ShinyaCutIn } from "../../../../../game-object/cut-in/shinya/shinya";
import { GenerateHUDLayerObjectParams } from "../generate-params";
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
 * @param params 生成パラメータ
 * @return シンヤHUD
 */
export function playerShinyaHUD(
  params: GenerateHUDLayerObjectParams,
): ShinyaHUD {
  const { player } = params;
  return new ShinyaHUD({
    playerId: player.playerId,
    cutIn: playerShinyaCutIn(params),
  });
}

/**
 * 敵側 シンヤHUD
 * @param params 生成パラメータ
 * @return シンヤHUD
 */
export function enemyShinyaHUD(
  params: GenerateHUDLayerObjectParams,
): ShinyaHUD {
  const { enemy } = params;
  return new ShinyaHUD({
    playerId: enemy.playerId,
    cutIn: enemyShinyaCutIn(params),
  });
}
