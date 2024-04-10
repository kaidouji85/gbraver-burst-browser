import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyGenesisBraver,
  PlayerGenesisBraver,
} from "../../../../../game-object/armdozer/genesis-braver";
import { GenesisBraver } from "../../../../../game-object/armdozer/genesis-braver/genesis-braver";
import {GenerateTDLayerObjectParams} from "../generate-params";
import type { TDArmdozerObjects } from "./armdozer-objects";

/** ジェネシスブレイバー 3Dレイヤー フィールド */
interface GenesisBraverTDField {
  /** スプライト */
  genesisBraver: GenesisBraver;
}

/** ジェネシスブレイバー 3Dレイヤー */
export class GenesisBraverTD
  implements GenesisBraverTDField, TDArmdozerObjects
{
  /** @override */
  playerId: PlayerId;

  /** @override */
  genesisBraver: GenesisBraver;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: GenesisBraverTDField) {
    this.playerId = playerId;
    this.genesisBraver = field.genesisBraver;
  }

  /** @override */
  destructor(): void {
    this.genesisBraver.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.genesisBraver;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.genesisBraver.getObject3D()];
  }
}

/**
 * プレイヤー ジェネシスブレイバー 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerGenesisBraverTD(
  params: GenerateTDLayerObjectParams,
): GenesisBraverTD {
  const { player } = params;
  return new GenesisBraverTD(player.playerId, {
    genesisBraver: PlayerGenesisBraver(params),
  });
}

/**
 * 敵 ジェネシスブレイバー 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyGenesisBraverTD(
  params: GenerateTDLayerObjectParams,
): GenesisBraverTD {
  const { enemy } = params;
  return new GenesisBraverTD(enemy.playerId, {
    genesisBraver: EnemyGenesisBraver(params),
  });
}
