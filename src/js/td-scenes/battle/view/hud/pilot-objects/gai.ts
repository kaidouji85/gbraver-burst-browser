import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyGaiCutIn,
  playerGaiCutIn,
} from "../../../../../game-object/cut-in/gai";
import { GaiCutIn } from "../../../../../game-object/cut-in/gai/gai";
import { GenerateHUDLayerObjectParams } from "../generate-params";
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
 * @param params 生成パラメータ
 * @return ガイHUD
 */
export function playerGaiHUD(params: GenerateHUDLayerObjectParams): GaiHUD {
  const { resources, player, gameObjectAction } = params;
  return new GaiHUD({
    playerId: player.playerId,
    cutIn: playerGaiCutIn(resources, gameObjectAction),
  });
}

/**
 * 敵側 ガイHUD
 * @param params 生成パラメータ
 * @return ガイHUD
 */
export function enemyGaiHUD(params: GenerateHUDLayerObjectParams): GaiHUD {
  const { resources, enemy, gameObjectAction } = params;
  return new GaiHUD({
    playerId: enemy.playerId,
    cutIn: enemyGaiCutIn(resources, gameObjectAction),
  });
}
