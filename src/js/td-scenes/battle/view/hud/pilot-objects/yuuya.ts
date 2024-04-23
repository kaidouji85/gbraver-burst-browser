import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyYuuyaCutIn,
  playerYuuyaCutIn,
} from "../../../../../game-object/cut-in/yuuya";
import { YuuyaCutIn } from "../../../../../game-object/cut-in/yuuya/yuuya";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDPilotObjects } from "./hud-pilot-objects";

/** ユウヤ HUDオブジェクト */
export class YuuyaHUD implements HUDPilotObjects {
  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: YuuyaCutIn,
  ) {}

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
export function playerYuuyaHUD(params: HUDLayerObjectCreatorParams): YuuyaHUD {
  const { player } = params;
  return new YuuyaHUD(player.playerId, playerYuuyaCutIn(params));
}

/**
 * 敵側 ユウヤHUD
 * @param params 生成パラメータ
 * @return ユウヤHUD
 */
export function enemyYuuyaHUD(params: HUDLayerObjectCreatorParams): YuuyaHUD {
  const { enemy } = params;
  return new YuuyaHUD(enemy.playerId, enemyYuuyaCutIn(params));
}
