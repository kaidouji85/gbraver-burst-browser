import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyYuuyaCutIn,
  playerYuuyaCutIn,
} from "../../../../../game-object/cut-in/yuuya";
import { YuuyaCutIn } from "../../../../../game-object/cut-in/yuuya/yuuya";
import { GenerateHUDLayerObjectParams } from "../generate-params";
import type { HUDPilotObjects } from "./hud-pilot-objects";

/** コンストラクタのパラメータ */
type Params = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** カットイン */
  cutIn: YuuyaCutIn;
};

/** HUDレイヤー ユウヤ固有のオブジェクトをあつめたもの */
export class YuuyaHUD implements HUDPilotObjects {
  /** @override */
  playerId: PlayerId;
  /** カットイン */
  cutIn: YuuyaCutIn;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: Params) {
    this.playerId = params.playerId;
    this.cutIn = params.cutIn;
  }

  /** @override */
  destructor(): void {
    this.cutIn.destructor();
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.cutIn.getObject3D()];
  }
}

/**
 * プレイヤー側 ユウヤHUD
 * @param params 生成パラメータ
 * @return ユウヤHUD
 */
export function playerYuuyaHUD(params: GenerateHUDLayerObjectParams): YuuyaHUD {
  const { player } = params;
  return new YuuyaHUD({
    playerId: player.playerId,
    cutIn: playerYuuyaCutIn(params),
  });
}

/**
 * 敵側 ユウヤHUD
 * @param params 生成パラメータ
 * @return ユウヤHUD
 */
export function enemyYuuyaHUD(params: GenerateHUDLayerObjectParams): YuuyaHUD {
  const { enemy } = params;
  return new YuuyaHUD({
    playerId: enemy.playerId,
    cutIn: enemyYuuyaCutIn(params),
  });
}
