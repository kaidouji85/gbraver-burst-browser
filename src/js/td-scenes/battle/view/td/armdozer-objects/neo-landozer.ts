import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyNeoLandozer,
  PlayerNeoLandozer,
} from "../../../../../game-object/armdozer/neo-landozer";
import { NeoLandozer } from "../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import { GenerateTDLayerObjectParams } from "../generate-params";
import type { TDArmdozerObjects } from "./armdozer-objects";

/** ネオランドーザ 3Dレイヤー フィールド */
interface NeoLandozerTDField {
  /** ネオランドーザ */
  neoLandozer: NeoLandozer;
}

/** ネオランドーザ 3Dレイヤー */
export class NeoLandozerTD implements NeoLandozerTDField, TDArmdozerObjects {
  /** @override */
  playerId: PlayerId;

  /** @override */
  neoLandozer: NeoLandozer;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: NeoLandozerTDField) {
    this.playerId = playerId;
    this.neoLandozer = field.neoLandozer;
  }

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
  params: GenerateTDLayerObjectParams,
): NeoLandozerTD {
  const { player } = params;
  return new NeoLandozerTD(player.playerId, {
    neoLandozer: PlayerNeoLandozer(params),
  });
}

/**
 * 敵 3Dレイヤー ネオランドーザ 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyNeoLandozerTD(
  params: GenerateTDLayerObjectParams,
): NeoLandozerTD {
  const { enemy } = params;
  return new NeoLandozerTD(enemy.playerId, {
    neoLandozer: EnemyNeoLandozer(params),
  });
}
