import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyGranDozer,
  PlayerGranDozer,
} from "../../../../../game-object/armdozer/gran-dozer";
import { GranDozer } from "../../../../../game-object/armdozer/gran-dozer/gran-dozer";
import {
  enemyLightningShot,
  playerLightningShot,
} from "../../../../../game-object/shot/lightning-shot";
import { LightningShot } from "../../../../../game-object/shot/lightning-shot/lightning-shot";
import { TDLayerObjectCreatorParams } from "../creator-params";
import { TDArmdozerObjects } from "./armdozer-objects";

/** グランドーザ 3Dレイヤー */
export class GranDozerTD implements TDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param granDozer スプライト
   * @param lightningShot 電撃ショット
   */
  constructor(
    readonly playerId: PlayerId,
    readonly granDozer: GranDozer,
    readonly lightningShot: LightningShot,
  ) {}

  /** @override */
  destructor(): void {
    this.granDozer.destructor();
    this.lightningShot.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.granDozer;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.granDozer.getObject3D(), this.lightningShot.getObject3D()];
  }
}

/**
 * プレイヤー グランドーザ 3Dレイヤー
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerGranDozerTD(
  params: TDLayerObjectCreatorParams,
): GranDozerTD {
  const { player } = params;
  return new GranDozerTD(
    player.playerId,
    PlayerGranDozer(params),
    playerLightningShot(params),
  );
}

/**
 * 敵 グランドーザ 3Dレイヤー
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyGranDozerTD(
  params: TDLayerObjectCreatorParams,
): GranDozerTD {
  const { enemy } = params;
  return new GranDozerTD(
    enemy.playerId,
    EnemyGranDozer(params),
    enemyLightningShot(params),
  );
}
