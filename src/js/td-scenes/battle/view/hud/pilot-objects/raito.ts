import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyRaitoCutIn,
  playerRaitoCutIn,
} from "../../../../../game-object/cut-in/raito";
import { RaitoCutIn } from "../../../../../game-object/cut-in/raito/raito";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDPilotObjects } from "./hud-pilot-objects";

/** ライトHUDオブジェクト */
export class RaitoHUD implements HUDPilotObjects {
  /**
   * コンストラクタ
   * @param pilotId パイロットID
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: RaitoCutIn,
  ) {}

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
export function playerRaitoHUD(params: HUDLayerObjectCreatorParams): RaitoHUD {
  const { player } = params;
  return new RaitoHUD(player.playerId, playerRaitoCutIn(params));
}

/**
 * 敵側 ライトHUD
 * @param params 生成パラメータ
 * @return ライトHUD
 */
export function enemyRaitoHUD(params: HUDLayerObjectCreatorParams): RaitoHUD {
  const { enemy } = params;
  return new RaitoHUD(enemy.playerId, enemyRaitoCutIn(params));
}
