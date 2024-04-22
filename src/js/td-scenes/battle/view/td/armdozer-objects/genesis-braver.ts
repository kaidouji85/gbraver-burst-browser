import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyGenesisBraver,
  PlayerGenesisBraver,
} from "../../../../../game-object/armdozer/genesis-braver";
import { GenesisBraver } from "../../../../../game-object/armdozer/genesis-braver/genesis-braver";
import { TDLayerObjectCreatorParams } from "../creator-params";
import { TDArmdozerObjects } from "./armdozer-objects";

/** ジェネシスブレイバー 3Dレイヤー */
export class GenesisBraverTD implements TDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param genesisBraver スプライト
   */
  constructor(
    readonly playerId: PlayerId,
    readonly genesisBraver: GenesisBraver,
  ) {}

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
  params: TDLayerObjectCreatorParams,
): GenesisBraverTD {
  const { player } = params;
  return new GenesisBraverTD(player.playerId, PlayerGenesisBraver(params));
}

/**
 * 敵 ジェネシスブレイバー 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyGenesisBraverTD(
  params: TDLayerObjectCreatorParams,
): GenesisBraverTD {
  const { enemy } = params;
  return new GenesisBraverTD(enemy.playerId, EnemyGenesisBraver(params));
}
