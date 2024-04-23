import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyShinyaCutIn,
  playerShinyaCutIn,
} from "../../../../../game-object/cut-in/shinya";
import { ShinyaCutIn } from "../../../../../game-object/cut-in/shinya/shinya";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDPilotObjects } from "./hud-pilot-objects";

/** シンヤ HUDオブジェクト */
export class ShinyaHUD implements HUDPilotObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: ShinyaCutIn,
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
 * プレイヤー側 シンヤHUD
 * @param params 生成パラメータ
 * @return シンヤHUD
 */
export function playerShinyaHUD(
  params: HUDLayerObjectCreatorParams,
): ShinyaHUD {
  const { player } = params;
  return new ShinyaHUD(player.playerId, playerShinyaCutIn(params));
}

/**
 * 敵側 シンヤHUD
 * @param params 生成パラメータ
 * @return シンヤHUD
 */
export function enemyShinyaHUD(params: HUDLayerObjectCreatorParams): ShinyaHUD {
  const { enemy } = params;
  return new ShinyaHUD(enemy.playerId, enemyShinyaCutIn(params));
}
