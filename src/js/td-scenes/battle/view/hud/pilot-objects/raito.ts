import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyRaitoCutIn,
  playerRaitoCutIn,
} from "../../../../../game-object/cut-in/raito";
import { RaitoCutIn } from "../../../../../game-object/cut-in/raito/raito";
import { GenerateHUDLayerObjectParams } from "../generate-params";
import type { HUDPilotObjects } from "./hud-pilot-objects";

/**
 * コンストラクタのパラメータ
 */
type Params = {
  playerId: PlayerId;
  cutIn: RaitoCutIn;
};

/**
 * ライトHUD
 */
export class RaitoHUD implements HUDPilotObjects {
  playerId: PlayerId;
  cutIn: RaitoCutIn;

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
 * プレイヤー側 ライトHUD
 * @param params 生成パラメータ
 * @return ライトHUD
 */
export function playerRaitoHUD(params: GenerateHUDLayerObjectParams): RaitoHUD {
  const { player } = params;
  return new RaitoHUD({
    playerId: player.playerId,
    cutIn: playerRaitoCutIn(params),
  });
}

/**
 * 敵側 ライトHUD
 * @param params 生成パラメータ
 * @return ライトHUD
 */
export function enemyRaitoHUD(params: GenerateHUDLayerObjectParams): RaitoHUD {
  const { enemy } = params;
  return new RaitoHUD({
    playerId: enemy.playerId,
    cutIn: enemyRaitoCutIn(params),
  });
}
