import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyShinBraver,
  PlayerShinBraver,
} from "../../../../../game-object/armdozer/shin-braver";
import { ShinBraver } from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import { TDLayerObjectCreatorParams } from "../creator-params";
import { TDArmdozerObjects } from "./armdozer-objects";

/** シンブレイバー 3Dレイヤー */
export class ShinBraverTD implements TDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param shinBraver スプライト
   */
  constructor(
    readonly playerId: PlayerId,
    readonly shinBraver: ShinBraver,
  ) {}

  /** @override */
  destructor(): void {
    this.shinBraver.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.shinBraver;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.shinBraver.getObject3D()];
  }
}

/**
 * プレイヤー シンブレイバー 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerShinBraverTD(
  params: TDLayerObjectCreatorParams,
): ShinBraverTD {
  const { player } = params;
  return new ShinBraverTD(player.playerId, PlayerShinBraver(params));
}

/**
 * 敵 シンブレイバー 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyShinBraverTD(
  params: TDLayerObjectCreatorParams,
): ShinBraverTD {
  const { enemy } = params;
  return new ShinBraverTD(enemy.playerId, EnemyShinBraver(params));
}
