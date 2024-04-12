import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyLightningDozer,
  PlayerLightningDozer,
} from "../../../../../game-object/armdozer/lightning-dozer";
import { LightningDozer } from "../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import { LightningBarrierGameEffect } from "../../../../../game-object/barrier/lightning/lightning-barrier";
import { GenerateTDLayerObjectParams } from "../generate-params";
import type { TDArmdozerObjects } from "./armdozer-objects";

/** ライトニングドーザ 3Dレイヤー フィールド */
interface LightningDozerTDField {
  /** ライトニングドーザ */
  lightningDozer: LightningDozer;

  /** 電撃バリア */
  lightningBarrier: LightningBarrierGameEffect;
}

/** ライトニングドーザ 3Dレイヤー */
export class LightningDozerTD
  implements TDArmdozerObjects, LightningDozerTDField
{
  /** @override */
  playerId: PlayerId;

  /** @override */
  lightningDozer: LightningDozer;

  /** @override */
  lightningBarrier: LightningBarrierGameEffect;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param filed フィールド
   */
  constructor(playerId: PlayerId, filed: LightningDozerTDField) {
    this.playerId = playerId;
    this.lightningDozer = filed.lightningDozer;
    this.lightningBarrier = filed.lightningBarrier;
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
 * @return 生成結果
 */
export function playerLightningDozerTD(
  params: GenerateTDLayerObjectParams,
): LightningDozerTD {
  const { player } = params;
  return new LightningDozerTD(player.playerId, {
    lightningDozer: PlayerLightningDozer(params),
    lightningBarrier: new LightningBarrierGameEffect(params),
  });
}

/**
 * 敵 3Dレイヤー ライトニングドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyLightningDozerTD(
  params: GenerateTDLayerObjectParams,
): LightningDozerTD {
  const { enemy } = params;
  return new LightningDozerTD(enemy.playerId, {
    lightningDozer: EnemyLightningDozer(params),
    lightningBarrier: new LightningBarrierGameEffect(params),
  });
}
