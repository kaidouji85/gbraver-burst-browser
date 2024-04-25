import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyShinBraverCutIn,
  playerShinBraverCutIn,
} from "../../../../../game-object/cut-in/shin-braver";
import { ShinBraverCutIn } from "../../../../../game-object/cut-in/shin-braver/shin-braver-cutin";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDArmdozerObjects } from "./hud-armdozer-objects";

/** HUDレイヤー シンブレイバー固有のオブジェクトをあつめたもの */
export class ShinBraverHUD implements HUDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: ShinBraverCutIn,
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
 * プレイヤー側 シンブレイバーHUD
 * @param params 生成パラメータ
 * @returns シンブレイバーHUD
 */
export function playerShinBraverHUD(
  params: HUDLayerObjectCreatorParams,
): HUDArmdozerObjects {
  const { player } = params;
  return new ShinBraverHUD(player.playerId, playerShinBraverCutIn(params));
}

/**
 * 敵側 シンブレイバーHUD
 * @param params 生成パラメータ
 * @returns シンブレイバーHUD
 */
export function enemyShinBraverHUD(
  params: HUDLayerObjectCreatorParams,
): HUDArmdozerObjects {
  const { enemy } = params;
  return new ShinBraverHUD(enemy.playerId, enemyShinBraverCutIn(params));
}
