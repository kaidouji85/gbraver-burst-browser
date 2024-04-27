import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyTsubasaCutIn,
  playerTsubasaCutIn,
} from "../../../../../game-object/cut-in/tsubasa";
import { TsubasaCutIn } from "../../../../../game-object/cut-in/tsubasa/tsubasa";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDPilotObjects } from "./hud-pilot-objects";

/** ツバサ HUDオブジェクト */
export class TsubasaHUD implements HUDPilotObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: TsubasaCutIn,
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
   * @returns シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [this.cutIn.getObject3D()];
  }
}

/**
 * プレイヤー側 ツバサHUD
 * @param params 生成パラメータ
 * @returns ツバサHUD
 */
export function playerTsubasaHUD(
  params: HUDLayerObjectCreatorParams,
): TsubasaHUD {
  const { player } = params;
  return new TsubasaHUD(player.playerId, playerTsubasaCutIn(params));
}

/**
 * 敵側 ツバサHUD
 * @param params 生成パラメータ
 * @returns ツバサHUD
 */
export function enemyTsubasaHUD(
  params: HUDLayerObjectCreatorParams,
): TsubasaHUD {
  const { enemy } = params;
  return new TsubasaHUD(enemy.playerId, enemyTsubasaCutIn(params));
}
