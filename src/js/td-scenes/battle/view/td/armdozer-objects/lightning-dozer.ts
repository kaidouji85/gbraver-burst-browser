import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyLightningDozer,
  PlayerLightningDozer,
} from "../../../../../game-object/armdozer/lightning-dozer";
import { LightningDozer } from "../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import { LightningBarrierGameEffect } from "../../../../../game-object/barrier/lightning/lightning-barrier";
import { TDLayerObjectCreatorParams } from "../creator-params";
import { TDArmdozerObjects } from "./armdozer-objects";

/** ライトニングドーザ 3Dレイヤー */
export class LightningDozerTD implements TDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param lightningDozer スプライト
   * @param lightningBarrier 電撃バリア
   */
  constructor(
    readonly playerId: PlayerId,
    readonly lightningDozer: LightningDozer,
    readonly lightningBarrier: LightningBarrierGameEffect,
  ) {
    this.lightningDozer.addObject3D(this.lightningBarrier.getObject3D());
  }

  /** @override */
  destructor(): void {
    this.lightningDozer.destructor();
    this.lightningBarrier.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.lightningDozer;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.lightningDozer.getObject3D()];
  }
}

/**
 * プレイヤー 3Dレイヤー ライトニングドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerLightningDozerTD(
  params: TDLayerObjectCreatorParams,
): LightningDozerTD {
  const { player } = params;
  return new LightningDozerTD(
    player.playerId,
    PlayerLightningDozer(params),
    new LightningBarrierGameEffect(params),
  );
}

/**
 * 敵 3Dレイヤー ライトニングドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyLightningDozerTD(
  params: TDLayerObjectCreatorParams,
): LightningDozerTD {
  const { enemy } = params;
  return new LightningDozerTD(
    enemy.playerId,
    EnemyLightningDozer(params),
    new LightningBarrierGameEffect(params),
  );
}
