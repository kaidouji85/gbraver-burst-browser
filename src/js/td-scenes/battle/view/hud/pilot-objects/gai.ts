import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyGaiCutIn,
  playerGaiCutIn,
} from "../../../../../game-object/cut-in/gai";
import { GaiCutIn } from "../../../../../game-object/cut-in/gai/gai";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDPilotObjects } from "./hud-pilot-objects";

/** HUDレイヤー ガイ固有のオブジェクトをあつめたもの */
export class GaiHUD implements HUDPilotObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: GaiCutIn,
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
 * プレイヤー側 ガイHUD
 * @param params 生成パラメータ
 * @return ガイHUD
 */
export function playerGaiHUD(params: HUDLayerObjectCreatorParams): GaiHUD {
  const { player } = params;
  return new GaiHUD(player.playerId, playerGaiCutIn(params));
}

/**
 * 敵側 ガイHUD
 * @param params 生成パラメータ
 * @return ガイHUD
 */
export function enemyGaiHUD(params: HUDLayerObjectCreatorParams): GaiHUD {
  const { enemy } = params;
  return new GaiHUD(enemy.playerId, enemyGaiCutIn(params));
}
