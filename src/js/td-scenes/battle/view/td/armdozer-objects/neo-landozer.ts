import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyNeoLandozer,
  PlayerNeoLandozer,
} from "../../../../../game-object/armdozer/neo-landozer";
import { NeoLandozer } from "../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import { TDLayerObjectCreatorParams } from "../creator-params";
import { TDArmdozerObjects } from "./armdozer-objects";

/** ネオランドーザ 3Dレイヤー */
export class NeoLandozerTD implements TDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param neoLandozer スプライト
   */
  constructor(
    readonly playerId: PlayerId,
    readonly neoLandozer: NeoLandozer,
  ) {}

  /** @override */
  destructor(): void {
    this.neoLandozer.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.neoLandozer;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.neoLandozer.getObject3D()];
  }
}

/**
 * プレイヤー 3Dレイヤー ネオランドーザ 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerNeoLandozerTD(
  params: TDLayerObjectCreatorParams,
): NeoLandozerTD {
  const { player } = params;
  return new NeoLandozerTD(player.playerId, PlayerNeoLandozer(params));
}

/**
 * 敵 3Dレイヤー ネオランドーザ 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyNeoLandozerTD(
  params: TDLayerObjectCreatorParams,
): NeoLandozerTD {
  const { enemy } = params;
  return new NeoLandozerTD(enemy.playerId, EnemyNeoLandozer(params));
}
