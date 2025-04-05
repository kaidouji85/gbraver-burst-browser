import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyGranDozerCutIn,
  playerGranDozerCutIn,
} from "../../../../../game-object/cut-in/gran-dozer";
import { GranDozerCutIn } from "../../../../../game-object/cut-in/gran-dozer/gran-dozer-cut-in";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDArmdozerObjects } from "./hud-armdozer-objects";

/** HUDレイヤー グランドーザ固有オブジェクト */
export class GranDozerHUD implements HUDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: GranDozerCutIn,
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
 * プレイヤー グランドーザHUD を生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerGranDozerHUD(
  params: HUDLayerObjectCreatorParams,
): HUDArmdozerObjects {
  const { player } = params;
  return new GranDozerHUD(player.playerId, playerGranDozerCutIn(params));
}

/**
 * 敵 グランドーザHUD を生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyGranDozerHUD(
  params: HUDLayerObjectCreatorParams,
): HUDArmdozerObjects {
  const { enemy } = params;
  return new GranDozerHUD(enemy.playerId, enemyGranDozerCutIn(params));
}
