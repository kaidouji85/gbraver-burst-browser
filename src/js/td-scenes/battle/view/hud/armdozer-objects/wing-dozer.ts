import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyWingDozerCutIn,
  playerWingDozerCutIn,
} from "../../../../../game-object/cut-in/wing-dozer";
import { WingDozerCutIn } from "../../../../../game-object/cut-in/wing-dozer/wing-dozer-cutin";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDArmdozerObjects } from "./hud-armdozer-objects";

/** HUDレイヤー ウィングドーザ固有のオブジェクトをあつめたもの */
export class WingDozerHUD implements HUDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: WingDozerCutIn,
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
 * プレイヤー側 ウィングドーザHUD
 * @param params 生成パラメータ
 * @returns ウィングドーザHUD
 */
export function playerWingDozerHUD(
  params: HUDLayerObjectCreatorParams,
): WingDozerHUD {
  const { player } = params;
  return new WingDozerHUD(player.playerId, playerWingDozerCutIn(params));
}

/**
 * 敵側 ウィングドーザHUD
 * @param params 生成パラメータ
 * @returns ウィングドーザHUD
 */
export function enemyWingDozerHUD(
  params: HUDLayerObjectCreatorParams,
): WingDozerHUD {
  const { enemy } = params;
  return new WingDozerHUD(enemy.playerId, enemyWingDozerCutIn(params));
}
